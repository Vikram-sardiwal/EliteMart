const Wishlist = require("../models/Wishlist");
const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id;
    const wishlist = await Wishlist.findOne({
      user: userId,
    });
    if (!wishlist) {
      const newWishlist = await Wishlist.create({
        user: userId,
        products: [productId],
      });
      return res.status(201).json({
        success: true,
        message: "Product added to wishlist",
        wishlist: newWishlist,
      });
    }
    const alreadyExists = wishlist.products.some(
      (id) => id.toString() === productId,
    );
    if (alreadyExists) {
      return res.status(400).json({
        success: false,
        message: "Product already in wishlist",
      });
    }

    wishlist.products.push(productId);
    await wishlist.save();
    return res.status(200).json({
      success: true,
      message: "Product added to wishlist",
      wishlist,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const getWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const wishlist = await Wishlist.findOne({ user: userId }).populate(
      "products",
    );

    if (!wishlist) {
      return res.status(200).json({
        success: true,
        wishlist: {
          products: [],
        },
      });
    }
    return res.status(200).json({
      success: true,
      wishlist,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    const wishlist = await Wishlist.findOne({
      user: userId,
    });

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: "Wishlist not found",
      });
    }

    wishlist.products = wishlist.products.filter(
      (id) => id.toString() !== productId,
    );

    await wishlist.save();

    return res.status(200).json({
      success: true,
      message: "Product removed from wishlist",
      wishlist,
    });
  } catch (error) {
    console.log(error.message);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const clearWishlist = async (req, res) => {
  try {
    const userId = req.user.id;

    const wishlist = await Wishlist.findOne({
      user: userId,
    });

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: "Wishlist not found",
      });
    }

    wishlist.products = [];

    await wishlist.save();

    return res.status(200).json({
      success: true,
      message: "Wishlist cleared",
      wishlist,
    });
  } catch (error) {
    console.log(error.message);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
module.exports = {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
  clearWishlist,
};
