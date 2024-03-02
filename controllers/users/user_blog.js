const BlogSchema = require('../../models/blogModels');
const User = require('../../models/userModels');
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

// api to delete all blogs to related to logged in user, when user account deleted. /user/deleteMyAccount

exports.deleteMyAccount = async(req, res, next)=>{
    try{
        const id = req.user.id;

        if(!id){
            next(new NoDataError('Id not found'));
        }
        deleteUserdata(id);

        const user = await User.findById(id);

        if(!user){
            return next(new UnExpectedError('User not found'));
        }
    
        res.cookie('blog_token','none',{
            expires: new Date(Date.now()),
            httpOnly: true,
        });

        res.status(200).json({
            message:"You are account has been deleted successfully",
        });

    }catch(err){
        return res.status(500).json({
            message : err.message
        });
    }
}

async function deleteUserdata(user){
    try{
        await BlogSchema.deleteMany({userId:user})
    }catch(err){
        return res.status(500).json({ message: err.message });
    }
} 

// testing : api to upload filess
exports.uploadFile = async (req,res)=>{
    res.status(200).json(req.file)
}