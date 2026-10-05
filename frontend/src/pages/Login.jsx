import API from "../services/api";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    const newErrors = {};

    
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email";
    }

    
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await API.post("/auth/login", {
        email: email.trim(),
        password: password,
      });

      console.log(response.data);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      const role = response.data.user.role;

      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/products");
      }
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-[calc(100vh-72px)] bg-white flex justify-center px-5 py-16">
        <form onSubmit={login} className="w-full max-w-md">
          
          <div className="mb-10">
            <h1 className="text-3xl font-bold tracking-tight text-black">
              Login
            </h1>

            <p className="mt-3 text-sm text-gray-600">
              Sign in to your EliteMart account
            </p>
          </div>

          
          <div className="mb-6">
            <label className="block text-sm font-medium text-black mb-2">
              Email
            </label>

            <input
              className="w-full h-12 px-4 border border-gray-400 bg-white text-black text-sm outline-none focus:border-black transition"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors({ ...errors, email: "" });
              }}
            />

            {errors.email && (
              <p className="text-red-600 text-xs mt-2">{errors.email}</p>
            )}
          </div>

        
          <div className="mb-8">
            <label className="block text-sm font-medium text-black mb-2">
              Password
            </label>

            <input
              className="w-full h-12 px-4 border border-gray-400 bg-white text-black text-sm outline-none focus:border-black transition"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors({ ...errors, password: "" });
              }}
            />

            {errors.password && (
              <p className="text-red-600 text-xs mt-2">{errors.password}</p>
            )}
          </div>

      
          <button
            type="submit"
            className="w-full h-12 bg-black text-white text-sm font-medium hover:bg-gray-800 transition"
          >
            LOGIN
          </button>

          
          <p className="text-center text-sm text-gray-600 mt-8">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-black font-medium underline cursor-pointer"
            >
              Create an account
            </span>
          </p>
        </form>
      </div>
    </>
  );
}
