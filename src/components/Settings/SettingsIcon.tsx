import React, { useState } from "react";
import { FiSettings } from "react-icons/fi";
import SettingsModal from "./SettingsModal";

const SettingsIcon = () => {
  const [isRotating, setIsRotating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsRotating(true);
    setIsModalOpen(true);
    setTimeout(() => setIsRotating(false), 1000);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="fixed top-6 right-6 z-50 p-2 rounded-full bg-white/20 backdrop-blur-lg hover:bg-white/30 transition-all duration-300"
      >
        <FiSettings
          className={`text-white text-2xl ${
            isRotating
              ? "animate-spin"
              : "hover:rotate-90 transition-transform duration-300"
          }`}
        />
      </button>

      <SettingsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default SettingsIcon;
