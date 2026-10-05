
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

export default function OrderDetails() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await API.get(`/orders/${id}`);

        setOrder(response.data.order);
      } catch (error) {
        console.log("ORDER DETAILS ERROR:", error.message);
      }
    };

    fetchOrder();
  }, [id]);

  if (!order) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-sm text-gray-500">
          Loading order details...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">

      
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
                {order.orderStatus}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wider text-gray-500">
                Payment
              </p>

              <p className="text-sm font-medium text-black mt-2">
                {order.paymentStatus}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wider text-gray-500">
                Total
              </p>

              <p className="text-sm font-semibold text-black mt-2">
                ₹{order.totalAmount}
              </p>
            </div>

          </div>

        </div>

        
        <div className="mt-10">

          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-black">
              Products
            </h2>

            <span className="text-sm text-gray-500">
              {order.items.length}{" "}
              {order.items.length === 1 ? "item" : "items"}
            </span>
          </div>

          <div className="divide-y divide-gray-200 border-y border-gray-200">

            {order.items.map((item, index) => (

              <div
                key={item.product || index}
                className="flex gap-5 py-6"
              >

          
                <div className="w-24 h-28 sm:w-32 sm:h-36 bg-gray-100 shrink-0 overflow-hidden">

                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain p-3"
                  />

                </div>

              
                <div className="flex flex-col justify-center flex-1">

                  <h3 className="text-sm sm:text-base font-medium text-black">
                    {item.name}
                  </h3>

                  <p className="text-sm text-gray-600 mt-3">
                    ₹{item.price}
                  </p>

                  <p className="text-xs text-gray-500 mt-2">
                    Quantity: {item.quantity}
                  </p>

                </div>

              
                <div className="hidden sm:flex items-center">
                  <p className="text-sm font-medium text-black">
                    ₹{item.price * item.quantity}
                  </p>
                </div>

              </div>

            ))}

          </div>

        </div>

        
        <div className="flex justify-end mt-8">

          <div className="w-full sm:w-80">

            <div className="flex items-center justify-between border-t border-black pt-5">

              <p className="text-sm font-medium text-black">
                Total
              </p>

              <p className="text-2xl font-semibold text-black">
                ₹{order.totalAmount}
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
