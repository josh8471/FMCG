import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import AreaBtn from "../components/AreaBtn";

import { FaPlus } from "react-icons/fa";

import AddSalesman from "../components/AddSalesmen";

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const hideSearchRoutes = [
    "/home",
    "/Home",
    "/settings",
    "/Onboarding",
    "/profile",
    "/salesman-management",
    "/Explore",
    "/",
  ];

  const showSearch = !hideSearchRoutes.includes(location.pathname);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [showCreateArea, setShowCreateArea] = useState(false);
  const [showCreateBeat, setShowCreateBeat] = useState(false);
  const [showCreateProduct, setShowCreateProduct] = useState(false);

  const [salesmen, setSalesmen] = useState([]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingSalesman, setEditingSalesman] = useState(null);

  let title = "Home";
  let actions = null;

  if (location.pathname === "/beat-planning") {
    title = "Beat Planning";
    actions = (
      <>
        <AreaBtn
          label="Create Area"
          icon={FaPlus}
          size="sm"
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

  if (location.pathname === "/Product") {
    title = "Product";
    actions = (
      <>
        <AreaBtn
          label="Add New Product"
          icon={FaPlus}
          onClick={() => navigate("/product/AddProduct")}
        />
      </>
    );
  }

  if (location.pathname === "/salesman-management") {
    title = "Salesman Management";
    actions = (
      <>
        <AreaBtn
          label="Add Salesman"
          icon={FaPlus}
          onClick={() => {
            setEditingSalesman(null);
            setShowAddModal(true);
          }}
        />
      </>
    );
  }

  return (
    
    <div className="min-h-screen bg-gray-50 flex">
      <Toaster position="top-right" />
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
          showSearch={showSearch}
        />

        {showAddModal && (
          <div className="modal-overlay">
            <div className="modal-box">
              <AddSalesman
                initialData={editingSalesman}
                onAdd={(data) => {
                  if (editingSalesman) {
                    setSalesmen((prev) =>
                      prev.map((s) => (s.id === editingSalesman.id ? { ...s, ...data } : s))
                    );
                  } else {
                    setSalesmen((prev) => [...prev, data]);
                  }
                  setShowAddModal(false);
                  setEditingSalesman(null);
                }}
                onClose={() => {
                  setShowAddModal(false);
                  setEditingSalesman(null);
                }}
              />
            </div>
          </div>
        )}

        <main className="pt-20 px-6">
          <Outlet
            context={{
              showCreateArea,
              setShowCreateArea,
              showCreateBeat,
              setShowCreateBeat,
              searchTerm,
              setSearchTerm,
              showCreateProduct,
              setShowCreateProduct,

              salesmen, 
              setSalesmen,
              setShowAddModal,
              setEditingSalesman,
              editingSalesman,
            }}
          />
        </main>
      </div>
    </div>
  );
};





export default Layout;
