import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

export default function OrderDetails() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setError("");

        const response = await API.get(`/orders/${id}`);

        console.log("ORDER DETAILS:", response.data);
        console.log("ITEMS:", response.data.order?.items);

        setOrder(response.data.order);
      } catch (error) {
        console.error("ORDER DETAILS ERROR:", error);
        setError("Unable to load order details. Please try again.");
      }
    };

    fetchOrder();
  }, [id]);

  const getImageUrl = (image) => {
    if (!image) return "";

    if (/^https?:\/\//i.test(image)) {
      return image;
    }

    const filename = String(image).replace(/\\/g, "/").split("/").pop();

    if (!filename) return "";

    return `http://localhost:3635/uploads/${encodeURIComponent(filename)}`;
  };

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-5">
        <div className="text-center">
          <p className="text-sm text-red-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-5 py-2 bg-black text-white text-sm"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-sm text-gray-500">Loading order details...</p>
      </div>
    );
  }

  const items = Array.isArray(order.items) ? order.items : [];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-10">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-3">
            EliteMart
          </p>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-black">
            Order Details
          </h1>

          <p className="text-sm text-gray-500 mt-3 break-all">
            Order ID: {order._id}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-10">
        <div className="border-y border-gray-200 py-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-500">
                Order Status
              </p>
              <p className="text-sm font-medium text-black mt-2">
                {order.orderStatus || "Processing"}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wider text-gray-500">
                Payment
              </p>
              <p className="text-sm font-medium text-black mt-2">
                {order.paymentStatus || "Pending"}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wider text-gray-500">
                Total
              </p>
              <p className="text-sm font-semibold text-black mt-2">
                ₹{Number(order.totalAmount || 0).toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-black">Products</h2>

            <span className="text-sm text-gray-500">
              {items.length} {items.length === 1 ? "item" : "items"}
            </span>
          </div>

          {items.length === 0 ? (
            <p className="py-8 text-sm text-gray-500 border-y border-gray-200">
              No products found in this order.
            </p>
          ) : (
            <div className="divide-y divide-gray-200 border-y border-gray-200">
              {items.map((item, index) => (
                <div
                  key={item._id || item.product || index}
                  className="flex gap-5 py-6"
                >
                  {/* Product Image */}
                  <div className="w-24 h-28 sm:w-32 sm:h-36 bg-gray-100 shrink-0 overflow-hidden flex items-center justify-center">
                    {item.image ? (
                      <img
                        src={getImageUrl(item.image)}
                        alt={item.name || "Product"}
                        className="w-full h-full object-contain p-3"
                        onError={(e) => {
                          console.error("Image value:", item.image);
                          console.error(
                            "Image URL failed:",
                            e.currentTarget.src,
                          );
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <span className="text-xs text-gray-400">No image</span>
                    )}
                  </div>

                  <div className="flex flex-col justify-center flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base font-medium text-black">
                      {item.name || "Product"}
                    </h3>

                    <p className="text-sm text-gray-600 mt-3">
                      ₹{Number(item.price || 0).toLocaleString("en-IN")}
                    </p>

                    <p className="text-xs text-gray-500 mt-2">
                      Quantity: {item.quantity || 1}
                    </p>
                  </div>

                  <div className="hidden sm:flex items-center">
                    <p className="text-sm font-medium text-black">
                      ₹
                      {(
                        Number(item.price || 0) * Number(item.quantity || 1)
                      ).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end mt-8">
          <div className="w-full sm:w-80">
            <div className="flex items-center justify-between border-t border-black pt-5">
              <p className="text-sm font-medium text-black">Total</p>

              <p className="text-2xl font-semibold text-black">
                ₹{Number(order.totalAmount || 0).toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
