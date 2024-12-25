const createActivationToken = require("./createToken");

// create token and saving that in cookies
  
const sendToken = (user, statusCode, resp) => {
    const token = createActivationToken(user);
    // console.log( 'token is',token);

    console.log('sendToken function is being called');
   
    // Options for cookies
    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      // httpOnly: true,
      secure: false,  // Set this to false if you're testing without HTTPS
      sameSite: "none",
    };
    console.log('Sending token to the user...');
    console.log('Cookie options:', options);
    resp.status(statusCode).cookie("token", token, options).json({
      success: true,
      user,
      token,
    });
  };
  
  module.exports = sendToken;
 