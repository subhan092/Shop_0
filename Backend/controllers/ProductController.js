const multer = require('multer')
const productModel = require('../models/ProductModel');
const ShopModel = require('../models/ShopModel');
const path = require('path');
const { message } = require('../validation/User/UserValidate');

const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null,'public/product/')
    },
    filename: function (req,file,cb) {
        const name = Date.now() + "-" + path.extname(file.originalname);
        cb(null,name)
    }
})

const upload = multer({
    storage: storage
}).array('images')

const createProduct = async (req, resp) => {
    try {
        const shopId = req.body.shopId;
        const shop = await ShopModel.findById(shopId);
        
        // Handle case where shop is not found
        if (!shop) {
            return resp.status(400).json({ message: "Invalid shop." });
        }

        const files = req.files;
         console.log("ulpaded files is",files);
        // Handle case where no files are uploaded
        if (!files || files.length === 0) {
            return resp.status(400).json({ message: "No files uploaded." });
        }

        // Map the filenames correctly
        const imageUrl = files.map((file) => `${file.filename}`);
  console.log("imgurl",imageUrl)
        // Create product data object
        const productData = req.body;
        productData.images = imageUrl;
        productData.shop = shop; // Store only shop ID

        // Create the product in the database
        const product = await productModel.create(productData);
        console.log("product is", product)

        // Return success response
        return resp.status(201).json({
            success: true,
            message: "Product created successfully",
            product,
        });
    } catch (error) {
        console.log("Error in product creation:", error);
        return resp.status(500).json({ message: "Internal server error." });
    }
};


const getProduct = async (req, resp) => {
    try {
        const products = await productModel.find({ shopId: req.params.id });

        if (products.length === 0) {
            return resp.status(400).json({ message: "No products found in this shop" });
        }

        resp.status(200).json({
            products
        });
    } catch (error) {
        resp.status(500).json({ message: "Internal server error" });
        console.log("Error in getProduct of shop:", error);
    }
}
const getSpecificproduct = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ product });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        console.log("Error in getSpecificProduct:", error);
    }
};



const deleteProduct = async (req,resp)=>{
  const product = await productModel.findByIdAndDelete({_id:req.params.id});
  if(!product){
    return resp.status(400).json({ message: "No product found in this id " });
  }
  resp.status(200).json({
    message:'product deleted sucessfully'
  })
}

const updateProduct = async(req,resp)=>{
       try {
        const updPrdt = await productModel.findByIdAndUpdate(req.params.productId, req.body)
        console.log("req update productId",req.params.productId)
       if(!updPrdt){
        return resp.status(400).json({ message: " Error! No Update product" });
    } 
      return resp.json({updPrdt, message:"product updated sucessfully"})
       } catch (error) {
        resp.status(500).json({ message: "Internal server error" });
        console.log("Error in update product:", error);
       }
}
 const getAllProducts  = async(req,resp)=>{
    const products = await productModel.find();
    if(!products){
      return resp.status(400).json({ message: "No All products found " });
    }
    resp.status(201).json({
      products
    })
 }


module.exports = {
    createProduct,
    upload,
    getProduct,
    deleteProduct,
    getAllProducts,
    getSpecificproduct,
    updateProduct
}