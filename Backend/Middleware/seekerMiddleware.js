import jwt from "jsonwebtoken";
import UserModel from "../Model/userModel.js"; 

const seekerAuth = async (req, res, next) => {
  try {
    // Get token from cookies
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Login Again" });
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.id) {
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized. Login Again." });
    }

    // Attach user object to request
    req.user = await UserModel.findById(decoded.id).select("-password");

    if (!req.user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found. Login Again." });
    }

    next();
  } catch (error) {
    console.error(error);
    return res
      .status(401)
      .json({ success: false, message: "Invalid token. Login Again." });
  }
};

export default seekerAuth;
