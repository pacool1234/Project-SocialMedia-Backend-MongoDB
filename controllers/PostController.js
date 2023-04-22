const Post = require('../models/Post');



const PostController = {

    async create(req, res) {  //add 'required' to model
        try{
            const post = await Post.create({...req.body, userId: req.user._id});
            res.status(201).send({msg:'New post created', post})
        }catch(error) {
            res.status(500).send(error);
    }
    },
    
    }











module.exports = PostController;