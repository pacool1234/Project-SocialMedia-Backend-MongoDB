const mongoose = require('mongoose');
const Comment = require('../models/Comment');

const CommentController = {
  async create(req, res) {
    try {
      
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'There was a problem creating post' });
    }
  }
};

module.exports = CommentController;