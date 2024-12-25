const adminMiddleware = (req, resp, next) => {
    const {token} = req.cookies
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      if (decoded.role !== "admin") {
        return resp.status(403).json({ message: "Access denied. Admins only." });
      }
      req.user = decoded; // Store decoded token in request
      next(); // Continue if admin
    } catch (error) {
      console.log("Error in admin middleware", error);
      return resp.status(401).json({ message: "Invalid token or not authorized" });
    }
  };
  
  module.exports = adminMiddleware