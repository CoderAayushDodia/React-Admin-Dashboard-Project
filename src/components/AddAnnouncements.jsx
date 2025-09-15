// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function AddAnnouncements({ addNewActivist }) {
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);

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
//     navigate("/announcements"); //redirect back to activist list
//   };

//   return (
//     <div className="main-container p-3">
//       <div className="container-body mb-4 d-lg-block d-md-block d-none">
//         <div className="add-activist-header d-lg-flex d-md-flex d-none align-items-center gap-2 pt-3 px-3 ">
//           <span class="material-symbols-outlined">home</span>
//           <i className="fa fa-angle-right"></i>
//           <p className="mb-0">Announcements</p>
//           <i className="fa fa-angle-right"></i>
//           <p className="mb-0">Create Announcements</p>
//         </div>
//         <div className="d-flex justify-content-between align-items-center mb-2 pt-3 px-3">
//           <h4>Create Announcements</h4>
//           <div className="d-flex gap-2 activist-action-buttons">
//             <button
//               type="button"
//               className="btn btn-outline-secondary me-2 add-activist-cancel-btn"
//               onClick={() => navigate("/announcements")}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="btn btn-danger add-activist-save-btn"
//               onClick={handleSubmit}
//             >
//               Save
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="d-flex justify-content-between align-items-center mb-lg-2 mb-md-2 mb-0 pt-lg-3 pt-md-2 pt-0 px-3 d-lg-none d-md-none d-flex">
//           <h4 className="d-lg-block d-md-block d-none">Add Activist</h4>
//           <div className="d-flex gap-2 activist-action-buttons">
//             <button
//               type="button"
//               className="btn btn-outline-secondary me-2 add-activist-cancel-btn"
//               onClick={() => navigate("/announcements")}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="add-activist-save-btn"
//               onClick={handleSubmit}
//             >
//               Save
//             </button>
//           </div>
//         </div>

//       <div className="container-body">
//         <form action="#" className="p-3">
//           <div className="row g-3">
//             <div className="col-md-4">
//               <h4 className="d-lg-none d-md-none d-block">Add Activist</h4>
//               <label className="form-label">
//                 Title <span className="text-danger fw-bold">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 className="form-control"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="col-md-4">
//               <label className="form-label">
//                 Role <span className="text-danger fw-bold">*</span>
//               </label>
//               <select
//                 type="text"
//                 name="role"
//                 className="form-select"
//                 value={formData.role}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="">Select Role</option>
//                 <option value="Vice President">Vice President</option>
//                 <option value="State President Secretary">
//                   State President Secretary,
//                 </option>
//                 <option value="District President Secretary">
//                   District President Secretary
//                 </option>
//                 <option value="Taluka President Secretary">
//                   Taluka President Secretary
//                 </option>
//                 <option value="Head, Member">Head, Member</option>
//               </select>
//             </div>

//             <div className="col-md-4">
//               <label className="form-label">
//                 Region <span className="text-danger fw-bold">*</span>
//               </label>
//               <select
//                 name="region"
//                 className="form-select"
//                 value={formData.region}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="Nasik">Nasik</option>
//                 <option value="Satara">Satara</option>
//                 <option value="Mumbai">Mumbai</option>
//                 <option value="Pune">Pune</option>
//               </select>
//             </div>

//             <div className="col-md-4">
//               <label className="form-label">
//                 Mobile <span className="text-danger fw-bold">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="mobile"
//                 className="form-control"
//                 value={formData.mobile}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="col-md-4 position-relative">
//               <label className="form-label">
//                 Password <span className="text-danger fw-bold">*</span>
//               </label>
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="**********"
//                 name="password"
//                 className="form-control "
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//               />
//               <span
//                 onClick={() => setShowPassword(!showPassword)}
//                 style={{
//                   position: "absolute",
//                   right: "20px",
//                   top: "80%",
//                   transform: "translateY(-50%)",
//                   cursor: "pointer",
//                 }}
//               >
//                 {showPassword ? (
//                   <span className="material-symbols-outlined">visibility</span>
//                 ) : (
//                   <span className="material-symbols-outlined">
//                     visibility_off
//                   </span>
//                 )}
//               </span>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default AddAnnouncements;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

function AddAnnouncements({ addNewActivist }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "✨ Diwali Celebration & Bonus Announcement ✨",
    message:
      "This Diwali, let’s celebrate the spirit of togetherness and gratitude. We appreciate your hard work and dedication throughout the year. Join us for festive activities, sweets, and joy as we light up our workplace with happiness. Wishing you and your family a prosperous and safe Diwali!",
    roles: [],
    regions: [],
  });

  //   const rolesList = [
  //     "All",
  //     "Vice President",
  //     "State President",
  //     "Secretary",
  //     "Treasurer",
  //     "District President",
  //     "Taluka President",
  //     "Head Member",
  //   ];

  //   const regionsList = [
  //     "All",
  //     "Satara",
  //     "Nasik",
  //     "Mumbai",
  //     "Pune",
  //     "Shiradi",
  //     "Khandala",
  //     "Bijor",
  //   ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //   const handleCheckboxChange = (e, type) => {
  //     const value = e.target.value;
  //     setFormData((prev) => {
  //       const updatedArray = prev[type].includes(value)
  //         ? prev[type].filter((item) => item !== value)
  //         : [...prev[type], value];
  //       return { ...prev, [type]: updatedArray };
  //     });
  //   };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewActivist(formData);
    navigate("/announcements");
  };

  return (
    <div className="main-container p-3">
      {/* Breadcrumb Header */}
      <div className="container-body mb-4 d-lg-block d-md-block d-none">
        <div className="add-activist-header d-lg-flex d-md-flex d-none align-items-center gap-2 pt-3 px-3 ">
          <span class="material-symbols-outlined">home</span>
          <i className="fa fa-angle-right"></i>
          <p className="mb-0">Announcements</p>
          <i className="fa fa-angle-right"></i>
          <p className="mb-0">Create Announcements</p>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-2 pt-3 px-3">
          <h4>Announcements</h4>
          <div className="d-flex gap-2 activist-action-buttons">
            <button
              type="button"
              className="btn btn-outline-secondary me-2 add-activist-cancel-btn"
              onClick={() => navigate("/announcements")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-danger add-activist-save-btn"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-lg-2 mb-md-2 mb-0 pt-lg-3 pt-md-2 pt-0 px-3 d-lg-none d-md-none d-flex">
          <h4 className="d-lg-block d-md-block d-none">Announcements</h4>
          <div className="d-flex gap-2 activist-action-buttons">
            <button
              type="button"
              className="btn btn-outline-secondary me-2 add-activist-cancel-btn"
              onClick={() => navigate("/announcements")}
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

      {/* Layout */}
      <div className="container-body">
        <form onSubmit={handleSubmit} className="p-3">
          <div className="row g-4">
            {/* Left Column - Form */}
            <div className="col-12 col-lg-4">
              {/* Title */}
              <div className="mb-3">
                <label className="form-label">
                  Title <span className="text-danger fw-bold">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Message */}
              <div className="mb-3">
                <label className="form-label">
                  Message <span className="text-danger fw-bold">*</span>
                </label>
                <textarea
                  name="message"
                  className="form-control"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              {/* Regions & Roles - Checkbox Groups */}
              <div className="mb-3">
                <label className="form-label">
                  Title <span className="text-danger fw-bold">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mt-3">
                <label className="form-label">
                  Role <span className="text-danger fw-bold">*</span>
                </label>
                <select
                  type="text"
                  name="role"
                  className="form-select"
                  // value={formData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Role</option>
                  <option value="Vice President">All</option>
                  <option value="State President Secretary">Satara</option>
                  <option value="District President Secretary">Nasik</option>
                  <option value="Taluka President Secretary">Mumbai</option>
                  <option value="Head, Member">Pune</option>
                  <option value="Head, Member">Shirdi</option>
                  <option value="Head, Member">Khandala</option>
                  <option value="Head, Member">Bijor</option>
                </select>
              </div>

              <div className="mt-3">
                <label className="form-label">
                  Region <span className="text-danger fw-bold">*</span>
                </label>
                <select
                  type="text"
                  name="role"
                  className="form-select"
                  // value={formData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Region</option>
                  <option value="Head, Member">All</option>
                  <option value="Vice President">Vice President</option>
                  <option value="State President Secretary">State President</option>
                  <option value="District President Secretary">Secretary</option>
                  <option value="Taluka President Secretary">Treasurer</option>
                  <option value="Head, Member">District President</option>
                  <option value="Head, Member">Taluka President</option>
                  <option value="Head, Member">Head Member</option>
                </select>
              </div>

              {/* Attachment */}
              <div className="mt-3">
                <label className="form-label">
                  Attachment <span className="text-danger fw-bold">*</span>
                </label>
                <div
                  className="border border-2 border-dashed rounded-3 p-4 text-center"
                  style={{ cursor: "pointer" }}
                >
                  <span className="text-danger fw-semibold mb-0">
                    Click to upload
                  </span>&nbsp;
                  <span className="text-muted">or drag and drop</span>
                </div>
              </div>
            </div>

            {/* Right Column - Preview */}
            <div className="col-12 col-lg-8">
              <label className="form-label">
                Announcement Preview{" "}
                <span className="text-danger fw-bold">*</span>
              </label>
              <div className="card shadow-sm p-3">
                <img
                  src="/announcement-img.png"
                  className="card-img-top rounded"
                  alt="Diwali Banner"
                />
                <div className="pt-3">
                  <h5 className="card-title fw-semibold">{formData.title}</h5>
                  <p className="card-text">{formData.message}</p>
                  <p className="card-text">{formData.message}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Buttons */}
          {/* <div className="d-flex justify-content-end mt-4 d-md-none">
            <button
              type="button"
              className="btn btn-outline-secondary me-2"
              onClick={() => navigate("/announcements")}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-danger">
              Save
            </button>
          </div> */}
        </form>
      </div>
    </div>
  );
}

export default AddAnnouncements;
