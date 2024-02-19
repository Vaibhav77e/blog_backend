const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    blogID:{
        type:mongoose.Schema.ObjectId,
        ref:'Blog',
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref: 'User',
        required:true,
    }
});


const CommentModel = mongoose.model('Comment',commentSchema);

module.exports = CommentModel;