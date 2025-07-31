import { FiX } from "react-icons/fi";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-20 z-50">
      <div className="bg-white/20 backdrop-blur-lg rounded-lg w-full max-w-md mx-4">
        <div className="p-4 flex justify-between items-center border-b border-white/20">
          <h2 className="text-white text-lg font-semibold">Settings</h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-full p-2"
          >
            <FiX className="text-xl" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* Add your settings options here */}
          <div className="text-white">
            <h3 className="text-lg mb-2">Units</h3>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="units"
                  value="celsius"
                  defaultChecked
                />
                <span>Celsius</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="units" value="fahrenheit" />
                <span>Fahrenheit</span>
              </label>
            </div>
          </div>

          <div className="text-white">
            <h3 className="text-lg mb-2">Theme</h3>
            <select className="bg-white/10 rounded px-3 py-2 w-full">
              <option value="auto">Auto</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
