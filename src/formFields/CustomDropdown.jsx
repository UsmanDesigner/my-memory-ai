import { useState } from "react";
import React from "react";

const CustomDropdown = ({ items, onSelect }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
    onSelect(item); // Pass selected item to parent
  };

  return (
    <div className="relative w-full ">
      {/* Selected Item (Button) */}
      <button
        className="w-full p-3 border border-gray-300 rounded-md text-lg flex items-center gap-2 bg-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedItem ? (
          <>
            <img
              src={selectedItem.image ?? "https://source.unsplash.com/50x50/?nature"}
              alt={selectedItem.name}
              className="w-8 h-8 object-cover rounded-md"
            />
            {selectedItem.name}
          </>
        ) : (
          "Select an item"
        )}
      </button>

      {/* Dropdown Items */}
      {isOpen && (
        <div className="absolute left-0 w-full bg-white border border-gray-300 mt-1 rounded-md shadow-md max-h-60 overflow-auto z-10">
          {items.map((item) => (
            <div
              key={item.name}
              className="flex items-center gap-3 p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(item)}
            >
              <img
                src={item.image ?? "https://source.unsplash.com/50x50/?random"}
                alt={item.name}
                className="w-8 h-8 object-cover rounded-md"
              />
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
