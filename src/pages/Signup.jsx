import React, { useState } from "react";
import { useNavigate } from "react-router";
import CommonLayout from "../layouts/CommonLayout";
import Logo from "../assets/logo.jpeg"


const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    localStorage.setItem("token", "dummy-token"); // Store a dummy token
    navigate("/home"); // Redirect to home
  };

  return (
    <CommonLayout>
       <img
              src={Logo} // Replace with your actual logo path
              alt="App Logo"
              className="w-30 h-30 mb-4 rounded-md"
            />
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Create Your Account 🎉
      </h2>
      <p className="text-gray-500 text-center mb-6">
        Sign up to get started!
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
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
          value={formData.password}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 text-lg font-semibold"
        >
          Sign Up
        </button>
      </form>
      <p className="text-center text-gray-500 text-sm mt-4">
        Already have an account?{" "}
        <a href="/" className="text-blue-600 hover:underline">
          Log in
        </a>
      </p>
    </CommonLayout>
  );
};

export default Signup;
