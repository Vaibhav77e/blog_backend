const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema =new mongoose.Schema({
    name:{
        type: String,
        required: [true,'Please enter your name']
    },
    email:{
        type: String,
        required: [true,'Please enter your email'],
        unique: true,
        validate : [validator.isEmail,'Please enter a valid email address']
    },
    password:{
        type: String,
        required: [true,'Please enter your email'],
        minLength:[8,'Your password must be at least 8 characters'],
    },
    role:{
        type: String,
        enum:{
            values:[
                'user','admin'
            ],
        message:'Please enter correct role'
        },
        default:'user'
    },
    resetPasswordToken: String,
    resetPasswordExpire : Date,
},
{timestamps:true}
);

userSchema.pre('save',async function(){
    if(!this.password){
        next();
    }
    this.password = await bcrypt.hash(this.password,10);
})



// compare user passwords in database password
userSchema.methods.comparePassword = async function(enterPassword){
    return await bcrypt.compare(enterPassword,this.password);
    // if(enterPassword===this.password){
    //     return true;
    // }else{
    //     return false;
    // }
}

const UserModel = mongoose.model('User',userSchema);

module.exports = UserModel;

