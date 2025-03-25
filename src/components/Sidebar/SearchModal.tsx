import React, { useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCitySelect: (city: string) => void;
}

const SearchModal = ({ isOpen, onClose, onCitySelect }: SearchModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onCitySelect(searchQuery.trim());
      setSearchQuery("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-20 z-50">
      <div className="bg-white/20 backdrop-blur-lg rounded-lg w-full max-w-md mx-4">
        <div className="p-4 flex justify-between items-center border-b border-white/20">
          <h2 className="text-white text-lg font-semibold">Search Location</h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-full p-2"
          >
            <FiX className="text-xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter city name..."
              className="w-full bg-white/10 text-white placeholder-white/50 rounded-lg py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <FiSearch className="absolute left-3 top-3 text-white/70" />
          </div>
          <button
            type="submit"
            className="mt-4 w-full bg-white/20 hover:bg-white/30 text-white py-2 rounded-lg transition-colors"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchModal;
