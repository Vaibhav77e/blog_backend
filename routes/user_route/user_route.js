const express = require('express');
const router = express.Router();
const userController = require('../../controllers/users/user_controller');

const {
    registerUser,
    loginUser,
    logoutUser
}=userController;

const {isUserAuthenticated} = require('../../middlewares/isUserAuthenicated');

const {getAllMyBlogs} = require('../../controllers/users/user_blog');


router.route('/user/create').post(registerUser);
router.route('/user/login').post(loginUser);
router.route('/user/logout').get(isUserAuthenticated,logoutUser);

router.route('/user/showMyBlogs').get(isUserAuthenticated,getAllMyBlogs);

module.exports = router;