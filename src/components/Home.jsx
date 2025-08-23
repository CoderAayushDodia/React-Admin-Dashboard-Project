import React, { useState, useEffect } from "react";
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
  const [timeFrame1, setTimeFrame1] = useState("monthly");
  const [timeFrame2, setTimeFrame2] = useState("monthly");
  const [region, setRegion] = useState("Satara");
  const [region1, setRegion1] = useState("Satara");
  const [isReportOpen, setIsReportOpen] = useState(false);

  // Destructure JSON data
  const {
    stats,
    memberShipChart,
    collectionTrends,
    topPerformers,
    newVsOldMembers,
  } = dashboardData;

  // Membership Line Chart
  const membershipConfig = {
    labels: memberShipChart.labels,
    datasets: [
      {
        label: memberShipChart.label,
        data: memberShipChart.data,
        borderColor: "red",
        fill: false,
        tension: 0.5,
        pointBackgroundColor: "red",
      },
    ],
  };

  // Top Performers Doughnut Chart
  const topPerformersConfig = {
    labels: topPerformers.labels,
    datasets: topPerformers.datasets,
  };

  // New vs Old Members Stacked Bar Chart
  const newVsOldOptions = {
    responsive: true,
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

  return (
    <main className="main-container p-3">
      <div className="container-body rounded-4 p-3">
        <div className="main-title d-flex justify-content-between">
          <h3>Dashboard</h3>
          <ul className="list-unstyled d-flex justify-content-start justify-content-md-center gap-2 sidebar-list">
            <li>
              <a
                href="#!"
                className="text-decoration-none rounded-2 px-3 py-2 distribute-btn"
              >
                Distribute Receipts
              </a>
            </li>
            <li>
              <a
                href="#!"
                className="text-decoration-none rounded-2 px-3 py-2 send-btn"
              >
                Send Announcement
              </a>
            </li>
            <li className="nav-link-wrapper position-relative">
              <a
                onClick={() => setIsReportOpen((prev) => !prev)}
                href="#!"
                className="text-decoration-none rounded-2 px-3 py-2 generate-btn"
              >
                Generate Report
              </a>
              <div className={`report-container ${isReportOpen ? "show" : ""}`}>
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
              <Line data={membershipConfig} />
            </div>
          </div>

          {/* Collection Trends Bar Chart */}
          <div className="col-md-6 mb-4">
            <div className="chart-box p-3 rounded-3 shadow-sm bg-white">
              <div className="chart-controls d-flex align-items-center flex-wrap justify-content-between">
                <h5 className="mb-0 chart-title">Collection Trends</h5>

                {/* Region Dropdown */}
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="dropdown"
                >
                  <option value="Satara">Satara</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Pune">Pune</option>
                  <option value="Latur">Latur</option>
                </select>

                {/* Annual / Monthly Tabs */}
                <div className="tabs">
                  <button
                    className={`tab ${
                      timeFrame1 === "annually" ? "active" : ""
                    }`}
                    onClick={() => setTimeFrame1("annually")}
                  >
                    Annualy
                  </button>
                  <button
                    className={`tab ${timeFrame1 === "monthly" ? "active" : ""}`}
                    onClick={() => setTimeFrame1("monthly")}
                  >
                    Monthly
                  </button>
                </div>
              </div>

              {/* Bar Chart with Dynamic Data */}
              <Bar
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
              />
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
                <select
                  value={region1}
                  onChange={(e) => setRegion1(e.target.value)}
                  className="dropdown"
                >
                  <option value="Satara">Satara</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Pune">Pune</option>
                  <option value="Latur">Latur</option>
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
                    className={`tab ${timeFrame2 === "monthly" ? "active" : ""}`}
                    onClick={() => setTimeFrame2("monthly")}
                  >
                    Monthly
                  </button>
                </div>
              </div>

              {/* Dynamic data for stacked bar based on region & timeframe */}
              <Bar
                data={{
                  labels: newVsOldMembers.labels,
                  datasets: [
                    {
                      ...newVsOldMembers.datasets[0],
                      data:
                        timeFrame === "monthly"
                          ? newVsOldMembers.datasets[0].data
                          : newVsOldMembers.datasets[0].data.map((d) => d * 10),
                    },
                    {
                      ...newVsOldMembers.datasets[1],
                      data:
                        timeFrame === "monthly"
                          ? newVsOldMembers.datasets[1].data
                          : newVsOldMembers.datasets[1].data.map((d) => d * 10),
                    },
                  ],
                }}
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
