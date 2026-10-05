import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const cartdata = async () => {
      try {
        const response = await API.get("/cart");
        console.log(response.data);

        setCart(response.data.cart.items);
      } catch (error) {
        console.log(error.message);
      }
    };

    cartdata();
  }, []);

  const validCart = cart.filter((item) => item.product);

  const total = validCart.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  const handleIncrease = async (item) => {
    try {
      await API.put(`/cart/${item.product._id}`, {
        quantity: item.quantity + 1,
      });

      const response = await API.get("/cart");
      setCart(response.data.cart.items);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDecrease = async (item) => {
    if (item.quantity <= 1) {
      return;
    }

    try {
      await API.put(`/cart/${item.product._id}`, {
        quantity: item.quantity - 1,
      });

      const response = await API.get("/cart");
      setCart(response.data.cart.items);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleRemove = async (item) => {
    try {
      await API.delete(`/cart/${item.product._id}`);

      const response = await API.get("/cart");
      setCart(response.data.cart.items);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-3">
            EliteMart
          </p>

          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-black">
                Shopping Bag
              </h1>

              <p className="text-sm text-gray-500 mt-3">
                {validCart.length} {validCart.length === 1 ? "item" : "items"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10">
        {validCart.length === 0 ? (
          <div className="min-h-400px flex flex-col items-center justify-center text-center">
            <div className="text-6xl text-gray-300 mb-6">🛒</div>

            <h2 className="text-2xl font-semibold text-black">
              Your shopping bag is empty
            </h2>

            <p className="text-sm text-gray-500 mt-3">
              Add products to your bag to continue shopping.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12">
            <div>
              <div className="border-y border-gray-200">
                {validCart.map((item) => (
                  <div
                    key={item.product._id}
                    className="py-6 border-b border-gray-200 last:border-b-0"
                  >
                    <div className="flex gap-5">
                      {/* Product Image */}
                      <div className="w-28 h-36 sm:w-36 sm:h-44 bg-gray-100 shrink-0 overflow-hidden">
                        <img
                          src={`http://localhost:3635/uploads/${item.product.image}`}
                          alt={item.product.name}
                          className="w-full h-full object-contain p-3"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between gap-4">
                          <div>
                            <h2 className="text-sm sm:text-base font-medium text-black">
                              {item.product.name}
                            </h2>

                            <p className="text-sm text-gray-600 mt-2">
                              ₹{item.product.price}
                            </p>
                          </div>

                          <p className="text-sm sm:text-base font-semibold text-black whitespace-nowrap">
                            ₹{item.product.price * item.quantity}
                          </p>
                        </div>

                        <div className="flex items-center gap-4 mt-8">
                          <span className="text-xs uppercase tracking-wider text-gray-500">
                            Quantity
                          </span>

                          <div className="flex items-center border border-gray-400">
                            <button
                              onClick={() => handleDecrease(item)}
                              disabled={item.quantity <= 1}
                              className="w-9 h-9 text-lg text-black hover:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-300 transition"
                            >
                              −
                            </button>

                            <span className="w-9 h-9 flex items-center justify-center text-sm text-black border-x border-gray-400">
                              {item.quantity}
                            </span>

                            <button
                              onClick={() => handleIncrease(item)}
                              className="w-9 h-9 text-lg text-black hover:bg-gray-100 transition"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => handleRemove(item)}
                          className="mt-5 text-xs text-black underline underline-offset-4 hover:text-gray-500 transition"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="border border-gray-200 p-6 sticky top-5">
                <h2 className="text-lg font-semibold text-black mb-6">
                  Order Summary
                </h2>

                <div className="flex justify-between text-sm text-gray-600 pb-4 border-b border-gray-200">
                  <span>Subtotal</span>
                  <span>₹{total}</span>
                </div>

                <div className="flex justify-between text-sm text-gray-600 py-4 border-b border-gray-200">
                  <span>Delivery</span>
                  <span>Calculated at checkout</span>
                </div>

                <div className="flex justify-between items-center pt-5">
                  <span className="text-sm font-medium text-black">Total</span>

                  <span className="text-xl font-semibold text-black">
                    ₹{total}
                  </span>
                </div>

                <button
                  onClick={() => navigate("/checkout")}
                  className="w-full h-12 mt-7 bg-black text-white text-sm font-medium hover:bg-gray-800 transition"
                >
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
