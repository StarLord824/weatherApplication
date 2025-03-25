import React, { useState } from "react";
import { FiSearch, FiMenu, FiMapPin } from "react-icons/fi";
import SearchModal from "./SearchModal";

interface SidebarProps {
  onCitySelect: (city: string) => void;
}

const Sidebar = ({ onCitySelect }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [favoriteLocations] = useState(["London", "New York", "Tokyo"]); // Example favorites

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full bg-white/10 backdrop-blur-lg transition-all duration-300 ${
          isOpen ? "w-64" : "w-16"
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
          className="p-4 hover:bg-white/20 w-full flex items-center"
        >
          <FiSearch className="text-white text-xl" />
          {isOpen && <span className="ml-4 text-white">Search Location</span>}
        </button>

        {/* Favorite Locations */}
        <div className="mt-4">
          {isOpen && (
            <div className="px-4 text-white/70 text-sm mb-2">
              Favorite Locations
            </div>
          )}
          {favoriteLocations.map((city) => (
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
