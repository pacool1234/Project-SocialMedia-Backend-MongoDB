const User = require("../models/user");
const jwt = require("jsonwebtoken");
const jwt_secret = require("../config/keys.js");

const authentication = async(req, res, next) => {
  try{
    const token = req.headers.authorization;
    console.log({token: token})
    const payload = jwt.verify(token, jwt_secret);
    const user = await User.findOne({_id: payload._id, tokens: token });
    if(!user) {
      return res.status(401).send({ message: "Unauthorised request" });
    }
    req.user = user;
    next();
  } catch(error) {
    console.error(error);
    res.status(500).send({ message: "Error with token" });
  }
}

module.exports = { authentication };