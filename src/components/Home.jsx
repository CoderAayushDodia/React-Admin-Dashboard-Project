import React, { useState, useEffect } from "react";
import NestedSelect from "./NestedSelect";
import { regionsData } from "../data/regions";
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
  // const [timeFrame1, setTimeFrame1] = useState("monthly");
  // const [region, setRegion] = useState("Satara");
  const [region1, setRegion1] = useState("Satara");
  const [timeFrame2, setTimeFrame2] = useState("monthly");

  const [isReportOpen, setIsReportOpen] = useState(false);

  const [selectedRegion, setSelectedRegion] = useState(null);
  // const [filter, setFilter] = useState("annual");
  const [view, setView] = useState("monthly"); // or "annually"
  // const [chartData, setChartData] = useState(null);

  // useEffect(() => {
  //   if (selectedRegion) {
  //     const regionNode = findRegionData(regionsData, selectedRegion);

  //     if (regionNode && regionNode[view]) {
  //       setChartData(regionNode[view]); // Directly pass monthly/annually data
  //     } else {
  //       setChartData(null);
  //     }
  //   }
  // }, [selectedRegion, view]);

  const handleRegionChange = (regionNode) => {
    setSelectedRegion(regionNode);
  };

  // Destructure JSON data
  const {
    stats,
    memberShipChart,
    collectionTrends,
    topPerformers,
    newVsOldMembers,
    regions,
  } = dashboardData;

  // let collectionConfig;
  // if (selectedRegion) {
  //   // region-specific chart
  //   collectionConfig =
  //     timeFrame === "monthly"
  //       ? selectedRegion.monthly
  //       : selectedRegion.annually;
  // } else {
  //   // global chart
  //   // collectionConfig = collectionTrends;
  // }

  // Membership Line Chart
  // const membershipConfig = {
  //   labels: memberShipChart.labels,
  //   datasets: [
  //     {
  //       label: memberShipChart.label,
  //       data: memberShipChart.data,
  //       borderColor: "red",
  //       fill: false,
  //       tension: 0.5,
  //       pointRadius: 0, // 🔹 removes the dots
  //       // pointHoverRadius: 6,
  //       pointBackgroundColor: "red",
  //     },
  //   ],
  // };

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
    plugins: {
      // legend: { display: false },
      tooltip: {
        // mode: "index",
        // intersect: false,
      },
    },
    interaction: {
      // mode: "index",
      // intersect: false,
    },
    scales: {
      y: {
        beginAtZero: false, // 🔑 makes it not start from 0
        ticks: {
          stepSize: 200, // optional, space between y-axis values
        },
      },
      x: {
        grid: {
          // display: false, // clean look like your example
        },
      },
    },
  };

  // Custom plugin for vertical line
  // 🔴 Custom plugin for vertical hover line
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

  // Collection Trends Bar Chart Config
  // const collectionConfig = {
  //   labels:
  //     timeFrame === "monthly"
  //       ? collectionTrends.labels
  //       : collectionTrends.labels,
  //   datasets: [
  //     {
  //       label: collectionTrends.label,
  //       data:
  //         timeFrame === "monthly"
  //           ? collectionTrends.data
  //           : collectionTrends.data,
  //       backgroundColor: "lightgray",
  //       borderRadius: 6,
  //     },
  //   ],
  // };

  // const collectionOptions = {
  //   responsive: true,
  //   plugins: {
  //     legend: { position: "top" },
  //   },
  //   scales: {
  //     y: {
  //       beginAtZero: true,
  //     },
  //   },
  // };

  // Top Performers Doughnut Chart
  const topPerformersConfig = {
    labels: topPerformers.labels,
    datasets: topPerformers.datasets,
  };

  // New vs Old Members Stacked Bar Chart
  const newVsOldConfig = newVsOldMembers[region1][timeFrame2];

  const newVsOldOptions = {
    responsive: true,
    borderRadius: 6,
    scales: {
      x: { stacked: true },
      y: { stacked: true, beginAtZero: true },
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
    // If region is selected, use that data, else fallback to main variable
    const data = selectedRegion ? selectedRegion[view] : chartVariable;

    return {
      labels: data.labels,
      datasets: data.datasets.map((dataset) => ({
        ...dataset,
        // optionally modify dataset here, e.g., color, transform values
      })),
    };
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
                  className={`report-container shadow-lg ${isReportOpen ? "show" : ""}`}
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
                      <select id="report">
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

                    <label>Donor Type</label>
                    <div className="radio-group">
                      <label>
                        <input type="radio" name="donor" /> Old Donor
                      </label>
                      <label>
                        <input type="radio" name="donor" /> New Donor
                      </label>
                    </div>

                    <li className="nav-item ms-auto">
                      <button className="btn">Generate</button>
                    </li>
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
                <h5 className="mb-0 chart-title">Collection Trends</h5>

                {/* Region Dropdown */}
                {/* <select
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      className="dropdown"
                    >
                      <option value="Satara">Satara</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Pune">Pune</option>
                      <option value="Latur">Latur</option>
                    </select> */}

                {/* ✅ Nested Dropdown goes here */}
                <NestedSelect regions={regions} onSelect={handleRegionChange} />

                {/* Annual / Monthly Tabs */}
                {/* <div className="tabs">
                      <button
                        className={`tab ${
                          timeFrame1 === "annually" ? "active" : ""
                        }`}
                        onClick={() => setTimeFrame1("annually")}
                      >
                        Annualy
                      </button>
                      <button
                        className={`tab ${
                          timeFrame1 === "monthly" ? "active" : ""
                        }`}
                        onClick={() => setTimeFrame1("monthly")}
                      >
                        Monthly
                      </button>
                    </div> */}

                {/* Toggle Monthly / Annually */}
                <div className="tabs">
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

              {/* Bar Chart with Dynamic Data */}
              {/* <Bar
                    data={{
                      labels: collectionTrends.labels,
                      datasets: collectionTrends.datasets.map((dataset) => ({
                        ...dataset,
                        data: dataset.data.map(
                          (d) => (timeFrame === "monthly" ? d : d * 12) // Example: convert monthly to annual
                        ),
                      })),
                    }}
                    options={{
                      responsive: true,
                      scales: { y: { beginAtZero: true } },
                    }}
                  /> */}

              {/* <div className="mt-4">
                    {chartData ? (
                      <Bar
                        data={chartData}
                        options={{
                          responsive: true,
                          plugins: { legend: { position: "top" } },
                          scales: { y: { beginAtZero: true } },
                        }}
                      />
                    ) : (
                      <p className="text-muted">Please select a region</p>
                    )}
                  </div> */}

              <div className="p-3">
                <h5 className="mb-3">
                  {selectedRegion ? `${selectedRegion.name} Collection` : ""}
                </h5>

                {/* <Bar
                  data={
                    selectedRegion
                      ? selectedRegion[view] // region monthly/annually
                      : collectionTrends // default static chart
                  }
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
                  }}
                /> */}

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
                  }}
                />
              </div>
            </div>
          </div>

          {/* Top Performers Doughnut Chart */}
          <div className="col-md-6 mb-4">
            <div className="chart-box p-3 rounded-3 shadow-sm bg-white">
              <h5>Top Performers</h5>
              <Doughnut
                data={topPerformersConfig}
                options={{
                  plugins: {
                    legend: {
                      position: "right",
                      labels: {
                        usePointStyle: true,
                        pointStyle: "circle",
                      },
                    },
                  },
                  maintainAspectRatio: true, // 🔑 allows custom width/height
                }}
              />
            </div>
          </div>

          {/* New vs Old Members Stacked Bar Chart */}
          <div className="col-md-6 mb-4">
            <div className="chart-box p-3 rounded-3 shadow-sm bg-white  chart-3">
              <div className="chart-controls d-flex align-item-center flex-wrap justify-content-between">
                <h5 className="mb-0 chart-title">New vs. Old Members</h5>
                {/* <select
                  value={region1}
                  onChange={(e) => setRegion1(e.target.value)}
                  className="dropdown"
                >
                  <option value="Satara">Satara</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Pune">Pune</option>
                  <option value="Latur">Latur</option>
                </select> */}

                <select
                  value={region1}
                  onChange={(e) => setRegion1(e.target.value)}
                  className="dropdown"
                >
                  {Object.keys(newVsOldMembers).map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>

                <div className="tabs">
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
              <Bar
                // data={{
                //   labels: newVsOldMembers.labels,
                //   datasets: [
                //     {
                //       ...newVsOldMembers.datasets[0],
                //       data:
                //         timeFrame2 === "monthly"
                //           ? newVsOldMembers.datasets[0].data
                //           : newVsOldMembers.datasets[0].data.map((d) => d * 10),
                //     },
                //     {
                //       ...newVsOldMembers.datasets[1],
                //       data:
                //         timeFrame2 === "monthly"
                //           ? newVsOldMembers.datasets[1].data
                //           : newVsOldMembers.datasets[1].data.map((d) => d * 10),
                //     },
                //   ],
                // }}

                data={newVsOldConfig}
                options={newVsOldOptions}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;
