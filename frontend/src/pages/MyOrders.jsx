
import { useEffect, useState } from "react";
import API from "../services/api";
import Ordercard from "../components/Ordercard";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
  const fetchOrders = async () => {
    try {
      const response = await API.get("/orders/my-orders");

      console.log("ORDER RESPONSE:", response.data);

      setOrders(response.data.orders);
    } catch (error) {
      console.log(
        "ORDER ERROR:",
        error.response?.data || error.message
      );
    }
  };

  fetchOrders();
}, []);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">

      
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          My Orders
        </h1>

        <p className="text-slate-500 mt-1">
          Track and manage your recent orders
        </p>
      </div>

      
      <div className="max-w-6xl mx-auto space-y-6">

        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-slate-700">
              No Orders Found
            </h2>

            <p className="text-slate-500 mt-2">
              You haven't placed any orders yet.
            </p>
          </div>
        ) : (
          orders.map((order) => (
            <Ordercard
              key={order._id}
              order={order}
            />
          ))
        )}

      </div>
    </div>
  );
}
