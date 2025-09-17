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
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // ✅ Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Fixed page size
  
  // ✅ Enhanced Filter States - Search works independently, filters use apply button
  const [search, setSearch] = useState(""); // Real-time search
  
  // Filter states (apply button system)
  const [pendingCampaign, setPendingCampaign] = useState("");
  const [pendingDateFrom, setPendingDateFrom] = useState("");
  const [pendingDateTo, setPendingDateTo] = useState("");
  const [appliedCampaign, setAppliedCampaign] = useState("");
  const [appliedDateFrom, setAppliedDateFrom] = useState("");
  const [appliedDateTo, setAppliedDateTo] = useState("");
  
  // Available filter options
  const [availableCampaigns, setAvailableCampaigns] = useState([]);

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
        setReceipts(data);
      } else if (data?.results) {
        setReceipts(data.results);
      } else {
        setReceipts([]);
      }
      
      // ✅ Extract unique campaigns for filter dropdown
      const campaigns = extractCampaigns(Array.isArray(data) ? data : (data?.results || []));
      setAvailableCampaigns(campaigns);
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

  // ✅ Extract unique campaigns from receipts data
  const extractCampaigns = (receiptsData) => {
    const campaigns = new Set();
    receiptsData.forEach((receipt) => {
      if (receipt.campaign_name) {
        campaigns.add(receipt.campaign_name);
      }
    });
    return Array.from(campaigns).sort();
  };

  // 🔎 Optimized filtering logic - search is real-time, filters use apply button
  const filteredReceipts = React.useMemo(() => {
    return receipts.filter((receipt) => {
      // ✅ Search filter - real-time search across name, region, phone, amount, book_number
      const searchLower = search.toLowerCase().trim();
      const matchesSearch = !searchLower || (
        receipt.assigned_to_name?.toLowerCase().includes(searchLower) ||
        receipt.assigned_district?.toLowerCase().includes(searchLower) ||
        receipt.assigned_phone?.toLowerCase().includes(searchLower) ||
        receipt.book_number?.toLowerCase().includes(searchLower) ||
        receipt.total_collection?.toString().includes(searchLower)
      );

      // ✅ Campaign filter - apply button system
      const matchesCampaign = !appliedCampaign || (
        receipt.campaign_name === appliedCampaign
      );

      // ✅ Date filter - apply button system
      const matchesDate = !appliedDateFrom || !appliedDateTo || (
        receipt.upload_date >= appliedDateFrom && receipt.upload_date <= appliedDateTo
      );

      return matchesSearch && matchesCampaign && matchesDate;
    });
  }, [receipts, search, appliedCampaign, appliedDateFrom, appliedDateTo]);

  // ✅ Pagination logic for filtered receipts
  const totalPages = Math.ceil(filteredReceipts.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedReceipts = filteredReceipts.slice(startIndex, endIndex);
  const hasNext = currentPage < totalPages;
  const hasPrevious = currentPage > 1;

  // ✅ Apply filters function - applies campaign and date filters
  const applyFilters = () => {
    setAppliedCampaign(pendingCampaign);
    setAppliedDateFrom(pendingDateFrom);
    setAppliedDateTo(pendingDateTo);
    
    console.log("Filters applied:", {
      campaign: pendingCampaign,
      dateFrom: pendingDateFrom,
      dateTo: pendingDateTo
    });
  };

  // ✅ Clear all filters function - clears campaign and date filters only
  const clearFilters = () => {
    // Clear pending states (UI)
    setPendingCampaign("");
    setPendingDateFrom("");
    setPendingDateTo("");
    
    // Clear applied states (actual filtering)
    setAppliedCampaign("");
    setAppliedDateFrom("");
    setAppliedDateTo("");
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
  }, [search, appliedCampaign, appliedDateFrom, appliedDateTo]);

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
          <div className="header-left rounded d-flex align-items-center position-relative flex-grow-1">
            <span>
              <i className="fa-solid fa-magnifying-glass"></i>
            </span>
            <input
              placeholder="Search by name, region, phone, book number, amount..."
              className="border-0 shadow-none form-control flex-grow-1"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {/* Clear search button */}
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

          {/* Campaign Select */}
          <select 
            className="form-select select-campaign flex-lg-grow-0"
            value={pendingCampaign}
            onChange={(e) => setPendingCampaign(e.target.value)}
          >
            <option value="">Select Campaign</option>
            {availableCampaigns.map((campaign) => (
              <option key={campaign} value={campaign}>
                {campaign}
              </option>
            ))}
          </select>

          {/* Date Range */}
          <div className="d-flex align-items-center gap-1 select-date flex-lg-grow-0">
            <input 
              type="date" 
              className="form-control" 
              value={pendingDateFrom}
              onChange={(e) => setPendingDateFrom(e.target.value)}
            />
            <span>-</span>
            <input 
              type="date" 
              className="form-control" 
              value={pendingDateTo}
              onChange={(e) => setPendingDateTo(e.target.value)}
            />
          </div>

          {/* Apply Button */}
          <button 
            className="apply-btn flex-lg-grow-0 flex-md-grow-1"
            onClick={applyFilters}
          >
            Apply
          </button>

          {/* Clear Button */}
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

        {/* ✅ Unapplied Changes Indicator - Only for campaign and date filters */}
        {(pendingCampaign !== appliedCampaign || pendingDateFrom !== appliedDateFrom || pendingDateTo !== appliedDateTo) && (
          <div className="alert alert-warning py-2 px-3 mx-3 mb-2 d-flex align-items-center" role="alert">
            <i className="fa-solid fa-exclamation-triangle me-2"></i>
            <span className="small">You have unapplied filter changes. Click "Apply" to see results.</span>
          </div>
        )}

        {/* ✅ Filter Results Info */}
        <div className="d-flex justify-content-between align-items-center px-3 mb-2">
          <div className="text-muted small">
            Showing {filteredReceipts.length} of {receipts.length} receipts
            {(search || appliedCampaign || appliedDateFrom || appliedDateTo) && (
              <span className="text-primary"> (filtered)</span>
            )}
            {totalPages > 1 && (
              <span className="text-muted"> • Page {currentPage} of {totalPages}</span>
            )}
          </div>
          
          {/* ✅ Active Filters Display - Shows search and applied filters with grey theme */}
          {(search || appliedCampaign || appliedDateFrom || appliedDateTo) && (
            <div className="d-flex flex-wrap gap-1">
              {search && (
                <span className="badge bg-light text-dark border">
                  Search: "{search}" 
                  <i className="fa-solid fa-times ms-1" style={{ cursor: 'pointer' }} onClick={() => setSearch("")}></i>
                </span>
              )}
              {appliedCampaign && (
                <span className="badge bg-light text-dark border">
                  Campaign: {appliedCampaign}
                  <i className="fa-solid fa-times ms-1" style={{ cursor: 'pointer' }} onClick={() => {
                    setAppliedCampaign("");
                    setPendingCampaign("");
                  }}></i>
                </span>
              )}
              {(appliedDateFrom || appliedDateTo) && (
                <span className="badge bg-light text-dark border">
                  Date: {appliedDateFrom || "Start"} to {appliedDateTo || "End"}
                  <i className="fa-solid fa-times ms-1" style={{ cursor: 'pointer' }} onClick={() => {
                    setAppliedDateFrom("");
                    setAppliedDateTo("");
                    setPendingDateFrom("");
                    setPendingDateTo("");
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
              <p className="px-3">Loading receipts...</p>
            ) : error ? (
              <p className="px-3 text-danger">Error: {error}</p>
            ) : filteredReceipts.length > 0 ? (
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
                  {paginatedReceipts.map((receipt) => (
                    <tr key={receipt.id}>
                      <td>{receipt.book_number || "-"}</td>
                      <td>
                        {receipt.upload_date
                          ? new Date(receipt.upload_date).toLocaleDateString()
                          : "-"}
                      </td>
                      <td>{receipt.assigned_to_name || "-"}</td>
                      <td>{receipt.assigned_district || "-"}</td>
                      <td>{receipt.assigned_age || "-"}</td>
                      <td>{receipt.assigned_phone || "-"}</td>
                      <td>{receipt.total_collection || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="px-3">No receipts found.</p>
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
            Page {currentPage} of {totalPages} • {filteredReceipts.length} total receipts
          </div>
        )}
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
