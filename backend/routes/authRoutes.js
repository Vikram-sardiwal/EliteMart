const express = require("express");

const { register, login } = require("../controllers/authController.js");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.post("/logout", (req, res) => {
  res.clearCookie("token1");
  res.json({
    success: true,
    message: "Logout successful",
  });
});
module.exports = router;
