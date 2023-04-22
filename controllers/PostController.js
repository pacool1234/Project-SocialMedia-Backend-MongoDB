const Post = require('../models/Post');



const PostController = {

    async create(req, res) {
        try{
            const post = await Post.create(req.body);
            res.status(201).send("New post created")
        }catch(error) {
            res.status(500).send(error);
    }
    } 






}











module.exports = PostController;