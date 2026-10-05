const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

//ADMIN LOGIN
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
     return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    //find user

    const admin = await User.findOne({ email });
    if (!admin) {
      return res.status(400).json({
        success: false,
        message: "Admin not found",
      });
    }

    //check admin role

    if (admin.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only admin can login here",
      });
    }

    //check password

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Admin login failed",
      error: error.message,
    });
  }
};
module.exports = {
  adminLogin,
};