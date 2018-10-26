const axios = require('axios');
module.exports={
    logout:(req,res)=>{
        req.session.destory();
        res.status(200).json({message:'Success'})
    },
    handleCallback:(req,res)=>{
        exchangeCodeForAccessToken()
            .then(exchangeAccessTokenForUserInfo)
            .then(storeUserInfoInDataBase)
            .catch(error=>{
                console.error('A problem occured in handleCallback',error);
                res.status(500).send('An unexpected error happened on the server');
            });
        function exchangeCodeForAccessToken(){
            const payload={
                client_id:process.env.REACT_APP_AUTH0_CLIENT_ID,
                client_secret:process.env.AUTH0_CLIENT_SECRET,
                code:req.query.code,
                grant_type: 'authorization_code',
                redirect_uri: `http://${req.headers.host}/auth/callback`
            }
            return axios.post(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`, payload)
        }
        function exchangeAccessTokenForUserInfo(accessTokenResponse){
            const url = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo?access_token=${accessTokenResponse.data.access_token}`;
            return axios.get(url);
        }
        function storeUserInfoInDataBase(userInfoResponse){
            const userData = userInfoResponse.data;
            return req.app.get('db').get_user([userData.sub]).then(users=>{
                if(users.length){
                    const user = users[0];
                    req.session.user = user;
                    res.redirect('/');
                } else {
                    return req.app.get('db').create_user([
                        userData.sub,
                        userData.email,
                        userData.name,
                        userData.picture
                    ]).then(newUsers=>{
                        const newUser = newUsers[0];
                        req.session.user = newUser;
                        res.redirect('/');
                    }).catch(error=>{
                        console.error('error inserting user into database', error);
                        res.status(500).send('An unexpected error happened on the server');
                    })
                }
            })
        }
    }
}