const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Comment = require('../models/Comment');
const Post = require('../models/Post');

const CommentController = {
  async create(req, res) {
    try {
      let data = { ...req.body, userId: req.user._id };
      if (req.file) {
        data = { ...req.body, userId: req.user._id, image: req.file.filename };
      } else {  //PACO: ADDED THIS ELSE, or image will be saved as "undefined"
        delete data.image;
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
        data = {...req.body, image: req.file.filename}
        const comment = await Comment.findById(req.params._id);
        if (comment.image){
          const imagePath = path.join(__dirname, '../public/uploads/comments/', comment.image);
          if(fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);   //Node.js method that deletes the corresponding file
          }    
        }
      } else {
        delete data.image; // This prevents image to be be saved as "undefined"
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
        const imagePath = path.join(__dirname, '../public/uploads/comments/', comment.image);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);   
        }   
      }
    res.status(200).send({msg:'Comment deleted', comment} );

    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async likeComment(req, res) {
  try {
    const comment = await Comment.findByIdAndUpdate(req.params._id);
    if (comment.likes.includes(req.user._id)) {
        return res.status(400).send('You\'ve already liked this comment');
    }
    comment.likes.push(req.user._id)
    await comment.save();
    res.status(201).send({ message: 'You\'ve liked this comment!', comment })
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
},

};

module.exports = CommentController;
