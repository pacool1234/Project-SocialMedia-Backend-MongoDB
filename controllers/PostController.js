const Post = require('../models/Post');


const PostController = {

    async create(req, res) {  //add 'required' to model
        try {
            let data = req.body;  
            if(req.file){            //check if file exists, if not, simply take info from body!
                data = {...req.body, image: req.file.path }
            }
            const post = await Post.create({ ...data, userId: req.user._id});
            res.status(201).send({ msg: 'New post created', post });
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },

    async update(req, res) {
        try {
            const post = await Post.findByIdAndUpdate(req.params._id, req.body);
            res.status(200).send({ msg: 'Post updated', post });
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },

    async delete(req, res) {
        try {
            const post = await Post.findByIdAndDelete(req.params._id);
            res.status(200).send({msg:'Post deleted', post} );
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

    async getById(req, res) {
        try {
            const post = await Post.findById(req.params._id).populate('userId', 'username'); 
            res.status(200).send(post);
        } catch(error){
            console.error(error);
            res.status(500).send(error);
        }
    },

    async getByTitle(req, res) {
        try{
            const posts = await Post.find({$text: {$search: req.params.title}}).populate('userId', 'username');
            if (posts.length === 0) {
                return res.status(404).send('No such post');
            }
            res.status(200).send(posts);
        }catch(error){
            console.error(error);
            res.status(500).send(error);
        }
    }



}



module.exports = PostController;