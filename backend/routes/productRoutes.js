const express = require("express");

const { authMiddleware } = require("../middleware/authMiddleware");

const {
  createproduct,
  getallproducts,
  getproductByid,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const upload = require("../middleware/upload");

const { adminMiddleware } = require("../middleware/adminMiddleware");

const router = express.Router();

router.get("/", getallproducts);

router.get("/:id", getproductByid);

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  createproduct,
);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  updateProduct,
);

router.delete("/:id", authMiddleware, adminMiddleware, deleteProduct);

module.exports = router;
