const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;


const userId ={  //put the object in varaible to recycle it in both likes and userId
    type: ObjectId,
    ref: 'User'
}
const PostSchema = new mongoose.Schema( {
    title: String,
    body: String,
    image: String,
    likes: [userId],  //number of likes on frontend! Array of user objects
    userId,           //OP
    commentIds: [{
        type: ObjectId,
        ref: 'Comment'
    }]

}, { timestamps: true })

const Post = mongoose.model('Post', PostSchema) 

module.exports = Post;