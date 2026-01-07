import React, { useState } from "react";
import {
  FaRocket, FaStore, FaShoppingCart, FaBox, FaCog, FaBars, FaTimes,
  FaChevronLeft, FaChevronRight
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { BsChevronDown, BsChevronRight } from "react-icons/bs";

const SidebarItem = ({
  icon: Icon,
  label,
  active = false,
  hasSubmenu = false,
  isOpen = false,
  onClick,
  isCollapsed, // New Prop
}) => (
  <div
    onClick={onClick}
    className={`px-6 py-3 cursor-pointer flex items-center transition-all duration-300
      ${active ? "bg-navy-800 border-l-4 border-blue-500" : "hover:bg-white/5 border-l-4 border-transparent"}
      ${isCollapsed ? "justify-center px-0" : "justify-between"}`}
  >
    <div className="flex items-center gap-3 text-gray-300">
      <Icon size={20} />
      {!isCollapsed && <span className="text-sm font-medium whitespace-nowrap">{label}</span>}
    </div>
    {!isCollapsed && hasSubmenu && (
      <div className="text-gray-400">
        {isOpen ? <BsChevronDown size={12} /> : <BsChevronRight size={12} />}
      </div>
    )}
  </div>
);

const SubMenuItem = ({ label, code, to, onItemClick, isCollapsed }) => {
  if (isCollapsed) return null; // Don't show submenus when collapsed

  const content = (
    <div className="pl-14 py-2 cursor-pointer hover:text-white text-gray-400 flex items-center gap-3 group">
      <span className="w-6 h-6 rounded-full bg-gray-700 text-[10px] flex items-center justify-center text-white group-hover:bg-blue-500 transition-colors">
        {code}
      </span>
      <span className="text-sm">{label}</span>
    </div>
  );

  return to ? <Link to={to} onClick={onItemClick}>{content}</Link> : content;
};

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false); // Mobile drawer
  const [isCollapsed, setIsCollapsed] = useState(false); // Desktop collapse
  
  const [salesOpen, setSalesOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [purchasesOpen, setPurchasesOpen] = useState(false);

  const handleLinkClick = () => setSidebarOpen(false);

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-navy-900 flex items-center px-4 z-30">
        <button onClick={() => setSidebarOpen(true)} className="text-white text-xl"><FaBars /></button>
        <span className="ml-4 text-white font-semibold">FMCG Org</span>
      </div>

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-navy-900 flex flex-col z-30 transition-all duration-300 border-r border-gray-700/50
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        ${isCollapsed ? "lg:w-20" : "lg:w-64"}
        lg:translate-x-0`}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-700/50 overflow-hidden">
          <Link to="/Home" className="flex items-center gap-2 text-white font-bold min-w-max">
            <span className="text-green-500 text-xl">🎄</span>
            {!isCollapsed && <span>FMCG Org</span>}
          </Link>
          <button className="lg:hidden text-gray-400" onClick={() => setSidebarOpen(false)}><FaTimes /></button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 overflow-y-auto overflow-x-hidden">
          <SidebarItem
            icon={FaRocket}
            label="Getting Started"
            hasSubmenu={!isCollapsed}
            isOpen={exploreOpen}
            isCollapsed={isCollapsed}
            onClick={() => !isCollapsed && setExploreOpen(!exploreOpen)}
          />
          {exploreOpen && !isCollapsed && (
            <div className="bg-[#151725] py-2">
              <SubMenuItem code="EX" label="Explore" to="/Explore" isCollapsed={isCollapsed} />
              <SubMenuItem code="GS" label="Onboarding" to="/Onboarding" isCollapsed={isCollapsed} />
            </div>
          )}

          <Link to="/beat-planning" onClick={handleLinkClick}>
            <SidebarItem icon={FaBox} label="Beat Planning" isCollapsed={isCollapsed} />
          </Link>

          <SidebarItem
            icon={FaStore}
            label="Sales"
            hasSubmenu={!isCollapsed}
            isOpen={salesOpen}
            isCollapsed={isCollapsed}
            onClick={() => !isCollapsed && setSalesOpen(!salesOpen)}
          />
          {salesOpen && !isCollapsed && (
            <div className="bg-[#151725] py-2">
              <SubMenuItem code="OR" label="Orders" isCollapsed={isCollapsed} />
              <SubMenuItem code="IN" label="Invoices" isCollapsed={isCollapsed} />
            </div>
          )}
        </nav>

        {/* Collapse Toggle & Config */}
        <div className="border-t border-gray-700/50 py-2">
          <SidebarItem icon={FaCog} label="Config" isCollapsed={isCollapsed} />
          
          {/* Desktop Collapse Toggle */}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex w-full items-center justify-center py-4 text-gray-400 hover:text-white transition-colors"
          >
            {isCollapsed ? <FaChevronRight size={18} /> : <div className="flex items-center gap-2"><FaChevronLeft size={18}/> <span className="text-xs">Collapse</span></div>}
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/50 z-20 lg:hidden" />
      )}
    </>
  );
}