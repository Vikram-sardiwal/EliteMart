
import API from "../services/api";
import {
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FiEdit,
  FiEye,
  FiTrash2,
  FiStar,
  FiSearch,
} from "react-icons/fi";

export default function Products() {
  const navigate = useNavigate();
  const location = useLocation();

  const [products, setProducts] = useState([]);
  const [brand, setBrand] = useState("");
  const [status, setStatus] = useState("");

  const [searchParams] = useSearchParams();

  const [search, setSearch] = useState(
    searchParams.get("search") || ""
  );

  const [category, setCategory] = useState(
    searchParams.get("category") || ""
  );

  // ================= GET PRODUCTS =================

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await API.get("/products/");
        setProducts(response.data.products || []);
      } catch (error) {
        console.log("Get products error:", error);
      }
    };

    getProducts();
  }, [location.key]);

  // ================= DELETE PRODUCT =================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      const response = await API.delete(`/products/${id}`);

      console.log(response.data);

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      );
    } catch (error) {
      console.log("Delete product error:", error);
    }
  };

  // ================= FILTER PRODUCTS =================

  const filteredProducts = products.filter((product) => {
    const searchMatch = product.name
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const categoryMatch =
      category === "" ||
      product.category?.toLowerCase() === category.toLowerCase();

    const brandMatch =
      brand === "" ||
      product.brand?.toLowerCase() === brand.toLowerCase();

    const statusMatch =
      status === "" ||
      (status === "active" &&
        product.stock > 0 &&
        product.isActive === true) ||
      (status === "inactive" &&
        product.stock > 0 &&
        product.isActive === false) ||
      (status === "out-of-stock" &&
        product.stock === 0);

    return (
      searchMatch &&
      categoryMatch &&
      brandMatch &&
      statusMatch
    );
  });

  // ================= UI =================

  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* ================= PAGE HEADER ================= */}

      <div className="border-b border-gray-200">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-8">

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">

            <div>
              <p className="text-[11px] tracking-[0.25em] uppercase text-gray-500 mb-2">
                Admin / Inventory
              </p>

              <h1 className="text-3xl md:text-4xl font-medium tracking-tight">
                Products
              </h1>

              <p className="text-sm text-gray-500 mt-2">
                Manage products, inventory and availability
              </p>
            </div>

            <div className="text-sm text-gray-500">
              <span className="font-medium text-gray-900">
                {filteredProducts.length}
              </span>{" "}
              products
            </div>

          </div>
        </div>
      </div>

      {/* ================= FILTERS ================= */}

      <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-6">

        <div className="border-y border-gray-200 py-5">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">

            {/* SEARCH */}

            <div className="relative">

              <FiSearch
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products"
                className="w-full h-11 bg-gray-50 border border-gray-300 pl-10 pr-4 text-sm outline-none transition focus:border-black focus:bg-white"
              />

            </div>

            {/* CATEGORY */}

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-11 bg-gray-50 border border-gray-300 px-3 text-sm outline-none cursor-pointer focus:border-black focus:bg-white"
            >
              <option value="">All Categories</option>
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

            {/* BRAND */}

            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="h-11 bg-gray-50 border border-gray-300 px-3 text-sm outline-none cursor-pointer focus:border-black focus:bg-white"
            >
              <option value="">All Brands</option>
              <option value="nike">Nike</option>
              <option value="adidas">Adidas</option>
              <option value="puma">Puma</option>
              <option value="apple">Apple</option>
              <option value="samsung">Samsung</option>
              <option value="sony">Sony</option>
              <option value="jbl">JBL</option>
              <option value="oneplus">OnePlus</option>
            </select>

            {/* STATUS */}

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="h-11 bg-gray-50 border border-gray-300 px-3 text-sm outline-none cursor-pointer focus:border-black focus:bg-white"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="out-of-stock">
                Out of Stock
              </option>
            </select>

          </div>
        </div>

        {/* ================= TABLE ================= */}

        <div className="mt-6 border border-gray-200 overflow-x-auto">

          {/* TABLE HEADER */}

          <div className="min-w-1200px grid grid-cols-9 items-center bg-gray-50 border-b border-gray-200 px-5 py-4 text-[11px] font-medium uppercase tracking-[0.12em] text-gray-500">

            <div>Image</div>
            <div>Product</div>
            <div>Category</div>
            <div>Brand</div>
            <div>Price</div>
            <div>Stock</div>
            <div>Status</div>
            <div>Rating</div>
            <div className="text-right pr-3">
              Actions
            </div>

          </div>

          {/* PRODUCTS */}

          <div className="min-w-1200px">

            {filteredProducts.length === 0 ? (

              <div className="py-20 text-center">

                <p className="text-sm text-gray-500">
                  No products found
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  Try changing your search or filters
                </p>

              </div>

            ) : (

              filteredProducts.map((product) => (

                <div
                  key={product._id}
                  className="grid grid-cols-9 items-center px-5 py-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition"
                >

                  {/* IMAGE */}

                  <div>

                    <div className="w-16 h-16 bg-gray-100 flex items-center justify-center overflow-hidden">

                      {product.image ? (

                        <img
                          src={`http://localhost:3635/uploads/${product.image}`}
                          alt={product.name}
                          className="w-full h-full object-contain mix-blend-multiply"
                          onError={(e) => {
                            e.currentTarget.style.display =
                              "none";
                          }}
                        />

                      ) : (

                        <span className="text-[10px] uppercase tracking-wider text-gray-400">
                          No Image
                        </span>

                      )}

                    </div>

                  </div>

                  {/* PRODUCT */}

                  <div className="pr-5">

                    <p className="text-sm font-medium text-gray-900 line-clamp-2">
                      {product.name}
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                      ID: {product._id.slice(-6)}
                    </p>

                  </div>

                  {/* CATEGORY */}

                  <div>

                    <span className="text-xs text-gray-600 capitalize">
                      {product.category}
                    </span>

                  </div>

                  {/* BRAND */}

                  <div>

                    <span className="text-xs text-gray-600 capitalize">
                      {product.brand}
                    </span>

                  </div>

                  {/* PRICE */}

                  <div>

                    <span className="text-sm font-medium">
                      ₹
                      {Number(product.price).toLocaleString(
                        "en-IN"
                      )}
                    </span>

                  </div>

                  {/* STOCK */}

                  <div>

                    <span
                      className={`text-xs ${
                        product.stock === 0
                          ? "text-red-600"
                          : product.stock < 10
                          ? "text-orange-600"
                          : "text-gray-700"
                      }`}
                    >
                      {product.stock} units
                    </span>

                  </div>

                  {/* STATUS */}

                  <div>

                    {product.stock === 0 ? (

                      <span className="inline-flex items-center gap-2 text-xs text-red-600">

                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />

                        Out of Stock

                      </span>

                    ) : product.isActive ? (

                      <span className="inline-flex items-center gap-2 text-xs text-green-600">

                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />

                        Active

                      </span>

                    ) : (

                      <span className="inline-flex items-center gap-2 text-xs text-gray-500">

                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />

                        Inactive

                      </span>

                    )}

                  </div>

                  {/* RATING */}

                  <div>

                    <span className="inline-flex items-center gap-1 text-sm">

                      <FiStar
                        size={14}
                        className="fill-current text-black"
                      />

                      <span>
                        {product.rating ?? 0}
                      </span>

                    </span>

                  </div>

                  {/* ACTIONS */}

                  <div className="flex justify-end items-center gap-1 pr-2">

                    {/* EDIT */}

                    <button
                      onClick={() =>
                        navigate(
                          `/admin/products/edit/${product._id}`
                        )
                      }
                      className="w-9 h-9 flex items-center justify-center border border-gray-300 text-gray-700 hover:bg-black hover:text-white hover:border-black transition"
                      title="Edit"
                    >
                      <FiEdit size={15} />
                    </button>

                    {/* VIEW */}

                    <button
                      onClick={() =>
                        navigate(
                          `/admin/products/${product._id}`
                        )
                      }
                      className="w-9 h-9 flex items-center justify-center border border-gray-300 text-gray-700 hover:bg-black hover:text-white hover:border-black transition"
                      title="View"
                    >
                      <FiEye size={15} />
                    </button>

                    {/* DELETE */}

                    <button
                      onClick={() =>
                        handleDelete(product._id)
                      }
                      className="w-9 h-9 flex items-center justify-center border border-gray-300 text-gray-700 hover:bg-red-600 hover:text-white hover:border-red-600 transition"
                      title="Delete"
                    >
                      <FiTrash2 size={15} />
                    </button>

                  </div>

                </div>

              ))

            )}

          </div>
        </div>

      </div>
    </div>
  );
}
