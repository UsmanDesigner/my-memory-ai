import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import React from "react";
import CommonLayout from "../layouts/CommonLayout";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect to home if token exists
  useEffect(() => {
    const user_uuid = localStorage.getItem("user_uuid");
    if (user_uuid) {
      navigate("/home");
    }
  }, [navigate]);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleLogin = async () => {
    setError(""); // Reset error message

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email.");
      return;
    }

    setLoading(true);

    try {
      const API_BASE_URL = import.meta.env.VITE_AUTH_API_BASE_URL; // Get from env
      const response = await axios.post(`${API_BASE_URL}/signin`, {
        email,
        password,
      });
      console.log("res", response)
      const { uuid } = response.data;

      if (uuid) {
        localStorage.setItem("user_uuid",uuid );
        localStorage.setItem("user_email", response.data.email);
        navigate("/home");
      } else {
        setError("Invalid credentials, please try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login Failed");
    }

    setLoading(false);
  };

  return (
    <CommonLayout>
     

      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Welcome Back 👋
      </h2>
      <p className="text-gray-500 text-center mb-6">Please sign in to continue</p>

      <div className="flex flex-col gap-5 w-full">
        {error && <p className="text-red-500 text-center">{error}</p>}

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
          disabled={loading}
          className={`w-full py-3 rounded-lg transition duration-300 text-lg font-semibold ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {loading ? "Signing In..." : "Sign In"}
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
