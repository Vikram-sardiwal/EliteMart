import API from "../services/api";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const register = async (e) => {
    e.preventDefault();

    const newErrors = {};

  
    if (!name.trim()) {
      newErrors.name = "Name is required";
    } else if (name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    
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

    
    if (!confirmpassword) {
      newErrors.confirmpassword = "Please confirm your password";
    } else if (password !== confirmpassword) {
      newErrors.confirmpassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await API.post("/auth/register", {
        name: name.trim(),
        email: email.trim(),
        password,
        role: "user",
      });

      console.log(response.data);

      alert("Registration Successful");

      setname("");
      setemail("");
      setpassword("");
      setconfirmpassword("");
      setErrors({});
    } catch (error) {
      console.log(error);
      alert("Registration Failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-[calc(100vh-72px)] bg-white flex justify-center px-5 py-14">
        <form onSubmit={register} className="w-full max-w-md">
          {/* Heading */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold tracking-tight text-black">
              Create Account
            </h1>

            <p className="mt-3 text-sm text-gray-600">
              Create your EliteMart account
            </p>
          </div>

        
          <div className="mb-6">
            <label className="block text-sm font-medium text-black mb-2">
              Name
            </label>

            <input
              className="w-full h-12 px-4 border border-gray-400 bg-white text-black text-sm outline-none focus:border-black transition"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => {
                setname(e.target.value);
                setErrors({ ...errors, name: "" });
              }}
            />

            {errors.name && (
              <p className="text-red-600 text-xs mt-2">{errors.name}</p>
            )}
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
                setemail(e.target.value);
                setErrors({ ...errors, email: "" });
              }}
            />

            {errors.email && (
              <p className="text-red-600 text-xs mt-2">{errors.email}</p>
            )}
          </div>

         
          <div className="mb-6">
            <label className="block text-sm font-medium text-black mb-2">
              Password
            </label>

            <input
              className="w-full h-12 px-4 border border-gray-400 bg-white text-black text-sm outline-none focus:border-black transition"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
                setErrors({ ...errors, password: "" });
              }}
            />

            {errors.password && (
              <p className="text-red-600 text-xs mt-2">{errors.password}</p>
            )}
          </div>

          
          <div className="mb-8">
            <label className="block text-sm font-medium text-black mb-2">
              Confirm Password
            </label>

            <input
              className="w-full h-12 px-4 border border-gray-400 bg-white text-black text-sm outline-none focus:border-black transition"
              type="password"
              placeholder="Confirm your password"
              value={confirmpassword}
              onChange={(e) => {
                setconfirmpassword(e.target.value);
                setErrors({ ...errors, confirmpassword: "" });
              }}
            />

            {errors.confirmpassword && (
              <p className="text-red-600 text-xs mt-2">
                {errors.confirmpassword}
              </p>
            )}
          </div>

     
          <button
            type="submit"
            className="w-full h-12 bg-black text-white text-sm font-medium hover:bg-gray-800 transition"
          >
            CREATE ACCOUNT
          </button>

        
          <p className="text-center text-sm text-gray-600 mt-8">
            Already have an account?{" "}
            <span
              className="text-black font-medium underline cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </>
  );
}
