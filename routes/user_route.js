const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');

const {
    registerUser,
    loginUser,
    logoutUser
}=userController;

const {isUserAuthenticated} = require('../middlewares/isUserAuthenicated');


router.route('/user/create').post(registerUser);
router.route('/user/login').post(loginUser);
router.route('/user/logout').get(isUserAuthenticated,logoutUser);

module.exports = router;