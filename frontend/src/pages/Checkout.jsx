
import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const [errors, setErrors] = useState({});

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [cart, setCart] = useState([]);

 
  const [paymentMethod, setPaymentMethod] = useState("razorpay");

  const navigate = useNavigate();


  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await API.get("/cart");

        console.log(response.data);

        setCart(response.data.cart.items);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchCart();
  }, []);


  const subtotal = cart.reduce((subtotal, item) => {
    return subtotal + item.product.price * item.quantity;
  }, 0);

  const delivery = subtotal >= 1000 ? 0 : 50;

  const grandTotal = subtotal + delivery;


  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };


  const validateForm = () => {
    const newErrors = {};

    if (!address.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (address.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    if (!address.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(address.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    if (!address.street.trim()) {
      newErrors.street = "Street address is required";
    }

    if (!address.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!address.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!address.pincode.trim()) {
      newErrors.pincode = "PIN code is required";
    } else if (!/^\d{6}$/.test(address.pincode)) {
      newErrors.pincode = "PIN code must be 6 digits";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };


  const getShippingAddress = () => {
    return {
      fullName: address.name,
      phone: address.phone,
      street: address.street,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
    };
  };


  const handleCODOrder = async () => {
    if (!validateForm()) {
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    try {
      const response = await API.post("/orders", {
        shippingAddress: getShippingAddress(),
        paymentMethod: "cod",
      });

      console.log("COD ORDER CREATED:", response.data);

      alert("COD order placed successfully!");

      navigate("/orders");
    } catch (error) {
      console.log(
        "COD ORDER ERROR:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "COD order could not be placed"
      );
    }
  };

 
  const handlePayment = async () => {
    if (!validateForm()) {
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    try {
     
      const response = await API.post(
        "/orders/razorpay/create-order",
        {
          amount: grandTotal,
        }
      );

      const razorpayOrder = response.data.order;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: razorpayOrder.amount,

        currency: "INR",

        name: "EliteMart",

        description: "EliteMart Order",

        order_id: razorpayOrder.id,

        handler: async function (response) {
          try {
            console.log("PAYMENT SUCCESS:", response);

       
            const verifyResponse = await API.post(
              "/orders/razorpay/verify",
              {
                razorpay_order_id:
                  response.razorpay_order_id,

                razorpay_payment_id:
                  response.razorpay_payment_id,

                razorpay_signature:
                  response.razorpay_signature,

                shippingAddress: getShippingAddress(),
              }
            );

            console.log(
              "VERIFY RESPONSE:",
              verifyResponse.data
            );

            alert(
              "Payment successful! Order placed."
            );

            navigate("/orders");
          } catch (error) {
            console.log(
              "PAYMENT VERIFY ERROR:",
              error.response?.data || error.message
            );

            alert(
              error.response?.data?.message ||
                "Payment verification failed"
            );
          }
        },

        prefill: {
          name: address.name,
          contact: address.phone,
        },

        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      console.log(
        "RAZORPAY ERROR:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Payment could not be started"
      );
    }
  };

  const handlePlaceOrder = () => {
    if (paymentMethod === "cod") {
      handleCODOrder();
    } else {
      handlePayment();
    }
  };

  return (
    <div className="min-h-screen bg-white">

   
      <div className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10">

          <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-3">
            EliteMart
          </p>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-black">
            Checkout
          </h1>

          <p className="text-sm text-gray-500 mt-3">
            Complete your order
          </p>

        </div>
      </div>

   
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10">

        <div className="grid gap-12 lg:grid-cols-[1fr_360px]">

          <div>

            <div className="mb-7">
              <h2 className="text-xl font-semibold text-black">
                Delivery Address
              </h2>

              <p className="text-sm text-gray-500 mt-2">
                Enter your delivery details
              </p>
            </div>

            <form className="grid gap-6 sm:grid-cols-2">

              {/* NAME */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                  Full Name
                </label>

                <input
                  name="name"
                  value={address.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full h-12 px-4 border border-gray-400 bg-white text-black text-sm outline-none focus:border-black transition"
                />

                {errors.name && (
                  <p className="mt-2 text-xs text-red-600">
                    {errors.name}
                  </p>
                )}
              </div>

         
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                  Phone Number
                </label>

                <input
                  name="phone"
                  value={address.phone}
                  onChange={handleChange}
                  placeholder="10 digit phone number"
                  type="tel"
                  inputMode="numeric"
                  className="w-full h-12 px-4 border border-gray-400 bg-white text-black text-sm outline-none focus:border-black transition"
                />

                {errors.phone && (
                  <p className="mt-2 text-xs text-red-600">
                    {errors.phone}
                  </p>
                )}
              </div>

            
              <div className="sm:col-span-2">
                <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                  Street Address
                </label>

                <input
                  name="street"
                  value={address.street}
                  onChange={handleChange}
                  placeholder="House No. / Street Address"
                  className="w-full h-12 px-4 border border-gray-400 bg-white text-black text-sm outline-none focus:border-black transition"
                />

                {errors.street && (
                  <p className="mt-2 text-xs text-red-600">
                    {errors.street}
                  </p>
                )}
              </div>

       
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                  City
                </label>

                <input
                  name="city"
                  value={address.city}
                  onChange={handleChange}
                  placeholder="Enter your city"
                  className="w-full h-12 px-4 border border-gray-400 bg-white text-black text-sm outline-none focus:border-black transition"
                />

                {errors.city && (
                  <p className="mt-2 text-xs text-red-600">
                    {errors.city}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                  State
                </label>

                <input
                  name="state"
                  value={address.state}
                  onChange={handleChange}
                  placeholder="Enter your state"
                  className="w-full h-12 px-4 border border-gray-400 bg-white text-black text-sm outline-none focus:border-black transition"
                />

                {errors.state && (
                  <p className="mt-2 text-xs text-red-600">
                    {errors.state}
                  </p>
                )}
              </div>

         
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                  PIN Code
                </label>

                <input
                  name="pincode"
                  value={address.pincode}
                  onChange={handleChange}
                  placeholder="6 digit PIN code"
                  type="text"
                  inputMode="numeric"
                  className="w-full h-12 px-4 border border-gray-400 bg-white text-black text-sm outline-none focus:border-black transition"
                />

                {errors.pincode && (
                  <p className="mt-2 text-xs text-red-600">
                    {errors.pincode}
                  </p>
                )}
              </div>

            </form>

            <div className="mt-12">

              <h2 className="text-xl font-semibold text-black">
                Payment Method
              </h2>

              <p className="text-sm text-gray-500 mt-2 mb-6">
                Select your preferred payment method
              </p>

              <div className="space-y-4">

                <label
                  className={`flex items-center gap-4 border p-5 cursor-pointer transition ${
                    paymentMethod === "razorpay"
                      ? "border-black"
                      : "border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="razorpay"
                    checked={paymentMethod === "razorpay"}
                    onChange={(e) =>
                      setPaymentMethod(e.target.value)
                    }
                  />

                  <div>
                    <p className="text-sm font-medium text-black">
                      Online Payment
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      Pay securely using Razorpay
                    </p>
                  </div>
                </label>

               
                <label
                  className={`flex items-center gap-4 border p-5 cursor-pointer transition ${
                    paymentMethod === "cod"
                      ? "border-black"
                      : "border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) =>
                      setPaymentMethod(e.target.value)
                    }
                  />

                  <div>
                    <p className="text-sm font-medium text-black">
                      Cash on Delivery
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      Pay when your order is delivered
                    </p>
                  </div>
                </label>

              </div>
            </div>
          </div>

          <div>

            <div className="border border-gray-200 p-6 lg:sticky lg:top-5">

              <h2 className="text-lg font-semibold text-black mb-7">
                Order Summary
              </h2>

              <div className="space-y-4 text-sm">

                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>

                <div className="flex justify-between text-gray-600 pb-5 border-b border-gray-200">
                  <span>Delivery</span>

                  <span>
                    {delivery === 0
                      ? "FREE"
                      : `₹${delivery}`}
                  </span>
                </div>

                <div className="flex justify-between items-center pt-1">
                  <span className="font-medium text-black">
                    Total
                  </span>

                  <span className="text-xl font-semibold text-black">
                    ₹{grandTotal}
                  </span>
                </div>

              </div>

             
              <button
                type="button"
                onClick={handlePlaceOrder}
                className="mt-8 w-full h-12 bg-black text-white text-sm font-medium hover:bg-gray-800 transition"
              >
                {paymentMethod === "cod"
                  ? `PLACE ORDER • ₹${grandTotal}`
                  : `PAY ₹${grandTotal}`}
              </button>

              <p className="mt-4 text-center text-xs leading-5 text-gray-500">
                {paymentMethod === "cod"
                  ? "Pay in cash when your order is delivered."
                  : "Your payment will be securely processed by Razorpay."}
              </p>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
