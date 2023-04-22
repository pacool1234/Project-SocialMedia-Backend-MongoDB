const User = require('../models/User');
const Post = require('../models/Post');
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config/keys.js');




const authentication = async(req, res, next) => {
    try{
        const token = req.headers.authorization;
        const payload = jwt.verify(token, jwt_secret);
        const user = await User.findOne({_id: payload._id, tokens: token })
        
        if(!user) {
            console.log(user);
            return res.status(401).send('Unauthorised request');
        }

        req.user = user;
        next();
    } catch(error){
        console.error(error);
        return res.status(500).send('Error with token');
    }
}


const isAuthor = async(req, res, next) => {
    try{
        const post = await Post.findById(req.params._id);
        if(post.userId.toString() !== req.user._id.toString()) {
            console.log(req.user.email)
            console.log('user id of this post' + post.userId);
            return res.status(403).send({msg: 'Not the author'})
        }
        next();
    }catch(error) {
        console.log("whats going on2?")
        console.error(error);
        return res.status(500).send(error);
    }
}
     

module.exports = { authentication, isAuthor };