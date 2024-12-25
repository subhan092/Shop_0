const { createProduct, upload, getProduct, deleteProduct, getAllProducts, getSpecificproduct, updateProduct ,  } = require("../controllers/ProductController");

const express = require('express');
const { isSeller } = require("../controllers/ShopController");
const router = express.Router();

router.post('/create',upload,createProduct);

router.get('/get-all-products-shop/:id',getProduct)

router.get('/get-product/:productId',getSpecificproduct)

router.delete('/delete-shop-product/:id',isSeller,deleteProduct)

router.get('/get-all-products',getAllProducts);

router.put('/update/:productId',updateProduct)

router.delete('/delete/:id',deleteProduct)

module.exports = router