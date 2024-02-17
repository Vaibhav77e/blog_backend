const getToken = require('./createToken');

exports.sendToken = async (user,statusCode,res) => {
    // get token
    const token = getToken(user.id);

    console.log(`token : ${token}`);
    
    // options for cookie
    const options = {
        expires : new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000)
    }

    res
        .status(statusCode)
        .cookie('token',token,options)
        .json({
            message: 'Your are logged in successfully',
            data:user,
            token
        });
}