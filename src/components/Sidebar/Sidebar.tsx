import React, { useState } from "react";
import { FiSearch, FiMenu, FiMapPin } from "react-icons/fi";
import SearchModal from "./SearchModal";
import { useHotkeys } from "react-hotkeys-hook";

interface SidebarProps {
  onCitySelect: (city: string) => void;
}

const Sidebar = ({ onCitySelect }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [favoriteLocations] = useState(["Bangalore", "Mumbai", "Kanpur"]);
  useHotkeys("ctrl+k, meta+k", (event) => {
    event.preventDefault();
    setIsSearchOpen((prev) => !prev);
    setIsOpen(true);
  });

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full bg-white/10 backdrop-blur-lg transition-all duration-300 z-10 ${
          isOpen ? "w-56" : "w-16"
        }`}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-4 hover:bg-white/20 w-full flex justify-center"
        >
          <FiMenu className="text-white text-2xl" />
        </button>

        {/* Search Button */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="p-4 hover:bg-white/20 w-full flex items-center justify-center"
        >
          <FiSearch className="text-white text-xl" />
          {isOpen && <span className="ml-4 text-white">Search Location</span>}
        </button>

        {/* Favorite Locations */}
        <div className="mt-4">
          {isOpen && favoriteLocations.map((city) => (
            <button
              key={city}
              onClick={() => onCitySelect(city)}
              className="p-4 hover:bg-white/20 w-full flex items-center"
            >
              <FiMapPin className="text-white text-xl" />
              {isOpen && <span className="ml-4 text-white">{city}</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onCitySelect={(city) => {
          onCitySelect(city);
          setIsSearchOpen(false);
        }}
      />
    </>
  );
};

export default Sidebar;
