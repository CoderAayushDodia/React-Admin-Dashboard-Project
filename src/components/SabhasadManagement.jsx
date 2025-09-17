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
//                   <th>Name</th>
//                     <th>Role</th>
//                     <th>Region</th>
//                     <th>Mobile</th>
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

//Dynamic data
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

function SabhasadManagement() {
  const navigate = useNavigate();
  const [sabhasads, setSabhasads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // ✅ Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Fixed page size
  
  // ✅ Enhanced Filter States - Search works independently, filters use apply button
  const [search, setSearch] = useState(""); // Real-time search
  
  // Filter states (apply button system)
  const [pendingRegion, setPendingRegion] = useState("");
  const [pendingDateFrom, setPendingDateFrom] = useState("");
  const [pendingDateTo, setPendingDateTo] = useState("");
  const [appliedRegion, setAppliedRegion] = useState("");
  const [appliedDateFrom, setAppliedDateFrom] = useState("");
  const [appliedDateTo, setAppliedDateTo] = useState("");
  
  const [availableRegions, setAvailableRegions] = useState([]);

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
          credentials: "include", // include cookies if needed
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Unauthorized! Please login again.");
        }
        throw new Error(`Failed to fetch data: ${response.status}`);
      }

      const data = await response.json();
      const sabhasadsList = data.results || [];
      setSabhasads(sabhasadsList);
      
      // ✅ Extract unique regions for filter dropdown
      extractRegions(sabhasadsList);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Extract unique regions for filter dropdown
  const extractRegions = (sabhasadsList) => {
    const regions = [...new Set(sabhasadsList.map(item => item.region).filter(Boolean))];
    setAvailableRegions(regions);
  };

  useEffect(() => {
    getSabhasads();
  }, []);

  // 🔎 Optimized filtering logic - search is real-time, filters use apply button
  const filteredSabhasads = React.useMemo(() => {
    return sabhasads.filter((sabhasad) => {
      // ✅ Search filter - real-time search across member_name, region, user_name, receipt_no
      const searchLower = search.toLowerCase().trim();
      const matchesSearch = !searchLower || (
        sabhasad.member_name?.toLowerCase().includes(searchLower) ||
        sabhasad.region?.toLowerCase().includes(searchLower) ||
        sabhasad.user_name?.toLowerCase().includes(searchLower) ||
        sabhasad.receipt_no?.toLowerCase().includes(searchLower) ||
        sabhasad.amount?.toString().includes(searchLower)
      );

      // ✅ Region filter - apply button system
      const matchesRegion = !appliedRegion || sabhasad.region === appliedRegion;

      // ✅ Date filter - apply button system
      const matchesDate = !appliedDateFrom || !appliedDateTo || (
        sabhasad.date >= appliedDateFrom && sabhasad.date <= appliedDateTo
      );

      return matchesSearch && matchesRegion && matchesDate;
    });
  }, [sabhasads, search, appliedRegion, appliedDateFrom, appliedDateTo]);

  // ✅ Pagination logic for filtered sabhasads
  const totalPages = Math.ceil(filteredSabhasads.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedSabhasads = filteredSabhasads.slice(startIndex, endIndex);
  const hasNext = currentPage < totalPages;
  const hasPrevious = currentPage > 1;

  // ✅ Apply filters function - applies region and date filters
  const applyFilters = () => {
    setAppliedRegion(pendingRegion);
    setAppliedDateFrom(pendingDateFrom);
    setAppliedDateTo(pendingDateTo);
    
    console.log("Filters applied:", {
      region: pendingRegion,
      dateFrom: pendingDateFrom,
      dateTo: pendingDateTo
    });
  };

  // ✅ Clear all filters function - clears region and date filters only
  const clearFilters = () => {
    // Clear pending states (UI)
    setPendingRegion("");
    setPendingDateFrom("");
    setPendingDateTo("");
    
    // Clear applied states (actual filtering)
    setAppliedRegion("");
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
  }, [search, appliedRegion, appliedDateFrom, appliedDateTo]);

  // ✅ Excel Download Function - Year-wise data
  const downloadExcel = () => {
    try {
      // Group data by year
      const groupedData = {};
      
      filteredSabhasads.forEach((sabhasad) => {
        const year = sabhasad.date ? sabhasad.date.split('-')[0] : 'Unknown';
        
        if (!groupedData[year]) {
          groupedData[year] = [];
        }
        
        groupedData[year].push({
          'Receipt No': sabhasad.receipt_no || '',
          'Member Name': sabhasad.member_name || '',
          'Gender': sabhasad.gender || '',
          'Region': sabhasad.region || '',
          'Collector': sabhasad.user_name || '',
          'Amount': sabhasad.amount || '',
          'Date': sabhasad.date || ''
        });
      });

      // Create workbook
      const workbook = XLSX.utils.book_new();

      // Add each year as a separate sheet
      Object.keys(groupedData).sort().forEach((year) => {
        const yearData = groupedData[year];
        
        // Create worksheet for this year
        const worksheet = XLSX.utils.json_to_sheet(yearData);
        
        // Set column widths
        const columnWidths = [
          { wch: 15 }, // Receipt No
          { wch: 25 }, // Member Name
          { wch: 10 }, // Gender
          { wch: 20 }, // Region
          { wch: 20 }, // Collector
          { wch: 15 }, // Amount
          { wch: 12 }  // Date
        ];
        worksheet['!cols'] = columnWidths;
        
        // Add worksheet to workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, `Year ${year}`);
      });

      // Add summary sheet
      const summaryData = Object.keys(groupedData).map(year => ({
        'Year': year,
        'Total Records': groupedData[year].length,
        'Total Amount': groupedData[year].reduce((sum, item) => {
          const amount = parseFloat(item.Amount) || 0;
          return sum + amount;
        }, 0).toFixed(2)
      }));

      const summaryWorksheet = XLSX.utils.json_to_sheet(summaryData);
      summaryWorksheet['!cols'] = [
        { wch: 10 }, // Year
        { wch: 15 }, // Total Records
        { wch: 15 }  // Total Amount
      ];
      XLSX.utils.book_append_sheet(workbook, summaryWorksheet, 'Summary');

      // Generate Excel file
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      
      // Generate filename with current date
      const currentDate = new Date().toISOString().split('T')[0];
      const filename = `Sabhasad_Data_Yearwise_${currentDate}.xlsx`;
      
      // Download file
      saveAs(data, filename);
      
      console.log('Excel file downloaded successfully');
    } catch (error) {
      console.error('Error downloading Excel file:', error);
      alert('Error downloading Excel file. Please try again.');
    }
  };

  return (
    <div className="main-container p-3">
      <div className="container-body">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-3 px-3 pt-3 activist-header">
          <h4>Sabhasad Management</h4>

          <div className="d-flex gap-2 activist-action-buttons">
            <button 
              className="download-btn"
              onClick={downloadExcel}
              title="Download Excel file with year-wise data"
            >
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
              placeholder="Search by name, region, collector, receipt..."
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

          {/* Region Select */}
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

        {/* ✅ Unapplied Changes Indicator - Only for region and date filters */}
        {(pendingRegion !== appliedRegion || pendingDateFrom !== appliedDateFrom || pendingDateTo !== appliedDateTo) && (
          <div className="alert alert-warning py-2 px-3 mx-3 mb-2 d-flex align-items-center" role="alert">
            <i className="fa-solid fa-exclamation-triangle me-2"></i>
            <span className="small">You have unapplied filter changes. Click "Apply" to see results.</span>
          </div>
        )}

        {/* ✅ Filter Results Info */}
        <div className="d-flex justify-content-between align-items-center px-3 mb-2">
          <div className="text-muted small">
            Showing {filteredSabhasads.length} of {sabhasads.length} sabhasads
            {(search || appliedRegion || appliedDateFrom || appliedDateTo) && (
              <span className="text-primary"> (filtered)</span>
            )}
            {totalPages > 1 && (
              <span className="text-muted"> • Page {currentPage} of {totalPages}</span>
            )}
          </div>
          
          {/* ✅ Active Filters Display - Shows search and applied filters with grey theme */}
          {(search || appliedRegion || appliedDateFrom || appliedDateTo) && (
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
              <p className="text-center">Loading data...</p>
            ) : error ? (
              <p className="text-danger text-center">{error}</p>
            ) : filteredSabhasads.length > 0 ? (
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
                    <th>Gender</th>
                    <th>Region</th>
                    <th>Collector</th>
                    <th>Amount</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedSabhasads.map((item, index) => (
                    <tr key={index}>
                      <td>{item.receipt_no || "—"}</td>
                      <td>{item.member_name || "—"}</td>
                      <td>{item.gender || "—"}</td>
                      <td>{item.region || "—"}</td>
                      <td>{item.user_name || "—"}</td>
                      <td>{item.amount || "—"}</td>
                      <td>{item.date || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center">No sabhasads found.</p>
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
            Page {currentPage} of {totalPages} • {filteredSabhasads.length} total sabhasads
          </div>
        )}
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
