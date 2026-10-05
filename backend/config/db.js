const mongoose = require("mongoose");

const connectDB = async () => {
  console.log("Connecting MongoDB...");
  console.log("Mongo URL:", process.env.MONGO_URL);

  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log("MongoDB Connected");
  } catch (error) {
    console.log("MongoDB Error:", error.message);
    throw error;
  }
};

module.exports = connectDB;
