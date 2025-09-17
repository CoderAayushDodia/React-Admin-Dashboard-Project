// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// import dashboardData from "../../public/dashboardData.json"; // Import JSON

// function ReportManagement() {
//   const navigate = useNavigate();
//   const [activists, setActivists] = useState([]);
  

//   useEffect(() => {
//     setActivists(dashboardData.ActivistManagement || []);
//   }, []);

//   return (
//     <div className="main-container p-3">
//       <div className="container-body">
//         <div className="d-flex justify-content-between align-items-center mb-3 px-3 pt-3 activist-header">
//           <h4 className="">Report Management</h4>

//           <div className="d-flex gap-2 activist-action-buttons">
//             <button className="download-btn">
//              Download <i className="fa-solid fa-download me-1"></i> 
//             </button>
//             <button
//               className="add-activist-btn"
//               onClick={() => navigate("/reports/add")}
//             >
//                Create New <i className="fa-solid fa-plus me-1"></i>
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
//             <option>Location Type</option>
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
//                   <th>Date</th>
//                   <th>Locations</th>
//                   <th>Name</th>
//                   <th>Description</th>
//                   <th>Amount</th>
//                   <th>Expense Type</th>
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

// export default ReportManagement;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function ReportManagement() {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // ✅ Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Fixed page size
  
  // ✅ Enhanced Filter States - Search works independently, filters use apply button
  const [search, setSearch] = useState(""); // Real-time search
  
  // Filter states (apply button system)
  const [pendingDateFrom, setPendingDateFrom] = useState("");
  const [pendingDateTo, setPendingDateTo] = useState("");
  const [appliedDateFrom, setAppliedDateFrom] = useState("");
  const [appliedDateTo, setAppliedDateTo] = useState("");

  const API_URL = "https://shramjivi-backend.onrender.com/api/report-web/";

  const fetchReports = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch reports: ${response.status}`);
      }

      const data = await response.json();

      // ✅ Ensure correct format
      if (Array.isArray(data)) {
        setReports(data);
      } else if (data?.results) {
        setReports(data.results);
      } else {
        setReports([]);
      }
    } catch (err) {
      console.error("fetchReports error:", err);
      setError(err.message || "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // 🔎 Optimized filtering logic - search is real-time, filters use apply button
  const filteredReports = React.useMemo(() => {
    return reports.filter((report) => {
      // ✅ Search filter - real-time search across name, description, locations, expense_type
      const searchLower = search.toLowerCase().trim();
      const matchesSearch = !searchLower || (
        report.activist_name?.toLowerCase().includes(searchLower) ||
        report.description?.toLowerCase().includes(searchLower) ||
        report.from_location?.toLowerCase().includes(searchLower) ||
        report.to_location?.toLowerCase().includes(searchLower) ||
        report.expense_type?.toLowerCase().includes(searchLower) ||
        report.amount?.toString().includes(searchLower)
      );

      // ✅ Date filter - apply button system
      const matchesDate = !appliedDateFrom || !appliedDateTo || (
        report.report_date >= appliedDateFrom && report.report_date <= appliedDateTo
      );

      return matchesSearch && matchesDate;
    });
  }, [reports, search, appliedDateFrom, appliedDateTo]);

  // ✅ Pagination logic for filtered reports
  const totalPages = Math.ceil(filteredReports.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedReports = filteredReports.slice(startIndex, endIndex);
  const hasNext = currentPage < totalPages;
  const hasPrevious = currentPage > 1;

  // ✅ Apply filters function - applies date filters
  const applyFilters = () => {
    setAppliedDateFrom(pendingDateFrom);
    setAppliedDateTo(pendingDateTo);
    
    console.log("Filters applied:", {
      dateFrom: pendingDateFrom,
      dateTo: pendingDateTo
    });
  };

  // ✅ Clear all filters function - clears date filters only
  const clearFilters = () => {
    // Clear pending states (UI)
    setPendingDateFrom("");
    setPendingDateTo("");
    
    // Clear applied states (actual filtering)
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
  }, [search, appliedDateFrom, appliedDateTo]);

  // ✅ Format locations as comma-separated
  const formatLocations = (fromLocation, toLocation) => {
    const locations = [];
    if (fromLocation) locations.push(fromLocation);
    if (toLocation) locations.push(toLocation);
    return locations.length > 0 ? locations.join(", ") : "-";
  };

  // ✅ Excel Download Function - Name-wise grouped data
  const downloadExcel = () => {
    try {
      // Group data by activist name
      const groupedData = {};

      filteredReports.forEach((report) => {
        const name = report.activist_name || "Unknown";
        
        if (!groupedData[name]) {
          groupedData[name] = [];
        }

        groupedData[name].push({
          'Date': report.report_date || '',
          'Locations': formatLocations(report.from_location, report.to_location),
          'Description': report.description || '',
          'Amount': report.amount || '',
          'Expense Type': report.expense_type || ''
        });
      });

      // Create workbook
      const workbook = XLSX.utils.book_new();

      // Add each activist as a separate sheet
      Object.keys(groupedData).sort().forEach((name) => {
        const activistData = groupedData[name];

        // Create worksheet for this activist
        const worksheet = XLSX.utils.json_to_sheet(activistData);

        // Set column widths
        const columnWidths = [
          { wch: 12 }, // Date
          { wch: 25 }, // Locations
          { wch: 30 }, // Description
          { wch: 15 }, // Amount
          { wch: 20 }  // Expense Type
        ];
        worksheet['!cols'] = columnWidths;

        // Add worksheet to workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, name);
      });

      // Add summary sheet
      const summaryData = Object.keys(groupedData).map(name => ({
        'Activist Name': name,
        'Total Reports': groupedData[name].length,
        'Total Amount': groupedData[name].reduce((sum, item) => {
          const amount = parseFloat(item.Amount) || 0;
          return sum + amount;
        }, 0).toFixed(2)
      }));

      const summaryWorksheet = XLSX.utils.json_to_sheet(summaryData);
      summaryWorksheet['!cols'] = [
        { wch: 25 }, // Activist Name
        { wch: 15 }, // Total Reports
        { wch: 15 }  // Total Amount
      ];
      XLSX.utils.book_append_sheet(workbook, summaryWorksheet, 'Summary');

      // Generate Excel file
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

      // Generate filename with current date
      const currentDate = new Date().toISOString().split('T')[0];
      const filename = `Report_Data_Namewise_${currentDate}.xlsx`;

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
        <div className="d-flex justify-content-between align-items-center mb-3 px-3 pt-3 activist-header">
          <h4 className="">Report Management</h4>

          <div className="d-flex gap-2 activist-action-buttons">
            <button 
              className="download-btn"
              onClick={downloadExcel}
              disabled={filteredReports.length === 0}
              title={filteredReports.length === 0 ? "No data to download" : "Download name-wise grouped data"}
            >
              Download <i className="fa-solid fa-download me-1"></i>
            </button>
            <button
              className="add-activist-btn"
              onClick={() => navigate("/reports/add")}
            >
              Create New <i className="fa-solid fa-plus me-1"></i>
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
              placeholder="Search by name, description, locations, expense type..."
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

        {/* ✅ Unapplied Changes Indicator - Only for date filters */}
        {(pendingDateFrom !== appliedDateFrom || pendingDateTo !== appliedDateTo) && (
          <div className="alert alert-warning py-2 px-3 mx-3 mb-2 d-flex align-items-center" role="alert">
            <i className="fa-solid fa-exclamation-triangle me-2"></i>
            <span className="small">You have unapplied filter changes. Click "Apply" to see results.</span>
          </div>
        )}

        {/* ✅ Filter Results Info */}
        <div className="d-flex justify-content-between align-items-center px-3 mb-2">
          <div className="text-muted small">
            Showing {filteredReports.length} of {reports.length} reports
            {(search || appliedDateFrom || appliedDateTo) && (
              <span className="text-primary"> (filtered)</span>
            )}
            {totalPages > 1 && (
              <span className="text-muted"> • Page {currentPage} of {totalPages}</span>
            )}
          </div>
          
          {/* ✅ Active Filters Display - Shows search and applied filters with grey theme */}
          {(search || appliedDateFrom || appliedDateTo) && (
            <div className="d-flex flex-wrap gap-1">
              {search && (
                <span className="badge bg-light text-dark border">
                  Search: "{search}" 
                  <i className="fa-solid fa-times ms-1" style={{ cursor: 'pointer' }} onClick={() => setSearch("")}></i>
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
              <p className="text-center">Loading reports...</p>
            ) : error ? (
              <p className="text-danger text-center">{error}</p>
            ) : filteredReports.length > 0 ? (
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
                    <th>Date</th>
                    <th>Locations</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Expense Type</th>
                    <th className="text-center"></th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedReports.map((report) => (
                    <tr key={report.id}>
                      <td>{report.report_date || "-"}</td>
                      <td>
                        {formatLocations(report.from_location, report.to_location)}
                      </td>
                      <td>{report.activist_name || "-"}</td>
                      <td className="description-cell">{report.description || "-"}</td>
                      <td>{report.amount || "-"}</td>
                      <td>{report.expense_type || "-"}</td>
                      <td className="text-center">
                        <i className="fa-regular fa-eye mx-2" style={{ cursor: 'pointer' }} title="View report"></i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center">No reports found.</p>
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
            Page {currentPage} of {totalPages} • {filteredReports.length} total reports
          </div>
        )}
      </div>
    </div>
  );
}

export default ReportManagement;


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
