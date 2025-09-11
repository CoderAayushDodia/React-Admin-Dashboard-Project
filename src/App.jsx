import { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Home from "./components/Home";
import LogIn from "./components/LogIn";
import ActivistManagement from "./components/ActivistManagement";
import AddActivist from "./components/AddActivist";
import SabhasadManagement from "./components/SabhasadManagement";
import AddSabhasad from "./components/AddSabhasad";
import ReceiptsManagement from "./components/RecieptsManagement";
import AddReciepts from "./components/AddReciepts";
import Announcements from "./components/Announcements";
import AddAnnouncements from "./components/AddAnnouncements";

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [activists, setActivists] = useState([]);

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

  const addNewActivist = (newActivist) => {
    setActivists((prev) => [
      ...prev,
      { ...newActivist, id: Date.now(), status: "Active" },
    ]);
  };

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="login-wrapper">
            <LogIn />
          </div>
        }
      />
      {/* Home Dashboard */}
      <Route
        path="/dashboard"
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
      {/* Activist Management */}
      <Route
        path="/activists"
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
            <ActivistManagement activists={activists}/>
          </div>
        }
      />

      {/* Add Activist */}
      <Route
        path="/activists/add"
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
            <AddActivist addNewActivist={addNewActivist} />
          </div>
        }
      />

      {/* Sabhasad Management */}
      <Route
        path="/sabhasad"
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
            <SabhasadManagement activists={activists}/>
          </div>
        }
      />

      {/* Add Sabhasad */}
      <Route
        path="/sabhasad/add"
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
            <AddSabhasad addNewActivist={addNewActivist} />
          </div>
        }
      />
      {/* Receipts Management */}
      <Route
        path="/receipts"
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
            <ReceiptsManagement activists={activists}/>
          </div>
        }
      />

      {/* Add Reciepta */}
      <Route
        path="/receipts/add"
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
            <AddReciepts addNewActivist={addNewActivist} />
          </div>
        }
      />
      {/* Announcements */}
      <Route
        path="/announcements"
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
            <Announcements activists={activists}/>
          </div>
        }
      />

      {/* Add Announcements */}
      <Route
        path="/announcements/add"
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
            <AddAnnouncements addNewActivist={addNewActivist} />
          </div>
        }
      />
    </Routes>
  );
}

export default App;

// import { useEffect, useState } from "react";
// import "./App.css";
// import { Routes, Route } from "react-router-dom";

// import DashboardLayout from "./components/DashboardLayout";
// import Home from "./components/Home";
// import ActivistManagement from "./components/ActivistManagement";
// import SabhasadManagement from "./components/SabhasadManagement";
// import LogIn from "./components/LogIn";

// function App() {
//   const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
//   const [dashboardData, setDashboardData] = useState(null);

//   useEffect(() => {
//     fetch("/dashboardData.json")
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to load JSON");
//         return res.json();
//       })
//       .then((data) => setDashboardData(data))
//       .catch((err) => console.error("Error loading JSON:", err));
//   }, []);

//   const OpenSidebar = () => setOpenSidebarToggle((s) => !s);

//   return (
//     <Routes>
//       {/* Login Page */}
//       <Route
//         path="/"
//         element={
//           <div className="login-wrapper">
//             <LogIn />
//           </div>
//         }
//       />

//       {/* Dashboard Layout */}
//       <Route
//         path="/dashboard/*"
//         element={
//           <DashboardLayout
//             dashboardData={dashboardData}
//             openSidebarToggle={openSidebarToggle}
//             OpenSidebar={OpenSidebar}
//           />
//         }
//       >
//         {/* Home Dashboard */}
//         <Route
//           index
//           element={
//             <Home
//               stats={dashboardData?.stats || []}
//               memberShipChart={dashboardData?.memberShipChart || []}
//               collectionTrends={dashboardData?.collectionTrends || []}
//               topPerformers={dashboardData?.topPerformers || []}
//               newVsOldMembers={dashboardData?.newVsOldMembers || []}
//               menuDropdown={dashboardData?.menuDropdown || []}
//               financialSummaryYears={dashboardData?.financialSummaryYears || []}
//             />
//           }
//         />

//         {/* Management Pages */}
//         <Route path="activists" element={<ActivistManagement />} />
//         <Route path="sabhasad" element={<SabhasadManagement />} />
//       </Route>
//     </Routes>
//   );
// }

// export default App;
