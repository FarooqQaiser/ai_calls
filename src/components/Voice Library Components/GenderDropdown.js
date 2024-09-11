import React, { useState } from "react";

const GenderDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedElement, setSelectedElement] = useState("All");

  const elements = ["All", "Male", "Female", "Neutral"];

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleElement = (element) => {
    setSelectedElement(element);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block w-full">
      <button
        onClick={handleToggle}
        className="text-sm flex justify-between items-center w-full px-4 py-2 bg-[#F2F2F2] dark:bg-[#191E24] rounded-md shadow-md"
      >
        {selectedElement}
        <span className="ml-2">{isOpen ? "▲" : "▼"}</span>
      </button>
      {isOpen && (
        <div className="absolute w-full mt-2 p-2 bg-[#F2F2F2] dark:bg-[#191E24] flex flex-col gap-2 rounded-md shadow-lg z-10">
          <ul className="max-h-60 flex flex-col gap-2 overflow-y-auto">
            {elements.map((element, index) => (
              <>
                <li
                  key={index}
                  className="px-4 py-2 text-sm hover:bg-[#1E40AF] hover:text-white cursor-pointer rounded-md"
                  onClick={() => handleElement(element)}
                >
                  {element}
                </li>
              </>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GenderDropdown;
