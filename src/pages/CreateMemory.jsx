import React, { useState } from "react";
import {
  AiOutlineFolder,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
} from "react-icons/ai";
import { BsChevronRight, BsLayers } from "react-icons/bs";
import { FaPlusSquare } from "react-icons/fa";
import CommonLayout from "../layouts/CommonLayout";
import { categories } from "../utils";
import { useNavigate } from "react-router";
import axios from "axios";
import LoadingSpinner from "../common/LoadingSpinner";
import customImage from "../assets/custom.jpeg"

const CreateMemory = () => {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subCategories, setSubCategories] = useState({});
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [items, setItems] = useState([]);
  const [customInput, setCustomInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [memoryLoading, setMemoryLoading] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);
  const [memoryImage,setMemoryImage] = useState(null);
  const navigate = useNavigate();

  const handleBack = () => setStep((prev) => Math.max(1, prev - 1));
  const handleNext = () => setStep((prev) => Math.min(3, prev + 1));

  const fetchSubCategories = async (category) => {
    setLoading(true);
    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Get from env
      const response = await axios.get(
        `${API_BASE_URL}/get_category?name=${category}`
      );

      const data = response.data[category];
      setSubCategories(data || {});
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      setSubCategories({});
    }
    setLoading(false);
  };
  const handleImageClick = async (item) => {
    if (item.name === "Custom") {
      setSelectedItem(item);
      setCustomInput("");
      return;
    }

    setSelectedItem(item);
    setCustomInput(item.name);
    setMemoryLoading(true);

    const userUUID = localStorage.getItem("user_uuid");
    if (!userUUID) {
      console.error("User UUID not found in localStorage");
      setMemoryLoading(false);
      return;
    }

    const payload = {
      user_uuid: userUUID,
      category: selectedCategory,
      subCategory: selectedSubCategory,
      listItem: item.name,
      image_url: item.image ,
    };

    try {
     const API_BASE_URL = import.meta.env.VITE_AUTH_API_BASE_URL;
     const response = await  axios.post(`${API_BASE_URL}/generate-image/`, payload);
      console.log("API call successful", payload, response);
      setMemoryImage(response.data.image_url);
    } catch (error) {
      console.error("Error calling API:", error);
    } finally {
      setMemoryLoading(false);
    }
  };
  const handleGenerateMemory= async()=>{
    setMemoryLoading(true);

    const userUUID = localStorage.getItem("user_uuid");
    if (!userUUID) {
      console.error("User UUID not found in localStorage");
      setMemoryLoading(false);
      return;
    }

    const payload = {
      user_uuid: userUUID,
      category: null,
      subCategory: null,
      listItem: customInput,
      image_url: null ,
    };

    try {
     const API_BASE_URL = import.meta.env.VITE_AUTH_API_BASE_URL;
     const response = await  axios.post(`${API_BASE_URL}/generate-image/`, payload);
      console.log("API call successful", payload, response);
      setMemoryImage(response.data.image_url);
    } catch (error) {
      console.error("Error calling API:", error);
    } finally {
      setMemoryLoading(false);
    }

  }

  return (
    <CommonLayout>
      <div className="overflow-auto scroll-hidden max-h-[60vh] md:max-h-[60vh] w-full flex flex-col gap-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-6 text-gray-800 flex items-center justify-center gap-2">
          📝 Create Memory
        </h2>

        <div className="flex justify-center gap-2 mb-6">
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className={`h-3 w-12 rounded-full transition-all ${
                step >= num ? "bg-blue-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        {step === 1 && (
          <div className="h-[70vh] md:h-max overflow-y-auto scroll-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            {[
              "Custom Memory",
        ...Object.keys(categories), 
         // Adding the custom option
      ]
            .map((category) => (
              <button
                key={category}
                onClick={() => {
                  
                  if (category === "Custom Memory") {
                    setSelectedCategory(category);
                    setSelectedSubCategory(null);
                    setItems([]);
                    setStep(3);
                  } else {
                    fetchSubCategories(category);
                    setSelectedCategory(category);
                    setStep(2);
                  }
                }}
                className={`p-4 text-white rounded-lg shadow-md h-max transition-transform flex justify-between items-center ${
                  selectedCategory === category
                    ? "bg-blue-700"
                    : "bg-gradient-to-r from-blue-500 to-purple-500"
                }`}
              >
                <div className="flex items-center gap-3">
                  <AiOutlineFolder className="w-6 h-6" /> {category}
                </div>
                <BsChevronRight className="w-5 h-5" />
              </button>
            ))}
          </div>
          </div>
        )}

        {step === 2 &&
          (loading ? (
            <LoadingSpinner size="8" color="border-green-500" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[65vh] overflow-auto scroll-hidden">
              {Object.keys(subCategories).length > 0 ? (
                Object.keys(subCategories).map((subCategoryKey) => (
                  <button
                    key={subCategoryKey}
                    onClick={() => {
                      setSelectedSubCategory(subCategoryKey);
                      setItems(subCategories[subCategoryKey] || []);
                      setStep(3);
                    }}
                    className={`p-4 text-white rounded-lg shadow-md transition-transform flex justify-between items-center ${
                      selectedSubCategory === subCategoryKey
                        ? "bg-green-700"
                        : "bg-gradient-to-r from-green-500 to-teal-500"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <BsLayers className="w-6 h-6" /> {subCategoryKey}
                    </div>
                    <BsChevronRight className="w-5 h-5" />
                  </button>
                ))
              ) : (
                <p className="text-center text-gray-500">
                  No subcategories found.
                </p>
              )}
            </div>
          ))}

       
        {step === 3 && (
  <div className="relative">
   {memoryLoading && (
      <div className="absolute inset-0 flex flex-col  gap-2 justify-center items-center z-50 backdrop-blur-sm bg-white/30">
        <LoadingSpinner size="24" color="border-green-500" />
        <p className="text-gray-700 font-bold text-lg ml-2">Generating Memory...</p>
      </div>
    )}

    {memoryImage && (
      <div className="w-full text-center mb-4">
        <img
          src={memoryImage}
          alt="memory-image"
          className="w-50 h-50 mx-auto rounded-md shadow-md"
        />
      </div>
    )}

    {selectedItem?.name === "Custom" ? (
      <div className="mt-6 p-6 bg-gray-100 rounded-lg shadow-md text-center flex flex-col items-center mb-4">
        <button
          onClick={() => setSelectedItem(null)}
          className="self-start mb-4 px-3 py-1 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
        >
          ← Back
        </button>
        <h3 className="text-xl font-bold text-gray-700">
          Create Your Custom Memory
        </h3>
        <input
          type="text"
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          placeholder="Enter custom memory name..."
          className="mt-4 p-3 text-black w-full border rounded-md shadow-sm focus:ring-2 focus:ring-purple-500"
        />
        <button className="mt-4 px-6 py-2 flex items-center gap-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition shadow-md" 
        onClick={handleGenerateMemory}
        >
          <FaPlusSquare className="w-5 h-5" /> Generate Memory
        </button>
      </div>
    ) : (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto h-max md:max-h-[30vh] pb-2 scroll-hidden">
        {[
          { name: "Custom" },
          ...(items || []),
        ].map((item) => (
          <button
            key={item.name}
            onClick={() => handleImageClick(item)}
            className={`p-4 border rounded-lg shadow-md max-h-max hover:border-blue-100 transition-transform flex flex-col items-center gap-2 ${
              selectedItem?.name === item.name
                ? "border-blue-500 bg-blue-100"
                : "bg-white border-gray-300"
            }`}
          >
            <img
              src={item.image ?? customImage}
              alt={item.name}
              className="w-full h-[100px] md:h-[140px] object-cover rounded-md"
            />
            <p className="text-lg font-bold text-gray-800">{item.name}</p>
          </button>
        ))}
      </div>
    )}
  </div>
)}


        <div className="flex justify-between mt-6">
          <button
          onClick={
            step === 1
              ? () => navigate("/")
              : selectedSubCategory === null
              ? () => setStep(1)
              : handleBack
          }
            className={`px-6 py-2 flex items-center gap-2 rounded-md transition shadow-md ${
              step === 1
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-gray-300 text-gray-800 hover:bg-gray-400"
            }`}
          >
            <AiOutlineArrowLeft className="w-5 h-5" />{" "}
            {step === 1 ? "Back to Home" : "Back"}
          </button>

          {step < 3 && (
            <button
              onClick={handleNext}
              disabled={
                step === 1
                  ? !selectedCategory
                  : step === 2
                  ? !selectedSubCategory
                  : false
              }
              className={`px-6 py-2 flex items-center gap-2 rounded-md transition shadow-md ml-auto ${
                (step === 1 && !selectedCategory) ||
                (step === 2 && !selectedSubCategory)
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Next <AiOutlineArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </CommonLayout>
  );
};

export default CreateMemory;
