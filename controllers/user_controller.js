const User = require('../models/userModels');
const {UnExpectedError,NoDataError} = require('../utils/customErrorHandlers');
const createToken = require('../utils/createToken');
const sendToken = require('../utils/sendToken');

// api endpoint /user/create
exports.registerUser= async(req,res,next)=>{
    try{
       const {name,email,password} = req.body;
       const duplicateId = await User.find({email: email});

       if(duplicateId.length > 0){
        return next(new UnExpectedError("Email is already in use"));
       }

        const user = await User.create({
            name,
            email,
            password});

        if(!user){
            return next(new UnExpectedError("Couldn't create your account. Something went wrong"));
        }
        let id =  user._id.toString();

        let token = createToken(id);

        if(!token){
            return res.status(404).json({message: "Something went wrong"});
        }

        res.status(200).json({
            result : user.length,
            data:user,
            token
        });

    }catch(err){
        return res.status(500).json({
            err:err.message,
        });
    }
}

// api endpoint /user/login

exports.loginUser = async(req,res,next)=>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email:email,password:password});

        if(!user){
            return next(new NoDataError('User not found'));
        }

        const matchedPassword = await user.comparePassword(password);

        if(!matchedPassword){
           return next(new UnExpectedError('Password doesn\'t match'));
        }

        sendToken.sendToken(user,200,res);
    }
    catch(err){
        return res.status(500).json({
            err:err.message,
        });
    }
}