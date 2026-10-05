const bcrypt = require("bcrypt");
const User = require("../models/User"); 
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

// ================= REGISTER =================
const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

  
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log("Register Error:", error.message);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// ================= LOGIN =================
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

  
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Wrong password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      SECRET_KEY,
      {
        expiresIn: "1h",
      },
    );

    res.cookie("token1", token, {
      httpOnly: true,
      secure: false,

      maxAge: 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log("Login Error:", error.message);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  register,
  login,
};
