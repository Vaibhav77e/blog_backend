const express = require('express');
const router = express.Router();

const {
    createPost,
    showAllBlogs
    } = require('../controllers/blog_controller');

const {isUserAuthenticated} = require('../middlewares/isUserAuthenicated');

router.route('/blog/create').post(isUserAuthenticated,createPost);
router.route('/blog/showAllBlogs').get(isUserAuthenticated,showAllBlogs);



module.exports = router;