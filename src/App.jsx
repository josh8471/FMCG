import { Routes, Route } from "react-router-dom";
import Layout from "./context/Layout";
import Settings from "./pages/Settings";
import Product from "./pages/Product";
import Home from "./pages/Home";
import BeatPlanning from "./pages/BeatPlanning";
import Explore from "./pages/Explore";
import Onboarding from "./pages/Onboarding";
import Profile from "./pages/Profile";
import AddProductPage from "./pages/AddProductPage";
import SalesmanManagement from "./pages/SalesmanManagement";
import AddSalesmen from "./components/AddSalesmen";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/beat-planning" element={<BeatPlanning />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/Product" element={<Product />} />
        <Route path="/product/AddProduct" element={<AddProductPage />} />
        <Route path="/product/edit/:id" element={<AddProductPage />} />
        <Route path="/add-product" element={<AddProductPage />} />
        <Route path="/salesman-management" element={<SalesmanManagement />} />
        <Route path="/AddSalesman" element={<AddSalesmen />} />
      </Route>
    </Routes>
  );
}

export default App;
