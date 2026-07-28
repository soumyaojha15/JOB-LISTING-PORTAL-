import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../Model/userModel.js";
import transporter from "../config/nodemailer.js";

export const register = async (req, res) => {
  const { name, email, password,role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({success: false, message: "All fields are required" });
  }

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      username: name,
      email,
      password: hashedPassword,
      userType: role,
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // SENDING WELCOME EMAIL TO THE USER AFTER REGISTRATION USING NODEMAILER
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome to Job Portal",
      text: `Hello ${newUser.username},\n\nWelcome to Job Portal! We're excited to have you on board.\n\nBest regards,\nJob Portal Team`,
    };

    // Send email, but don't block registration if it fails
    try {
      const info = await transporter.sendMail(mailOptions);
     
    } catch (emailError) {
      console.error(`Failed to send welcome email to`, emailError);
    }  

    return res.status(201).json({ success:true, message: "User registered successfully" });
      
      
      
  } catch (error) {
    console.error("register error",error);
    return res.status(500).json({success: false, message: "Server error" });
  }
};



export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({success: false, message: "All fields are required" });
  } try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({success: false, message: "User Not Found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({success: false, message: "Invalid password" });
    }


     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({success:true, message: "Login successful" });
      

  } catch (error) {
    return res.status(500).json({success: false, message: "Server error" });
  }
};



export const logout = async (req, res) => { 
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
    return res.status(200).json({success:true, message: "Logout successful" });
  } catch (error) {
    return res.status(500).json({success: false, message: "Server error" });
  }
}



export const isAuthenticated = async (req, res) => {
  try {
     return res.status(200).json({success:true, message: "User Authenticated" });

  } catch (error) {
      console.error(error);
    return res.status(500).json({ message: "Server error" });
    
  }
}