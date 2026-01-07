import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { FaPlus } from "react-icons/fa";
import AreaBtn from "../components/AreaBtn";

const Layout = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false); 
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateArea, setShowCreateArea] = useState(false);
  const [showCreateBeat, setShowCreateBeat] = useState(false);

  let title = "Home";
  let actions = null;

  if (location.pathname === "/beat-planning") {
    title = "Beat Planning";
    actions = (
      <>
        <AreaBtn
          label="Create Area"
          icon={FaPlus}
          variant="secondary"
          onClick={() => setShowCreateArea(true)}
        />
        <AreaBtn
          label="Create New Beat"
          icon={FaPlus}
          onClick={() => setShowCreateBeat(true)}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      <div 
        className={`flex flex-col min-h-screen w-full transition-all duration-300
          ${isCollapsed ? "lg:ml-20" : "lg:ml-64"}`}
      >
        <Header
          title={title}
          actions={actions}
          toggleSidebar={() => setSidebarOpen(true)}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          isCollapsed={isCollapsed}
        />

       
        <main className="pt-20 px-6">
          <Outlet
            context={{
              showCreateArea,
              setShowCreateArea,
              showCreateBeat,
              setShowCreateBeat,
              searchTerm,
            }}
          />
        </main>
      </div>
    </div>
  );
};

export default Layout;