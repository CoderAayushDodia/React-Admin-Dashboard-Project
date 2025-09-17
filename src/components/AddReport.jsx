// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function AddReport({ addNewActivist }) {
//   const navigate = useNavigate();
//   // const [showPassword, setShowPassword] = useState(false);

//   const [formData, setFormData] = useState({
//     name: "",
//     role: "",
//     region: "",
//     mobile: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     addNewActivist(formData); //pass data to parent
//     navigate("/reports"); //redirect back to activist list
//   };

//   return (
//     <div className="main-container p-3">
//       <div className="container-body mb-4 d-lg-block d-md-block d-none">
//         <div className="add-activist-header d-lg-flex d-md-flex d-none align-items-center gap-2 pt-3 px-3 ">
//           <span class="material-symbols-outlined">home</span>
//           <i className="fa fa-angle-right"></i>
//           <p className="mb-0">Report Management</p>
//           <i className="fa fa-angle-right"></i>
//           <p className="mb-0">Add Report</p>
//         </div>
//         <div className="d-flex justify-content-between align-items-center mb-2 pt-3 px-3">
//           <h4>Add Report</h4>
//           <div className="d-flex gap-2 activist-action-buttons">
//             <button
//               type="button"
//               className="btn btn-outline-secondary me-2 add-activist-cancel-btn"
//               onClick={() => navigate("/reports")}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="btn add-activist-save-btn"
//               onClick={handleSubmit}
//             >
//               Save
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="d-flex justify-content-between align-items-center mb-lg-2 mb-md-2 mb-0 pt-lg-3 pt-md-2 pt-0 px-3 d-lg-none d-md-none d-flex">
//         <h4 className="d-lg-block d-md-block d-none">Add Report</h4>
//         <div className="d-lg-none d-md-none d-flex gap-2 activist-action-buttons">
//           <button
//             type="button"
//             className="btn btn-outline-secondary me-2 add-activist-cancel-btn"
//             onClick={() => navigate("/reports")}
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="add-activist-save-btn"
//             onClick={handleSubmit}
//           >
//             Save
//           </button>
//         </div>
//       </div>

//       <div className="container-body mb-4">
//         <form action="#" className="p-3">
//           <div className="row g-3">
//             <div className="col-md-4">
//               <h4 className="d-lg-none d-md-none d-block">Add Report</h4>
//               <label className="form-label">
//                 Date <span className="text-danger fw-bold">*</span>
//               </label>
//               <input
//                 type="date"
//                 name="name"
//                 className="form-control"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="col-md-4">
//               <label className="form-label">
//                 From Location <span className="text-danger fw-bold">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="role"
//                 className="form-control"
//                 value={formData.role}
//                 onChange={handleChange}
//                 required
//                 placeholder="Pune"
//               />
//             </div>

//             <div className="col-md-4">
//               <label className="form-label">
//                 To Location <span className="text-danger fw-bold">*</span>
//               </label>
//               <select
//                 type="text"
//                 name="name"
//                 className="form-select"
//                 // value={formData.region}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="regions">Regions</option>
//                 <option value="regions">Nasik</option>
//                 <option value="regions">Satara</option>
//               </select>
//             </div>

//             <div className="col-md-4">
//               <label className="form-label">
//                 Activist Name <span className="text-danger fw-bold">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="mobile"
//                 className="form-select"
//                 // value={formData.mobile}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="col-md-4">
//               <label className="form-label">
//                 Description <span className="text-danger fw-bold">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="age"
//                 className="form-select"
//                 // value="Age"
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="col-md-4">
//               <label className="form-label">
//                 Amount(₹) <span className="text-danger fw-bold">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="address"
//                 className="form-control "
//                 // value={formData.password}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="col-md-4 position-relative">
//               <label className="form-label">
//                 Expense Type <span className="text-danger fw-bold">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="taluka"
//                 className="form-select "
//                 // value={formData.password}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default AddReport;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddReport() {
  const navigate = useNavigate();

  // ✅ Updated formData keys according to your JSON
  const [formData, setFormData] = useState({
    report_date: "",
    from_location: "",
    to_location: "",
    description: "",
    amount: "",
    expense_type: "",
    // attachment: "null",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ POST data to API
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://shramjivi-backend.onrender.com/api/activist-reports/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json(); // 👈 get backend error message
        console.error("Backend responded with:", errorData);
        throw new Error("Failed to save report");
      }

      console.log("Report saved successfully");
      navigate("/reports");
    } catch (error) {
      console.error("Error saving report:", error);
    }
  };

  return (
    <div className="main-container p-3">
      {/* Header */}
      <div className="container-body mb-4 d-lg-block d-md-block d-none">
        <div className="add-activist-header d-lg-flex d-md-flex d-none align-items-center gap-2 pt-3 px-3 ">
          <span className="material-symbols-outlined">home</span>
          <i className="fa fa-angle-right"></i>
          <p className="mb-0">Report Management</p>
          <i className="fa fa-angle-right"></i>
          <p className="mb-0">Add Report</p>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-2 pt-3 px-3">
          <h4>Add Report</h4>
          <div className="d-flex gap-2 activist-action-buttons">
            <button
              type="button"
              className="btn btn-outline-secondary me-2 add-activist-cancel-btn"
              onClick={() => navigate("/reports")}
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

      {/* Form */}
      <div className="container-body mb-4">
        <form className="p-3">
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">
                Date <span className="text-danger fw-bold">*</span>
              </label>
              <input
                type="date"
                name="report_date"
                className="form-control"
                value={formData.report_date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">
                From Location <span className="text-danger fw-bold">*</span>
              </label>
              <input
                type="text"
                name="from_location"
                className="form-control"
                value={formData.from_location}
                onChange={handleChange}
                placeholder="Pune"
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">
                To Location <span className="text-danger fw-bold">*</span>
              </label>
              <select
                name="to_location"
                className="form-select"
                value={formData.to_location}
                onChange={handleChange}
                required
              >
                <option value="">Select Region</option>
                <option value="Nasik">Nasik</option>
                <option value="Satara">Satara</option>
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label">
                Description <span className="text-danger fw-bold">*</span>
              </label>
              <input
                type="text"
                name="description"
                className="form-control"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">
                Amount (₹) <span className="text-danger fw-bold">*</span>
              </label>
              <input
                type="number"
                name="amount"
                className="form-control"
                value={formData.amount}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">
                Expense Type <span className="text-danger fw-bold">*</span>
              </label>
              <input
                type="text"
                name="expense_type"
                className="form-control"
                value={formData.expense_type}
                onChange={handleChange}
                placeholder="e.g. travel, food, misc"
                required
              />
            </div>

            {/* <div className="col-md-4">
              <label className="form-label">Attachment</label>
              <input
                type="text"
                name="attachment"
                className="form-control"
                value={formData.attachment}
                onChange={handleChange}
                placeholder="Optional file link"
              />
            </div> */}
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddReport;
