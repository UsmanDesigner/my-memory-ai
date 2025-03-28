import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import CommonLayout from "../layouts/CommonLayout";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!formData.password) {
      setError("Please enter a password.");
      return;
    }

    setLoading(true);
    try {
      const API_BASE_URL = import.meta.env.VITE_AUTH_API_BASE_URL;
      const response = await axios.post(`${API_BASE_URL}/signup`, formData);
      console.log("res", response);
      localStorage.setItem("user_email", response.data.email);
      localStorage.setItem("user_id", response.data.id);
      setSignupSuccess(true); // Show success message instead of navigating immediately
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    }
    setLoading(false);
  };

  return (
    <CommonLayout>
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create Your Account 🎉</h2>
      <p className="text-gray-500 text-center mb-6">Sign up to get started!</p>

      {signupSuccess ? (
        <div className="text-center bg-green-100 text-green-700 p-4 rounded-lg shadow-md w-full">
          <p className="font-semibold text-lg md:text-2xl mb-2">Signup Successful! 🎉</p>
          <button
            onClick={() => navigate("/")}
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Go to Login
          </button>
        </div>
       ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
          {error && <p className="text-red-500 text-center">{error}</p>}
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password.replace(/./g, "*")}
            onChange={handleChange}
            className="w-full p-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg transition duration-300 text-lg font-semibold ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
      )} 

      <p className="text-center text-gray-500 text-sm mt-4">
        Already have an account? <a href="/" className="text-blue-600 hover:underline">Log in</a>
      </p>
    </CommonLayout>
  );
};

export default Signup;
