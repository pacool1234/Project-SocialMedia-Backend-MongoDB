const mongoose = require('mongoose');
const Comment = require('../models/Comment');
const Post = require('../models/Post');

const CommentController = {
  async create(req, res) {
    try {
      const comment = await Comment.create(req.body);
      await Post.updateOne(
        { userId: req.user._id }, // Wrong, this means that you will add the comment to the first occurrence of the post posted by the guy who comments
        { $push: { commentIds: comment._id } }
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

  async foo_2(req, res) {

  },

  async foo_3(req, res) {

  }

};

module.exports = CommentController;