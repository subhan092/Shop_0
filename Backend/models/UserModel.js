
const mongoose =require('mongoose');
const { type } = require('../validation/User/UserValidate');
const { required } = require('joi');

const userSchema = new mongoose.Schema({
      name :{
        type : String,
        required :true
      },
      email:{
        type : String,
        required :true
      },
      phone:{
        type: Number,
        required : true
      },
      password:{
        type : String,  
        required :true
      },
      address:{
        type : String,  
        required :true
      },
      zipcode:{
        type : String,  
      },
      avatar:{
        type : String,
        // default: null
     },
     role:{
       type: String,
       enum: ['user','admin'],
       default: 'user'
     }
})

userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id}, process.env.JWT_SECRET_KEY,{
    expiresIn: process.env.JWT_EXPIRES,
  });
};
const  UserModel = mongoose.model('User',userSchema)

module.exports = UserModel;