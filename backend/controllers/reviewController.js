const Review = require("../models/Review");
const Product = require("../models/Product");

const createReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const user = req.user.id;
    const product = req.params.productId;

    const existingReview = await Review.findOne({
      user: req.user.id,
      product: req.params.productId,
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You already reviewed this product",
      });
    }

    const newReview = new Review({
      user,
      product,
      rating,
      comment,
    });

    await newReview.save();

    const reviews = await Review.find({
      product: req.params.productId,
    });

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);

    const averageRating = Number((totalRating / reviews.length).toFixed(2));

    await Product.findByIdAndUpdate(product, {
      rating: averageRating,
      numberOfReviews: reviews.length,
    });

    res.status(201).json({
      success: true,
      message: "Review created successfully",
      review: newReview,
    });
  } catch (error) {
    console.log(error.message);

    res.status(500).json({
      success: false,
      message: "Review create failed",
      error: error.message,
    });
  }
};

const getProductReviews = async (req, res) => {
  try {
    const product = req.params.productId;

    const reviews = await Review.find({
      product: product,
    }).populate("user", "name");

    res.status(200).json({
      success: true,
      reviews: reviews,
    });
  } catch (error) {
    console.log(error.message);

    res.status(500).json({
      success: false,
      message: "Reviews fetch failed",
    });
  }
};

const deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.reviewId;
    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    if (review.user.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can delete only your own review",
      });
    }

    const productId = review.product;

    await Review.deleteOne({
      _id: reviewId,
    });

    const reviews = await Review.find({
      product: productId,
    });

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);

    const averageRating =
      reviews.length === 0 ? 0 : totalRating / reviews.length;

    await Product.findByIdAndUpdate(productId, {
      rating: averageRating,
      numberOfReviews: reviews.length,
    });

    return res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    console.log(error.message);

    return res.status(500).json({
      success: false,
      message: "Review delete failed",
      error: error.message,
    });
  }
};

module.exports = {
  createReview,
  getProductReviews,
  deleteReview,
};
