const { insertUser, loginUser , verifyUser, Authenticated , loadUser, Activation , upload , logOut, updateUser, Checkouthandle} = require('../controllers/UserController');
const express = require('express');
const router = express.Router();

// router.post('/test-upload', upload, (req, res) => {
//     console.log(req.file);
//     res.send('File upload test successful');
//   });

// router.post('/user/signup', upload, (req, res, next) => {
//     if (req.file) {
//         console.log('File uploaded:', req.file);
//     } else {
//         console.error('No file uploaded or error in file upload.');
//     }
//     console.log(req.body);
//     insertUser(req, res, next);
// });



router.post('/user/signup',upload, insertUser);
router.post('/user/login', loginUser);

router.post('/activation', Activation);
router.get('/getuser',Authenticated,loadUser);
router.get('/user/logout',Authenticated,logOut)

router.put('/updateuser',Authenticated,updateUser)
router.post('/checkout', Checkouthandle)






module.exports = router;
