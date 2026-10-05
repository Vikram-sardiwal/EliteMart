const User = require("../models/User");

const adminMiddleware = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found."
      });
    }

    if (user.role !== "admin") {
      return res.status(403).json({
        message: "Only admin allowed."
      });
    }

    next();

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server error"
    });
  }
};

module.exports = { adminMiddleware };