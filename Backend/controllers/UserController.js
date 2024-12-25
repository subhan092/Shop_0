const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken"); // Corrected here
const bcrypt = require("bcrypt");
const UserValidate = require("../validation/User/UserValidate");
const sendMail = require("../utils/sendMail");
const multer = require("multer");
const path = require("path");
const sendToken = require("../utils/sendToken");
const {createActivationToken , createToken} = require("../utils/createToken");
// const multer = require("multer");
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');


async function hashPass(password) {
  const res = await bcrypt.hash(password, 10);
  return res;
}

async function compare(password, hashPass) {
  const res = await bcrypt.compare(password, hashPass);
  return res;
}
//          SECRET_KEY 

const SECRET_KEY = "Subhan Ali";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,'public/images'); // Use absolute path
    },
    filename: function (req, file, cb) {
      const name = Date.now() + "-" + path.extname(file.originalname);
      cb(null, name);
    },
  });
  
  const upload = multer({
    storage: storage,
    // limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
  }).single('avatar');

  console.log("upload from controloler",upload)
  

  const insertUser = async (req, resp) => {
    try {
      if (!req.body.name || !req.body.email || !req.body.password) {
        return resp
          .status(400)
          .json({ message: "Name, email, and password are required" });
      }
  
      if (!req.file) {
        return resp
          .status(400)
          .json({ message: "Avatar is required and must be an image file." });
      }
  
      const User = await UserModel.findOne({ email: req.body.email });
  
      if (User) {
        return resp.status(401).json({ message: "User already exists" });
      }
  
      const hashedPassword = await hashPass(req.body.password);
  
      const { error, value } = UserValidate.validate(req.body);
  
      if (error) {
        console.log(error);
        return resp.status(500).json({ message: error.details[0].message });
      }
      console.log(value);
  
      const user = new UserModel({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone, 
        address: req.body.address, 
        password: hashedPassword,
        avatar: req.file.filename

          //Save the file path in the database
      });
      // console.log("avatar")
      const userAdded = await user.save();
           console.log("User added",userAdded);
        
          
        // resp.status(201).json({ message: "User inserted successfully" });    
        //                                                 send email
               
        const activationToken = createActivationToken(user);
            console.log("active token",activationToken);
      const activateUrl = `http://localhost:5173/activation/${activationToken}`;
      try {
         sendMail({
          to: user.email,
          text: `Hello ${user.name}, please click on the link ${activateUrl} to activate your account`,
        });

    
  
  
        resp.status(201).json({
          message: `${user.name} please check your mail to activate your account`,
        });
       
      } catch (error) {
        console.log("Error sending activation email", error);
      }
    
    } catch (error) {
      console.log("Error in insertUser", error);
     resp.status(500).json({ message: "Error inserting user" });
    }
  };

 

const loginUser = async (req, resp) => {
    try {
      const user = await UserModel.findOne({ email: req.body.email });
  
      if (!user) {
        return resp.status(500).json({ message: "User does not exist" });
      }
  
      const isPasswordMatch = await compare(req.body.password, user.password);

      if (!isPasswordMatch) {
        return resp.status(500).json({ message: "Password does not match" });
      }
      console.log('Before sendToken');
         const token = createToken(user);
      // sendToken(user, 201, resp);
        resp.status(201).cookie("token",token).json({
          user,
          token
        })
      // console.log("send token is",sendToken(user, 201, resp));
    } 
     catch (error) {
      console.log("Error in loginUser", error);
    return  resp.status(500).json({ message: "Error logging in" });
    }
  };

const Activation = async (req, resp) => {
  try {
    const  {activationToken}  = req.body;
    // Verify the token and extract the payload
    const newUser = jwt.verify(activationToken, process.env.ACTIVATION_SECRET);
  
    if (!newUser) {
      return resp.status(500).json({ message: "Invalid user token" });
    }
    if(newUser){
      return resp.status(201).json({ message: "user account activated sucessfully"});
    }

    // Check if the user already exists
    let user = await UserModel.findOne({ email: newUser.email });

    if (user) {
      return resp.status(200).json({ message: "User already exists" });
    }

    // Create a new user in the database
    user = await UserModel.create({
      name: newUser.name,
      email: newUser.email,
      avatar: newUser.avatar,
      password: newUser.password,
    });


  console.log('Before sendToken');
  const token = createToken(user);
// sendToken(user, 201, resp);

return resp.status(201).cookie("token",token).json({
   user,
   token,
   role: user.role,
 })
  } catch (error) {
    return resp.status(500).json({ message: `Error in user activation token: ${error.message}` });
  }
};


  const Authenticated = async (req, resp, next) => {
    try {
      const { token } = req.cookies;
      console.log("user authToken", token);
  
      // Check if token is provided
      if (!token) {
        return resp.status(401).json({ message: "Please login to continue." });
      }
  
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  
      // If the token is invalid
      if (!decoded) {
        return resp.status(401).json({ message: "Invalid user token." });
      }
  
      // Attach user to request object and proceed
      req.user = await UserModel.findOne({ email: decoded.email });
  
      if (!req.user) {
        return resp.status(404).json({ message: "User not found." });
      }
  
      console.log("decoded", decoded);
      console.log("req user", req.user);
  
      // Proceed to the next middleware or route handler
      next();
  
    } catch (error) {
      console.error("Authentication error:", error);
      return resp.status(500).json({ message: "Internal Server Error." });
    }
  };
  

  const loadUser = async (req, resp) => {
    try {
      const user = await UserModel.findOne({ email: req.user.email });
      console.log("user is ", user);
  
      if (!user) {
        // User not found, send an error response
        return resp.status(500).json({ message: "User does not exist" });
      }
  
      // User found, send the user data
      return resp.status(201).json({ user });
  
    } catch (error) {
      // Handle any errors that occur during the process
      return resp.status(500).json({ message: `Failed to load user: ${error.message}` });
    }
  };

  const logOut = async (req, res) => {
    try {
      const { token } = req.cookies;
      
      if (token) {
        // Clear the token cookie
        res.cookie("token", null, {
          expires: new Date(Date.now()),
        });      
        // Send success response
        return res.status(200).json({
          message: "User logged out successfully",
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
  
  const updateUser = async (req, resp) => {
    try {
      const { name, email, phoneNumber, password, zipcode, address } = req.body;
      
      // Await the user lookup
      const user = await UserModel.findOne({ email: req.user.email });
      
      if (!user) {
        return resp.status(400).json({
          message: 'User does not exist',
        });
      }
      const hashedPassword =await hashPass(password);;
      // Update the user fields
      user.name = name;
      user.email = email;
      user.phoneNumber = phoneNumber;
      user.zipcode = zipcode;
      user.password = hashedPassword
      user.address = address;
  
      // Save the updated user
      const updated = await user.save();
  
      if (updated) {
        return resp.status(201).json({
          message: 'User updated successfully',
        });
      }
  
    } catch (error) {
      console.log("Error in updating user", error);
      return resp.status(500).json({
        message: 'Internal server error',
      });
    }
  };

  
  const Checkouthandle = async (req, resp) => {
    const { products } = req.body;
  
    const lineItems = products.map((product) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: product.name,
          images: [product.images[0]]
        },
        unit_amount: product.discountPrice * 100, // Amount in smallest currency unit (e.g., paise)
      },
      quantity: product.qty
    }));
  
    try {
      // Creating a checkout session with Stripe
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: 'http://localhost:5173/success-payment',
        cancel_url: 'http://localhost:5173/cancel-payment',
      });
      resp.json({ url: session.url , products: products });
    } catch (error) {
      console.error('Error creating Stripe checkout session:', error);
      resp.status(500).json({ error: 'An error occurred while creating the checkout session.' });
    }
  };
  
  
module.exports = {
  insertUser,
  loginUser,
  Authenticated,
  loadUser,
  Activation,
  upload,
  logOut,
  updateUser,
  Checkouthandle,


};

