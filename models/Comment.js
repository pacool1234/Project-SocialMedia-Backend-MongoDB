const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const commentSchema = new mongoose.Schema({
  body: {
    type: String,
    required: [true, 'Body must have some text']
  },
  image: {
    type: String
  },
  userId: {
    type: ObjectId,
    ref: 'User'
  },
  likes: {
    type: ObjectId,
    ref: 'User'
  },

});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;