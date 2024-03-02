const express = require('express');
const router = express.Router();
const userController = require('../../controllers/users/user_controller');


// testing
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // first i was using cb(null, '/uploads');
                            // i was getting this error  :
                            /*
                            [Error: ENOENT: no such file or directory, open 'E:\storage-path\1709379726937Screenshot 2023-12-30 175213.png'] {
                                errno: -4058,
                                code: 'ENOENT',
                                syscall: 'open',
                                path: 'E:\\storage-path\\1709379726937Screenshot 2023-12-30 175213.png',
                                storageErrors: []
                              }
                              */
    },
    filename: function (req, file, cb) {
      cb(null, +Date.now()+ file.originalname);
    }
  });
  
  const upload = multer({ storage: storage });


const {
    registerUser,
    loginUser,
    logoutUser,
   
}=userController;

const {getAllMyBlogs,deleteMyAccount, uploadFile} = require('../../controllers/users/user_blog');

const {isUserAuthenticated} = require('../../middlewares/isUserAuthenicated');



router.route('/user/create').post(registerUser);
router.route('/user/login').post(loginUser);
router.route('/user/logout').get(isUserAuthenticated,logoutUser);

router.route('/user/showMyBlogs').get(isUserAuthenticated,getAllMyBlogs);
router.route('/user/deleteMyAccount').get(isUserAuthenticated,deleteMyAccount);

router.route('/user/uploadFile').post(upload.single('file'),uploadFile);

module.exports = router;