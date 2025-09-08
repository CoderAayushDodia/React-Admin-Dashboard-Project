import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddSabhasad({ addNewActivist }) {
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
    navigate("/sabhasad"); //redirect back to activist list
  };

  return (
    <div className="main-container p-3">
      <div className="container-body mb-4 d-lg-block d-md-block d-none">
        <div className="add-activist-header d-lg-flex d-md-flex d-none align-items-center gap-2 pt-3 px-3 ">
          <span class="material-symbols-outlined">home</span>
          <i className="fa fa-angle-right"></i>
          <p className="mb-0">Sabhasad Management</p>
          <i className="fa fa-angle-right"></i>
          <p className="mb-0">Add Sabhasad</p>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-2 pt-3 px-3">
          <h4>Add Sabhasad</h4>
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
        <h4 className="d-lg-block d-md-block d-none">Add Sabhasad</h4>
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
              <h4 className="d-lg-none d-md-none d-block">Add Sabhasad</h4>
              <label className="form-label">
                Receipt No <span className="text-danger fw-bold">*</span>
              </label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">
                Date <span className="text-danger fw-bold">*</span>
              </label>
              <input
                type="date"
                name="role"
                className="form-control"
                value={formData.role}
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
                Mobile <span className="text-danger fw-bold">*</span>
              </label>
              <input
                type="number"
                name="mobile"
                className="form-control"
                // value={formData.mobile}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">
                Age <span className="text-danger fw-bold">*</span>
              </label>
              <input
                type="number"
                name="age"
                className="form-control"
                // value="Age"
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">
                Address/Village <span className="text-danger fw-bold">*</span>
              </label>
              <input
                type="text"
                name="address"
                className="form-control "
                // value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4 position-relative">
              <label className="form-label">
                Taluka <span className="text-danger fw-bold">*</span>
              </label>
              <input
                type="text"
                name="taluka"
                className="form-control "
                // value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4 position-relative">
              <label className="form-label">
                District <span className="text-danger fw-bold">*</span>
              </label>
              <input
                type="text"
                name="district"
                className="form-control "
                // value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4 position-relative">
              <label className="form-label">
                Village Council <span className="text-danger fw-bold">*</span>
              </label>
              <input
                type="text"
                name="village-council"
                className="form-control "
                // value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </form>
      </div>

      <div className="container-body">
        <form action="#" className="p-3">
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">
                Donation (₹) <span className="text-danger fw-bold">*</span>
              </label>
              <input
                type="number"
                name="donation"
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">
                Donation in Words <span className="text-danger fw-bold">*</span>
              </label>
              <input
                type="text"
                name="donation"
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddSabhasad;
