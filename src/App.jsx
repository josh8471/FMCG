import { Routes, Route } from "react-router-dom";
import Layout from "./context/Layout";

import Home from "./pages/Home";
import BeatPlanning from "./pages/BeatPlanning";
import Explore from "./pages/Explore";
import Onboarding from "./pages/Onboarding";
import Profile from "./pages/Profile"; // Import Profile page
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/beat-planning" element={<BeatPlanning />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/profile" element={<Profile />} /> {/* Add this line */}
      </Route>
    </Routes>
  );
}

export default App;
