const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const userId = {
  type: ObjectId,
  ref: 'User'
};

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
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
  tokens: [{ type: String }]
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
