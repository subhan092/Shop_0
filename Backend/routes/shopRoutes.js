const express = require('express');
const { registor, upload, activation, login, isSeller, loadSeller, logOut, getShop, getAllSeller, updateSellerStatus } = require('../controllers/ShopController');
const router = express.Router();



router.post('/create-shop',upload,registor);
router.post('/activation',activation);
router.post('/login',login);

router.get('/getseller',isSeller,loadSeller);
router.get('/get-all-seller',getAllSeller);
router.get('/logout',isSeller,logOut);

router.get('/get-shop-info/:id',getShop);

router.put('/update-status/:id',updateSellerStatus)

module.exports = router