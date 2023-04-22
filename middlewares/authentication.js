const User = require('../models/User');
const jwt = require('jsonwebtoken');
const jwt_secret = require('../config/keys.js');




const authentication = async(res, req, next) => {
    try{
        const token = req.headers.authorization;
        const payload = jwt.verify(token, jwt_secret);
        const user = await User.findOne({_id: payload._id, tokens: token })
        
        if(!user) {
            return res.status(401).send('Unauthorised request');
        }

        req.user = user;
        next();
    } catch(error){
        console.error(error);
        res.status(500).send('Error with token');
    }
}


module.exports = { authentication };