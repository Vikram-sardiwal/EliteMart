const express = require("express");
const router = express.Router();
const {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
  clearWishlist,
} = require("../controllers/wishlistController");
const { authMiddleware } = require("../middleware/authMiddleware");
router.get("/", authMiddleware, getWishlist);
router.post("/", authMiddleware, addToWishlist);
router.delete("/:productId", authMiddleware, removeFromWishlist);
router.delete("/", authMiddleware, clearWishlist);
module.exports = router;
