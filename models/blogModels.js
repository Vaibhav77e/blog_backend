const mongoose = require('mongoose');
const slugify = require('slugify');

const blogSchema =new mongoose.Schema({
    title:{
        type:String,
        required : [true,'Title is required please provide it']
    },
    content:{
        type:String,
        required : [true,'Content is required please provide it'],
        maxlength : [5000,'Content exceeding the limit']
    },
    author:{
        type:String,
        required : [true,'Please provide author name'],
    },
    category:{
        type:[String],
        required : [true,'Please select the category for your content'],
        enum:{
            values:[
                'Science & Technology',
                'Food & LifeStyle',
                'Travel',
                'Sports',
                'Entertainment',
                'Others'
            ]
        }
    },
    slug:String,
    likes:[{
        type:mongoose.Schema.ObjectId,
        //unique:true,
        ref: 'User',
    }],
    userId:{
        type:mongoose.Schema.ObjectId,
        ref: 'User',
        required:true,
    },
},{
    timestamps:true
});

blogSchema.pre('save',function(next) {
    this.slug = slugify(this.title,{lower:true});
    next();
});

const BlogSchema = mongoose.model('Blog',blogSchema);

module.exports = BlogSchema;