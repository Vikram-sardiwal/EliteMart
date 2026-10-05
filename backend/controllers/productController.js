const Product = require("../models/Product");
const createproduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      gender,
      stock,
      brand,
      rating,
      numberOfReviews,
      isActive,
    } = req.body;
    const product = await Product.create({
      name,
      description,
      price,
      category,
      gender,
      image: req.file ? req.file.filename : "",
      stock,
      brand,
      rating,
      numberOfReviews,
      isActive,
    });
    res.status(201).json({
      success: true,
      message: "Product created Successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Product creation failed",
      error: error.message,
    });
  }
};

//GET ALL PRODUCTS

const getallproducts = async (req, res) => {
  try {
    const { gender, category } = req.query;

    const filter = {};

    if (gender) {
      filter.gender = gender;
    }

    if (category) {
      filter.category = category;
    }

    const products = await Product.find(filter);
    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};

//GET  SINGAL PRODUCTS

const getproductByid = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "product not found",
      });
    }
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch product",
      error: error.message,
    });
  }
};

//UPDATE PRODUCT
const updateProduct = async (req, res) => {
  try {
    const updateData = {
      ...req.body,
    };

    if (req.body.isActive !== undefined) {
      updateData.isActive = req.body.isActive === "true";
    }

    if (req.body.price !== undefined) {
      updateData.price = Number(req.body.price);
    }

    if (req.body.stock !== undefined) {
      updateData.stock = Number(req.body.stock);
    }

    if (req.body.rating !== undefined) {
      updateData.rating = Number(req.body.rating);
    }

    if (req.body.numberOfReviews !== undefined) {
      updateData.numberOfReviews = Number(req.body.numberOfReviews);
    }

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updateData, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Product update failed",
      error: error.message,
    });
  }
};

//DELETE PRODUCT

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Product deletion failed",
      error: error.message,
    });
  }
};

module.exports = {
  createproduct,
  getallproducts,
  getproductByid,
  updateProduct,
  deleteProduct,
};
