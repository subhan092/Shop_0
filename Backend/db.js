const monogose = require('mongoose');


 const dbConnection  = async() => {
  try {
    const connect =  await monogose.connect('mongodb://127.0.0.1:27017/ShopO');
   connect ? console.log("databse connection sucessfull") : "";
  } catch (error) {
    console.log("db connection error " , error);
  }   
  
} 

module.exports = dbConnection;