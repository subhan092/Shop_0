const multer = require("multer");
const ShopModel = require("../models/ShopModel");
const {  createActivationSellerToken, createSellerToken } = require("../utils/createToken");
const sendMail = require("../utils/sendMail");
const path = require("path");
// const { message } = require("../validation/User/UserValidate");
const bcrypt = require("bcrypt");
const { message } = require("../validation/User/UserValidate");
const jwt = require('jsonwebtoken');
const hashPass=async(password)=>{
   const hashedPassword =await bcrypt.hash(password,10);
   return hashedPassword
}
const comapre = async(password,hashedPassword)=>{
   const res= await bcrypt.compare(password,hashedPassword);
   return res;
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/shop"); // Use absolute path
    },
    filename: function (req, file, cb) {
      const name = Date.now()+path.extname(file.originalname);
      cb(null, name);
    },
  });

  const upload = multer({
    storage: storage,
    // limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
  }).single("avatar");

  console.log("upload from controloler", upload);

const registor = async (req, res) => {
  try {
    
  if (!req.file) {
    return res
      .status(400)
      .json({ message: "Avatar is required and must be an image file." });
  }

  const seller = await ShopModel.findOne({ email: req.body.email });

  if (seller) {
    return res.status(401).json({ message: "seller already exists" });
  }
  const hashedPassword = await hashPass(req.body.password);


  const shop = new ShopModel({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    password: hashedPassword,
    avatar: req.file.filename,
    status: "Pending",
  });

  const shopAdd = await shop.save();

  console.log("shop in backend",shop)

 if(shopAdd){
  res.status(201).json({ message: "Seller registered successfully. Awaiting approval." });

 }

  const activationToken = createActivationSellerToken(shop);
  console.log("shop active token", activationToken);
  const activateUrl = `http://localhost:5173/seller/activation/${activationToken}`;
  try {
    sendMail({
      to: shop.email,
      text: `Hello ${shop.name}, please click on the link ${activateUrl} to activate your Shop`,
    });

    res.status(201).json({
      message: `${shop.name} please check your mail to activate your Shop`,
    });
  } catch (error) {
    console.log("Error sending activation email", error);
  }

  } catch (error) {
    console.log("error in create shop ", error);
    return res.status(500).json({
        message:"internel server in shop registor"
    })
  }
};

const activation = async (req, res) => {
      try {
        const { activationToken } = req.body;
        console.log("shop avt token", activationToken);

        const newSeller = jwt.verify(
            activationToken,
          process.env.ACTIVATION_SECRET
        );
  
        if (!newSeller) {
          return res.status(500).json({message:"Invalid token"});
        }
        if(newSeller){
          return res.status(201).json({ message: "Shop activated sucessfully"});
        }
        const { name, email, password, avatar, address, phone } =
          newSeller;
  
        let seller = await ShopModel.findOne({ email });
  
        if (seller) {
          return res.status(500).json({message:"shop already exists"});
        }
  
        seller = await Shop.create({
          name,
          email,
          phone,
          address,
          password,
          avatar,
        });
         
        console.log('Before sendToken');
         const token = createSellerToken(seller);
       return  res.status(201).cookie("seller_token",token).json({
            seller,
            token
          })
      } catch (error) {
        return res.status(500).json({ message: `Error in shop activation token: ${error.message}` });
    }
}

const login = async (req, res) => {
  try {
    const seller = await ShopModel.findOne({ email: req.body.email });

    if (!seller) {
      return res.status(500).json({ message: "shop does not exist" });
    }

    const isPasswordMatch = await comapre (req.body.password, seller.password);

    if (!isPasswordMatch) {
      return res.status(500).json({ message: "Password does not match" });
    }
    console.log('Before sendToken');
       const token = createSellerToken(seller);
       console.log("shop token is", token)
    // sendToken(user, 201, res);
     return  res.status(201).cookie("seller_token",token).json({
        seller,
        token
      })
    // console.log("send token is",sendToken(user, 201, res));
  } 
   catch (error) {
    console.log("Error in login shop", error);
  return  res.status(500).json({ message: "Error logging shop" });
  }
};

const isSeller = async (req, res, next) => {
  try {
    const { seller_token } = req.cookies;
    console.log("seller authToken", seller_token);

    // Check if token is provided
    if (!seller_token) {
      return res.status(401).json({ message: "Please login to continue." });
    }

    // Verify the token
    const decoded = jwt.verify(seller_token, process.env.JWT_SECRET_KEY);
    console.log("decoded seller", decoded);
    // If the token is invalid
    if (!decoded) {
      return res.status(401).json({ message: "Invalid shop token." });
    }
  

    // Attach seller to request object and proceed
    req.seller = await ShopModel.findOne({ email: decoded.email });

    if (!req.seller) {
      return res.status(404).json({ message: "Shop not found." });
    }

   
    console.log("req seller", req.seller);

    // Proceed to the next middleware or route handler
    next();

  } catch (error) {
    console.error("Authentication shop error:", error);
    return res.status(404).json({ message: "Internal server error." });
  }
};

const loadSeller = async(req,res)=>{
  try {
    const seller = await ShopModel.findById(req.seller._id);
    console.log("seller found",seller);

    if (!seller) {
      return res.status(404).json({ message: "Shop does not exist." });
    }

    res.status(200).json({
      success: true,
      seller,
    });
  } catch (error) {
    console.log("erorr in loadseller", error)
    return res.status(500).json({ message: "Internel server error." });
  }
}

const logOut = async (req, res) => {
  try {
    const { seller_token } = req.cookies;
    
    if (seller_token) {
      // Clear the token cookie
      res.cookie("seller_token", null, {
        expires: new Date(Date.now()),
      });      
      // Send success resonse
      return res.status(200).json({
        message: "Seller logged out successfully",
      });
    } else {
      return res.status(400).json({
        message: "No token found, user was not logged in",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: `Error in logging out user: ${error.message}`,
    });
  }
};


const getShop = async(req,res)=>{
     try {
      const shop = await ShopModel.findOne({_id:req.params.id});
     if(!shop){
      return res.status(400).json({message:"shop no found"})
     }
     res.status(201).json({
      shop
     })
     } catch (error) {
      console.log("eror in get shop info ",error)
     }
}

const getAllSeller = async (req, res) => {
  try {
    const sellers = await ShopModel.find();  // Database se saare sellers fetch karein
    console.log("seller found", sellers);

    if (!sellers) {  // Agar sellers nahi milte
      return res.status(404).json({ message: "sellers not found." });
    }

    res.status(200).json({
      success: true,
      sellers,  // Saare sellers ko frontend ke liye send karein
    });
  } catch (error) {
    console.log("error in loadseller", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const updateSellerStatus = async (req, res) => {
  try {
    const sellerId = req.params.id;
    const newStatus = req.body.status;

    const seller = await ShopModel.findById(sellerId);
    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    seller.status = newStatus; // Update seller status
    await seller.save();

    res.status(200).json({ message: "Shop status updated successfully" });
  } catch (error) {
    console.log("Error in updating seller status", error);
    res.status(500).json({ message: "Internal server error." });
  }
};




module.exports = {
  registor,
  upload,
  activation,
  login,
  isSeller,
  loadSeller,
  logOut,
  getShop,
  getAllSeller,
  updateSellerStatus,
};
