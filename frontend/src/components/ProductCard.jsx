import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const [wishlist, setWishlist] = useState(false);

  useEffect(() => {
    const checkWishlist = async () => {
      const user = localStorage.getItem("user");

      if (!user) {
        setWishlist(false);
        return;
      }
      try {
        const response = await API.get("/wishlist");

        const products = response.data.wishlist?.products || [];

        const exists = products.some((item) => item._id === product._id);

        setWishlist(exists);
      } catch (error) {
        if (error.response?.status === 401) {
          setWishlist(false);
          return;
        }
        // console.log(
        //   "Wishlist check error:",
        //   error.response?.data || error.message
        // );
        console.log("Wishlist check error:", error.response?.status);
      }
    };

    checkWishlist();
  }, [product._id]);

  const handleAddToCart = async () => {
    try {
      const response = await API.post("/cart", {
        productId: product._id,
        quantity: 1,
      });

      console.log(response.data);

      alert("Product added to cart!");
    } catch (error) {
      console.log("Add to cart error:", error.response?.data || error.message);

      alert("Product not found!");
    }
  };

  const handleProductDetails = () => {
    navigate(`/product/${product._id}`);
  };

  const handleWishlist = async () => {
    try {
      if (wishlist) {
        await API.delete(`/wishlist/${product._id}`);

        setWishlist(false);

        alert("Product removed from wishlist");
      } else {
        await API.post("/wishlist", {
          productId: product._id,
        });

        setWishlist(true);

        alert("Product added to wishlist");
      }
    } catch (error) {
      // console.log("Wishlist error:", error.response?.data || error.message);
      if (error.response?.status === 401) {
        alert("Please login to continue");
        navigate("/login");
        return;
      }

      console.log("Wishlist error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="group bg-white">
      <div className="relative aspect-3/4 bg-gray-100 overflow-hidden">
        {/* Wishlist */}

        <button
          onClick={handleWishlist}
          aria-label="Add to wishlist"
          className={`absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white text-lg shadow-sm transition-all duration-200 ${
            wishlist ? "text-red-500" : "text-gray-700 hover:text-red-500"
          }`}
        >
          {wishlist ? "♥" : "♡"}
        </button>

        {/* Category */}

        <span className="absolute top-3 left-3 z-10 bg-white px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-gray-700">
          {product.category}
        </span>

        <img
          src={`http://localhost:3635/uploads/${product.image}`}
          alt={product.name}
          className="w-full h-full object-contain p-5 group-hover:scale-105 transition-transform duration-500"
        />

        <button
          onClick={handleProductDetails}
          className="absolute bottom-0 left-0 right-0 bg-black text-white py-3 text-xs font-medium uppercase tracking-wider opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
        >
          View Details
        </button>
      </div>

      <div className="pt-4">
        {/* Brand */}

        <p className="text-[10px] uppercase tracking-[0.18em] text-gray-400">
          {product.brand}
        </p>

        <h2 className="mt-1 text-sm font-medium text-gray-900 line-clamp-1">
          {product.name}
        </h2>

        <p className="mt-1 text-xs text-gray-400 line-clamp-1">
          {product.description}
        </p>

        <div className="flex items-center gap-2 mt-2">
          <div className="flex text-xs">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={
                  star <= Number(product.rating || 0)
                    ? "text-black"
                    : "text-gray-300"
                }
              >
                ★
              </span>
            ))}
          </div>

          <span className="text-[11px] text-gray-400">
            ({product.numberOfReviews || 0})
          </span>
        </div>

        <div className="flex items-center justify-between mt-3">
          <p className="text-base font-semibold text-black">₹{product.price}</p>

          <p
            className={`text-[10px] uppercase tracking-wide font-medium ${
              product.stock > 0 ? "text-gray-500" : "text-red-500"
            }`}
          >
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </p>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="w-full mt-4 bg-black text-white py-3 text-xs font-medium uppercase tracking-wider hover:bg-gray-800 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </div>
  );
}
