const Post = require('../models/Post');



const PostController = {

    async create(req, res) {  //add 'required' to model
        try {
            const post = await Post.create({ ...req.body, userId: req.user._id });
            res.status(201).send({ msg: 'New post created', post });
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },

    async update(req, res) {
        try {
            const post = await Post.findByIdAndUpdate(req.params._id, req.body);
            console.log(req.user._id);
            res.status(200).send({ msg: 'Post updated', post })
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },

    async delete(req, res) {
        try {
            const post = await Post.findByIdAndDelete(req.params._id)
            res.status(200).send({msg:'Post deleted'}, post)
        } catch(error){
            console.error(error);
            res.status(500).send(error);
        }

    },

    async getAll(req, res) {
        try {
            const posts = await Post.find().populate('userId', 'username'); //Add info from an another collection -  must include userId and whatever else I want to see
            res.status(200).send(posts);
        } catch(error){
            console.error(error);
            res.status(500).send(error);
        }
    },

    async getbyId(req, res) {
        try {
            const post = await Post.findById(req.params._id).populate('userId', 'username'); 
            res.status(200).send(post);
        } catch(error){
            console.error(error);
            res.status(500).send(error);
        }
    }



}











module.exports = PostController;