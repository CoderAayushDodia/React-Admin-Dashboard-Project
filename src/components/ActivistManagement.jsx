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
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function ActivistManagement() {
  const navigate = useNavigate();
  const location = useLocation();

  const [activists, setActivists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API1 = "https://shramjivi-backend.onrender.com/api/activists/";

  // ✅ Fetch activists from backend API
  const fetchActivists = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API1, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // ✅ Add auth token if your API requires it
          // Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include", // ✅ required if API uses cookies/sessions
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch activists: ${response.status}`);
      }

      const data = await response.json();

      // ✅ Ensure correct data format
      if (Array.isArray(data)) {
        setActivists(data);
      } else if (data?.results) {
        setActivists(data.results);
      } else {
        setActivists([]);
      }
    } catch (err) {
      console.error("fetchActivists error:", err);
      setError(err.message || "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch on mount
  useEffect(() => {
    fetchActivists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ✅ Re-fetch if navigated back with updatedAt flag (after adding activist)
  useEffect(() => {
    if (location.state?.updatedAt) {
      fetchActivists();
      navigate(location.pathname, { replace: true, state: {} }); // clear state
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state?.updatedAt]);

  return (
    <div className="main-container p-3">
      <div className="container-body">
        {/* Header Section */}
        <div className="d-flex justify-content-between align-items-center mb-3 px-3 pt-3 activist-header">
          <h4>Activists Management</h4>

          <div className="d-flex gap-2 activist-action-buttons">
            <button className="download-btn">
              Download <i className="fa-solid fa-download me-1"></i>
            </button>
            <button
              className="add-activist-btn"
              onClick={() => navigate("/activists/add")}
            >
              Add Activist <i className="fa-solid fa-plus me-1"></i>
            </button>
          </div>
        </div>

        {/* Filters Section (keep your existing filter markup here if needed) */}

        <div className="table-wrapper">
          <div className="scroll-container">
            {loading ? (
              <p className="px-3">Loading activists...</p>
            ) : error ? (
              <p className="px-3 text-danger">Error: {error}</p>
            ) : activists.length === 0 ? (
              <p className="px-3">No activists found.</p>
            ) : (
              <table
                className="table align-middle activist-table"
                style={{
                  tableLayout: "auto",
                  minWidth: "800px",
                  whiteSpace: "nowrap",
                }}
              >
                <thead>
                  <tr className="border-bottom border-top">
                    <th>Name</th>
                    <th>Role</th>
                    <th>Region</th>
                    <th>Mobile</th>
                    <th className="text-center"></th>
                  </tr>
                </thead>
                <tbody>
                  {activists.map((activist) => (
                    <tr key={activist.id ?? activist._id ?? Math.random()}>
                      <td>{activist.name}</td>
                      <td>{activist.role}</td>
                      <td>
                        {activist.region
                          ? [
                              activist.region.district,
                              activist.region.taluka,
                              activist.region.local_governance,
                              activist.region.village,
                            ]
                              .filter(Boolean)
                              .join(", ")
                          : "-"}
                      </td>
                      <td>{activist.phone ?? activist.mobile ?? "-"}</td>
                      <td className="text-center">
                        <i className="fa-regular fa-pen-to-square mx-2"></i>
                        <i className="fa-regular fa-trash-can mx-2"></i>
                        <i className="fa-regular fa-eye mx-2"></i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Keep pagination component here if you have one */}
      </div>
    </div>
  );
}

export default ActivistManagement;

