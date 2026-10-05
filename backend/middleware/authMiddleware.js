
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies?.token1;

    if (!token) {
      return res.status(401).json({
        message: "Token missing. Please login first.",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.SECRET_KEY
    );
console.log("Decoded Token:", decoded);
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized Access",
    });
  }
};

module.exports = { authMiddleware };