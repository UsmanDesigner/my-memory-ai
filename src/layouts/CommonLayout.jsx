import React from "react";
import { useLocation, useNavigate } from "react-router";
import Logo from "../assets/logo.jpeg";


const CommonLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const hideLogout = location.pathname === "/" || location.pathname === "/register";

  const handleLogout = () => {
    // Clear authentication data (e.g., tokens)
    localStorage.removeItem("user_uuid"); 
    // Redirect to login page
    navigate("/");
  };

  return (
    <div className="flex flex-col h-screen w-full bg-gray-100">

      {/* Header with Logout Button */}
      {!hideLogout && (
        <header className="bg-white flex items-center h-[8vh] w-full justify-end pr-4 shadow-md">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
          >
            Logout
          </button>
        </header>
      )}

      {/* Centered Content Box (90vh) */}
      <main  className={`flex justify-center items-center ${hideLogout ? "h-full" : "h-[92vh]"} w-full`}>
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg text-center w-full md:w-2xl min-h-[40vh] h-full md:h-max flex flex-col justify-center items-center">
      <img src={Logo} alt="App Logo" className="w-30 h-30 mb-4 mx-auto rounded-md" />

          {children}
        </div>
      </main>
      
    </div>
  );
};

export default CommonLayout;
