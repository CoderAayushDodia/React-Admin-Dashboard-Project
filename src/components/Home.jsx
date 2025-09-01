import React, { useState, useEffect } from "react";
import NestedSelect from "./NestedSelect";
import SimpleDropdown from "./SimpleDropdown";
// import { regionsData } from "../data/regions";
// import { findRegionData } from "../utils/findRegion";

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
import dashboardData from "../../public/dashboardData.json"; // Import JSON

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
  const [timeFrame, setTimeFrame] = useState("monthly");
  const [region1, setRegion1] = useState("Mumbai");
  const [timeFrame2, setTimeFrame2] = useState("monthly");
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [view, setView] = useState("monthly"); // or "annually"
  const [selected, setSelected] = useState("new");
  const [reportType, setReportType] = useState("Membership");
  const handleRegionChange = (regionNode) => {
    setSelectedRegion(regionNode);
  };
  const regionss = ["Mumbai", "Satara"];
  // const [region, setRegion] = useState("Mumbai");

  // Destructure JSON data
  const {
    stats,
    memberShipChart,
    collectionTrends,
    topPerformers,
    newVsOldMembers,
    regions,
  } = dashboardData;

  const membershipConfig = {
    labels:
      timeFrame === "monthly"
        ? memberShipChart.monthly.labels // monthly days (2,4,6…)
        : memberShipChart.annual.labels, // annual months (Jan, Feb…)
    datasets: [
      {
        label: memberShipChart.label,
        data:
          timeFrame === "monthly"
            ? memberShipChart.monthly.data
            : memberShipChart.annual.data,
        borderColor: "red",
        fill: false,
        tension: 0.5,
        pointRadius: 0, // hide all dots
        pointHoverRadius: 5, // show dot only on hover
        pointBackgroundColor: "red",
      },
    ],
  };
  const membershipOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: false, // 🔑 makes it not start from 0
        ticks: {
          stepSize: 200, // optional, space between y-axis values
        },
      },
    },
  };

  // Custom plugin for vertical line
  const verticalLinePlugin = {
    id: "verticalLine",
    afterDatasetsDraw: (chart) => {
      if (chart.tooltip?._active && chart.tooltip._active.length > 0) {
        const ctx = chart.ctx;
        const activePoint = chart.tooltip._active[0].element;
        const x = activePoint.x;
        const topY = chart.scales.y.top;
        const bottomY = chart.scales.y.bottom;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x, topY);
        ctx.lineTo(x, bottomY);
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = "red";
        ctx.stroke();
        ctx.restore();
      }
    },
  };

  // Top Performers Doughnut Chart
  const topPerformersConfig = {
    labels: topPerformers.labels,
    datasets: topPerformers.datasets,
  };

  const topPerformersOptions = {
    responsive: true,
    maintainAspectRatio: false, // allows flexible sizing
    cutout: "65%", // hole size (inner radius)
    radius: "90%", // outer size
    plugins: {
      legend: {
        position: "right",
        labels: {
          usePointStyle: true, // <-- use circle instead of square
          pointStyle: "circle",
          font: { size: 14 },
        },
      },
    },
  };

  // New vs Old Members Stacked Bar Chart
  const newVsOldConfig = newVsOldMembers[region1][timeFrame2];

  // helper function for responsive font
  const responsiveFont = (context) => {
    const width = context.chart.width;
    if (width < 400) return { size: 9 };
    if (width < 768) return { size: 11 };
    return { size: 13 };
  };

  const newVsOldOptions = {
    responsive: true,
    elements: { bar: { borderRadius: 6 } },
    plugins: {
      legend: {
        labels: {
          font: responsiveFont,
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          font: responsiveFont,
        },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        ticks: {
          font: responsiveFont,
        },
      },
    },
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".nav-link-wrapper")) {
        setIsReportOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const getChartData = (chartVariable, selectedRegion, view) => {
    if (selectedRegion && selectedRegion[view]) {
      return {
        labels: selectedRegion[view].labels,
        datasets: selectedRegion[view].datasets.map((ds) => ({ ...ds })),
      };
    }

    if (chartVariable && (chartVariable.monthly || chartVariable.annually)) {
      return (
        chartVariable[view] || chartVariable.monthly || chartVariable.annually
      );
    }

    if (view === "annually") {
      // NOTE: multiplying by 12 is arbitrary — best to provide annual data in JSON.
      return {
        labels: chartVariable.labels,
        datasets: chartVariable.datasets.map((ds) => ({
          ...ds,
          data: ds.data.map((v) => Math.round(v * 12)),
        })),
      };
    }

    return chartVariable;
  };

  return (
    <main className="main-container p-lg-3 p-sm-none">
      <div className="container-body rounded-lg-4 p-3">
        <div className="main-title d-flex justify-content-between ">
          <h3>Dashboard</h3>
          <ul className="list-unstyled d-lg-inline-flex gap-2 sidebar-list d-sm-block">
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
                  onClick={() => setIsReportOpen((prev) => !prev)}
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

        {/* Stats Cards */}
        <div className="row main-cards">
          {stats.map((item, index) => (
            <div className="cards" key={index}>
              <div className="card-inner rounded-3 p-3">
                <h4>{item.title}</h4>
                <span>{item.value}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="charts row mt-4">
          {/* Membership Line Chart */}
          <div className="col-md-6 mb-4">
            <div className="chart-box p-3 rounded-3 shadow-sm bg-white">
              <div className="chart-controls d-flex align-items-center flex-wrap justify-content-between">
                <h5>Membership Growth</h5>
                <div className="tabs">
                  <button
                    className={`tab ${
                      timeFrame === "annually" ? "active" : ""
                    }`}
                    onClick={() => setTimeFrame("annually")}
                  >
                    Annualy
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
                data={membershipConfig}
                options={membershipOptions}
                plugins={[verticalLinePlugin]}
              />
            </div>
          </div>

          {/* Collection Trends Bar Chart */}
          <div className="col-md-6 mb-4">
            <div className="chart-box p-3 rounded-3 shadow-sm bg-white">
              <div className="chart-controls d-flex align-items-center flex-wrap justify-content-between">
                <h5 className="mb-1 chart-title">Collection Trends</h5>

                {/* ✅ Nested Dropdown goes here */}
                <NestedSelect regions={regions} onSelect={handleRegionChange} />

                {/* Toggle Monthly / Annually */}
                <div className="tabs d-flex tabs1">
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
                data={getChartData(collectionTrends, selectedRegion, view)}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: "top" },
                    title: {
                      display: true,
                      text: selectedRegion
                        ? `${
                            selectedRegion.name
                          } - ${view.toUpperCase()} Collection`
                        : "Overall Collection Trends",
                    },
                  },
                  scales: { y: { beginAtZero: true } },
                  borderRadius: 6,
                }}
              />
            </div>
          </div>

          {/* Top Performers Doughnut Chart */}
          <div className="col-md-6 mb-4">
            <div className="chart-box p-3 rounded-3 shadow-sm bg-white" style={{ width: "100%", height: "380px" }}>
              <h5>Top Performers</h5>
              <Doughnut
                data={topPerformersConfig}
                options={topPerformersOptions}
              />
            </div>
          </div>

          {/* New vs Old Members Stacked Bar Chart */}
          <div className="col-md-6 mb-4">
            <div className="chart-box p-3 rounded-3 shadow-sm bg-white  chart-3">
              <div className="chart-controls d-flex align-item-center flex-wrap justify-content-between">
                <h5 className="mb-2 chart-title">New vs. Old Members</h5>

                

                {/* Custom Dropdown instead of <select> */}
                <SimpleDropdown
                  options={regionss}
                  selected={region1}
                  onChange={(value) => setRegion1(value)}
                />

                <div className="tabs tabs1">
                  <button
                    className={`tab ${
                      timeFrame2 === "annually" ? "active" : ""
                    }`}
                    onClick={() => setTimeFrame2("annually")}
                  >
                    Annualy
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

              {/* Dynamic data for stacked bar based on region & timeframe */}
              <Bar data={newVsOldConfig} options={newVsOldOptions} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;
