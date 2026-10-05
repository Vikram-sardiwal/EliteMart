import { useEffect, useState } from "react";
import { FiEdit3, FiImage, FiTag, FiBox } from "react-icons/fi";
import API from "../services/api";
import { useNavigate, useParams } from "react-router-dom";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: "",
    brand: "",
    rating: "",
    numberOfReviews: "",
    isActive: true,
  });

  const [imageFile, setImageFile] = useState(null);

  //get product

  useEffect(() => {
    const getproduct = async () => {
      try {
        const response = await API.get(`/products/${id}`);
        setProduct(response.data.product);
      } catch (error) {
        console.log(error.message);
      }
    };
    getproduct();
  }, [id]);

  //update product

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("price", Number(product.price));
      formData.append("category", product.category);
      formData.append("stock", Number(product.stock));
      formData.append("brand", product.brand);
      formData.append("rating", Number(product.rating));
      formData.append("numberOfReviews", Number(product.numberOfReviews));
      formData.append("isActive", product.isActive);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const response = await API.put(`/products/${id}`, formData);

      console.log(response.data);

      navigate("/admin/products");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-blue-50 to-purple-100 p-6">
      {/* HEADER */}
      <div className="mb-6 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-linear-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white shadow-lg">
          <FiEdit3 size={24} />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-slate-800">Edit Product</h1>

          <p className="text-slate-500">Update your product information</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          {/* FORM HEADER */}
          <div className="bg-linear-to-r from-[#192642] to-blue-700 px-6 py-5 text-white">
            <div className="flex items-center gap-3">
              <FiBox size={22} />

              <div>
                <h2 className="text-lg font-semibold">Product Information</h2>

                <p className="text-sm text-blue-100">
                  Change product details below
                </p>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* FORM FIELDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* PRODUCT NAME */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-slate-700">
                  Product Name
                </label>

                <input
                  type="text"
                  placeholder="Enter product name"
                  className="w-full border border-slate-300 rounded-xl p-3 outline-none transition focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={product.name}
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      name: e.target.value,
                    })
                  }
                />
              </div>

              {/* BRAND */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-slate-700">
                  Brand
                </label>

                <input
                  type="text"
                  placeholder="Enter brand"
                  className="w-full border border-slate-300 rounded-xl p-3 outline-none transition focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  value={product.brand}
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      brand: e.target.value,
                    })
                  }
                />
              </div>

              {/* CATEGORY */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-slate-700">
                  Category
                </label>

                <div className="relative">
                  <FiTag className="absolute left-3 top-3.5 text-slate-400" />

                  <select
                    className="w-full border border-slate-300 rounded-xl p-3 pl-10 outline-none bg-white transition focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={product.category}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        category: e.target.value,
                      })
                    }
                  >
                    <option value="">Select Category</option>
                    <option value="clothing">Clothing</option>
                    <option value="electronics">Electronics</option>
                    <option value="shoes">Shoes</option>
                    <option value="beauty">Beauty</option>
                  </select>
                </div>
              </div>

              {/* PRICE */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-slate-700">
                  Price
                </label>

                <div className="relative">
                  <span className="absolute left-3 top-3 text-slate-500 font-semibold">
                    ₹
                  </span>

                  <input
                    type="number"
                    placeholder="Enter price"
                    className="w-full border border-slate-300 rounded-xl p-3 pl-8 outline-none transition focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    value={product.price}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        price: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              {/* STOCK */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-slate-700">
                  Stock
                </label>

                <input
                  type="number"
                  placeholder="Enter stock quantity"
                  className="w-full border border-slate-300 rounded-xl p-3 outline-none transition focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  value={product.stock}
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      stock: e.target.value,
                    })
                  }
                />
              </div>

              {/* IMAGE */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-slate-700">
                  Product Image
                </label>

                <div className="relative">
                  <FiImage className="absolute left-3 top-3.5 text-slate-400" />

                  <input
                    type="file"
                    accept="image/*"
                    className="w-full border border-slate-300 rounded-xl p-3 pl-10 outline-none transition focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    onChange={(e) => setImageFile(e.target.files[0])}
                  />

                  {product.image && (
                    <div className="mt-3">
                      <p className="text-sm text-slate-500 mb-2">
                        Current Image
                      </p>

                      <img
                        src={`http://localhost:3635/uploads/${product.image}`}
                        alt={product.name}
                        className="w-24 h-24 object-cover rounded-xl border"
                      />
                    </div>
                  )}

                  <div className="mt-4">
                    <label className="block mb-2 font-semibold">
                      Change Image
                    </label>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImageFile(e.target.files[0])}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="mt-6">
              <label className="block mb-2 text-sm font-semibold text-slate-700">
                Product Description
              </label>

              <textarea
                rows="5"
                placeholder="Enter detailed product description..."
                className="w-full border border-slate-300 rounded-xl p-3 outline-none resize-none transition focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                value={product.description}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    description: e.target.value,
                  })
                }
              />
            </div>

            {/* STATUS */}
            <div className="mt-6">
              <label className="block mb-3 text-sm font-semibold text-slate-700">
                Product Status
              </label>

              <div className="flex gap-4">
                {/* ACTIVE */}
                <label
                  className={`flex items-center gap-3 px-5 py-3 rounded-xl border cursor-pointer transition ${
                    product.isActive
                      ? "border-green-500 bg-green-50 text-green-700"
                      : "border-slate-300 bg-white text-slate-600"
                  }`}
                >
                  <input
                    type="radio"
                    name="status"
                    checked={product.isActive === true}
                    onChange={() =>
                      setProduct({
                        ...product,
                        isActive: true,
                      })
                    }
                    className="accent-green-600"
                  />

                  <span className="font-medium">Active</span>
                </label>

                {/* INACTIVE */}
                <label
                  className={`flex items-center gap-3 px-5 py-3 rounded-xl border cursor-pointer transition ${
                    !product.isActive
                      ? "border-red-500 bg-red-50 text-red-700"
                      : "border-slate-300 bg-white text-slate-600"
                  }`}
                >
                  <input
                    type="radio"
                    name="status"
                    checked={product.isActive === false}
                    onChange={() =>
                      setProduct({
                        ...product,
                        isActive: false,
                      })
                    }
                    className="accent-red-600"
                  />

                  <span className="font-medium">Inactive</span>
                </label>
              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex justify-end gap-3 mt-8 pt-6 border-t">
              <button
                onClick={() => navigate("/admin/products")}
                type="button"
                className="px-6 py-3 border border-slate-300 rounded-xl text-slate-700 font-medium hover:bg-slate-100 transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-6 py-3 bg-linear-to-r from-[#192642] to-blue-600 text-white rounded-xl font-semibold shadow-lg hover:from-blue-700 hover:to-purple-600 transition"
              >
                Update Product
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
