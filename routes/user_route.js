const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');

const {
    registerUser,
    loginUser
}=userController;


router.route('/user/create').post(registerUser);
router.route('/user/login').post(loginUser);

module.exports = router;