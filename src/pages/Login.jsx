import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import React from "react";
import Logo from "../assets/logo.jpeg"
import CommonLayout from "../layouts/CommonLayout";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Redirect to home if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home");
    }
  }, [navigate]);

  const handleLogin = () => {
    if (email && password) {
      localStorage.setItem("token", "dummy-token"); // Store a dummy token
      navigate("/home"); // Redirect to home
    } else {
      alert("Please enter email and password");
    }
  };

  return (
    <CommonLayout>
      <img
        src={Logo} // Replace with your actual logo path
        alt="App Logo"
        className="w-30 h-30 mb-4 rounded-md"
      />
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Welcome Back 👋
          </h2>
          <p className="text-gray-500 text-center mb-6">
            Please sign in to continue
          </p>
          <div className="flex flex-col gap-5 w-full">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 text-lg font-semibold"
            >
              Sign In
            </button>
          </div>
          <p className="text-center text-gray-500 text-sm mt-4">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-600 hover:underline">
              Sign up
            </a>
          </p>
    </CommonLayout>
  );
};

export default Login;
