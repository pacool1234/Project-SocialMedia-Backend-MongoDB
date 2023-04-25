const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;


const userId ={  //put the object in varaible to recycle it in both likes and userId
    type: ObjectId,
    ref: 'User'
}
const PostSchema = new mongoose.Schema( {
    title: {
        type: String,
        required: [true, 'Post must have a title']
    },
    body: {
        type: String,
        required: [true, 'Post must have some text']
    },
    image: String,
    likes: [userId],  //number of likes on frontend! Array of user objects
    userId,           //OP
    commentIds: [{
        type: ObjectId,
        ref: 'Comment'
    }]

}, { timestamps: true })

PostSchema.index({   //enable text search
    title: 'text' 
  });
  

const Post = mongoose.model('Post', PostSchema) 

module.exports = Post;