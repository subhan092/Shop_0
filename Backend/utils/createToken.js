
const jwt = require('jsonwebtoken');

const   createActivationToken = (user) => {
    const payload = {
      name: user.name,
      email: user.email,
      password: user.password,
      avatar: user.avatar,
    };
  
    return jwt.sign(payload, process.env.ACTIVATION_SECRET, {
      expiresIn: "5d",
    });
  };

  const   createToken = (user) => {
    const payload = {
      name: user.name,
      email: user.email,
      password: user.password,
      avatar: user.avatar,
      role:  user.role,
    };
  
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "5d",
    });
  };

  const   createActivationSellerToken = (seller) => {
    const payload = {
      name: seller.name,
      email: seller.email,
      phone: seller.phone,
     address: seller.address,
      password: seller.password,
      avatar: seller.avatar,
    };
  
    return jwt.sign(payload, process.env.ACTIVATION_SECRET, {
      expiresIn: "5d",
    });
  };

  const   createSellerToken = (seller) => {
    const payload = {
      name: seller.name,
      email: seller.email,
      phone: seller.phone,
     address: seller.address,
      password: seller.password,
      avatar: seller.avatar,
      status:seller.status,
    };
  
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "5d",
    });
  };

module.exports ={ createActivationToken , createToken , createActivationSellerToken , createSellerToken};