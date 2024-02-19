const BlogSchema = require('../models/blogModels');
const {UnExpectedError,NoDataError} = require('../utils/customErrorHandlers');
// const CommentSchema = require('../models/commentsModel');

// api to create or post blog : /blog/create

exports.createPost = async(req,res,next)=>{
    try{
        // req.user.id will be received from isAuthenticatedUser which is middleware
        req.body.user = req.user.id;

        const {title,content,author,category} = req.body;

        const blog = await BlogSchema.create({
            title:title,
            content:content,
            author:author,
            category:category,
            userId : req.body.user
        });

        if(blog==null){
            next(new NoDataError('Could\'t create blog or data'))
        }

        res.status(200).json({
            message:"Your blog create successfully",
            data:blog
        });
    }catch(err){
        return res.status(500).json({message:err.message});
    }
}

// api to show all blog and their comments : /blog/showAllBlogs

exports.showAllBlogs = async(req,res,next)=>{
    try{
        // req.user.id will be received from isAuthenticatedUser which is middleware

        const blogs = await BlogSchema.find({});

        if(blogs==null){
            next(new UnExpectedError('Blog not found'));
        }
        res.status(200).json({
            data:blogs
        });

    }catch(err){
        return res.status(500).json({message:err.message});
    }
}