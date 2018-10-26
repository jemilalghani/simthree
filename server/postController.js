module.exports={
    read:(req,res)=>{
        const db = req.app.get('db');
        db.read_posts().then(posts=>{
            res.status(200).json(posts)
        }).catch(error=>{
            console.error('error in GET /api/posts', error)
            res.status(500).json({message:'error in get'})
        })
    },
    create: (req,res)=>{
        const db = req.app.get('db');
        const {title, img, content} = req.body
        const {user}= req.session
        db.create_post([title, img, content, user.id]).then(posts=>{
            res.json(posts[0])
        }).catch(error=>{
            console.error('error in POST /api/posts', error)
            res.status(500).json({message:'error in post'})
        })
    },
    update: (req,res)=>{
        const db = req.app.get('db');
        const {params, query} = req;
        db.update_post([params.id, query.title, query.img, query.content]).then(posts=>{
            res.status(200).json(posts)
        }).catch(error=>{
            console.error('error in update /api/posts', error)
            res.status(500).json({message:'error in update'})
        })
    }, readOne:(req,res)=>{
        const db=req.app.get('db');
        db.read_post([req.params.postid]).then(posts=>{
            res.status(200).json(posts)
        }).catch(error=>{
            console.error('error in get one', error)
            res.status(500).json({message:'error in get one'})
        })
    }
}