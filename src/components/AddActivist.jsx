import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddActivist({ addNewActivist }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

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
    navigate("/activists"); //redirect back to activist list
  };

  return (
    <div className="main-container p-3">
      <div className="">
        <div className="d-flex justify-content-between align-items-center mb-3 pt-3 px-3">
          <h4>Add Activist</h4>
          <div>
            <button
              type="button"
              className="btn btn-outline-secondary me-2"
              onClick={() => navigate("/activists")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-danger"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </div>
      </div>
      <div className="container-body">
        <form action="#" className="p-3">
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Name*</label>
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
              <label className="form-label">Role*</label>
              <select
                type="text"
                name="role"
                className="form-select"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="">Select Role</option>
                <option value="Vice President">Vice President</option>
                <option value="State President Secretary">
                  State President Secretary,
                </option>
                <option value="District President Secretary">
                  District President Secretary
                </option>
                <option value="Taluka President Secretary">
                  Taluka President Secretary
                </option>
                <option value="Head, Member">Head, Member</option>
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label">Region*</label>
              <select
                name="region"
                className="form-select"
                value={formData.region}
                onChange={handleChange}
                required
              >
                <option value="Nasik">Nasik</option>
                <option value="Satara">Satara</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Pune">Pune</option>
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label">Mobile*</label>
              <input
                type="text"
                name="mobile"
                className="form-control"
                value={formData.mobile}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4 position-relative">
              <label className="form-label">Password*</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="**********"
                name="password"
                className="form-control "
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "20px",
                  top: "80%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              >
                {showPassword ? (
                  <span className="material-symbols-outlined">visibility</span>
                ) : (
                  <span className="material-symbols-outlined">
                    visibility_off
                  </span>
                )}
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddActivist;
