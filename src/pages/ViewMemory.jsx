import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CommonLayout from "../layouts/CommonLayout";

const ViewMemory = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchImages = async () => {
      const userUUID = localStorage.getItem("user_uuid");

      if (!userUUID) {
        console.error("User UUID not found in localStorage");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `https://web-production-9990.up.railway.app/user-images/${userUUID}`
        );
        setImages(response.data.images || []);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false); // Stop loading when API call is done
      }
    };

    fetchImages();
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000, // Auto-slide every 2 seconds
  };

  return (
    <CommonLayout>
      <div className="h-max mx-auto max-w-full">
        <h2 className="text-center text-2xl font-bold mb-4">Memories</h2>

        {/* Show loader while fetching */}
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-gray-500">Loading images...</p>
          </div>
        ) : images.length > 0 ? (
          <Slider {...sliderSettings}>
            {images.map((img, index) => (
              <div key={index} className="p-2">
                <img
                  src={img}
                  alt={`Memory ${index + 1}`}
                  className="w-full h-64 object-contain rounded-lg"
                />
              </div>
            ))}
          </Slider>
        ) : (
          <p className="text-center text-gray-500">No images available</p>
        )}
      </div>
    </CommonLayout>
  );
};

export default ViewMemory;
