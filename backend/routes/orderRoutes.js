const express = require("express");
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getOrderById,
  createRazorpayOrder,
  verifyRazorpayPayment,
} = require("../controllers/orderController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createOrder);
router.get("/my-orders", authMiddleware, getMyOrders);
router.get("/:id", authMiddleware, getOrderById);
router.post("/razorpay/create-order", authMiddleware, createRazorpayOrder);
router.post("/razorpay/verify",authMiddleware,verifyRazorpayPayment);
module.exports = router;
