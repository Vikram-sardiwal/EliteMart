import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Wishlist() {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      const user = localStorage.getItem("user");

      if (!user) {
        navigate("/login");
        return;
      }
      try {
        const response = await API.get("/wishlist");

        console.log(response.data);

        setWishlist(response.data.wishlist?.products || []);
      } catch (error) {
        if (error.response?.status === 401) {
          localStorage.removeItem("user");
          alert("Please login to continue");

          navigate("/login");
          return;
        }
        console.log(
          "Remove Wishlist error:",
          error.response?.data || error.message,
        );
      }
    };

    fetchWishlist();
  }, [navigate]);

  const handleRemove = async (productId) => {
    try {
      const response = await API.delete(`/wishlist/${productId}`);

      console.log(response.data);

      setWishlist((prevWishlist) =>
        prevWishlist.filter((product) => product._id !== productId),
      );
    } catch (error) {
      console.log(
        "Remove wishlist error:",
        error.response?.data || error.message,
      );
    }
  };

  const handleClearWishlist = async () => {
    try {
      const response = await API.delete("/wishlist");

      console.log(response.data);

      setWishlist([]);
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("user");
        alert("Please login to continue");
        navigate("/login");
        return;
      }

      console.log(
        "Clear wishlist error:",
        error.response?.data || error.message,
      );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-10">
          <div className="flex items-end justify-between gap-5">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-3">
                EliteMart
              </p>

              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-black">
                Wishlist
              </h1>

              <p className="text-sm text-gray-500 mt-3">
                {wishlist.length} {wishlist.length === 1 ? "item" : "items"}{" "}
                saved
              </p>
            </div>

            {wishlist.length > 0 && (
              <button
                onClick={handleClearWishlist}
                className="text-sm text-black underline underline-offset-4 hover:text-gray-500 transition"
              >
                Clear all
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-10">
        {wishlist.length === 0 ? (
          <div className="min-h-420px flex flex-col items-center justify-center text-center">
            <div className="text-6xl text-gray-300 mb-6">♡</div>

            <h2 className="text-2xl font-semibold text-black">
              Your wishlist is empty
            </h2>

            <p className="text-sm text-gray-500 mt-3 max-w-sm">
              Add products you love to your wishlist and find them here whenever
              you want.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-10">
            {wishlist.map((product) => (
              <div key={product._id} className="group">
                <div className="relative aspect-3/4 bg-gray-100 overflow-hidden">
                  {/* Heart */}
                  <div className="absolute top-3 right-3 z-10 w-9 h-9 bg-white flex items-center justify-center">
                    <span className="text-black text-lg">♥</span>
                  </div>

                  <img
                    src={`http://localhost:3635/uploads/${product.image}`}
                    alt={product.name}
                    className="w-full h-full object-contain p-5 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="pt-4">
                  {/* Brand */}
                  {product.brand && (
                    <p className="text-[11px] uppercase tracking-wider text-gray-500">
                      {product.brand}
                    </p>
                  )}

                  <h2 className="text-sm font-medium text-black mt-1 line-clamp-1">
                    {product.name}
                  </h2>

                  {product.description && (
                    <p className="text-xs text-gray-500 mt-2 line-clamp-2 min-h-8">
                      {product.description}
                    </p>
                  )}

                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-xs text-black">★★★★★</span>

                    <span className="text-xs text-gray-500">
                      ({product.numberOfReviews || 0})
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <p className="text-base font-semibold text-black">
                      ₹{product.price}
                    </p>

                    <span
                      className={`text-[11px] ${
                        product.stock > 0 ? "text-gray-600" : "text-red-600"
                      }`}
                    >
                      {product.stock > 0 ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>

                  <button
                    onClick={() => handleRemove(product._id)}
                    className="w-full mt-4 h-10 border border-black text-black text-xs font-medium hover:bg-black hover:text-white transition"
                  >
                    REMOVE
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
