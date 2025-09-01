import { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Home from "./components/Home";
import LogIn from "./components/LogIn";

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    fetch("/dashboardData.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to load JSON");
        }
        return res.json();
      })
      .then((data) => setDashboardData(data))
      .catch((err) => console.error("Error loading JSON:", err));
  }, []);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <Routes>
      <Route
        path="/login"
        element={
          <div className="login-wrapper">
            <LogIn />
          </div>
        }
      />

      <Route
        path="/"
        element={
          <div className="grid-container position-relative">
            <Header
              OpenSidebar={OpenSidebar}
              regions={dashboardData?.regions || []}
              notifications={dashboardData?.notifications || []}
            />
            <Sidebar
              openSidebarToggle={openSidebarToggle}
              OpenSidebar={OpenSidebar}
              menuItems={dashboardData?.sidebarMenu || []}
            />
            <Home
              stats={dashboardData?.stats || []}
              memberShipChart={dashboardData?.memberShipChart || []}
              collectionTrends={dashboardData?.collectionTrends || []}
              topPerformers={dashboardData?.topPerformers || []}
              newVsOldMembers={dashboardData?.newVsOldMembers || []}
              menuDropdown={dashboardData?.menuDropdown || []}
              financialSummaryYears={dashboardData?.financialSummaryYears || []}
            />
          </div>
        }
      />
    </Routes>
  );
}

export default App;
