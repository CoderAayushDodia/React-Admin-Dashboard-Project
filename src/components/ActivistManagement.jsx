import React, { useState, useEffect } from "react";

import dashboardData from "../../public/dashboardData.json"; // Import JSON

function ActivistManagement() {
  const [activists, setActivists] = useState([]);

  useEffect(() => {
    setActivists(dashboardData.ActivistManagement || []);
  }, []);

  return (
    <div className="main-container p-3">
      <div className="container-body p-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold">Activists Management</h4>

        <div className="d-flex gap-2">
          <button className="btn btn-outline-danger">
            <i className="fa-solid fa-download me-1"></i> Download
          </button>
          <button className="btn btn-danger">
            <i className="fa-solid fa-plus me-1"></i> Add Activist
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="d-flex gap-3 mb-3">
        <input
          type="text"
          placeholder="Search"
          className="form-control"
          style={{ maxWidth: "250px" }}
        />
        <select className="form-select" style={{ maxWidth: "200px" }}>
          <option>Select Regions</option>
          <option>Mumbai</option>
          <option>Pune</option>
          <option>Nasik</option>
        </select>
        <input type="date" className="form-control" style={{ maxWidth: "180px" }} />
        <input type="date" className="form-control" style={{ maxWidth: "180px" }} />
        <button className="btn btn-outline-danger">Apply</button>
      </div>

      {/* Table */}
      <div className="" style={{ overflowX: "auto" }}>
        <table className="table align-middle">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Region</th>
              <th>Mobile</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {activists.map((activist) => (
              <tr key={activist.id}>
                <td>{activist.name}</td>
                <td>{activist.role}</td>
                <td>{activist.region}</td>
                <td>{activist.mobile}</td>
                <td>
                  <span
                    className={`badge rounded-pill ${
                      activist.status === "Active"
                        ? "bg-success-subtle text-success"
                        : "bg-danger-subtle text-danger"
                    }`}
                  >
                    {activist.status}
                  </span>
                </td>
                <td className="text-center">
                  <i className="fa-regular fa-pen-to-square mx-2"></i>
                  <i className="fa-regular fa-trash-can mx-2"></i>
                  <i className="fa-regular fa-eye mx-2"></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <button className="btn btn-light">&larr; Previous</button>
        <div>
          <button className="btn btn-danger btn-sm mx-1">1</button>
          <button className="btn btn-outline-secondary btn-sm mx-1">2</button>
          <button className="btn btn-outline-secondary btn-sm mx-1">3</button>
          <span className="mx-2">...</span>
          <button className="btn btn-outline-secondary btn-sm mx-1">10</button>
        </div>
        <button className="btn btn-light">Next &rarr;</button>
      </div>
      </div>
    </div>
  );
}

export default ActivistManagement;
