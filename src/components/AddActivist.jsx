// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function AddActivist({ addNewActivist }) {
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
//     navigate("/activists"); //redirect back to activist list
//   };

//   return (
//     <div className="main-container p-3">
//       <div className="container-body mb-4 d-lg-block d-md-block d-none">
//         <div className="add-activist-header d-lg-flex d-md-flex d-none align-items-center gap-2 pt-3 px-3 ">
//           <span class="material-symbols-outlined">home</span>
//           <i className="fa fa-angle-right"></i>
//           <p className="mb-0">Activists Management</p>
//           <i className="fa fa-angle-right"></i>
//           <p className="mb-0">Add Activist</p>
//         </div>
//         <div className="d-flex justify-content-between align-items-center mb-2 pt-3 px-3">
//           <h4>Add Activist</h4>
//           <div className="d-flex gap-2 activist-action-buttons">
//             <button
//               type="button"
//               className="btn btn-outline-secondary me-2 add-activist-cancel-btn"
//               onClick={() => navigate("/activists")}
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
//               onClick={() => navigate("/activists")}
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
//                 Name <span className="text-danger fw-bold">*</span>
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

// export default AddActivist;

// src/components/AddActivist.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddActivist() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Controlled form state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    role: "taluka_admin", // default role
    // position: "",
    district: 0,
    taluka: 0,
    // local_governance: 0,
    // village: 0,
    password: "",
    // email: "",
    // age: "",
  });

  const API2 = "https://shramjivi-backend.onrender.com/api/auth/users/";
  //const API2 = "https://shramjivi-backend.onrender.com/api/activists/";


  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ✅ Submit form data
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError(null);

  //   try {
  //     const response = await fetch(API2, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${localStorage.getItem("token")}`, // ✅ add this
  //       },
  //       credentials: "include",
  //       body: JSON.stringify(formData),
  //     });

  //     if (!response.ok) {
  //       const errData = await response.json().catch(() => null);
  //       throw new Error(
  //         errData?.message || `Failed to create activist: ${response.status}`
  //       );
  //     }

  //     // ✅ Success → navigate back and trigger re-fetch in ActivistManagement
  //     navigate("/activists", {
  //       state: { updatedAt: Date.now() },
  //     });
  //   } catch (err) {
  //     console.error("AddActivist error:", err);
  //     setError(err.message || "Unknown error");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError(null);

  try {
    const payload = {
      name: formData.name,
      phone: formData.phone,
      role: formData.role,
      password: formData.password,
      region: {
        district: formData.district,
        taluka: formData.taluka,
      },
    };

    const response = await fetch(API2, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => null);
      console.error("Backend error response:", errData);
      throw new Error(errData?.message || `Failed to create activist: ${response.status}`);
    }

    navigate("/activists", {
      state: { updatedAt: Date.now() },
    });
  } catch (err) {
    console.error("AddActivist error:", err);
    setError(err.message || "Unknown error");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="main-container p-3">
      <div className="container-body mb-4 d-lg-block d-md-block d-none">
        <div className="add-activist-header d-lg-flex d-md-flex d-none align-items-center gap-2 pt-3 px-3">
          <span className="material-symbols-outlined">home</span>
          <i className="fa fa-angle-right"></i>
          <p className="mb-0">Activists Management</p>
          <i className="fa fa-angle-right"></i>
          <p className="mb-0">Add Activist</p>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-2 pt-3 px-3">
          <h4>Add Activist</h4>
          <div className="d-flex gap-2 activist-action-buttons">
            <button
              type="button"
              className="btn btn-outline-secondary me-2 add-activist-cancel-btn"
              onClick={() => navigate("/activists")}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-danger add-activist-save-btn"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="d-flex justify-content-between align-items-center mb-lg-2 mb-md-2 mb-0 pt-lg-3 pt-md-2 pt-0 px-3 d-lg-none d-md-none d-flex">
        <h4 className="d-lg-block d-md-block d-none">Add Activist</h4>
        <div className="d-flex gap-2 activist-action-buttons">
          <button
            type="button"
            className="btn btn-outline-secondary me-2 add-activist-cancel-btn"
            onClick={() => navigate("/activists")}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            // type="submit"
            className="add-activist-save-btn"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      <div className="container-body">
        {error && <p className="text-danger px-3">{error}</p>}

        <form className="p-3" onSubmit={handleSubmit}>
          <div className="row g-3">
            {/* Name */}
            <div className="col-md-4">
              <label className="form-label">
                Name <span className="text-danger fw-bold">*</span>
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

            {/* Role */}
            <div className="col-md-4">
              <label className="form-label">
                Role <span className="text-danger fw-bold">*</span>
              </label>
              <select
                name="role"
                className="form-select"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="taluka_admin">Taluka Admin</option>
                <option value="district_admin">District Admin</option>
                <option value="state_admin">State Admin</option>
              </select>
            </div>

            {/* Region */}
            <div className="col-md-4">
              <label className="form-label">
                Region <span className="text-danger fw-bold">*</span>
              </label>
              <select
                name="district"
                className="form-select"
                value={formData.district}
                onChange={handleChange}
                required
              >
                <option value="Ahmednagar">Ahmednagar</option>
                <option value="taluka_admin">Nasik</option>
                <option value="district_admin">Satara</option>
                <option value="state_admin">Janakpur</option>
              </select>
            </div>

            {/* Phone */}
            <div className="col-md-4">
              <label className="form-label">
                Mobile <span className="text-danger fw-bold">*</span>
              </label>
              <input
                type="text"
                name="phone"
                className="form-control"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className="col-md-4 position-relative">
              <label className="form-label">
                Password <span className="text-danger fw-bold">*</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="**********"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
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

{
  /* Position */
}
{
  /* <div className="col-md-4">
              <label className="form-label">Position</label>
              <input
                type="text"
                name="position"
                className="form-control"
                value={formData.position}
                onChange={handleChange}
              />
            </div> */
}

{
  /* Email */
}
{
  /* <div className="col-md-4">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
              />
            </div> */
}

{
  /* Age */
}
{
  /* <div className="col-md-4">
              <label className="form-label">Age</label>
              <input
                type="text"
                name="age"
                className="form-control"
                value={formData.age}
                onChange={handleChange}
              />
            </div> */
}
