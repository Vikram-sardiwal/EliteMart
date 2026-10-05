const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db.js");
const authRoutes = require("./routes/authRoutes.js");
const productRoutes = require("./routes/productRoutes.js");

dotenv.config();

const app = express();

// Middlewares
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
//admin routes
const adminRoutes = require("./routes/adminRoutes");
app.use("/admin", adminRoutes);

const cartRoutes = require("./routes/cartRoutes");
app.use("/cart", cartRoutes);

const orderRoutes = require("./routes/orderRoutes");
app.use("/orders", orderRoutes);

const reviewRoutes = require("./routes/reviewRoutes.js");
app.use("/review", reviewRoutes);

const wishlistRoutes = require("./routes/wishlistRoutes");

app.use("/wishlist", wishlistRoutes);

const path = require("path");

app.use("/uploads", express.static("uploads"));

const chatbotRoutes = require("./routes/chatbotRoutes");

app.use("/api/chatbot", chatbotRoutes);

// Start server after MongoDB connection
const startServer = async () => {
  try {
    await connectDB();

    app.listen(process.env.PORT, () => {
      console.log(`Server Started on ${process.env.PORT}`);
    });
  } catch (error) {
    console.log("Server Error:", error.message);
  }
};

startServer();
