import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const AvatarDropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  const toggleDropdown = () => setOpen(!open);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={toggleDropdown}
      >
        <img
          src={`https://api.dicebear.com/7.x/initials/svg?seed=Faraan`}
          alt="avatar"
          className="w-8 h-8 rounded-full"
        />
        <ChevronDown
          size={18}
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </div>

      {open && (
        <div className="absolute right-0 mt-2 w-44 py-3 bg-white text-black rounded-md shadow-lg z-50 overflow-hidden">
          <Link
            to="/profile"
            className="block px-4 py-2 hover:bg-gray-100 text-md"
            onClick={() => {
              setOpen(false);
            }}
          >
            Profile
          </Link>
          <Link
            to="/about"
            className="block px-4 py-2 hover:bg-gray-100 text-md"
            onClick={() => setOpen(false)}
          >
            About
          </Link>
          <button
            onClick={() => setOpen(false)}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-md cursor-pointer"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default AvatarDropdown;
