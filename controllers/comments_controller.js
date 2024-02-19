const CommentModel = require('../models/commentsModel');
const {UnExpectedError,NoDataError} = require('../utils/customErrorHandlers');


// this api is write a comment for other user's post : /blog/comment
exports.writeAComment = async(req,res,next)=>{
    try{
        // get current account userID from isUserAuthenicated middleware
        const userId = req.user.id;

        const {blogID,description} =req.body;

        // const newBlog

        const comments = await CommentModel.create({
            blogID:blogID,
            description:description,
            user:userId
        });

        if(comments==null){
            next(new NoDataError("Couldn't post a comment"));
        }

        res.status(200).json({
            message:"You added comment to this blog",
            data:comments
        });


    }catch(err){
        return res.status(500).json({
            message:err.message
        });
    }
}


