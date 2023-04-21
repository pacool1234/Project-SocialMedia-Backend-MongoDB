const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: { type: String, default: 'user'},
  confirmed: {type: Boolean, default: false}
  }, { timestamps: true }
)

const User = mongoose.model("User", UserSchema)

module.exports = User
