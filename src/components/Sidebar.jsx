import React from "react";
import {
  FaRocket, FaStore, FaShoppingCart, FaBox, FaCog, FaBars, FaTimes,
  FaChevronLeft, 
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
  isCollapsed, 
}) => (
  <div
    onClick={onClick}
    className={`px-6 py-3 cursor-pointer flex items-center transition-all duration-200
      ${isCollapsed ? "justify-center px-0" : "justify-between"}
      ${active ? "bg-navy-800 border-l-4 border-blue-500" : "hover:bg-white/5 border-l-4 border-transparent"}`}
  >
    <div className="flex items-center gap-3 text-gray-300">
      <Icon size={18} className="shrink-0" />
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
  if (isCollapsed) return null; 

  const content = (
    <div className="pl-6 py-2 cursor-pointer hover:text-white text-gray-400 flex items-center gap-3 group">
      <span className="w-6 h-6 rounded-full bg-gray-700 text-[10px] flex items-center justify-center text-white group-hover:bg-blue-500 transition-colors">
        {code}
      </span>
      <span className="text-sm whitespace-nowrap">{label}</span>
    </div>
  );

  return to ? <Link to={to} onClick={onItemClick}>{content}</Link> : content;
};


export default function Sidebar({ 
  sidebarOpen, 
  setSidebarOpen, 
  isCollapsed, 
  setIsCollapsed 
}) {
  const [salesOpen, setSalesOpen] = React.useState(false);
  const [exploreOpen, setExploreOpen] = React.useState(false);
  const [purchasesOpen, setPurchasesOpen] = React.useState(false);

  const handleLinkClick = () => {
    setSidebarOpen(false);
  };

  return (
    <>
     

      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/50 z-20 lg:hidden" />
      )}

      <aside
        className={`fixed top-0 left-0 h-screen bg-navy-900 flex flex-col z-30 transform transition-all duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        ${isCollapsed ? "lg:w-20" : "lg:w-64"}
        lg:translate-x-0`}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-700/50 overflow-hidden">
          <Link to="/Home" className="flex items-center gap-2 text-white font-bold min-w-max">
            <span className="text-green-500 text-xl">🎄</span>
            {!isCollapsed && <span>FMCG Org</span>}
          </Link>
          <button className="lg:hidden text-gray-400" onClick={() => setSidebarOpen(false)}>
            <FaTimes />
          </button>
        </div>

        <nav className="flex-1 py-5 overflow-y-auto overflow-x-hidden">
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex w-full items-center justify-center py-3 text-gray-400 hover:text-white transition-colors"
          >
            {isCollapsed ? <FaBars /> : <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-bold"><FaChevronLeft /> <span>Collapse</span></div>}
          </button>
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
              <SubMenuItem code="EX" label="Explore" to="/Explore" onItemClick={handleLinkClick} isCollapsed={isCollapsed} />
              <SubMenuItem code="GS" label="Onboarding" to="/Onboarding" onItemClick={handleLinkClick} isCollapsed={isCollapsed} />
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
            <div className="bg-[#151725] py-2 ">
              <SubMenuItem code="OR" label="Orders" isCollapsed={isCollapsed} />
              <SubMenuItem code="IN" label="Invoices" isCollapsed={isCollapsed} />
              <SubMenuItem code="PA" label="Payments" isCollapsed={isCollapsed} />
            </div>
          )}

          <SidebarItem
            icon={FaShoppingCart}
            label="Purchases"
            hasSubmenu={!isCollapsed}
            isOpen={purchasesOpen}
            isCollapsed={isCollapsed}
            onClick={() => !isCollapsed && setPurchasesOpen(!purchasesOpen)}
          />
          {purchasesOpen && !isCollapsed && (
            <div className="bg-[#151725] py-2">
              <SubMenuItem code="PO" label="Purchase Orders" isCollapsed={isCollapsed} />
              <SubMenuItem code="BI" label="Bills" isCollapsed={isCollapsed} />
              
            </div>
          )}
        </nav>

        <div className="flex-1 py-5 overflow-y-auto overflow-x-hidden">
          <SidebarItem icon={FaCog} label="Config" isCollapsed={isCollapsed} />
          
         

         
        </div>
      </aside>
    </>
  );
}