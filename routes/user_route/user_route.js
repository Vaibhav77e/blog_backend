const express = require('express');
const router = express.Router();
const userController = require('../../controllers/users/user_controller');

const {
    registerUser,
    loginUser,
    logoutUser,
    
}=userController;

const {getAllMyBlogs,deleteMyAccount} = require('../../controllers/users/user_blog');

const {isUserAuthenticated} = require('../../middlewares/isUserAuthenicated');



router.route('/user/create').post(registerUser);
router.route('/user/login').post(loginUser);
router.route('/user/logout').get(isUserAuthenticated,logoutUser);

router.route('/user/showMyBlogs').get(isUserAuthenticated,getAllMyBlogs);
router.route('/user/deleteMyAccount').get(isUserAuthenticated,deleteMyAccount);

module.exports = router;