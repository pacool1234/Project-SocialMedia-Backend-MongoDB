const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const userId = {
  type: ObjectId,
  ref: 'User'
};

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, 'Please introduce a username'],
  },

  title: { // User can write e.g: artist, content-creator, etc
    type: String
  },

  bio: { // self-explanatory
    type: String
  },

  email: {
    type: String,
    match: [/.+\@.+\..+/, 'Invalid email address format'],
    unique: true,
    required: [true, 'Please introduce an email address']
  },

  password: {
    type: String,
    // match: [/[.]{8,}/, 'Password must contain at least 8 characters'],
    required: true
  },

  role: { 
    type: String
  },

  confirmed: {
    type: Boolean
  },

  image: String,

  following: [userId],

  followers: [userId],

  tokens: [{
    type: String
  }]
}, { timestamps: true });

userSchema.index({
  username: 'text'
});

const User = mongoose.model("User", userSchema);

module.exports = User;