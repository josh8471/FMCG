import React, { useState } from "react";
import { FiSettings, FiMenu, FiSearch } from "react-icons/fi";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaKey,
  FaUserEdit,
  FaTimes,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Header({
  title,
  actions,
  toggleSidebar,
  isCollapsed,
  searchTerm,
  setSearchTerm,
  showSearch
}) {
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    setShowProfile(false);
  };

  return (
    <header
      className={`
        fixed top-0 right-0 z-20
        h-16 bg-white shadow-sm
        flex items-center justify-between
        px-4 transition-all duration-300
        left-0
        ${isCollapsed ? "lg:left-20" : "lg:left-64"}
      `}
    >
      <div className="flex items-center gap-2 min-w-0">
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-md"
        >
          <FiMenu size={20} />
        </button>

        <h1 className="text-sm sm:text-lg font-bold text-gray-800 truncate">
          {title}
        </h1>
      </div>

      {showSearch && (
  <div className="relative max-w-xs w-full mx-4 hidden sm:block">
    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

    <input
      type="text"
      placeholder="Search beats, areas..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full bg-gray-100 rounded-full py-2 pl-10 pr-10 text-sm
                 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none"
    />

    {searchTerm && (
      <button
        onClick={() => setSearchTerm("")}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
      >
        <FaTimes size={12} />
      </button>
    )}
  </div>
)}

      <div className="flex items-center gap-2">
        <div className="hidden sm:flex items-center gap-2">
          {actions}
        </div>

        <button
          onClick={() => navigate("/settings")}
          className="w-9 h-9 rounded-full bg-gray-100 text-gray-600
                     flex items-center justify-center hover:bg-gray-200 transition"
        >
          <FiSettings size={18} />
        </button>

        <div className="relative flex-shrink-0">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="w-9 h-9 rounded-full bg-blue-600 text-white
                       font-bold text-xs flex items-center justify-center"
          >
            JB
          </button>

          {showProfile && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowProfile(false)}
              />

              <div
                className="
                  absolute top-full right-0 mt-2 z-20
                  w-64 sm:w-72 max-w-[90vw]
                  bg-white rounded-lg shadow-xl
                  border border-gray-100 py-2
                  animate-in fade-in zoom-in duration-150
                "
              >
                <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                    <FaUserCircle size={24} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-800 truncate">
                      Joshua Basumatary
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      Admin Account
                    </p>
                  </div>
                </div>

                <div className="py-2">
                  <p className="px-4 text-[10px] text-gray-400 uppercase font-bold mb-1">
                    Current Organisation
                  </p>
                  <div className="px-4 py-2 bg-blue-50 border-l-4 border-blue-500 flex gap-2">
                    <span className="text-orange-500">♦</span>
                    <span className="text-sm font-medium text-gray-700">
                      FMCG Organisation
                    </span>
                  </div>

                  <button className="w-full px-4 py-2 hover:bg-gray-50 text-sm text-gray-600 text-left">
                    💵 Pricing
                  </button>
                  <button className="w-full px-4 py-2 hover:bg-gray-50 text-sm text-gray-600 text-left">
                    📄 Subscription
                  </button>
                </div>

                <div className="border-t border-gray-100 my-1" />

                {/* Account */}
                <div className="py-2">
                  <p className="px-4 text-[10px] text-gray-400 uppercase font-bold mb-1">
                    My Account
                  </p>

                  <button
                    onClick={() => handleNavigation("/profile")}
                    className="w-full px-4 py-2 hover:bg-gray-50 text-sm text-gray-600
                               flex items-center gap-3 text-left"
                  >
                    <FaUserEdit /> Update Profile
                  </button>
                  <button className="w-full px-4 py-2 hover:bg-gray-50 text-sm text-gray-600
                                     flex items-center gap-3 text-left">
                    <FaKey /> Change Password
                  </button>
                  <button className="w-full px-4 py-2 hover:bg-red-50 text-sm text-red-600
                                     flex items-center gap-3 text-left">
                    <FaSignOutAlt /> Sign Out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
