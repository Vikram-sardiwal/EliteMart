import { useState } from "react";
import API from "../services/api";

export default function ManageProducts() {
  const [product, SetProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    gender: "",
    image: null,
    stock: "",
    brand: "",
    rating: 0,
    numberOfReviews: 0,
    isActive: true,
  });

  const [errors, setErrors] = useState({});

  // ================= VALIDATION =================
  const validateForm = () => {
    const newErrors = {};

    if (!product.name.trim()) {
      newErrors.name = "Product name is required";
    } else if (product.name.trim().length < 3) {
      newErrors.name = "Product name must be at least 3 characters";
    }

    if (!product.brand.trim()) {
      newErrors.brand = "Brand is required";
    }

    if (!product.category) {
      newErrors.category = "Please select a category";
    }

    if (!product.gender) {
      newErrors.gender = "Please select a gender";
    }

    if (!product.price) {
      newErrors.price = "Price is required";
    } else if (Number(product.price) <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    if (product.stock === "") {
      newErrors.stock = "Stock is required";
    } else if (Number(product.stock) < 0) {
      newErrors.stock = "Stock cannot be negative";
    }

    if (!product.image) {
      newErrors.image = "Product image is required";
    }

    if (!product.description.trim()) {
      newErrors.description = "Description is required";
    } else if (product.description.trim().length < 10) {
      newErrors.description =
        "Description must be at least 10 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ================= SUBMIT =================
  const handlesubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const formData = new FormData();

      formData.append("name", product.name.trim());
      formData.append("description", product.description.trim());
      formData.append("price", product.price);
      formData.append("category", product.category);

    
      formData.append("gender", product.gender);

      formData.append("image", product.image);
      formData.append("stock", product.stock);
      formData.append("brand", product.brand.trim());
      formData.append("rating", product.rating);
      formData.append("numberOfReviews", product.numberOfReviews);
      formData.append("isActive", product.isActive);

      const response = await API.post("/products", formData);

      console.log(response.data);

      alert("Product added successfully!");

      handleClear();
    } catch (error) {
      console.log(error);
      alert("Something went wrong!");
    }
  };

  // ================= CLEAR =================
  const handleClear = () => {
    SetProduct({
      name: "",
      description: "",
      price: "",
      category: "",
      gender: "",
      image: null,
      stock: "",
      brand: "",
      rating: 0,
      numberOfReviews: 0,
      isActive: true,
    });

    setErrors({});
  };

  return (
  <form onSubmit={handlesubmit}>
    <div className="min-h-screen bg-white text-gray-900">

      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <p className="text-xs tracking-[0.2em] text-gray-500 uppercase mb-3">
            EliteMart / Admin
          </p>

          <h1 className="text-3xl md:text-4xl font-medium tracking-tight">
            Add Product
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            Add a new product to your store
          </p>
        </div>
      </div>

      {/* Form Area */}
      <div className="max-w-6xl mx-auto px-6 py-10">

        <div className="border border-gray-200">

          {/* Section Header */}
          <div className="px-6 md:px-8 py-6 border-b border-gray-200">
            <h2 className="text-lg font-medium">
              Product Information
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Enter the details of your product below.
            </p>
          </div>

          {/* Inputs */}
          <div className="p-6 md:p-8">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7">

              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Product Name
                </label>

                <input
                  type="text"
                  placeholder="Enter product name"
                  value={product.name}
                  onChange={(e) => {
                    SetProduct({
                      ...product,
                      name: e.target.value,
                    });

                    setErrors({
                      ...errors,
                      name: "",
                    });
                  }}
                  className={`w-full h-12 px-4 border ${
                    errors.name
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:border-black focus:outline-none transition`}
                />

                {errors.name && (
                  <p className="text-red-500 text-xs mt-2">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Brand */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Brand
                </label>

                <input
                  type="text"
                  placeholder="Enter brand"
                  value={product.brand}
                  onChange={(e) => {
                    SetProduct({
                      ...product,
                      brand: e.target.value,
                    });

                    setErrors({
                      ...errors,
                      brand: "",
                    });
                  }}
                  className={`w-full h-12 px-4 border ${
                    errors.brand
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:border-black focus:outline-none transition`}
                />

                {errors.brand && (
                  <p className="text-red-500 text-xs mt-2">
                    {errors.brand}
                  </p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Category
                </label>

                <select
                  value={product.category}
                  onChange={(e) => {
                    SetProduct({
                      ...product,
                      category: e.target.value,
                    });

                    setErrors({
                      ...errors,
                      category: "",
                    });
                  }}
                  className={`w-full h-12 px-4 border bg-white ${
                    errors.category
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:border-black focus:outline-none transition`}
                >
                  <option value="">Select Category</option>
                  <option value="clothing">Clothing</option>
                  <option value="electronics">Electronics</option>
                  <option value="shoes">Shoes</option>
                  <option value="beauty">Beauty</option>
                  <option value="groceries">Groceries</option>
                  <option value="home">Home & Kitchen</option>
                  <option value="toys">Toys</option>
                  <option value="sports">Sports & Fitness</option>
                  <option value="jewelry">
                    Jewelry & Accessories
                  </option>
                  <option value="books">Books</option>
                </select>

                {errors.category && (
                  <p className="text-red-500 text-xs mt-2">
                    {errors.category}
                  </p>
                )}
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Gender
                </label>

                <select
                  value={product.gender}
                  onChange={(e) => {
                    SetProduct({
                      ...product,
                      gender: e.target.value,
                    });

                    setErrors({
                      ...errors,
                      gender: "",
                    });
                  }}
                  className={`w-full h-12 px-4 border bg-white ${
                    errors.gender
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:border-black focus:outline-none transition`}
                >
                  <option value="">Select Gender</option>
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                  <option value="kids">Kids</option>
                
                  <option value="unisex">Unisex</option>
                </select>

                {errors.gender && (
                  <p className="text-red-500 text-xs mt-2">
                    {errors.gender}
                  </p>
                )}
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Price
                </label>

                <div className="relative">
                  <span className="absolute left-4 top-3.5 text-gray-500">
                    ₹
                  </span>

                  <input
                    type="number"
                    min="1"
                    placeholder="Enter price"
                    value={product.price}
                    onChange={(e) => {
                      SetProduct({
                        ...product,
                        price: e.target.value,
                      });

                      setErrors({
                        ...errors,
                        price: "",
                      });
                    }}
                    className={`w-full h-12 pl-9 pr-4 border ${
                      errors.price
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus:border-black focus:outline-none transition`}
                  />
                </div>

                {errors.price && (
                  <p className="text-red-500 text-xs mt-2">
                    {errors.price}
                  </p>
                )}
              </div>

              {/* Stock */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Stock
                </label>

                <input
                  type="number"
                  min="0"
                  placeholder="Enter stock quantity"
                  value={product.stock}
                  onChange={(e) => {
                    SetProduct({
                      ...product,
                      stock: e.target.value,
                    });

                    setErrors({
                      ...errors,
                      stock: "",
                    });
                  }}
                  className={`w-full h-12 px-4 border ${
                    errors.stock
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:border-black focus:outline-none transition`}
                />

                {errors.stock && (
                  <p className="text-red-500 text-xs mt-2">
                    {errors.stock}
                  </p>
                )}
              </div>

              {/* Image */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">
                  Product Image
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    SetProduct({
                      ...product,
                      image: e.target.files[0],
                    });

                    setErrors({
                      ...errors,
                      image: "",
                    });
                  }}
                  className={`w-full h-12 px-4 py-2 border ${
                    errors.image
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:outline-none`}
                />

                {errors.image && (
                  <p className="text-red-500 text-xs mt-2">
                    {errors.image}
                  </p>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="mt-8">
              <label className="block text-sm font-medium mb-2">
                Description
              </label>

              <textarea
                rows="5"
                placeholder="Enter product description..."
                value={product.description}
                onChange={(e) => {
                  SetProduct({
                    ...product,
                    description: e.target.value,
                  });

                  setErrors({
                    ...errors,
                    description: "",
                  });
                }}
                className={`w-full px-4 py-3 border resize-none ${
                  errors.description
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:border-black focus:outline-none transition`}
              />

              {errors.description && (
                <p className="text-red-500 text-xs mt-2">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Status */}
            <div className="mt-8">
              <label className="block text-sm font-medium mb-3">
                Product Status
              </label>

              <div className="flex flex-col sm:flex-row gap-3">

                {/* Active */}
                <label
                  className={`flex items-center gap-3 px-5 py-3 border cursor-pointer ${
                    product.isActive
                      ? "border-black"
                      : "border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="status"
                    checked={product.isActive === true}
                    onChange={() =>
                      SetProduct({
                        ...product,
                        isActive: true,
                      })
                    }
                    className="accent-black"
                  />

                  <span className="text-sm">
                    Active
                  </span>
                </label>

                {/* Inactive */}
                <label
                  className={`flex items-center gap-3 px-5 py-3 border cursor-pointer ${
                    !product.isActive
                      ? "border-black"
                      : "border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="status"
                    checked={product.isActive === false}
                    onChange={() =>
                      SetProduct({
                        ...product,
                        isActive: false,
                      })
                    }
                    className="accent-black"
                  />

                  <span className="text-sm">
                    Inactive
                  </span>
                </label>

              </div>
            </div>

          </div>

          {/* Footer Buttons */}
          <div className="border-t border-gray-200 px-6 md:px-8 py-6 flex flex-col sm:flex-row justify-end gap-3">

            <button
              type="button"
              onClick={handleClear}
              className="h-12 px-8 border border-gray-300 text-sm font-medium hover:bg-gray-100 transition"
            >
              Clear
            </button>

            <button
              type="submit"
              className="h-12 px-8 bg-black text-white text-sm font-medium hover:bg-gray-800 transition"
            >
              Add Product
            </button>

          </div>

        </div>
      </div>
    </div>
  </form>
);
}