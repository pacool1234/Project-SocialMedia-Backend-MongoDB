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
      const comments = await Comment.find();
      res.send(comments);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async delete(req, res) {
    try {
      // not yet
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async foo_3(req, res) {

  }

};

module.exports = CommentController;