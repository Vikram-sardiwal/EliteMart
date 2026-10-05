import { useNavigate } from "react-router-dom";

export default function Ordercard({ order }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">Order ID</p>
          <p className="font-semibold text-slate-700 break-all">{order._id}</p>
        </div>

        <div className="flex items-center gap-4">
          <div>
            <p className="text-sm text-slate-500">Payment</p>
            <p className="font-medium text-slate-700 uppercase">
              {order.paymentMethod}
            </p>
          </div>

          <span className="px-3 py-1 rounded-full bg-green-50 text-green-600 text-sm font-medium">
            {order.orderStatus}
          </span>
        </div>
      </div>

      <div className="p-5 space-y-4">
        {order.items.map((item, index) => (
          <div
            key={item.product || index}
            className="flex flex-col sm:flex-row sm:items-center gap-4 bg-slate-50 rounded-xl p-4"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-xl bg-white"
            />

            <div className="flex-1">
              <h2 className="text-lg font-semibold text-slate-800">
                {item.name}
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Price: ₹{item.price}
              </p>

              <p className="text-sm text-slate-500">
                Quantity: {item.quantity}
              </p>
            </div>

            <div className="text-left sm:text-right">
              <p className="text-sm text-slate-500">Item Total</p>

              <p className="font-bold text-slate-800">
                ₹{item.price * item.quantity}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-100 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <p className="text-sm text-slate-500">Payment Status</p>

          <p className="font-medium text-slate-700 capitalize">
            {order.paymentStatus}
          </p>
        </div>

        <div className="text-left sm:text-right">
          <p className="text-sm text-slate-500">Total Amount</p>

          <p className="text-2xl font-bold text-slate-800">
            ₹{order.totalAmount}
          </p>

          <button
            onClick={() => navigate(`/orders/${order._id}`)}
            className="mt-3 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
