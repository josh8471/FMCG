import React, { useState } from "react";
import { FiHelpCircle, FiSettings, FiMenu,FiSearch } from "react-icons/fi";
import { FaUserCircle, FaSignOutAlt, FaKey, FaUserEdit, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Header({ title, actions, toggleSidebar, isCollapsed, searchTerm, setSearchTerm }) {
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate(); // 2. Initialize navigate


  // 3. Helper function to navigate and close dropdown
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
        /* Fixed: Mobile is always left-0. Desktop offsets for sidebar */
        left-0 
        ${isCollapsed ? "lg:left-20" : "lg:left-64"}
      `}
    >
      <div className="flex items-center gap-2 min-w-0">
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-md shrink-0"
        >
          <FiMenu size={20} />
        </button>

        <h1 className="text-sm sm:text-lg font-bold text-gray-800 truncate">
          {title}
        </h1>
      </div>
        <div className="relative max-w-xs w-full group">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
          <input
            type="text"
            placeholder="Search beats, areas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-100 border-none rounded-full py-2 pl-10 pr-10 text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <FaTimes size={12} />
            </button>
          )}
        </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 sm:gap-2 scale-90 sm:scale-100 origin-right">
          {actions}
        </div>

        {/* Profile */}
        <div className="relative ml-1 sm:ml-2">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center"
          >
            JB
          </button>

          {showProfile && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setShowProfile(false)}
              ></div>
              
              <div
                className="
                  absolute right-0 mt-3 z-20
                  w-64 sm:w-72
                  bg-white rounded-lg shadow-xl
                  border border-gray-100 py-2
                  animate-in fade-in zoom-in duration-150
                "
              >
                <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                    <FaUserCircle size={24} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-semibold text-gray-800 truncate">
                      Joshua Basumatary
                    </span>
                    <span className="text-xs text-gray-500 truncate">Admin Account</span>
                  </div>
                </div>

                <div className="py-2">
                  <p className="px-4 text-[10px] text-gray-400 uppercase font-bold mb-1 tracking-wider">
                    Current Organisation
                  </p>
                  <div className="px-4 py-2 bg-blue-50 border-l-4 border-blue-500 flex items-center gap-2">
                    <span className="text-orange-500">♦</span>
                    <span className="text-sm text-gray-700 font-medium">
                      FMCG Organisation
                    </span>
                  </div>

                  <div className="mt-2">
                    <button className="w-full px-4 py-2 hover:bg-gray-50 text-left text-sm text-gray-600 flex items-center gap-2 transition-colors">
                      💵 Pricing
                    </button>
                    <button className="w-full px-4 py-2 hover:bg-gray-50 text-left text-sm text-gray-600 flex items-center gap-2 transition-colors">
                      📄 Subscription
                    </button>
                  </div>
                </div>

                <div className="border-t border-gray-100 my-1" />

                <div className="py-2">
                  <p className="px-4 text-[10px] text-gray-400 uppercase font-bold mb-1 tracking-wider">
                    My Account
                  </p>

                  {/* UPDATED BUTTON */}
                  <button 
                    onClick={() => handleNavigation("/profile")} // 4. Add Click Handler
                    className="w-full px-4 py-2 hover:bg-gray-50 text-left text-sm text-gray-600 flex items-center gap-3 transition-colors"
                  >
                    <FaUserEdit /> Update Profile
                  </button>
                  <button className="w-full px-4 py-2 hover:bg-gray-50 text-left text-sm text-gray-600 flex items-center gap-3 transition-colors">
                    <FaKey /> Change Password
                  </button>
                  <button className="w-full px-4 py-2 hover:bg-red-50 text-left text-sm text-red-600 flex items-center gap-3 transition-colors">
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