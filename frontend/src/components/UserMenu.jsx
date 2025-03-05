import React, { useState, useContext } from "react";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";

const UserMenu = () => {
  const { user, logout } = useContext(AuthContext);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="relative">
      {/* User Icon Button */}
      <button
        onClick={() => setShowUserMenu(!showUserMenu)}
        className="w-10 h-10 rounded-full flex items-center justify-center"
      >
        <lord-icon
          src="https://cdn.lordicon.com/hrjifpbq.json"
          trigger="hover"
          colors="primary:#ffffff"
          className="w-full h-full hover: cursor-pointer"
        ></lord-icon>
      </button>

      {/* Dropdown Menu */}
      {showUserMenu && (
        <div className="absolute right-0 mt-2 bg-gray-900 text-white p-3 rounded-lg shadow-lg w-44 transition-all duration-200 animate-fade-in">
          <ul className="flex flex-col gap-2">
            <button
              onClick={() => {navigate("/profile"); setShowUserMenu(false)}}
              className="flex items-center gap-2 py-2 px-3 rounded-md hover:bg-gray-700 transition-all duration-200 hover:cursor-pointer"
            >
              <FaUser className="text-blue-400" /> My Profile
            </button>
            <button
              onClick={logout}
              className="flex items-center gap-2 py-2 px-3 rounded-md text-red-500 hover:text-red-400 hover:bg-gray-700 transition-all duration-200 hover:cursor-pointer"
            >
              <FaSignOutAlt /> Logout
            </button>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
