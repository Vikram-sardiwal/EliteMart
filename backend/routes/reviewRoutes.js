const express = require("express");
const router = express.Router();

const { createReview, getProductReviews,deleteReview } = require("../controllers/reviewController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.get("/:productId",getProductReviews);
router.post("/:productId", authMiddleware, createReview);
router.delete("/:reviewId", authMiddleware, deleteReview);


module.exports = router;