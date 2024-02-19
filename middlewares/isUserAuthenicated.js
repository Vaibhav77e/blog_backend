const User = require('../models/userModels');
const jwt =require('jsonwebtoken');
const {UnauthorizedAccess,NoDataError} = require('../utils/customErrorHandlers');

exports.isUserAuthenticated = async(req,res,next)=>{
    let token;
    try{
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
        }else{
            next(new UnauthorizedAccess('Your unauthorized to access this resource.Please login to access the data'));
        }
    
        if(!token){
            next(new UnauthorizedAccess('Your unauthorized to access this resource'));
        }
    
        const verifyToken = jwt.verify(token,process.env.JWT_SECRET);
    
        console.log(verifyToken.id);
        console.log(token);
    
        let user = await User.findById(verifyToken.id);
        
        if(!user){
            next(new NoDataError('User not found'));
        }
    
        req.user = user;
    
        next();
    }catch(err){
        next(new UnauthorizedAccess('Please login to access the resources.Please login to access the data'))
    }

}