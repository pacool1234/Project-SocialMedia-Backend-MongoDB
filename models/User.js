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
  following: [userId],
  followers: [userId],
  token: {
    type: String
  }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
