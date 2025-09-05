// import React from "react";
// import { Outlet } from "react-router-dom";
// import Sidebar from "./Sidebar";
// import Header from "./Header";

// function DashboardLayout({ dashboardData, openSidebarToggle, OpenSidebar }) {
//   return (
//     <div
//       className="grid-container"
//       style={{
//         display: "grid",
//         gridTemplateColumns: "250px", // Sidebar fixed, main fills remaining space
//         gridTemplateRows: "auto", // Header on top, main content fills space
//         minHeight: "100vh",
//       }}
//     >
//       {/* Sidebar */}
//       <Sidebar
//         openSidebarToggle={openSidebarToggle}
//         OpenSidebar={OpenSidebar}
//         menuItems={dashboardData?.sidebarMenu || []}
//       />

//       {/* Header */}
//       <Header
//         OpenSidebar={OpenSidebar}
//         regions={dashboardData?.regions || []}
//         notifications={dashboardData?.notifications || []}
//         style={{ gridColumn: "2 / 3" }}
//       />

//       {/* Main Content */}
//       <main
//         style={{
//           gridColumn: "2 / 3", // Occupies second column
//           gridRow: "2 / 3", // Below header
//           backgroundColor: "#fff",
//           padding: "1rem",
//           overflowY: "auto",
//         }}
//       >
//         <Outlet /> {/* renders nested route content here */}
//       </main>
//     </div>
//   );
// }

// export default DashboardLayout;
