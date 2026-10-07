const Order = require("../models/Orders");
const Cart = require("../models/Cart");
const razorpay = require("../config/razorpay");
const crypto = require("crypto");

const verifyRazorpayPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      shippingAddress,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    const cart = await Cart.findOne({
      user: req.user.id,
    }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    const items = cart.items.map((item) => ({
      product: item.product._id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      image: item.product.image,
    }));

    const totalAmount = cart.items.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);

    const order = await Order.create({
      user: req.user.id,
      items,
      shippingAddress,
      totalAmount,
      paymentMethod: "razorpay",
      paymentStatus: "paid",
      orderStatus: "paid",
    });

    await Cart.findOneAndUpdate({ user: req.user.id }, { $set: { items: [] } });

    res.status(200).json({
      success: true,
      message: "Payment verified and order created",
      order,
    });
  } catch (error) {
    console.log("PAYMENT VERIFY ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createRazorpayOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt__" + Date.now(),
    };

    console.log("Razorpay options:", options);

    const order = await razorpay.orders.create(options);

    console.log("Razorpay order:", order);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log("RAZORPAY CREATE ORDER ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createOrder = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;

    // Only COD is allowed through this API
    if (paymentMethod !== "cod") {
      return res.status(400).json({
        success: false,
        message: "Invalid payment method",
      });
    }

    const cart = await Cart.findOne({
      user: req.user.id,
    }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    const items = cart.items.map((item) => ({
      product: item.product._id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      image: item.product.image,
    }));

    const totalAmount = cart.items.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);

    const order = await Order.create({
      user: req.user.id,
      items,
      shippingAddress,
      totalAmount,
      paymentMethod: "cod",
      paymentStatus: "pending",
      orderStatus: "placed",
    });

    await Cart.findOneAndUpdate({ user: req.user.id }, { $set: { items: [] } });

    res.status(201).json({
      success: true,
      message: "COD order placed successfully",
      order,
    });
  } catch (error) {
    console.log("COD ORDER ERROR:", error);

    res.status(500).json({
      success: false,
      message: "COD order creation failed",
      error: error.message,
    });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.log(error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch order",
      error: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
  createRazorpayOrder,
  verifyRazorpayPayment,
};
