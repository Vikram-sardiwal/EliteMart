import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./admin/AdminDashboard";
import Products from "./admin/Products";
import ManageProducts from "./admin/ManageProducts";
import EditProduct from "./admin/EditProduct";
import Cart from "./pages/Cart";
import Productuser from "./pages/Productuser";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";
import OrderDetails from "./pages/OrderDetails";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./pages/Wishlist";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<Products />} />
        <Route path="/admin/manageproduct" element={<ManageProducts />} />
        <Route
          path="/admin/products/edit/:id"
          element={<EditProduct />}
        ></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/Products" element={<Productuser />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<MyOrders />} />

        <Route path="/orders/:id" element={<OrderDetails />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </>
  );
}

export default App;
