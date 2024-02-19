const express = require('express');
const router = express.Router();

const {isUserAuthenticated} = require('../middlewares/isUserAuthenicated');

const {writeAComment} = require('../controllers/comments_controller');

router.route('/blog/comment').post(isUserAuthenticated,writeAComment);

module.exports = router;