const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    blogID:{
        type:mongoose.Schema.ObjectId,
        ref:'Blog',
        required:true
    },
    data:{
        type:String,
        required:true,
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref: 'User',
        required:true,
    }
});


const CommentModel = mongoose.Model('Comment',commentSchema);

module.exports = CommentModel;