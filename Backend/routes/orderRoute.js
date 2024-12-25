const express = require('express');
const { createOrder, getUserOrder, getShopOrder, updateStatus } = require('../controllers/OrderController');
const router = express.Router();


router.post('/create',createOrder)
router.get('/get-all-order/:userId',getUserOrder);
router.get('/get-seller-all-order/:shopId',getShopOrder);
router.put('/update-status/:id',updateStatus);

module.exports = router 