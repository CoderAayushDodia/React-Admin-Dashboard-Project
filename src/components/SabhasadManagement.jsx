// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// import dashboardData from "../../public/dashboardData.json"; // Import JSON

// function SabhasadManagement() {
//   const navigate = useNavigate();
//   const [activists, setActivists] = useState([]);

//   useEffect(() => {
//     setActivists(dashboardData.ActivistManagement || []);
//   }, []);

//   return (
//     <div className="main-container p-3">
//       <div className="container-body">
//         <div className="d-flex justify-content-between align-items-center mb-3 px-3 pt-3 activist-header">
//           <h4 className="">Sabhasad Management</h4>

//           <div className="d-flex gap-2 activist-action-buttons">
//             <button className="download-btn">
//              Download <i className="fa-solid fa-download me-1"></i>
//             </button>
//             <button
//               className="add-activist-btn"
//               onClick={() => navigate("/sabhasad/add")}
//             >
//                Add Sabhasad <i className="fa-solid fa-plus me-1"></i>
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
//           <select className="form-select select-region flex-lg-grow-0" name="donor-type">
//             <option>Select Donor Type</option>
//             <option>Mumbai</option>
//             <option>Pune</option>
//             <option>Nasik</option>
//           </select>

//           {/* Date Range */}
//           <div className="d-flex align-items-center gap-1 select-date flex-lg-grow-0">
//             <input type="date" name="date" className="form-control" />
//             <span>-</span>
//             <input type="date" name="date" className="form-control" />
//           </div>

//           {/* Apply Button */}
//           <button className="apply-btn flex-lg-grow-0 flex-md-grow-1">Apply</button>
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
//                   <th>Reciept ID</th>
//                   <th>Name</th>
//                   <th>Gender</th>
//                   <th>Region</th>
//                   <th>Collector</th>
//                   <th>amount</th>
//                   <th>Date</th>
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

// export default SabhasadManagement;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SabhasadManagement() {
  const navigate = useNavigate();
  const [sabhasads, setSabhasads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ GET Method to fetch sabhasads
  const getSabhasads = async () => {
    try {
      setLoading(true);

      // 🔑 Get token from localStorage (adjust key if stored differently)
      //const token = localStorage.getItem("token");

      const response = await fetch(
        "https://shramjivi-backend.onrender.com/api/receipts/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            //...(token && { Authorization: `Bearer ${token}` }), // add token if exists
          },
          credentials : "include", // include cookies if needed
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Unauthorized! Please login again.");
        }
        throw new Error(`Failed to fetch data: ${response.status}`);
      }

      const data = await response.json();
      setSabhasads(data.results || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSabhasads();
  }, []);

  return (
    <div className="main-container p-3">
      <div className="container-body">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-3 px-3 pt-3 activist-header">
          <h4>Sabhasad Management</h4>

          <div className="d-flex gap-2 activist-action-buttons">
            <button className="download-btn">
              Download <i className="fa-solid fa-download me-1"></i>
            </button>
            <button
              className="add-activist-btn"
              onClick={() => navigate("/sabhasad/add")}
            >
              Add Sabhasad <i className="fa-solid fa-plus me-1"></i>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="d-flex flex-lg-nowrap flex-wrap gap-3 mb-3 px-3 py-2 activist-navbar w-100">
          {/* Search */}
          <div className="header-left rounded d-flex align-items-center position-relative flex-grow-1">
            <span>
              <i className="fa-solid fa-magnifying-glass"></i>
            </span>
            <input
              placeholder="Search"
              className="border-0 shadow-none form-control flex-grow-1"
              type="text"
            />
          </div>

          {/* Region Select */}
          <select className="form-select select-region flex-lg-grow-0" name="donor-type">
            <option>Select Donor Type</option>
            <option>Mumbai</option>
            <option>Pune</option>
            <option>Nasik</option>
          </select>

          {/* Date Range */}
          <div className="d-flex align-items-center gap-1 select-date flex-lg-grow-0">
            <input type="date" name="date" className="form-control" />
            <span>-</span>
            <input type="date" name="date" className="form-control" />
          </div>

          {/* Apply Button */}
          <button className="apply-btn flex-lg-grow-0 flex-md-grow-1">Apply</button>
        </div>

        {/* Table */}
        <div className="table-wrapper">
          <div className="scroll-container">
            {loading ? (
              <p className="text-center">Loading data...</p>
            ) : error ? (
              <p className="text-danger text-center">{error}</p>
            ) : sabhasads.length > 0 ? (
              <table
                className="table align-middle activist-table"
                style={{
                  tableLayout: "auto",
                  minWidth: "800px",
                  whiteSpace: "nowrap",
                }}
              >
                <thead>
                  <tr className="border-bottom">
                    <th>Receipt ID</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Region</th>
                    <th>Collector</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sabhasads.map((item, index) => (
                    <tr key={index}>
                      <td>{item.receipt_no}</td>
                      <td>{item.name}</td>
                      <td>{item.age}</td>
                      <td>{item.region || "—"}</td>
                      <td>{item.user_name}</td>
                      <td>{item.amount}</td>
                      <td>{item.date}</td>
                      <td className="text-center">
                        <i className="fa-regular fa-pen-to-square mx-2"></i>
                        <i className="fa-regular fa-trash-can mx-2"></i>
                        <i className="fa-regular fa-eye mx-2"></i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center">No sabhasads found.</p>
            )}
          </div>
        </div>

        {/* Pagination */}
        <div className="d-lg-flex d-md-flex justify-content-between align-items-center mt-3 px-3 pb-3 d-none">
          <button className="btn previous rounded-3">
            <i className="fa-solid fa-arrow-left"></i> Previous
          </button>
          <div>
            <button className="btn  mx-1 next-btn rounded-3">1</button>
            <button className="btn  mx-1">2</button>
            <button className="btn  mx-1">3</button>
            <span className="mx-2">...</span>
            <button className="btn m-1">8</button>
            <button className="btn m-1">9</button>
            <button className="btn m-1">10</button>
          </div>
          <button className="btn next-btn rounded-3">
            Next <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>

        {/* Mobile Pagination */}
        <div className="d-sm-flex d-md-none d-none justify-content-between align-items-center mt-3 px-3 pb-3">
          <button className="btn previous rounded-3 p-2">
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <div>
            <span>Page 1 to 10</span>
          </div>
          <button className="btn next-btn rounded-3 p-2">
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SabhasadManagement;


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
