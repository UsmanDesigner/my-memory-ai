import React from "react";
import { useNavigate } from "react-router";
import { FaPlus, FaPlay } from "react-icons/fa"; // Importing icons
import CommonLayout from "../layouts/CommonLayout";

const Home = () => {
  const navigate = useNavigate();

  return (
    <CommonLayout>
      <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">Memory App</h2>
      
      <div className="flex flex-col gap-6 w-full mx-auto">
        {/* Create Memory Button */}
        <button
          onClick={() => navigate("/create-memory")}
          className="flex items-center justify-center gap-3 w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-4 rounded-lg text-lg font-semibold shadow-lg hover:from-blue-600 hover:to-blue-800 transform hover:scale-105 transition duration-300"
        >
          <FaPlus className="text-xl" />
          Create Memory
        </button>

        {/* Play Old Memories Button */}
        <button
          onClick={() => navigate("/view-memory")}
          className="flex items-center justify-center gap-3 w-full bg-gradient-to-r from-green-500 to-green-700 text-white py-4 rounded-lg text-lg font-semibold shadow-lg hover:from-green-600 hover:to-green-800 transform hover:scale-105 transition duration-300"
        >
          <FaPlay className="text-xl" />
          Play Old Memories
        </button>
      </div>
      
    </CommonLayout>
  );
};

export default Home;
