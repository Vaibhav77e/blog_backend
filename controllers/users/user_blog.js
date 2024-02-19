const BlogSchema = require('../../models/blogModels');
const {UnExpectedError,NoDataError} = require('../../utils/customErrorHandlers');

// api to get all blogs created by user /user/myblog

exports.getAllMyBlogs = async (req, res, next) => {
    try{
        const userId = req.user.id;

        if(!userId){
            next(new NoDataError('Id not found'));
        }

        console.log(userId);

        const blog = await BlogSchema.find({userId:userId});

        if(blog===null){
            next(new NoDataError('Blog not found'));
        }

        res.status(200).json({
            result:blog.length,
            data:blog
        });

    }catch(err){
        return res.status(500).json({message: err.message});
    }
}