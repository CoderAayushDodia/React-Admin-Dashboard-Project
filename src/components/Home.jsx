// // import React, { useState, useEffect } from "react";
// // import NestedSelect from "./NestedSelect";
// // import SimpleDropdown from "./SimpleDropdown";
// // // import { regionsData } from "../data/regions";
// // // import { findRegionData } from "../utils/findRegion";

// // import {
// //   Chart,
// //   LineElement,
// //   PointElement,
// //   LinearScale,
// //   Title,
// //   Tooltip,
// //   Legend,
// //   CategoryScale,
// //   ArcElement,
// //   BarElement,
// // } from "chart.js";
// // import { Line, Bar, Doughnut } from "react-chartjs-2";
// // import dashboardData from "../../public/dashboardData.json"; // Import JSON

// // Chart.register(
// //   LineElement,
// //   PointElement,
// //   LinearScale,
// //   Title,
// //   Tooltip,
// //   Legend,
// //   CategoryScale,
// //   ArcElement,
// //   BarElement
// // );

// // function Home() {

// //   const [dashboardData, setDashboardData] = useState(null);
// //     const [loading, setLoading] = useState(true);
// //     const [error, setError] = useState(null);

// //     const [timeFrame, setTimeFrame] = useState("monthly");
// //   const [region1, setRegion1] = useState("Mumbai");
// //   const [timeFrame2, setTimeFrame2] = useState("monthly");
// //   const [isReportOpen, setIsReportOpen] = useState(false);
// //   const [selectedRegion, setSelectedRegion] = useState(null);
// //   const [view, setView] = useState("monthly"); // or "annually"
// //   const [selected, setSelected] = useState("new");
// //   const [reportType, setReportType] = useState("Membership");

// //    const regionss = ["Mumbai", "Satara"];

// //   useEffect(() => {
// //     async function getUserData() {

// //     try {
// //       const url = "https://shramjivi-backend.onrender.com/api/dashboard/";
// //       const response = await fetch(url);
// //       if (!response.ok) throw new Error("Failed to fetch data");
// //       const data = await response.json();
// //       setDashboardData(data);
// //       setLoading(false);
// //       console.log(response);
// //     } catch (err) {
// //       console.error(err);
// //       setError(err.message);
// //       setLoading(false);
// //     }
// //   }
// //   getUserData();
// //   }, []);

// //   const handleRegionChange = (regionNode) => {
// //     setSelectedRegion(regionNode);
// //   };

// //    if (loading) return <p>Loading...</p>;
// //   if (error) return <p>Error: {error}</p>;

// //   // const [region, setRegion] = useState("Mumbai");

// //   // Destructure JSON data
// //   // const {
// //   //   stats,
// //   //   memberShipChart,
// //   //   collectionTrends,
// //   //   topPerformers,
// //   //   newVsOldMembers,
// //   //   regions,
// //   // } = dashboardData;

// //   const {
// //     summary,
// //     membership_growth,
// //     collection_trends,
// //     top_performers,
// //     new_vs_old,
// //   } = dashboardData;

// //   // const membershipConfig = {
// //   //   labels:
// //   //     timeFrame === "monthly"
// //   //       ? memberShipChart.monthly.labels // monthly days (2,4,6…)
// //   //       : memberShipChart.annual.labels, // annual months (Jan, Feb…)
// //   //   datasets: [
// //   //     {
// //   //       label: memberShipChart.label,
// //   //       data:
// //   //         timeFrame === "monthly"
// //   //           ? memberShipChart.monthly.data
// //   //           : memberShipChart.annual.data,
// //   //       borderColor: "red",
// //   //       fill: false,
// //   //       tension: 0.5,
// //   //       pointRadius: 0, // hide all dots
// //   //       pointHoverRadius: 5, // show dot only on hover
// //   //       pointBackgroundColor: "red",
// //   //     },
// //   //   ],
// //   // };

// //   const getMembershipChartData = (timeFrame) => {
// //     if (!membership_growth) return { labels: [], datasets: [] };

// //     if (timeFrame === "monthly") {
// //       const labels = membership_growth.monthly.map((item) => `Day ${item.day}`);
// //       const data = membership_growth.monthly.map((item) => item.total);
// //       return {
// //         label: "Members",
// //         datasets: [
// //           {
// //             label: "Members",
// //             data,
// //             borderColor: "red",
// //             backgroundColor: "rgba(255,0,0,0.2)",
// //             fill: false,
// //             tension: 0.5,
// //             pointRadius: 0,
// //             pointHoverRadius: 5,
// //           },
// //         ],
// //       };
// //     } else {
// //       const labels = membership_growth.yearly.map(
// //         (item) => `Month ${item.month}`
// //       );
// //       const data = membership_growth.yearly.map((item) => item.total);

// //       return {
// //       labels,
// //       datasets: [
// //         {
// //           label: "Members",
// //           data,
// //           borderColor: "red",
// //           backgroundColor: "rgba(255,0,0,0.2)",
// //           fill: false,
// //           tension: 0.5,
// //           pointRadius: 0,
// //           pointHoverRadius: 5,
// //         }
// //       ]
// //     }
// //   };

// //   const membershipOptions = {
// //     responsive: true,
// //     scales: {
// //       y: {
// //         beginAtZero: false, // 🔑 makes it not start from 0
// //         ticks: {
// //           stepSize: 200, // optional, space between y-axis values
// //         },
// //       },
// //     },
// //   };

// //   // Custom plugin for vertical line
// //   const verticalLinePlugin = {
// //     id: "verticalLine",
// //     afterDatasetsDraw: (chart) => {
// //       if (chart.tooltip?._active && chart.tooltip._active.length > 0) {
// //         const ctx = chart.ctx;
// //         const activePoint = chart.tooltip._active[0].element;
// //         const x = activePoint.x;
// //         const topY = chart.scales.y.top;
// //         const bottomY = chart.scales.y.bottom;

// //         ctx.save();
// //         ctx.beginPath();
// //         ctx.moveTo(x, topY);
// //         ctx.lineTo(x, bottomY);
// //         ctx.lineWidth = 1.5;
// //         ctx.strokeStyle = "red";
// //         ctx.stroke();
// //         ctx.restore();
// //       }
// //     },
// //   };

// //   const getCollectionChartData = (timeFrame, selectedRegion) => {
// //      if(!collection_trends) return {labels: [], datasets: []};

// //      if(selectedRegion && collection_trends.region) {
// //       const regionData = collection_trends.region.find((r) => r.taluka__name === selectedRegion.name);
// //       return {
// //         labels: [selectedRegion.name],
// //         datasets: [
// //           {
// //             label: "Collections",
// //           data: [regionData ? regionData.total : 0],
// //           backgroundColor: "rgba(54, 162, 235, 0.6)",
// //           }
// //         ]
// //       }

// //     }
// //       if (timeFrame === "monthly") {
// //           const labels = collection_trends.monthly.map((item) => `Month ${item.month}`);
// //           const data = collection_trends.month.map((item) => item.total);
// //           return {
// //              labels,
// //       datasets: [
// //         {
// //           label: "Collections",
// //           data,
// //           backgroundColor: "rgba(54, 162, 235, 0.6)",
// //         },
// //       ],
// //           }
// //       } else if (timeFrame === "annually") {
// //         const labels = collection_trends.yearly.map((item) => `${item.year}`);
// //     const data = collection_trends.yearly.map((item) => item.total);
// //     return {
// //       labels,
// //       datasets: [
// //         {
// //           label: "Collections",
// //           data,
// //           backgroundColor: "rgba(54, 162, 235, 0.6)",
// //         },
// //       ],
// //     };
// //       }
// //   };

// //   // Top Performers Doughnut Chart
// //   // const topPerformersConfig = {
// //   //   labels: topPerformers.labels,
// //   //   datasets: topPerformers.datasets,
// //   // };

// //   // const topPerformersOptions = {
// //   //   responsive: true,
// //   //   maintainAspectRatio: false, // allows flexible sizing
// //   //   cutout: "65%", // hole size (inner radius)
// //   //   radius: "90%", // outer size
// //   //   plugins: {
// //   //     legend: {
// //   //       position: "right",
// //   //       labels: {
// //   //         usePointStyle: true, // <-- use circle instead of square
// //   //         pointStyle: "circle",
// //   //         font: { size: 14 },
// //   //       },
// //   //     },
// //   //   },
// //   // };

// //   const getTopPerformersChartData = () => {
// //     if(!top_performers) return {labels: [], datasets: []};

// //     const labels = top_performers.map((item) => item.created_by__name);
// //   const data = top_performers.map((item) => item.total);

// //   return {
// //     labels,
// //     datasets: [
// //       {
// //         data,
// //         backgroundColor: [
// //           "rgba(255, 99, 132, 0.6)",
// //           "rgba(54, 162, 235, 0.6)",
// //           "rgba(255, 206, 86, 0.6)",
// //           "rgba(75, 192, 192, 0.6)",
// //           "rgba(153, 102, 255, 0.6)",
// //         ],
// //         borderWidth: 1,
// //       },
// //     ],
// //   };
// //   }

// //   // New vs Old Members Stacked Bar Chart
// //   // const newVsOldConfig = newVsOldMembers[region1][timeFrame2];

// //   const getNewVsOldChartData = (timeFrame) => {
// //     if(!new_vs_old) return {labels: [], datasets: []};

// //       // Filter data by timeframe
// //   let dataArray = new_vs_old[timeFrame] || [];

// //     // Get unique labels (months or days)
// //   const labels = [...new Set(dataArray.map(item => item.month || item.day))].map(l => `Month ${l}`);

// //   const newData = labels.map((label, i) => {
// //     const monthNumber = parseInt(label.replace("Month ", ""));
// //     const item = dataArray.find(d => d.status === "new" && (d.month || d.day) === monthNumber);
// //     return item ? item.total : 0;
// //   });

// //   const oldData = labels.map((label, i) => {
// //     const monthNumber = parseInt(label.replace("Month ", ""));
// //     const item = dataArray.find(d => d.status === "old" && (d.month || d.day) === monthNumber);
// //     return item ? item.total : 0;
// //   });

// //   return {
// //     labels,
// //     datasets: [
// //       {
// //         label: "New Members",
// //         data: newData,
// //         backgroundColor: "rgba(75, 192, 192, 0.6)",
// //       },
// //       {
// //         label: "Old Members",
// //         data: oldData,
// //         backgroundColor: "rgba(255, 159, 64, 0.6)",
// //       }
// //     ]
// //   };
// //   }

// //   // helper function for responsive font
// //   const responsiveFont = (context) => {
// //     const width = context.chart.width;
// //     if (width < 400) return { size: 9 };
// //     if (width < 768) return { size: 11 };
// //     return { size: 13 };
// //   };

// //   // const newVsOldOptions = {
// //   //   responsive: true,
// //   //   elements: { bar: { borderRadius: 6 } },
// //   //   plugins: {
// //   //     legend: {
// //   //       labels: {
// //   //         font: responsiveFont,
// //   //       },
// //   //     },
// //   //   },
// //   //   scales: {
// //   //     x: {
// //   //       stacked: true,
// //   //       ticks: {
// //   //         font: responsiveFont,
// //   //       },
// //   //     },
// //   //     y: {
// //   //       stacked: true,
// //   //       beginAtZero: true,
// //   //       ticks: {
// //   //         font: responsiveFont,
// //   //       },
// //   //     },
// //   //   },
// //   // };

// //   useEffect(() => {
// //     const handleClickOutside = (e) => {
// //       if (!e.target.closest(".nav-link-wrapper")) {
// //         setIsReportOpen(false);
// //       }
// //     };
// //     document.addEventListener("click", handleClickOutside);
// //     return () => document.removeEventListener("click", handleClickOutside);
// //   }, []);

// //   // const getChartData = (chartVariable, selectedRegion, view) => {
// //   //   if (selectedRegion && selectedRegion[view]) {
// //   //     return {
// //   //       labels: selectedRegion[view].labels,
// //   //       datasets: selectedRegion[view].datasets.map((ds) => ({ ...ds })),
// //   //     };
// //   //   }

// //   //   if (chartVariable && (chartVariable.monthly || chartVariable.annually)) {
// //   //     return (
// //   //       chartVariable[view] || chartVariable.monthly || chartVariable.annually
// //   //     );
// //   //   }

// //   //   if (view === "annually") {
// //   //     // NOTE: multiplying by 12 is arbitrary — best to provide annual data in JSON.
// //   //     return {
// //   //       labels: chartVariable.labels,
// //   //       datasets: chartVariable.datasets.map((ds) => ({
// //   //         ...ds,
// //   //         data: ds.data.map((v) => Math.round(v * 12)),
// //   //       })),
// //   //     };
// //   //   }

// //   //   return chartVariable;
// //   // };

// //   return (
// //     <main className="main-container p-lg-3 p-sm-none">
// //       <div className="container-body rounded-lg-4 p-3">
// //         <div className="main-title d-flex justify-content-between ">
// //           <h3>Dashboard</h3>
// //           <ul className="list-unstyled d-lg-inline-flex gap-2 sidebar-list d-sm-block">
// //             <div className="d-lg-flex gap-2 receipt-announcement-div">
// //               <li>
// //                 <a
// //                   href="#!"
// //                   className="text-decoration-none rounded-2 px-2 px-lg-3 py-2 distribute-btn"
// //                 >
// //                   Distribute Receipts
// //                 </a>
// //               </li>
// //               <li>
// //                 <a
// //                   href="#!"
// //                   className="text-decoration-none rounded-2 px-sm-1 px-md-2 px-lg-3 py-2 send-btn"
// //                 >
// //                   Send Announcement
// //                 </a>
// //               </li>
// //             </div>
// //             <div className="report-container-wrapper">
// //               <li className="nav-link-wrapper">
// //                 <a
// //                   onClick={() => setIsReportOpen((prev) => !prev)}
// //                   href="#!"
// //                   className="text-decoration-none rounded-2 px-3 py-2 generate-btn"
// //                 >
// //                   Generate Report
// //                 </a>
// //                 <div
// //                   className={`report-container shadow-lg ${
// //                     isReportOpen ? "show" : ""
// //                   }`}
// //                 >
// //                   <div className="report-title d-flex justify-content-between align-items-center">
// //                     <h3>Report Types</h3>
// //                     <i
// //                       className="fa-solid fa-xmark"
// //                       onClick={() => setIsReportOpen(false)}
// //                       style={{ cursor: "pointer" }}
// //                     ></i>
// //                   </div>

// //                   <div className="report-body">
// //                     <label htmlFor="report">Report Types</label>
// //                     <div className="select-box">
// //                       <select
// //                         id="report"
// //                         value={reportType}
// //                         onChange={(e) => setReportType(e.target.value)}
// //                       >
// //                         <option>Membership</option>
// //                         <option>Collections</option>
// //                         <option>Activist Performance</option>
// //                         <option>Daily Report Summaries</option>
// //                         <option>New Member Analysis</option>
// //                       </select>
// //                     </div>

// //                     <label htmlFor="summary">Financial Summary</label>
// //                     <div className="select-box">
// //                       <select id="summary">
// //                         <option>Year 2025</option>
// //                         <option>Year 2024</option>
// //                         <option>Year 2023</option>
// //                       </select>
// //                     </div>

// //                     {reportType === "New Member Analysis" && (
// //                       <>
// //                         <label>Donor Type</label>
// //                         <div className="radio-group">
// //                           <label>
// //                             <input
// //                               type="radio"
// //                               name="donor"
// //                               value="old"
// //                               checked={selected === "old"}
// //                               onChange={(e) => setSelected(e.target.value)}
// //                             />
// //                             Old Donor
// //                           </label>
// //                           <label>
// //                             <input
// //                               type="radio"
// //                               name="donor"
// //                               value="new"
// //                               checked={selected === "new"}
// //                               onChange={(e) => setSelected(e.target.value)}
// //                             />{" "}
// //                             New Donor
// //                           </label>
// //                         </div>
// //                       </>
// //                     )}

// //                     <div className="d-flex justify-content-end">
// //                       <button className="btn1 px-4 rounded">Generate</button>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </li>
// //             </div>
// //           </ul>
// //         </div>

// //         {/* Stats Cards */}
// //         {/* <div className="row main-cards">
// //           {stats.map((item, index) => (
// //             <div className="cards" key={index}>
// //               <div className="card-inner rounded-3 p-3">
// //                 <h4>{item.title}</h4>
// //                 <span>{item.value}</span>
// //               </div>
// //             </div>
// //           ))}
// //         </div> */}

// //         <div className="row main-cards">
// //           <div className="cards">
// //             <div className="card-inner rounded-3 p-3">
// //               <h4>Total Activists</h4>
// //               <span>{summary.total_activists}</span>
// //             </div>
// //           </div>
// //           <div className="cards">
// //             <div className="card-inner rounded-3 p-3">
// //               <h4>Total Members</h4>
// //               <span>{summary.total_members}</span>
// //             </div>
// //           </div>
// //           <div className="cards">
// //             <div className="card-inner rounded-3 p-3">
// //               <h4>Collections This Month</h4>
// //               <span>{summary.collections_this_month}</span>
// //             </div>
// //           </div>
// //           <div className="cards">
// //             <div className="card-inner rounded-3 p-3">
// //               <h4>Collections This Year</h4>
// //               <span>{summary.collections_this_year}</span>
// //             </div>
// //           </div>
// //           <div className="cards">
// //             <div className="card-inner rounded-3 p-3">
// //               <h4>New Daily Reports</h4>
// //               <span>{summary.new_daily_reports}</span>
// //             </div>
// //           </div>
// //           <div className="cards">
// //             <div className="card-inner rounded-3 p-3">
// //               <h4>New Members Ratio (%)</h4>
// //               <span>{summary.new_members_ratio}</span>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Charts */}
// //         <div className="charts row mt-4">
// //           {/* Membership Line Chart */}
// //           <div className="col-md-6 mb-4">
// //             <div className="chart-box p-3 rounded-3 shadow-sm bg-white">
// //               <div className="chart-controls d-flex align-items-center flex-wrap justify-content-between">
// //                 <h5>Membership Growth</h5>
// //                 <div className="tabs">
// //                   <button
// //                     className={`tab ${
// //                       timeFrame === "annually" ? "active" : ""
// //                     }`}
// //                     onClick={() => setTimeFrame("annually")}
// //                   >
// //                     Annualy
// //                   </button>
// //                   <button
// //                     className={`tab ${timeFrame === "monthly" ? "active" : ""}`}
// //                     onClick={() => setTimeFrame("monthly")}
// //                   >
// //                     Monthly
// //                   </button>
// //                 </div>
// //               </div>
// //               <Line
// //                 data={getMembershipChartData(timeFrame)}
// //                 options={membershipOptions}
// //                 plugins={[verticalLinePlugin]}
// //               />
// //             </div>
// //           </div>

// //           {/* Collection Trends Bar Chart */}
// //           <div className="col-md-6 mb-4">
// //             <div className="chart-box p-3 rounded-3 shadow-sm bg-white">
// //               <div className="chart-controls d-flex align-items-center flex-wrap justify-content-between">
// //                 <h5 className="mb-1 chart-title">Collection Trends</h5>

// //                 {/* ✅ Nested Dropdown goes here */}
// //                 <NestedSelect regions={collection_trends.region || []} onSelect={handleRegionChange} />

// //                 {/* Toggle Monthly / Annually */}
// //                 <div className="tabs d-flex tabs1">
// //                   <button
// //                     className={`tab ${view === "monthly" ? "active" : ""}`}
// //                     onClick={() => setView("monthly")}
// //                   >
// //                     Monthly
// //                   </button>
// //                   <button
// //                     className={`tab ${view === "annually" ? "active" : ""}`}
// //                     onClick={() => setView("annually")}
// //                   >
// //                     Annually
// //                   </button>
// //                 </div>
// //               </div>

// //               <Bar
// //                 data={getCollectionChartData(view, selectedRegion)}
// //                 options={{
// //                   responsive: true,
// //                   plugins: {
// //                     legend: { position: "top" },
// //                     title: {
// //                       display: true,
// //                       text: selectedRegion
// //                         ? `${
// //                             selectedRegion.name
// //                           } - ${view.toUpperCase()} Collection`
// //                         : "Overall Collection Trends",
// //                     },
// //                   },
// //                   scales: { y: { beginAtZero: true } },
// //                   borderRadius: 6,
// //                 }}
// //               />
// //             </div>
// //           </div>

// //           {/* Top Performers Doughnut Chart */}
// //           <div className="col-md-6 mb-4">
// //             <div
// //               className="chart-box p-3 rounded-3 shadow-sm bg-white"
// //               style={{ width: "100%", height: "380px" }}
// //             >
// //               <h5>Top Performers</h5>
// //               <Doughnut
// //                 data={getTopPerformersChartData()}
// //   options={{
// //     responsive: true,
// //     maintainAspectRatio: false,
// //     cutout: "65%",
// //     radius: "90%",
// //     plugins: {
// //       legend: {
// //         position: "right",
// //         labels: {
// //           usePointStyle: true,
// //           pointStyle: "circle",
// //           font: { size: 14 },
// //         },
// //       },
// //     },
// //   }}
// //               />
// //             </div>
// //           </div>

// //           {/* New vs Old Members Stacked Bar Chart */}
// //           <div className="col-md-6 mb-4">
// //             <div className="chart-box p-3 rounded-3 shadow-sm bg-white  chart-3">
// //               <div className="chart-controls d-flex align-item-center flex-wrap justify-content-between">
// //                 <h5 className="mb-2 chart-title">New vs. Old Members</h5>

// //                 {/* Custom Dropdown instead of <select> */}
// //                 <SimpleDropdown
// //                   options={regionss}
// //                   selected={region1}
// //                   onChange={(value) => setRegion1(value)}
// //                 />

// //                 <div className="tabs tabs1">
// //                   <button
// //                     className={`tab ${
// //                       timeFrame2 === "annually" ? "active" : ""
// //                     }`}
// //                     onClick={() => setTimeFrame2("annually")}
// //                   >
// //                     Annualy
// //                   </button>
// //                   <button
// //                     className={`tab ${
// //                       timeFrame2 === "monthly" ? "active" : ""
// //                     }`}
// //                     onClick={() => setTimeFrame2("monthly")}
// //                   >
// //                     Monthly
// //                   </button>
// //                 </div>
// //               </div>

// //               {/* Dynamic data for stacked bar based on region & timeframe */}
// //               <Bar data={getNewVsOldChartData(timeFrame2)}
// //   options={{
// //     responsive: true,
// //     elements: { bar: { borderRadius: 6 } },
// //     plugins: {
// //       legend: { labels: { font: { size: 13 } } },
// //     },
// //     scales: {
// //       x: { stacked: true },
// //       y: { stacked: true, beginAtZero: true },
// //     },
// //   }}
// //  />
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </main>
// //   );
// //   }

// // export default Home;

// // import React, { useState, useEffect } from "react";
// import NestedSelect from "./NestedSelect";
// import SimpleDropdown from "./SimpleDropdown";
// import {
//   Chart,
//   LineElement,
//   PointElement,
//   LinearScale,
//   Title,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   ArcElement,
//   BarElement,
// } from "chart.js";
// import { Line, Bar, Doughnut } from "react-chartjs-2";

// Chart.register(
//   LineElement,
//   PointElement,
//   LinearScale,
//   Title,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   ArcElement,
//   BarElement
// );

// function Home() {
//   // API Data State
//   const [dashboardData, setDashboardData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // UI State
//   const [timeFrame, setTimeFrame] = useState("monthly");
//   const [view, setView] = useState("monthly");
//   const [timeFrame2, setTimeFrame2] = useState("monthly");
//   const [region1, setRegion1] = useState(null);
//   const [selectedRegion, setSelectedRegion] = useState(null);
//   const [isReportOpen, setIsReportOpen] = useState(false);
//   const [selected, setSelected] = useState("new");
//   const [reportType, setReportType] = useState("Membership");

//   const regionss = ["Mumbai", "Satara"];

//   useEffect(() => {
//     async function getUserData() {
//       try {
//         const url = "https://shramjivi-backend.onrender.com/api/dashboard/";

//         const response = await fetch(url, {
//           method: "GET",
//           credentials: "include", // ✅ sends cookies (refresh_token)
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         if (!response.ok)
//           throw new Error(`Failed to fetch data: ${response.status}`);

//         const data = await response.json();
//         setDashboardData(data);
//         // setLoading(false);
//       } catch (err) {
//         console.error("API Error:", err);
//         setError(err.message);
//         // setLoading(false);
//       } finally {
//         setLoading(false);
//       }
//     }

//     getUserData();
//   }, []);

//   // Loading / Error states
//   if (loading) return <p>Loading Dashboard...</p>;
//   if (error) return <p>Error loading Dashboard: {error}</p>;
//   if (!dashboardData) return <p>No data available</p>;

//   //   // Handle region selection
//   //   const handleRegionChange = (regionNode) => setSelectedRegion(regionNode);

//   //   // Handle click outside report dropdown
//   //   useEffect(() => {
//   //     const handleClickOutside = (e) => {
//   //       if (!e.target.closest(".nav-link-wrapper")) setIsReportOpen(false);
//   //     };
//   //     document.addEventListener("click", handleClickOutside);
//   //     return () => document.removeEventListener("click", handleClickOutside);
//   //   }, []);

//   //   if (loading) return <p>Loading...</p>;
//   //   if (error) return <p>Error: {error}</p>;

//   // Destructure API data
//   const {
//     summary,
//     membership_growth,
//     collection_trends,
//     top_performers,
//     new_vs_old,
//   } = dashboardData;

//   //   // ------------------ Helper Functions ------------------
//   const sumTotalsFromObject = (obj) => {
//     if (obj == null) return 0;
//     if (typeof obj === "number") return obj;
//     if (typeof obj === "object") {
//       if (typeof obj.total === "number") return obj.total;
//       let s = 0;
//       for (const k of Object.keys(obj)) {
//         s += sumTotalsFromObject(obj[k]);
//       }
//       return s;
//     }
//     return 0;
//   };

//   //   // Membership Growth Chart
//   //   const getMembershipChartData = (frame) => {
//   //     if (!membership_growth) return { labels: [], datasets: [] };
//   //     if (frame === "monthly") {
//   //       const labels = membership_growth.monthly.map((item) => `Day ${item.day}`);
//   //       const data = membership_growth.monthly.map((item) => item.total);
//   //       return {
//   //         labels,
//   //         datasets: [
//   //           {
//   //             label: "Members",
//   //             data,
//   //             borderColor: "red",
//   //             backgroundColor: "rgba(255,0,0,0.2)",
//   //             fill: false,
//   //             tension: 0.5,
//   //             pointRadius: 0,
//   //             pointHoverRadius: 5,
//   //           },
//   //         ],
//   //       };
//   //     } else {
//   //       const labels = membership_growth.yearly.map(
//   //         (item) => `Month ${item.month}`
//   //       );
//   //       const data = membership_growth.yearly.map((item) => item.total);
//   //       return {
//   //         labels,
//   //         datasets: [
//   //           {
//   //             label: "Members",
//   //             data,
//   //             borderColor: "red",
//   //             backgroundColor: "rgba(255,0,0,0.2)",
//   //             fill: false,
//   //             tension: 0.5,
//   //             pointRadius: 0,
//   //             pointHoverRadius: 5,
//   //           },
//   //         ],
//   //       };
//   //     }
//   //   };

//   const getMembershipChartData = (frame) => {
//     const source = membership_growth?.[frame] || {};
//     const labels = Object.keys(source);
//     const data = labels.map((k) => Number(source[k] ?? 0));
//     return {
//       labels,
//       datasets: [
//         {
//           label: "Members",
//           data,
//           borderColor: "red",
//           fill: false,
//           tension: 0.4,
//           pointRadius: 0,
//         },
//       ],
//     };
//   };

//   //   const getCollectionChartData = (timeFrame, selectedRegion) => {
//   //   const monthlyData = collection_trends.monthly;
//   //   const yearlyData = collection_trends.yearly;

//   //   if (selectedRegion) {
//   //     // If region selected, just return a single-bar dataset for that region
//   //     return {
//   //       labels: [selectedRegion.name],
//   //       datasets: [
//   //         {
//   //           label: `Collections (${timeFrame})`,
//   //           data: [selectedRegion.total],
//   //           backgroundColor: "rgba(75, 192, 192, 0.6)",
//   //           borderRadius: 6
//   //         }
//   //       ]
//   //     };
//   //   }

//   //   // Otherwise show overall trends
//   //   const dataSource = timeFrame === "monthly" ? monthlyData : yearlyData;

//   //   return {
//   //     labels: dataSource.map(d => timeFrame === "monthly" ? `Month ${d.month}` : d.year),
//   //     datasets: [
//   //       {
//   //         label: `Collections (${timeFrame})`,
//   //         data: dataSource.map(d => d.total),
//   //         backgroundColor: "lightgray",
//   //         borderRadius: 6
//   //       }
//   //     ]
//   //   };
//   // };

//   const getCollectionChartData = (timeFrameArg, selectedregionNode) => {
//     const source = collection_trends?.[timeFrameArg] || {};
//     if (selectedregionNode) {
//       const total =
//         typeof selectedregionNode.total === "number"
//           ? selectedregionNode.total
//           : selectedregionNode.children
//           ? selectedregionNode.children.reduce(
//               (acc, c) => acc + (c.total ?? 0),
//               0
//             )
//           : 0;
//       return {
//         labels: [
//           selectedregionNode.taluka__name ||
//             selectedregionNode.name ||
//             "Selected",
//         ],
//         datasets: [
//           {
//             label: "Collections",
//             data: [total],
//             borderRadius: 6,
//           },
//         ],
//       };
//     }

//     const labels = Object.keys(source).map((k) =>
//       k === "null" ? "Unknown" : k
//     );
//     const data = Object.keys(source).map((k) => sumTotalsFromObject(source[k]));
//     return {
//       labels,
//       datasets: [
//         {
//           label: `Collections (${timeFrameArg})`,
//           data,
//           borderRadius: 6,
//         },
//       ],
//     };
//   };

//   // const regionsData = (collection_trends.region || [])
//   //   .filter(item => item.taluka__name) // removes null names
//   //   .map(item => ({
//   //     ...item,
//   //     name: item.taluka__name // optional: normalize name property
//   //   }));

//   //   // Top Performers Chart
//   //   const getTopPerformersChartData = () => {
//   //     if (!top_performers) return { labels: [], datasets: [] };
//   //     const labels = top_performers.map((item) => item.created_by__name);
//   //     const data = top_performers.map((item) => item.total);
//   //     return {
//   //       labels,
//   //       datasets: [
//   //         {
//   //           data,
//   //           backgroundColor: [
//   //             "#e60000",
//   //             "#ff3333",
//   //             "#ff4d4d",
//   //             "#ff6666",
//   //             "#ff9999",
//   //             "#ffcccc",
//   //           ],
//   //           borderWidth: 1,
//   //         },
//   //       ],
//   //     };
//   //   };

//   const getTopPerformersChartData = () => {
//     const labels = top_performers.map((p) => p.name);
//     const data = top_performers.map((p) => Number(p.total ?? 0));
//     return {
//       labels,
//       datasets: [
//         {
//           data,
//           borderWidth: 1,
//         },
//       ],
//     };
//   };

//   //   // New vs Old Members Chart
//   //   const getNewVsOldChartData = (frame) => {
//   //     if (!new_vs_old) return { labels: [], datasets: [] };

//   //     const dataArray = new_vs_old[frame] || [];
//   //     const labels = [
//   //       ...new Set(dataArray.map((item) => item.month || item.day)),
//   //     ].map((l) => `Month ${l}`);

//   //     const newData = labels.map((label) => {
//   //       const monthNumber = parseInt(label.replace("Month ", ""));
//   //       const item = dataArray.find(
//   //         (d) => d.status === "new" && (d.month || d.day) === monthNumber
//   //       );
//   //       return item ? item.total : 0;
//   //     });

//   //     const oldData = labels.map((label) => {
//   //       const monthNumber = parseInt(label.replace("Month ", ""));
//   //       const item = dataArray.find(
//   //         (d) => d.status === "old" && (d.month || d.day) === monthNumber
//   //       );
//   //       return item ? item.total : 0;
//   //     });

//   //     return {
//   //       labels,
//   //       datasets: [
//   //         {
//   //           label: "New Members",
//   //           data: newData,
//   //           backgroundColor: "red",
//   //         },
//   //         {
//   //           label: "Old Members",
//   //           data: oldData,
//   //           backgroundColor: "lightgray",
//   //         },
//   //       ],
//   //     };
//   //   };

//   //   // ------------------ Chart Options ------------------
//   //   const membershipOptions = {
//   //     responsive: true,
//   //     scales: { y: { beginAtZero: false } },
//   //   };
//   //   const verticalLinePlugin = {
//   //     id: "verticalLine",
//   //     afterDatasetsDraw: (chart) => {
//   //       if (chart.tooltip?._active && chart.tooltip._active.length > 0) {
//   //         const ctx = chart.ctx;
//   //         const activePoint = chart.tooltip._active[0].element;
//   //         const x = activePoint.x;
//   //         const topY = chart.scales.y.top;
//   //         const bottomY = chart.scales.y.bottom;
//   //         ctx.save();
//   //         ctx.beginPath();
//   //         ctx.moveTo(x, topY);
//   //         ctx.lineTo(x, bottomY);
//   //         ctx.lineWidth = 1.5;
//   //         ctx.strokeStyle = "red";
//   //         ctx.stroke();
//   //         ctx.restore();
//   //       }
//   //     },
//   //   };

//   //   return (
//   //     <main className="main-container p-lg-3 p-sm-none">
//   //       <div className="container-body rounded-lg-4 p-3">
//   //         <div className="main-title d-flex justify-content-between">
//   //           <h3>Dashboard</h3>

//   //           <ul className="list-unstyled d-lg-inline-flex gap-2 sidebar-list d-sm-block">
//   //             <div className="d-lg-flex gap-2 receipt-announcement-div">
//   //               <li>
//   //                 <a
//   //                   href="#!"
//   //                   className="text-decoration-none rounded-2 px-2 px-lg-3 py-2 distribute-btn"
//   //                 >
//   //                   Distribute Receipts
//   //                 </a>
//   //               </li>

//   //               <li>
//   //                 <a
//   //                   href="#!"
//   //                   className="text-decoration-none rounded-2 px-sm-1 px-md-2 px-lg-3 py-2 send-btn"
//   //                 >
//   //                   Send Announcement
//   //                 </a>
//   //               </li>
//   //             </div>

//   //             <div className="report-container-wrapper">
//   //               <li className="nav-link-wrapper">
//   //                 <a
//   //                   onClick={() => setIsReportOpen((prev) => !prev)}
//   //                   href="#!"
//   //                   className="text-decoration-none rounded-2 px-3 py-2 generate-btn"
//   //                 >
//   //                   Generate Report
//   //                 </a>

//   //                 <div
//   //                   className={`report-container shadow-lg ${
//   //                     isReportOpen ? "show" : ""
//   //                   }`}
//   //                 >
//   //                   <div className="report-title d-flex justify-content-between align-items-center">
//   //                     <h3>Report Types</h3>

//   //                     <i
//   //                       className="fa-solid fa-xmark"
//   //                       onClick={() => setIsReportOpen(false)}
//   //                       style={{ cursor: "pointer" }}
//   //                     ></i>
//   //                   </div>

//   //                   <div className="report-body">
//   //                     <label htmlFor="report">Report Types</label>

//   //                     <div className="select-box">
//   //                       <select
//   //                         id="report"
//   //                         value={reportType}
//   //                         onChange={(e) => setReportType(e.target.value)}
//   //                       >
//   //                         <option>Membership</option>
//   //                         <option>Collections</option>
//   //                         <option>Activist Performance</option>
//   //                         <option>Daily Report Summaries</option>
//   //                         <option>New Member Analysis</option>
//   //                       </select>
//   //                     </div>
//   //                     <label htmlFor="summary">Financial Summary</label>

//   //                     <div className="select-box">
//   //                       <select id="summary">
//   //                         <option>Year 2025</option>
//   //                         <option>Year 2024</option>
//   //                         <option>Year 2023</option>
//   //                       </select>
//   //                     </div>

//   //                     {reportType === "New Member Analysis" && (
//   //                       <>
//   //                         <label>Donor Type</label>

//   //                         <div className="radio-group">
//   //                           <label>
//   //                             <input
//   //                               type="radio"
//   //                               name="donor"
//   //                               value="old"
//   //                               checked={selected === "old"}
//   //                               onChange={(e) => setSelected(e.target.value)}
//   //                             />
//   //                           </label>

//   //                           <label>
//   //                             <input
//   //                               type="radio"
//   //                               name="donor"
//   //                               value="new"
//   //                               checked={selected === "new"}
//   //                               onChange={(e) => setSelected(e.target.value)}
//   //                             />
//   //                             New Donor
//   //                           </label>
//   //                         </div>
//   //                       </>
//   //                     )}

//   //                     <div className="d-flex justify-content-end">
//   //                       <button className="btn1 px-4 rounded">Generate</button>
//   //                     </div>
//   //                   </div>
//   //                 </div>
//   //               </li>
//   //             </div>
//   //           </ul>
//   //         </div>

//   //         {/* -------- Summary Cards -------- */}
//   //         <div className="row main-cards">
//   //           <div className="cards">
//   //             <div className="card-inner rounded-3 p-3">
//   //               <h4>Total Activists</h4>
//   //               <span>{summary.total_activists}</span>
//   //             </div>
//   //           </div>
//   //           <div className="cards">
//   //             <div className="card-inner rounded-3 p-3">
//   //               <h4>Total Members</h4>
//   //               <span>{summary.total_members}</span>
//   //             </div>
//   //           </div>
//   //           <div className="cards">
//   //             <div className="card-inner rounded-3 p-3">
//   //               <h4>Collections This Month</h4>
//   //               <span>{summary.collections_this_month}</span>
//   //             </div>
//   //           </div>
//   //           <div className="cards">
//   //             <div className="card-inner rounded-3 p-3">
//   //               <h4>Collections This Year</h4>
//   //               <span>{summary.collections_this_year}</span>
//   //             </div>
//   //           </div>
//   //           <div className="cards">
//   //             <div className="card-inner rounded-3 p-3">
//   //               <h4>New Daily Reports</h4>
//   //               <span>{summary.new_daily_reports}</span>
//   //             </div>
//   //           </div>
//   //           <div className="cards">
//   //             <div className="card-inner rounded-3 p-3">
//   //               <h4>New Members Ratio (%)</h4>
//   //               <span>{summary.new_members_ratio}</span>
//   //             </div>
//   //           </div>
//   //         </div>

//   //         <div className="charts row mt-4">
//   //           {/* -------- Membership Growth Line Chart -------- */}
//   //           <div className="col-md-6 mb-4">
//   //             <div className="chart-box p-3 rounded-3 shadow-sm bg-white mt-4">
//   //               <div className="d-flex align-items-center justify-content-between chart-controls">
//   //                 <h5>Membership Growth</h5>
//   //                 <div className="tabs d-flex">
//   //                   <button
//   //                     className={`tab ${
//   //                       timeFrame === "annually" ? "active" : ""
//   //                     }`}
//   //                     onClick={() => setTimeFrame("annually")}
//   //                   >
//   //                     Annually
//   //                   </button>
//   //                   <button
//   //                     className={`tab ${timeFrame === "monthly" ? "active" : ""}`}
//   //                     onClick={() => setTimeFrame("monthly")}
//   //                   >
//   //                     Monthly
//   //                   </button>
//   //                 </div>
//   //               </div>
//   //               <Line
//   //                 data={getMembershipChartData(timeFrame)}
//   //                 options={membershipOptions}
//   //                 plugins={[verticalLinePlugin]}
//   //               />
//   //             </div>
//   //           </div>

//   //           {/* -------- Collection Trends Bar Chart -------- */}
//   //           <div className="col-md-6 mb-4">
//   //             <div className="chart-box p-3 rounded-3 shadow-sm bg-white mt-4">
//   //               <div className="d-flex align-items-center flex-wrap justify-content-between chart-controls">
//   //                 <h5>Collection Trends</h5>
//   //                 <NestedSelect
//   //                   regions={regionsData}
//   //                   onSelect={handleRegionChange}
//   //                 />
//   //                 <div className="tabs tabs1 d-flex">
//   //                   <button
//   //                     className={`tab ${view === "monthly" ? "active" : ""}`}
//   //                     onClick={() => setView("monthly")}
//   //                   >
//   //                     Monthly
//   //                   </button>
//   //                   <button
//   //                     className={`tab ${view === "annually" ? "active" : ""}`}
//   //                     onClick={() => setView("annually")}
//   //                   >
//   //                     Annually
//   //                   </button>
//   //                 </div>
//   //               </div>
//   //               <Bar
//   //                 data={getCollectionChartData(view, selectedRegion)}
//   //                 options={{
//   //                   responsive: true,
//   //                   scales: { y: { beginAtZero: true } },
//   //                   borderRadius: 6,
//   //                 }}
//   //               />
//   //             </div>
//   //           </div>

//   //           {/* -------- Top Performers Doughnut Chart -------- */}
//   //           <div className="col-md-6 mb-4">
//   //             <div
//   //               className="chart-box p-3 rounded-3 shadow-sm bg-white mt-4"
//   //               style={{ height: "380px" }}
//   //             >
//   //               <h5>Top Performers</h5>
//   //               <Doughnut
//   //                 data={getTopPerformersChartData()}
//   //                 options={{
//   //                   responsive: true,
//   //                   maintainAspectRatio: false,
//   //                   cutout: "65%",
//   //                   radius: "90%",
//   //                   plugins: {
//   //                     legend: {
//   //                       position: "right",
//   //                       labels: {
//   //                         usePointStyle: true,
//   //                         pointStyle: "circle",
//   //                         font: { size: 14 },
//   //                       },
//   //                     },
//   //                   },
//   //                 }}
//   //               />
//   //             </div>
//   //           </div>

//   //           {/* -------- New vs Old Members Stacked Bar Chart -------- */}
//   //           <div className="col-md-6 mb-4">
//   //             <div className="chart-box p-3 rounded-3 shadow-sm bg-white mt-4">
//   //               <div className="d-flex align-items-center flex-wrap justify-content-between chart-controls">
//   //                 <h5>New vs Old Members</h5>
//   //                 <SimpleDropdown
//   //                   options={regionss}
//   //                   selected={region1}
//   //                   onChange={setRegion1}
//   //                 />
//   //                 <div className="tabs d-flex tabs1">
//   //                   <button
//   //                     className={`tab ${
//   //                       timeFrame2 === "annually" ? "active" : ""
//   //                     }`}
//   //                     onClick={() => setTimeFrame2("annually")}
//   //                   >
//   //                     Annually
//   //                   </button>
//   //                   <button
//   //                     className={`tab ${
//   //                       timeFrame2 === "monthly" ? "active" : ""
//   //                     }`}
//   //                     onClick={() => setTimeFrame2("monthly")}
//   //                   >
//   //                     Monthly
//   //                   </button>
//   //                 </div>
//   //               </div>
//   //               <Bar
//   //                 data={getNewVsOldChartData(timeFrame2)}
//   //                 options={{
//   //                   responsive: true,
//   //                   scales: {
//   //                     x: { stacked: true },
//   //                     y: { stacked: true, beginAtZero: true },
//   //                   },
//   //                   elements: { bar: { borderRadius: 6 } },
//   //                 }}
//   //               />
//   //             </div>
//   //           </div>
//   //         </div>
//   //       </div>
//   //     </main>
//   //   );
// }

// export default Home;

// Home.jsx
import React, { useState, useEffect, useMemo } from "react";
import NestedSelect from "./NestedSelect";
import SimpleDropdown from "./SimpleDropdown";
import {
  Chart,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  ArcElement,
  BarElement,
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";

Chart.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  ArcElement,
  BarElement
);

function Home() {
  // API + UI state
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [timeFrame, setTimeFrame] = useState("monthly"); // membership chart
  const [view, setView] = useState("monthly"); // collection trends timeframe
  const [timeFrame2, setTimeFrame2] = useState("monthly"); // new vs old timeframe
  const [region1, setRegion1] = useState(null); // simple dropdown selected
  const [selectedRegion, setSelectedRegion] = useState(null); // from nested select
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [selected, setSelected] = useState("new");
  const [reportType, setReportType] = useState("Membership");

  const regionss = ["Mumbai", "Satara"];

  // ---------- fetch dashboard ----------
  useEffect(() => {
    async function getUserData() {
      try {
        const url = "https://shramjivi-backend.onrender.com/api/dashboard/";
        const res = await fetch(url, {
          method: "GET",
          credentials: "include", // you used this; backend must support credentials
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);

        const json = await res.json();
        setDashboardData(json);
      } catch (err) {
        console.error("API Error:", err);
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    getUserData();
  }, []);

  const safeCollectionTrends = dashboardData?.collection_trends || {};

  const regionsData = useMemo(() => {
    const source = safeCollectionTrends?.monthly || {}; // show monthly tree by default for select
    const makeNode = (name, obj) => {
      const displayName = name === "null" || name == null ? "Unknown" : name;
      // leaf node: obj has total
      if (obj && typeof obj === "object" && typeof obj.total === "number") {
        return { taluka__name: displayName, total: obj.total };
      }
      // else build children
      const children = [];
      for (const key of Object.keys(obj || {})) {
        children.push(makeNode(key, obj[key]));
      }
      return { taluka__name: displayName, children };
    };

    return Object.keys(source).map((k) => makeNode(k, source[k]));
  }, [safeCollectionTrends]);

  // Loading / Error states
  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p>Error loading dashboard: {error}</p>;
  if (!dashboardData) return <p>No data available</p>;

  // Destructure API response safely
  const {
    summary = {},
    membership_growth = {},
    collection_trends = {},
    top_performers = [],
    new_vs_old = {},
  } = dashboardData;

  // ------------------ helpers (work on your nested JSON) ------------------

  // Helper: sum totals in a nested object where "total" is at leafs
  const sumTotalsFromObject = (obj) => {
    if (obj == null) return 0;
    if (typeof obj === "number") return obj;
    if (typeof obj === "object") {
      if (typeof obj.total === "number") return obj.total;
      let s = 0;
      for (const k of Object.keys(obj)) {
        s += sumTotalsFromObject(obj[k]);
      }
      return s;
    }
    return 0;
  };

  // ---------------- Membership growth chart (monthly/yearly objects) ----------------
  const getMembershipChartData = (frame) => {
    // membership_growth.monthly = { "Sep": 3 }, membership_growth.yearly = { "2025": 3 }
    const source =
      membership_growth?.[frame] ||
      (frame === "annually" ? membership_growth?.yearly : {}) ||
      {};
    let labels = Object.keys(source);

    let data = labels.map((k) => Number(source[k] ?? 0));

      if (labels.length === 1) {
    labels = ["Start", labels[0]]; // second empty label
    data = [0, data[0]]; // duplicate same value
  }
    return {
      labels: labels.length > 0 ? labels : ["No Data"],
      datasets: [
        {
          label: "Members",
          data,
          borderColor: "rgba(75,192,192,1)",
          backgroundColor: "rgba(75,192,192,0.2)",
          fill: false,
          tension: 0.4,
          pointRadius: 4, // 👈 show points
          pointBackgroundColor: "rgba(75,192,192,1)",
        },
      ],
    };
  };

  console.log("Membership Growth Chart Data:", getMembershipChartData(timeFrame));

  // ---------------- Collection trends (aggregate nested totals by district or show selected region) ---------------
  const getCollectionChartData = (timeFrameArg, selectedRegionNode) => {
    const source = collection_trends?.[timeFrameArg] || {};
    // if user picked a region node from nested select, show single bar (its total or aggregated total)
    if (selectedRegionNode) {
      // selectedRegionNode may be a leaf (has .total) or a parent (has .children)
      const total =
        typeof selectedRegionNode.total === "number"
          ? selectedRegionNode.total
          : selectedRegionNode.children
          ? selectedRegionNode.children.reduce(
              (acc, c) => acc + (c.total ?? 0),
              0
            )
          : 0;
      return {
        labels: [
          selectedRegionNode.taluka__name ||
            selectedRegionNode.name ||
            "Selected",
        ],
        datasets: [
          {
            label: `Collections (${timeFrameArg})`,
            data: [total],
            borderRadius: 6,
          },
        ],
      };
    }

    // otherwise aggregate per top-level key (e.g., district)
    const labels = Object.keys(source).map((k) =>
      k === "null" ? "Unknown" : k
    );
    const data = Object.keys(source).map((k) => sumTotalsFromObject(source[k]));
    return {
      labels,
      datasets: [
        {
          label: `Collections (${timeFrameArg})`,
          data,
          borderRadius: 6,
        },
      ],
    };
  };

  // ------------- Top performers (simple) -------------
  const getTopPerformersChartData = () => {
    const labels = top_performers.map((p) => p.name);
    const data = top_performers.map((p) => Number(p.total ?? 0));
    return {
      labels,
      datasets: [
        {
          data,
          borderWidth: 1,
        },
      ],
    };
  };

  // ------------- New vs Old: recursively find 'new'/'old' sums for each month/year -------------
  const accumulateNewOld = (node) => {
    // returns { new: N, old: M } by recursively walking node until it finds keys 'new' & 'old'
    let sums = { new: 0, old: 0 };
    if (node == null) return sums;
    if (typeof node === "object") {
      if (node?.new !== undefined || node?.old !== undefined) {
        sums.new += Number(node.new ?? 0);
        sums.old += Number(node.old ?? 0);
        return sums;
      }
      for (const k of Object.keys(node)) {
        const child = accumulateNewOld(node[k]);
        sums.new += child.new;
        sums.old += child.old;
      }
    }
    return sums;
  };

  const getNewVsOldChartData = (frame) => {
    const frameObj = new_vs_old?.[frame] || {};
    const labels = Object.keys(frameObj).map((k) =>
      k === "null" ? "Unknown" : k
    );
    const newData = [];
    const oldData = [];
    for (const key of Object.keys(frameObj)) {
      const sums = accumulateNewOld(frameObj[key]);
      newData.push(sums.new);
      oldData.push(sums.old);
    }
    return {
      labels,
      datasets: [
        { label: "New Members", data: newData },
        { label: "Old Members", data: oldData },
      ],
    };
  };

  // ---------------- Build region nodes for NestedSelect from collection_trends.monthly (generic recursive builder) ---------------

  // Handler when user picks a region node
  const handleRegionChange = (regionNode) => {
    setSelectedRegion(regionNode);
  };

  // ---------------- Chart options (small examples; adjust styling as you like) ----------------
  const membershipOptions = {
    responsive: true,
    scales: { y: { beginAtZero: false } },
  };

  // ---------- JSX (mostly your original markup, now using the safe helpers above) ----------
  return (
    <main className="main-container p-lg-3 p-sm-none">
      <div className="container-body rounded-lg-4 p-3">
        <div className="main-title d-flex justify-content-between">
          <h3>Dashboard</h3>

          <ul className="list-unstyled d-lg-inline-flex gap-2 sidebar-list d-sm-block">
            {/* your buttons */}
            <div className="d-lg-flex gap-2 receipt-announcement-div">
              <li>
                <a
                  href="#!"
                  className="text-decoration-none rounded-2 px-2 px-lg-3 py-2 distribute-btn"
                >
                  Distribute Receipts
                </a>
              </li>
              <li>
                <a
                  href="#!"
                  className="text-decoration-none rounded-2 px-sm-1 px-md-2 px-lg-3 py-2 send-btn"
                >
                  Send Announcement
                </a>
              </li>
            </div>

            <div className="report-container-wrapper">
              <li className="nav-link-wrapper">
                <a
                  onClick={() => setIsReportOpen((p) => !p)}
                  href="#!"
                  className="text-decoration-none rounded-2 px-3 py-2 generate-btn"
                >
                  Generate Report
                </a>

                <div
                  className={`report-container shadow-lg ${
                    isReportOpen ? "show" : ""
                  }`}
                >
                  {/* report modal content - keep as before */}
                  <div className="report-title d-flex justify-content-between align-items-center">
                    <h3>Report Types</h3>
                    <i
                      className="fa-solid fa-xmark"
                      onClick={() => setIsReportOpen(false)}
                      style={{ cursor: "pointer" }}
                    ></i>
                  </div>

                  <div className="report-body">
                    <label htmlFor="report">Report Types</label>
                    <div className="select-box">
                      <select
                        id="report"
                        value={reportType}
                        onChange={(e) => setReportType(e.target.value)}
                      >
                        <option>Membership</option>
                        <option>Collections</option>
                        <option>Activist Performance</option>
                        <option>Daily Report Summaries</option>
                        <option>New Member Analysis</option>
                      </select>
                    </div>

                    <label htmlFor="summary">Financial Summary</label>
                    <div className="select-box">
                      <select id="summary">
                        <option>Year 2025</option>
                        <option>Year 2024</option>
                        <option>Year 2023</option>
                      </select>
                    </div>

                    {reportType === "New Member Analysis" && (
                      <>
                        <label>Donor Type</label>
                        <div className="radio-group">
                          <label>
                            <input
                              type="radio"
                              name="donor"
                              value="old"
                              checked={selected === "old"}
                              onChange={(e) => setSelected(e.target.value)}
                            />{" "}
                            Old Donor
                          </label>
                          <label>
                            <input
                              type="radio"
                              name="donor"
                              value="new"
                              checked={selected === "new"}
                              onChange={(e) => setSelected(e.target.value)}
                            />{" "}
                            New Donor
                          </label>
                        </div>
                      </>
                    )}

                    <div className="d-flex justify-content-end">
                      <button className="btn1 px-4 rounded">Generate</button>
                    </div>
                  </div>
                </div>
              </li>
            </div>
          </ul>
        </div>

        {/* Summary cards (unchanged) */}
        <div className="row main-cards">
          <div className="cards">
            <div className="card-inner rounded-3 p-3">
              <h4>Total Activists</h4>
              <span>{summary.total_activists}</span>
            </div>
          </div>

          <div className="cards">
            <div className="card-inner rounded-3 p-3">
              <h4>Total Members</h4>
              <span>{summary.total_members}</span>
            </div>
          </div>

          <div className="cards">
            <div className="card-inner rounded-3 p-3">
              <h4>Collections This Month</h4>
              <span>{summary.collections_this_month}</span>
            </div>
          </div>

          <div className="cards">
            <div className="card-inner rounded-3 p-3">
              <h4>Collections This Year</h4>
              <span>{summary.collections_this_year}</span>
            </div>
          </div>

          <div className="cards">
            <div className="card-inner rounded-3 p-3">
              <h4>New Daily Reports</h4>
              <span>{summary.new_daily_reports}</span>
            </div>
          </div>

          <div className="cards">
            <div className="card-inner rounded-3 p-3">
              <h4>New Members Ratio (%)</h4>
              <span>{summary.new_members_ratio}</span>
            </div>
          </div>
        </div>

        <div className="charts row mt-4">
          {/* Membership Growth */}
          <div className="col-md-6 mb-4">
            <div className="chart-box p-3 rounded-3 shadow-sm bg-white mt-4">
              <div className="d-flex align-items-center justify-content-between chart-controls">
                <h5>Membership Growth</h5>
                <div className="tabs d-flex">
                  <button
                    className={`tab ${
                      timeFrame === "annually" ? "active" : ""
                    }`}
                    onClick={() => setTimeFrame("annually")}
                  >
                    Annually
                  </button>
                  <button
                    className={`tab ${timeFrame === "monthly" ? "active" : ""}`}
                    onClick={() => setTimeFrame("monthly")}
                  >
                    Monthly
                  </button>
                </div>
              </div>

              <Line
                data={getMembershipChartData(timeFrame)}
                options={membershipOptions}
              />
            </div>
          </div>

          {/* Collection Trends */}
          <div className="col-md-6 mb-4">
            <div className="chart-box p-3 rounded-3 shadow-sm bg-white mt-4">
              <div className="d-flex align-items-center flex-wrap justify-content-between chart-controls">
                <h5>Collection Trends</h5>
                <NestedSelect
                  regions={regionsData}
                  onSelect={handleRegionChange}
                />
                <div className="tabs tabs1 d-flex">
                  <button
                    className={`tab ${view === "monthly" ? "active" : ""}`}
                    onClick={() => setView("monthly")}
                  >
                    Monthly
                  </button>
                  <button
                    className={`tab ${view === "annually" ? "active" : ""}`}
                    onClick={() => setView("annually")}
                  >
                    Annually
                  </button>
                </div>
              </div>

              <Bar
                data={getCollectionChartData(view, selectedRegion)}
                options={{
                  responsive: true,
                  scales: { y: { beginAtZero: true } },
                  borderRadius: 6,
                }}
              />
            </div>
          </div>

          {/* Top performers */}
          <div className="col-md-6 mb-4">
            <div
              className="chart-box p-3 rounded-3 shadow-sm bg-white mt-4"
              style={{ height: "380px" }}
            >
              <h5>Top Performers</h5>
              <Doughnut
                data={getTopPerformersChartData()}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  cutout: "65%",
                  radius: "90%",
                  plugins: {
                    legend: {
                      position: "right",
                      labels: {
                        usePointStyle: true,
                        pointStyle: "circle",
                        font: { size: 14 },
                      },
                    },
                  },
                }}
              />
            </div>
          </div>

          {/* New vs Old */}
          <div className="col-md-6 mb-4">
            <div className="chart-box p-3 rounded-3 shadow-sm bg-white mt-4">
              <div className="d-flex align-items-center flex-wrap justify-content-between chart-controls">
                <h5>New vs Old Members</h5>
                <SimpleDropdown
                  options={regionss}
                  selected={region1}
                  onChange={setRegion1}
                />
                <div className="tabs d-flex tabs1">
                  <button
                    className={`tab ${
                      timeFrame2 === "annually" ? "active" : ""
                    }`}
                    onClick={() => setTimeFrame2("annually")}
                  >
                    Annually
                  </button>
                  <button
                    className={`tab ${
                      timeFrame2 === "monthly" ? "active" : ""
                    }`}
                    onClick={() => setTimeFrame2("monthly")}
                  >
                    Monthly
                  </button>
                </div>
              </div>

              <Bar
                data={getNewVsOldChartData(timeFrame2)}
                options={{
                  responsive: true,
                  scales: {
                    x: { stacked: true },
                    y: { stacked: true, beginAtZero: true },
                  },
                  elements: { bar: { borderRadius: 6 } },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;
