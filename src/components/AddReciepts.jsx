import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddReciepts({ addNewActivist }) {
  const navigate = useNavigate();
  // const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    region: "",
    mobile: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewActivist(formData); //pass data to parent
    navigate("/receipts"); //redirect back to activist list
  };

  return (
    <div className="main-container p-3">
      <div className="container-body mb-4 d-lg-block d-md-block d-none">
        <div className="add-activist-header d-lg-flex d-md-flex d-none align-items-center gap-2 pt-3 px-3 ">
          <span class="material-symbols-outlined">home</span>
          <i className="fa fa-angle-right"></i>
          <p className="mb-0">Receipts Management</p>
          <i className="fa fa-angle-right"></i>
          <p className="mb-0">Add Receipt</p>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-2 pt-3 px-3">
          <h4>Add Receipts</h4>
          <div className="d-flex gap-2 activist-action-buttons">
            <button
              type="button"
              className="btn btn-outline-secondary me-2 add-activist-cancel-btn"
              onClick={() => navigate("/sabhasad")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn add-activist-save-btn"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-lg-2 mb-md-2 mb-0 pt-lg-3 pt-md-2 pt-0 px-3 d-lg-none d-md-none d-flex">
        <h4 className="d-lg-block d-md-block d-none">Add Reciepts</h4>
        <div className="d-lg-none d-md-none d-flex gap-2 activist-action-buttons">
          <button
            type="button"
            className="btn btn-outline-secondary me-2 add-activist-cancel-btn"
            onClick={() => navigate("/sabhasad")}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="add-activist-save-btn"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>

      <div className="container-body mb-4">
        <form action="#" className="p-3">
          <div className="row g-3">
            <div className="col-md-4">
              <h4 className="d-lg-none d-md-none d-block">Add Receipts</h4>
              <label className="form-label">
                Select Lower Region{" "}
                <span className="text-danger fw-bold">*</span>
              </label>
              <input
                type="text"
                name="name"
                className="form-select"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">
                Name <span className="text-danger fw-bold">*</span>
              </label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={formData.region}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">
                Campaign Year <span className="text-danger fw-bold">*</span>
              </label>
              <select
                type="text"
                name="address"
                className="form-select"
                // value={formData.password}
                onChange={handleChange}
                required
              >
                <option value="">Select Year</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
              </select>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddReciepts;
