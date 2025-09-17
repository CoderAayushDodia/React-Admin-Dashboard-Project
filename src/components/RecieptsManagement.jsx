// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// import dashboardData from "../../public/dashboardData.json"; // Import JSON

// function ReceiptsManagement() {
//   const navigate = useNavigate();
//   const [activists, setActivists] = useState([]);

//   useEffect(() => {
//     setActivists(dashboardData.ActivistManagement || []);
//   }, []);

//   return (
//     <div className="main-container p-3">
//       <div className="container-body">
//         <div className="d-flex justify-content-between align-items-center mb-3 px-3 pt-3 activist-header">
//           <h4 className="">Receipts Management</h4>

//           <div className="d-flex gap-2 activist-action-buttons">
//             <button className="download-btn">
//              Download <i className="fa-solid fa-download me-1"></i>
//             </button>
//             <button
//               className="add-activist-btn"
//               onClick={() => navigate("/receipts/add")}
//             >
//                Add Receipt <i className="fa-solid fa-plus me-1"></i>
//             </button>
//           </div>
//         </div>

//         {/* Filters */}
//         <div className="d-flex flex-lg-nowrap flex-wrap gap-3 mb-3 px-3 py-2 activist-navbar w-100">
//           {/* Search */}
//           <div className="header-left rounded d-flex align-items-center position-relative">
//             <span>
//               <i className="fa-solid fa-magnifying-glass"></i>
//             </span>
//             <input
//               placeholder="Search"
//               className="border-0 shadow-none form-control flex-grow-0"
//               type="text"
//             />
//           </div>

//            {/* Campaingm Select */}
//           <select className="form-select select-campaign flex-lg-grow-0">
//             <option>Select Campaign</option>
//             <option>Mumbai</option>
//             <option>Pune</option>
//             <option>Nasik</option>
//           </select>

//           {/* Region Select */}
//           <select className="form-select select-activist-type flex-lg-grow-0">
//             <option>Select Activist Type</option>
//             <option>Mumbai</option>
//             <option>Pune</option>
//             <option>Nasik</option>
//           </select>

//           {/* Date Range */}
//           <div className="d-flex align-items-center gap-1 select-date flex-lg-grow-0 flex-sm-grow-1">
//             <input type="date" className="form-control" />
//             <span>-</span>
//             <input type="date" className="form-control" />
//           </div>

//           {/* Apply Button */}
//           {/* <button className="apply-btn-reciepts flex-lg-grow-0">Apply</button> */}
//           <button className="apply-btn flex-lg-grow-2 flex-md-grow-1">Apply</button>
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
//                   <th>Receipt Batch ID</th>
//                   <th>Date</th>
//                   <th>Name</th>
//                   <th>Allocated Region</th>
//                   <th>Age</th>
//                   <th>Mobile</th>
//                   <th>Collected Amount</th>
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

// export default ReceiptsManagement;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API1 = "https://shramjivi-backend.onrender.com/api/receipt-books/";

function ReceiptsManagement() {
  const navigate = useNavigate();
  const [activists, setActivists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Fetch Function
  const fetchReciept = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API1, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // ✅ Add auth token if required
          // Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include", // ✅ if API uses cookies/sessions
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch activists: ${response.status}`);
      }

      const data = await response.json();

      // ✅ Handle data format (results array or direct array)
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
    fetchReciept();
  }, []);

  return (
    <div className="main-container p-3">
      <div className="container-body">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-3 px-3 pt-3 activist-header">
          <h4>Receipts Management</h4>

          <div className="d-flex gap-2 activist-action-buttons">
            <button className="download-btn">
              Download <i className="fa-solid fa-download me-1"></i>
            </button>
            <button
              className="add-activist-btn"
              onClick={() => navigate("/receipts/add")}
            >
              Add Receipt <i className="fa-solid fa-plus me-1"></i>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="d-flex flex-lg-nowrap flex-wrap gap-3 mb-3 px-3 py-2 activist-navbar w-100">
          {/* Search */}
          <div className="header-left rounded d-flex align-items-center position-relative">
            <span>
              <i className="fa-solid fa-magnifying-glass"></i>
            </span>
            <input
              placeholder="Search"
              className="border-0 shadow-none form-control flex-grow-0"
              type="text"
            />
          </div>

          {/* Campaign Select */}
          <select className="form-select select-campaign flex-lg-grow-0">
            <option>Select Campaign</option>
            <option>Mumbai</option>
            <option>Pune</option>
            <option>Nasik</option>
          </select>

          {/* Region Select */}
          <select className="form-select select-activist-type flex-lg-grow-0">
            <option>Select Activist Type</option>
            <option>Mumbai</option>
            <option>Pune</option>
            <option>Nasik</option>
          </select>

          {/* Date Range */}
          <div className="d-flex align-items-center gap-1 select-date flex-lg-grow-0 flex-sm-grow-1">
            <input type="date" className="form-control" />
            <span>-</span>
            <input type="date" className="form-control" />
          </div>

          <button className="apply-btn flex-lg-grow-2 flex-md-grow-1">
            Apply
          </button>
        </div>

        {/* Table */}
        <div className="table-wrapper">
          <div className="scroll-container">
            {loading ? (
              <p className="px-3">Loading receipts...</p>
            ) : error ? (
              <p className="px-3 text-danger">Error: {error}</p>
            ) : activists.length > 0 ? (
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
                    <th>Receipt Batch ID</th>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Allocated Region</th>
                    <th>Age</th>
                    <th>Mobile</th>
                    <th>Collected Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {activists.map((receipt) => (
                    <tr key={receipt.id}>
                      <td>{receipt.book_number}</td>
                      <td>
                        {receipt.upload_date
                          ? new Date(receipt.upload_date).toLocaleDateString()
                          : "-"}
                      </td>
                      <td>{receipt.assigned_to_name || "-"}</td>
                      <td>{receipt.assigned_district || "-"}</td>
                      <td>{receipt.assigned_age || "-"}</td>
                      <td>{receipt.assigned_phone || "-"}</td>
                      <td>{receipt.total_collection}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="px-3">No receipts found.</p>
            )}
          </div>
        </div>

        {/* Pagination (same as before) */}
      </div>
    </div>
  );
}

export default ReceiptsManagement;

// {
//   activists.map((activist) => (
//     <tr key={activist.id}>
//       <td>{activist.name}</td>
//       <td>{activist.role}</td>
//       <td>{activist.region}</td>
//       <td>{activist.mobile}</td>
//       <td>
//         <span
//           className={`badge rounded-pill ${
//             activist.status === "Active"
//               ? "bg-success-subtle text-success"
//               : "bg-danger-subtle text-danger"
//           }`}
//         >
//           {activist.status}
//         </span>
//       </td>
//       <td className="text-center">
//         <i className="fa-regular fa-pen-to-square mx-2"></i>
//         <i className="fa-regular fa-trash-can mx-2"></i>
//         <i className="fa-regular fa-eye mx-2"></i>
//       </td>
//     </tr>
//   ));
// }
