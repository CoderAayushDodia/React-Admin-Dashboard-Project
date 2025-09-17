// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// import dashboardData from "../../public/dashboardData.json"; // Import JSON

// function ActivistManagement() {
//   const navigate = useNavigate();
//   const [activists, setActivists] = useState([]);

//   useEffect(() => {
//     setActivists(dashboardData.ActivistManagement || []);
//   }, []);

//   return (
//     <div className="main-container p-3">
//       <div className="container-body">
//         <div className="d-flex justify-content-between align-items-center mb-3 px-3 pt-3 activist-header">
//           <h4 className="">Activists Management</h4>

//           <div className="d-flex gap-2 activist-action-buttons">
//             <button className="download-btn">
//              Download <i className="fa-solid fa-download me-1"></i>
//             </button>
//             <button
//               className="add-activist-btn"
//               onClick={() => navigate("/activists/add")}
//             >
//                Add Activist <i className="fa-solid fa-plus me-1"></i>
//             </button>
//           </div>
//         </div>

//         {/* Filters */}
//         <div className="d-flex flex-lg-nowrap flex-wrap gap-3 mb-3 px-3 py-2 activist-navbar w-100">
//           {/* Search */}
//           <div className="header-left rounded d-flex align-items-center position-relative flex-grow-1">
//             <span>
//               <i className="fa-solid fa-magnifying-glass"></i>
//             </span>
//             <input
//               placeholder="Search"
//               className="border-0 shadow-none form-control flex-grow-1"
//               type="text"
//             />
//           </div>

//           {/* Region Select */}
//           <select className="form-select select-region flex-lg-grow-0">
//             <option>Select Regions</option>
//             <option>Mumbai</option>
//             <option>Pune</option>
//             <option>Nasik</option>
//           </select>

//           {/* Date Range */}
//           <div className="d-flex align-items-center gap-1 select-date flex-lg-grow-0">
//             <input type="date" className="form-control" />
//             <span>-</span>
//             <input type="date" className="form-control" />
//           </div>

//           {/* Apply Button */}
//           <button className="apply-btn flex-lg-grow-0">Apply</button>
//         </div>

//         {/* Table */}
//         <div className="table-wrapper">
//           <div className="scroll-container">
//             <table
//               className="table align-middle activist-table"
//               style={{
//                 tableLayout: "auto", // or "fixed" depending on your need
//                 minWidth: "800px", // force table to have a width bigger than container
//                 whiteSpace: "nowrap", // prevent text from wrapping
//               }}
//             >
//               <thead>
//                 <tr className="border-bottom border-top">
//                   <th>Name</th>
//                   <th>Role</th>
//                   <th>Region</th>
//                   <th>Mobile</th>
//                   {/* <th>Status</th> */}
//                   <th className="text-center"></th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {activists.length > 0 ? (
//                   activists.map((activist, index) => (
//                     <tr key={index}>
//                       <td>{activist.name}</td>
//                       <td>{activist.role}</td>
//                       <td>{activist.region}</td>
//                       <td>{activist.mobile}</td>

//                       <td className="text-center">
//                         <i className="fa-regular fa-pen-to-square mx-2"></i>
//                         <i className="fa-regular fa-trash-can mx-2"></i>
//                         <i className="fa-regular fa-eye mx-2"></i>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <p>No activists found.</p>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Pagination */}
//         <div className="d-lg-flex d-md-flex justify-content-between align-items-center mt-3 px-3 pb-3 d-none">
//           <button className="btn previous rounded-3">
//             <i className="fa-solid fa-arrow-left"></i> Previous
//           </button>
//           <div>
//             <button className="btn  mx-1 next-btn rounded-3">1</button>
//             <button className="btn  mx-1">2</button>
//             <button className="btn  mx-1">3</button>
//             <span className="mx-2">...</span>
//             <button className="btn m-1">8</button>
//             <button className="btn m-1">9</button>
//             <button className="btn m-1">10</button>
//           </div>
//           <button className="btn next-btn rounded-3">
//             Next <i className="fa-solid fa-arrow-right"></i>
//           </button>
//         </div>

//         <div className="d-sm-flex d-md-none d-none justify-content-between align-items-center mt-3 px-3 pb-3">
//           <button className="btn previous rounded-3 p-2">
//             <i className="fa-solid fa-arrow-left"></i>
//           </button>
//           <div>
//             <span>Page 1 to 10</span>
//           </div>
//           <button className="btn next-btn rounded-3 p-2">
//             <i className="fa-solid fa-arrow-right"></i>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ActivistManagement;

// // {
// //   activists.map((activist) => (
// //     <tr key={activist.id}>
// //       <td>{activist.name}</td>
// //       <td>{activist.role}</td>
// //       <td>{activist.region}</td>
// //       <td>{activist.mobile}</td>
// //       <td>
// //         <span
// //           className={`badge rounded-pill ${
// //             activist.status === "Active"
// //               ? "bg-success-subtle text-success"
// //               : "bg-danger-subtle text-danger"
// //           }`}
// //         >
// //           {activist.status}
// //         </span>
// //       </td>
// //       <td className="text-center">
// //         <i className="fa-regular fa-pen-to-square mx-2"></i>
// //         <i className="fa-regular fa-trash-can mx-2"></i>
// //         <i className="fa-regular fa-eye mx-2"></i>
// //       </td>
// //     </tr>
// //   ));
// // }

// src/components/ActivistManagement.jsx
// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";

// function ActivistManagement() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [activists, setActivists] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const API1 = "https://shramjivi-backend.onrender.com/api/activists/";

//   // ✅ Fetch activists from backend API
//   const fetchActivists = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await fetch(API1, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           // ✅ Add auth token if your API requires it
//           // Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         credentials: "include", // ✅ required if API uses cookies/sessions
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to fetch activists: ${response.status}`);
//       }

//       const data = await response.json();

//       // ✅ Ensure correct data format
//       if (Array.isArray(data)) {
//         setActivists(data);
//       } else if (data?.results) {
//         setActivists(data.results);
//       } else {
//         setActivists([]);
//       }
//     } catch (err) {
//       console.error("fetchActivists error:", err);
//       setError(err.message || "Unknown error occurred");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Fetch on mount
//   useEffect(() => {
//     fetchActivists();
//   }, []);

//   // ✅ Re-fetch if navigated back with updatedAt flag (after adding activist)
//   useEffect(() => {
//     if (location.state?.updatedAt) {
//       fetchActivists();
//       navigate(location.pathname, { replace: true, state: {} }); // clear state
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [location.state?.updatedAt]);

//   const handleDownloadExcel = () => {
//     if (!activists || activists.length === 0) {
//       alert("No data available to download.");
//       return;
//     }

//     const formattedData = activists.map((activist, index) => {
//       const formattedRole = activist.role
//         ? activist.role
//             .split("_")
//             .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//             .join(" ")
//         : "-";

//       return {
//         "#": index + 1,
//         Name: activist.name,
//         Role: formattedRole,
//         Region: activist.region?.district ?? "-",
//         Mobile: activist.phone ?? activist.mobile ?? "-",
//       };
//     });

//     // 1️⃣ Convert to worksheet
//     const worksheet = XLSX.utils.json_to_sheet(formattedData);

//     // 2️⃣ Create a workbook & append worksheet
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Activists");

//     // 3️⃣ Generate Excel binary
//     const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

//     // 4️⃣ Save file with today's date in filename
//     const date = new Date().toISOString().slice(0, 10);
//     const fileName = `activists_${date}.xlsx`;

//     const data = new Blob([excelBuffer], { type: "application/octet-stream" });
//     saveAs(data, fileName);
//   };

//   return (
//     <div className="main-container p-3">
//       <div className="container-body">
//         {/* Header Section */}
//         <div className="d-flex justify-content-between align-items-center mb-3 px-3 pt-3 activist-header">
//           <h4>Activists Management</h4>

//           <div className="d-flex gap-2 activist-action-buttons">
//             <button className="download-btn" onClick={handleDownloadExcel}>
//               Download <i className="fa-solid fa-download me-1 me-sm-0"></i>
//             </button>
//             <button
//               className="add-activist-btn"
//               onClick={() => navigate("/activists/add")}
//             >
//               Add Activist <i className="fa-solid fa-plus me-1 me-sm-0"></i>
//             </button>
//           </div>
//         </div>

//         {/* Filters Section (keep your existing filter markup here if needed) */}

//         <div className="table-wrapper">
//           <div className="scroll-container">
//             {loading ? (
//               <p className="px-3">Loading activists...</p>
//             ) : error ? (
//               <p className="px-3 text-danger">Error: {error}</p>
//             ) : activists.length === 0 ? (
//               <p className="px-3">No activists found.</p>
//             ) : (
//               <table
//                 className="table align-middle activist-table"
//                 style={{
//                   tableLayout: "auto",
//                   minWidth: "800px",
//                   whiteSpace: "nowrap",
//                 }}
//               >
//                 <thead>
//                   <tr className="border-bottom border-top">
//                     <th>Name</th>
//                     <th>Role</th>
//                     <th>Region</th>
//                     <th>Mobile</th>
//                     <th className="text-center"></th>
//                   </tr>
//                 </thead>
//                 {/* <tbody>
//                   {activists.map((activist) => (
//                     <tr key={activist.id ?? activist._id ?? Math.random()}>
//                       <td>{activist.name}</td>
//                       <td>{activist.role}</td>
//                       <td>
//                         {activist.region
//                           ? [
//                               activist.region.district,
//                               activist.region.taluka,
//                               activist.region.local_governance,
//                               activist.region.village,
//                             ]
//                               .filter(Boolean)
//                               .join(", ")
//                           : "-"}
//                       </td>
//                       <td>{activist.phone ?? activist.mobile ?? "-"}</td>
//                       <td className="text-center">
//                         <i className="fa-regular fa-pen-to-square mx-2"></i>
//                         <i className="fa-regular fa-trash-can mx-2"></i>
//                         <i className="fa-regular fa-eye mx-2"></i>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody> */}
//                 <tbody>
//                   {activists.map((activist) => {
//                     // ✅ Format role: convert snake_case -> Title Case
//                     const formattedRole = activist.role
//                       ? activist.role
//                           .split("_") // split by underscore
//                           .map(
//                             (word) =>
//                               word.charAt(0).toUpperCase() + word.slice(1)
//                           ) // capitalize each part
//                           .join(" ")
//                       : "-";

//                     return (
//                       <tr key={activist.id ?? activist._id ?? Math.random()}>
//                         <td>{activist.name}</td>

//                         {/* ✅ Show formatted role */}
//                         <td>{formattedRole}</td>

//                         {/* ✅ Show only district */}
//                         <td>{activist.region?.district ?? "-"}</td>

//                         <td>{activist.phone ?? activist.mobile ?? "-"}</td>

//                         <td className="text-center">
//                           <i className="fa-regular fa-pen-to-square mx-2"></i>
//                           <i className="fa-regular fa-trash-can mx-2"></i>
//                           <i className="fa-regular fa-eye mx-2"></i>
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             )}
//           </div>
//         </div>

//         {/* Pagination */}
//         <div className="d-lg-flex d-md-flex justify-content-between align-items-center mt-3 px-3 pb-3 d-none">
//           <button className="btn previous rounded-3">
//             <i className="fa-solid fa-arrow-left"></i> Previous
//           </button>
//           <div>
//             <button className="btn  mx-1 next-btn rounded-3">1</button>
//             <button className="btn  mx-1">2</button>
//             <button className="btn  mx-1">3</button>
//             <span className="mx-2">...</span>
//             <button className="btn m-1">8</button>
//             <button className="btn m-1">9</button>
//             <button className="btn m-1">10</button>
//           </div>
//           <button className="btn next-btn rounded-3">
//             Next <i className="fa-solid fa-arrow-right"></i>
//           </button>
//         </div>
//         <div className="d-sm-flex d-md-none d-none justify-content-between align-items-center mt-3 px-3 pb-3">
//           <button className="btn previous rounded-3 p-2">
//             <i className="fa-solid fa-arrow-left"></i>
//           </button>
//           <div>
//             <span>Page 1 to 10</span>
//           </div>
//           <button className="btn next-btn rounded-3 p-2">
//             <i className="fa-solid fa-arrow-right"></i>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ActivistManagement;


import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function ActivistManagement() {
  const navigate = useNavigate();
  const location = useLocation();

  const [activists, setActivists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // ✅ Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Fixed page size
  
  // ✅ Enhanced Filter States - Search works independently, filters use apply button
  const [search, setSearch] = useState(""); // Real-time search
  
  // Filter states (apply button system)
  const [pendingRegion, setPendingRegion] = useState("");
  const [pendingRole, setPendingRole] = useState("");
  const [appliedRegion, setAppliedRegion] = useState("");
  const [appliedRole, setAppliedRole] = useState("");
  
  const [availableRegions, setAvailableRegions] = useState([]);
  const [availableRoles, setAvailableRoles] = useState([]);

  const API1 = "https://shramjivi-backend.onrender.com/api/activists/";
  const API_DELETE = "https://shramjivi-backend.onrender.com/api/auth/users/";

  const fetchActivists = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API1, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) throw new Error(`Failed to fetch activists: ${response.status}`);

      const data = await response.json();
      const activistsList = Array.isArray(data) ? data : data?.results || [];
      setActivists(activistsList);
      
      // ✅ Extract unique regions and roles for filter dropdowns
      extractFilters(activistsList);
    } catch (err) {
      console.error("fetchActivists error:", err);
      setError(err.message || "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Extract unique regions and roles from activists data
  const extractFilters = (activistsList) => {
    // Extract unique regions
    const regions = [...new Set(
      activistsList
        .map(a => a.region?.district || a.region?.taluka || a.region?.name)
        .filter(Boolean)
    )].sort();
    
    // Extract unique roles
    const roles = [...new Set(
      activistsList
        .map(a => a.role)
        .filter(Boolean)
    )].sort();
    
    setAvailableRegions(regions);
    setAvailableRoles(roles);
  };

  useEffect(() => {
    fetchActivists();
  }, []);

  useEffect(() => {
    if (location.state?.updatedAt) {
      fetchActivists();
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state?.updatedAt, navigate, location.pathname]);

  const handleDownloadExcel = () => {
    if (!activists.length) return alert("No data available to download.");

    const formattedData = activists.map((a, i) => ({
      "#": i + 1,
      Name: a.name,
      Role: a.role
        ? a.role.split("_").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
        : "-",
      Region: a.region?.district ?? "-",
      Mobile: a.phone ?? a.mobile ?? "-",
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Activists");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const date = new Date().toISOString().slice(0, 10);
    const fileName = `activists_${date}.xlsx`;
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, fileName);
  };

  const handleEdit = (activist) => navigate("/activists/add", { state: { activist } });

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this activist?")) return;
    try {
      const res = await fetch(`${API_DELETE}${id}/`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        credentials: "include",
      });

      if (!res.ok) throw new Error(`Failed to delete activist: ${res.status}`);
      alert("Activist deleted successfully");
      fetchActivists();
    } catch (err) {
      console.error("Delete error:", err);
      alert(err.message || "Failed to delete activist");
    }
  };

  // 🔎 Optimized filtering logic - search is real-time, filters use apply button
  const filteredActivists = useMemo(() => {
    return activists.filter((activist) => {
      // ✅ Search filter - real-time search across name, role, region, phone
      const searchLower = search.toLowerCase().trim();
      const matchesSearch = !searchLower || (
        activist.name?.toLowerCase().includes(searchLower) ||
        activist.role?.toLowerCase().includes(searchLower) ||
        activist.region?.district?.toLowerCase().includes(searchLower) ||
        activist.region?.taluka?.toLowerCase().includes(searchLower) ||
        activist.phone?.toLowerCase().includes(searchLower) ||
        activist.mobile?.toLowerCase().includes(searchLower) ||
        activist.email?.toLowerCase().includes(searchLower)
      );

      // ✅ Region filter - apply button system
      const activistRegion = activist.region?.district || activist.region?.taluka || activist.region?.name;
      const matchesRegion = !appliedRegion || activistRegion === appliedRegion;

      // ✅ Role filter - apply button system
      const matchesRole = !appliedRole || activist.role === appliedRole;

      return matchesSearch && matchesRegion && matchesRole;
    });
  }, [activists, search, appliedRegion, appliedRole]);

  // ✅ Pagination logic for filtered activists
  const totalPages = Math.ceil(filteredActivists.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedActivists = filteredActivists.slice(startIndex, endIndex);
  const hasNext = currentPage < totalPages;
  const hasPrevious = currentPage > 1;

  // ✅ Apply filters function - applies only region and role filters
  const applyFilters = () => {
    setAppliedRegion(pendingRegion);
    setAppliedRole(pendingRole);
    
    console.log("Filters applied:", {
      region: pendingRegion,
      role: pendingRole
    });
  };

  // ✅ Clear all filters function - clears region and role filters only
  const clearFilters = () => {
    // Clear pending states (UI)
    setPendingRegion("");
    setPendingRole("");
    
    // Clear applied states (actual filtering)
    setAppliedRegion("");
    setAppliedRole("");
  };

  // ✅ Pagination functions
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handlePreviousPage = () => {
    if (hasPrevious) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (hasNext) {
      setCurrentPage(currentPage + 1);
    }
  };

  // ✅ Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, appliedRegion, appliedRole]);

  return (
    <div className="main-container p-3">
      <div className="container-body">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-3 px-3 pt-3 activist-header">
          <h4>Activists Management</h4>
          <div className="d-flex gap-2 activist-action-buttons">
            <button className="download-btn" onClick={handleDownloadExcel}>
              Download <i className="fa-solid fa-download me-1"></i>
            </button>
            <button className="add-activist-btn" onClick={() => navigate("/activists/add")}>
              Add Activist <i className="fa-solid fa-plus me-1"></i>
            </button>
          </div>
        </div>

        {/* Filters Section */}
        <div className="d-flex flex-lg-nowrap flex-wrap gap-3 mb-3 px-3 py-2 activist-navbar w-100">
          {/* Search */}
          <div className="header-left rounded d-flex align-items-center position-relative flex-grow-1">
            <span><i className="fa-solid fa-magnifying-glass"></i></span>
            <input
              placeholder="Search by name, role, region, phone..."
              className="border-0 shadow-none form-control flex-grow-1"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {/* ✅ Clear search button */}
            {search && (
              <span 
                className="position-absolute end-0 me-3" 
                style={{ cursor: 'pointer', zIndex: 10 }}
                onClick={() => setSearch("")}
              >
                <i className="fa-solid fa-times text-muted"></i>
              </span>
            )}
          </div>

          {/* ✅ Region Filter - Now Functional */}
          <select 
            className="form-select select-region flex-lg-grow-0"
            value={pendingRegion}
            onChange={(e) => setPendingRegion(e.target.value)}
          >
            <option value="">All Regions</option>
            {availableRegions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>

          {/* ✅ Role Filter - New Addition */}
          <select 
            className="form-select select-region flex-lg-grow-0"
            value={pendingRole}
            onChange={(e) => setPendingRole(e.target.value)}
          >
            <option value="">All Roles</option>
            {availableRoles.map((role) => (
              <option key={role} value={role}>
                {role ? role.split("_").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") : role}
              </option>
            ))}
          </select>


          {/* ✅ Apply Button - Matches theme styling */}
          <button 
            className="apply-btn flex-lg-grow-0 d-flex align-items-center"
            onClick={applyFilters}
            title="Apply current filters"
            style={{ 
              whiteSpace: 'nowrap',
              minHeight: '38px',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            <i className="fa-solid fa-check me-1"></i>
            Apply
          </button>

          {/* ✅ Clear Filters Button - Matches theme styling */}
          <button 
            className="btn btn-outline-secondary flex-lg-grow-0 d-flex align-items-center"
            onClick={clearFilters}
            title="Clear all filters"
            style={{ 
              whiteSpace: 'nowrap',
              minHeight: '38px',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            <i className="fa-solid fa-times me-1"></i>
            <span className="d-none d-lg-inline">Clear</span>
          </button>
        </div>

        {/* ✅ Unapplied Changes Indicator - Only for region and role filters */}
        {(pendingRegion !== appliedRegion || pendingRole !== appliedRole) && (
          <div className="alert alert-warning py-2 px-3 mx-3 mb-2 d-flex align-items-center" role="alert">
            <i className="fa-solid fa-exclamation-triangle me-2"></i>
            <span className="small">You have unapplied filter changes. Click "Apply" to see results.</span>
          </div>
        )}

        {/* ✅ Filter Results Info */}
        <div className="d-flex justify-content-between align-items-center px-3 mb-2">
          <div className="text-muted small">
            Showing {filteredActivists.length} of {activists.length} activists
            {(search || appliedRegion || appliedRole) && (
              <span className="text-primary"> (filtered)</span>
            )}
            {totalPages > 1 && (
              <span className="text-muted"> • Page {currentPage} of {totalPages}</span>
            )}
          </div>
          
          {/* ✅ Active Filters Display - Shows search and applied filters with grey theme */}
          {(search || appliedRegion || appliedRole) && (
            <div className="d-flex flex-wrap gap-1">
              {search && (
                <span className="badge bg-light text-dark border">
                  Search: "{search}" 
                  <i className="fa-solid fa-times ms-1" style={{ cursor: 'pointer' }} onClick={() => setSearch("")}></i>
                </span>
              )}
              {appliedRegion && (
                <span className="badge bg-light text-dark border">
                  Region: {appliedRegion}
                  <i className="fa-solid fa-times ms-1" style={{ cursor: 'pointer' }} onClick={() => {
                    setAppliedRegion("");
                    setPendingRegion("");
                  }}></i>
                </span>
              )}
              {appliedRole && (
                <span className="badge bg-light text-dark border">
                  Role: {appliedRole.split("_").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                  <i className="fa-solid fa-times ms-1" style={{ cursor: 'pointer' }} onClick={() => {
                    setAppliedRole("");
                    setPendingRole("");
                  }}></i>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Table */}
        <div className="table-wrapper">
          <div className="scroll-container">
            {loading ? (
              <p className="px-3">Loading activists...</p>
            ) : error ? (
              <p className="px-3 text-danger">Error: {error}</p>
            ) : filteredActivists.length === 0 ? (
              <p className="px-3">No activists found.</p>
            ) : (
              <table
                className="table align-middle activist-table"
                style={{ tableLayout: "auto", minWidth: "800px", whiteSpace: "nowrap" }}
              >
                <thead>
                  <tr className="border-bottom border-top">
                    <th>Name</th>
                    <th>Role</th>
                    <th>Region</th>
                    <th>Mobile</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedActivists.map((activist) => {
                    const formattedRole = activist.role
                      ? activist.role.split("_").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
                      : "-";

                    return (
                      <tr key={activist.id}>
                        <td>{activist.name}</td>
                        <td>{formattedRole}</td>
                        <td>{activist.region?.district ?? "-"}</td>
                        <td>{activist.phone ?? activist.mobile ?? "-"}</td>
                        <td className="text-center">
                          <i
                            className="fa-regular fa-pen-to-square mx-2"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleEdit(activist)}
                          ></i>
                          <i
                            className="fa-regular fa-trash-can mx-2"
                            style={{ cursor: "pointer", color: "red" }}
                            onClick={() => handleDelete(activist.id)}
                          ></i>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* ✅ Functional Pagination */}
        {totalPages > 1 && (
          <div className="d-lg-flex d-md-flex justify-content-between align-items-center mt-3 px-3 pb-3">
            {/* Previous Button */}
            <button 
              className={`btn previous rounded-3 ${!hasPrevious ? 'disabled' : ''}`}
              onClick={handlePreviousPage}
              disabled={!hasPrevious}
              style={{ 
                opacity: hasPrevious ? 1 : 0.5,
                cursor: hasPrevious ? 'pointer' : 'not-allowed'
              }}
            >
              <i className="fa-solid fa-arrow-left"></i> Previous
            </button>

            {/* Page Numbers */}
            <div className="d-flex align-items-center">
              {/* Show page numbers */}
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    className={`btn mx-1 rounded-3 ${
                      currentPage === pageNum ? 'next-btn' : ''
                    }`}
                    onClick={() => handlePageChange(pageNum)}
                    style={{
                      backgroundColor: currentPage === pageNum ? '#e32124' : '#fff',
                      color: currentPage === pageNum ? '#fff' : '#000',
                      border: '1px solid #d5d7da'
                    }}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              {/* Show ellipsis if there are more pages */}
              {totalPages > 5 && currentPage < totalPages - 2 && (
                <span className="mx-2">...</span>
              )}
              
              {/* Show last page if not already shown */}
              {totalPages > 5 && currentPage < totalPages - 2 && (
                <button
                  className="btn mx-1 rounded-3"
                  onClick={() => handlePageChange(totalPages)}
                  style={{
                    backgroundColor: currentPage === totalPages ? '#e32124' : '#fff',
                    color: currentPage === totalPages ? '#fff' : '#000',
                    border: '1px solid #d5d7da'
                  }}
                >
                  {totalPages}
                </button>
              )}
            </div>

            {/* Next Button */}
            <button 
              className={`btn next-btn rounded-3 ${!hasNext ? 'disabled' : ''}`}
              onClick={handleNextPage}
              disabled={!hasNext}
              style={{ 
                opacity: hasNext ? 1 : 0.5,
                cursor: hasNext ? 'pointer' : 'not-allowed'
              }}
            >
              Next <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        )}

        {/* ✅ Pagination Info */}
        {totalPages > 1 && (
          <div className="text-center text-muted small px-3 pb-2">
            Page {currentPage} of {totalPages} • {filteredActivists.length} total activists
          </div>
        )}
      </div>
    </div>
  );
}

export default ActivistManagement;

