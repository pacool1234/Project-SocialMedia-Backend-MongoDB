const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const userId = {
  type: ObjectId,
  ref: 'User'
};

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  title: { // User can write e.g: artist, content-creator, etc
    type: String
  },
  bio: { // self-explanatory
    type: String
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: { 
    type: String, 
    default: 'user'
  },
  confirmed: {
    type: Boolean, 
    default: false
  },
  image: String,
  following: [userId],
  followers: [userId],
  tokens: [{
    type: String
  }]
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
