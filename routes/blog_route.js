const express = require('express');
const router = express.Router();

const {
    createPost,
    showAllBlogs,
    likeBlog,
    updateBlog,
    deleteBlog
    } = require('../controllers/blog_controller');

const {isUserAuthenticated} = require('../middlewares/isUserAuthenicated');

router.route('/blog/create').post(isUserAuthenticated,createPost);
router.route('/blog/showAllBlogs').get(isUserAuthenticated,showAllBlogs);
router.route('/blog/likeAPost').post(isUserAuthenticated,likeBlog);
router.route('/blog/:id').put(isUserAuthenticated,updateBlog)
                        .delete(isUserAuthenticated,deleteBlog);


module.exports = router;