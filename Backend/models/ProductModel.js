const mongoose = require("mongoose");
const { type } = require("../validation/User/UserValidate");
const { required, ref } = require("joi");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your product name!"],
  },
  description: {
    type: String,
    required: [true, "Please enter your product description!"],
  },
  category: {
    type: String,
    required: [true, "Please enter your product category!"],
  },
  tags: {
    type: String,
  },
  originalPrice: {
    type: Number,
  },
  discountPrice: {
    type: Number,
    required: [true, "Please enter your product price!"],
  },
  stock: {
    type: Number,
    // required: [true, "Please enter your product stock!"],
  },
  images: [
    {
      type: String,
      required: true
    },
  ],
  ratings: {
    type: Number,
  },
  shopId: {
    type: String,
    required: true,
  },
  shop: {
    type: Object,
    // required: true,
  },
  sold_out: {
    type: Number,
    default: 0,
  },
  stock:{
    type: Number,
    // required: true
  }

})

const  productModel = mongoose.model('Product',productSchema);

module.exports = productModel