const Blogs = require('../../models/blogModels');


exports.searchFunction = async(req, res)=>{
    const blog = await Blogs.find({title:{$regex:title, $options:"i"}});

    res.status(200).json(
        {data:blog}
    );
}