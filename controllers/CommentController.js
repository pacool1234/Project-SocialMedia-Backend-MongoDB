const mongoose = require('mongoose');
const fs = require('fs');
const Comment = require('../models/Comment');
const Post = require('../models/Post');

const CommentController = {
  async create(req, res) {
    try {
      let data = {...req.body, userId: req.user._id};
      if (req.file) {
        data = { ...req.body, userId: req.user._id, image: req.file.path };
      }
      const comment = await Comment.create(data);

      await Post.updateOne(
        { _id: req.params.postid }, // params.postid identifies
        { $push: { commentIds: comment._id } } // newly created comment._id
      )
      res.status(201).send({ message: 'Comment created', comment });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'There was a problem creating post' });
    }
  },

  async getAll(req, res) {
    try {
      const comments = await Comment.find().populate('userId', 'username');
      res.send(comments);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async update(req, res) {
    try{
      let data = req.body;
      if(req.file){
        data = {...req.body, image: req.file.path}
        const comment = await Comment.findById(req.params._id);
        if (comment.image){
          fs.unlinkSync(comment.image)
        }
      }
      const comment = await Comment.findByIdAndUpdate(
        req.params._id,
        data,
        { new: true }
      );
      res.status(200).send({msg:'Comment updated', comment})
    }catch (error){
      console.error(error);
      res.status(500).send(error);
    }
  },

  async delete(req, res) {
    try {
      const comment = await Comment.findByIdAndDelete(req.params._id);
      if (comment.image) {
        fs.unlinkSync(comment.image);  
      }
    res.status(200).send({msg:'Comment deleted', comment} );

    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

};

module.exports = CommentController;