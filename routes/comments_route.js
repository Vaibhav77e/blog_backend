const express = require('express');
const router = express.Router();

const {isUserAuthenticated} = require('../middlewares/isUserAuthenicated');

const {writeAComment,getComments} = require('../controllers/comments_controller');

router.route('/blog/comment').post(isUserAuthenticated,writeAComment);
router.route('/blog/showComments').post(isUserAuthenticated,getComments);

module.exports = router;