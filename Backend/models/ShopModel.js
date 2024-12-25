
const mongoose =require('mongoose');

const shopSchema = new mongoose.Schema({
      name :{
        type : String,
        required :true
      },
      email:{
        type : String,
        required :true
      },
      phone:{
        type : Number,
        required :true
      },
      address:{
        type : String,
        required :true
      },
      password:{
        type : String,  
        required :true
      },
      avatar:{
        type : String,
        // default: null
     },
     role:{
       type: String,
       default: 'seller'
     },
     status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected","Active"],
      default: "Pending", // Default status "Pending"
    },
})

const  ShopModel = mongoose.model('Shop',shopSchema)

module.exports = ShopModel;