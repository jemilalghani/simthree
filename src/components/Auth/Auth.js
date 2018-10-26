import React, { Component } from 'react';
import {connect} from 'react-redux';
import {userLogin} from '../../ducks/reducer';
import axios from 'axios';

class Auth extends Component {
    constructor(){
        super();
        this.state={
            loading:true,
            error:null
        }
    }
    componentDidMount(){
        axios.get('/api/profile').then(response=>{
            this.props.userLogin(response.data);
        }).catch(error=>{
            this.setState({error});
        }).then(()=>{
            this.setState({loading:false})
        })
    }
    render() {
        const {loading, error} = this.state;
        const {user} = this.props;
        const redirect_uri = encodeURIComponent(window.location.origin+'/auth/callback');
        const url = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirect_uri}&response_type=code`;

        return (
            <div>
                {loading?
                    <div>loading</div>
                    :
                    error? 
                        <div>There was an error loading </div>
                        :
                        user?
                            <div>
                                <div>Name: {user.name}</div>
                                <div>Email: {user.email}</div>
                                <img src={user.picture} alt="user"/>
                            </div>
                            :
                            <div>
                                Please <a href={url}>Try Again</a>
                            </div>
                }
            </div>
        );
    }
}
function mapStateToProps(state){
    return{
        user:state.user
    }
}
export default connect(mapStateToProps, {userLogin})(Auth);