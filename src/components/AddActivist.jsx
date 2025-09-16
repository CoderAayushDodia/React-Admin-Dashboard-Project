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

//
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// function AddActivist() {
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // ✅ Locations data
//   const [locations, setLocations] = useState([]);
//   const [selectedDistrict, setSelectedDistrict] = useState("");
//   const [selectedTaluka, setSelectedTaluka] = useState("");

//   // ✅ Form data
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     role: "taluka_admin",
//     password: "",
//     email: "",
//     age: "",
//   });

//   const API_LOCATIONS = "https://shramjivi-backend.onrender.com/api/locations/";
//   const API2 = "https://shramjivi-backend.onrender.com/api/auth/users/";

//   // ✅ Fetch location data
//   useEffect(() => {
//     const fetchLocations = async () => {
//       try {
//         const response = await fetch(API_LOCATIONS, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });
//         if (!response.ok) throw new Error("Failed to fetch locations");
//         const data = await response.json();
//         console.log("Fetched Locations:", data); // 🔎 Debug
//         setLocations(data.districts || []);
//       } catch (err) {
//         console.error("Error fetching locations:", err);
//         setError("Unable to load locations");
//       }
//     };
//     fetchLocations();
//   }, []);

//   // ✅ Change handlers
//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleDistrictChange = (e) => {
//     setSelectedDistrict(e.target.value);
//     setSelectedTaluka(""); // reset taluka when district changes
//   };

//   const handleTalukaChange = (e) => {
//     setSelectedTaluka(e.target.value);
//   };

//   // ✅ Get selected district/talukas safely
//   const selectedDistrictObj = locations.find(
//     (d) => d.id === Number(selectedDistrict)
//   );
//   const talukas = selectedDistrictObj?.talukas || [];

//   console.log("Selected District:", selectedDistrictObj); // 🔎 Debug
//   console.log("Talukas for District:", talukas); // 🔎 Debug

//   // ✅ Submit handler
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       const selectedTalukaObj = talukas.find(
//         (t) => t.id === Number(selectedTaluka)
//       );

//       const regionString =
//         selectedDistrictObj && selectedTalukaObj
//           ? `${selectedDistrictObj.name} - ${selectedTalukaObj.name}`
//           : selectedDistrictObj
//           ? selectedDistrictObj.name
//           : "";

//       const payload = {
//         name: formData.name,
//         phone: formData.phone,
//         role: formData.role,
//         password: formData.password,
//         email: formData.email,
//         age: formData.age,
//         region: regionString,
//       };

//       console.log("Payload before submit:", payload); // 🔎 Debug

//       const response = await fetch(API2, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         credentials: "include",
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) {
//         const errData = await response.json().catch(() => null);
//         console.error("Backend error response:", errData);
//         throw new Error(
//           errData?.message || `Failed to create activist: ${response.status}`
//         );
//       }

//       navigate("/activists", { state: { updatedAt: Date.now() } });
//     } catch (err) {
//       console.error("AddActivist error:", err);
//       setError(err.message || "Unknown error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="main-container p-3">
//       <div className="container-body">
//         {error && <p className="text-danger px-3">{error}</p>}

//         <form className="p-3" onSubmit={handleSubmit}>
//           <div className="row g-3">
//             {/* Name */}
//             <div className="col-md-4">
//               <label className="form-label">Name *</label>
//               <input
//                 type="text"
//                 name="name"
//                 className="form-control"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             {/* Role */}
//             <div className="col-md-4">
//               <label className="form-label">Role *</label>
//               <select
//                 name="role"
//                 className="form-select"
//                 value={formData.role}
//                 onChange={handleChange}
//               >
//                 <option value="taluka_admin">Taluka Admin</option>
//                 <option value="district_admin">District Admin</option>
//                 <option value="state_admin">State Admin</option>
//               </select>
//             </div>

//             {/* District */}
//             <div className="col-md-4">
//               <label className="form-label">District *</label>
//               <select
//                 className="form-select"
//                 value={selectedDistrict}
//                 onChange={handleDistrictChange}
//                 required
//               >
//                 <option value="">Select District</option>
//                 {locations.map((d) => (
//                   <option key={d.id} value={d.id}>
//                     {d.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Taluka */}
//             {selectedDistrict && talukas.length > 0 && (
//               <div className="col-md-4">
//                 <label className="form-label">Taluka *</label>
//                 <select
//                   className="form-select"
//                   value={selectedTaluka}
//                   onChange={handleTalukaChange}
//                   required
//                 >
//                   <option value="">Select Taluka</option>
//                   {talukas.map((t) => (
//                     <option key={t.id} value={t.id}>
//                       {t.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             )}

//             {/* Fallback if no talukas */}
//             {selectedDistrict && talukas.length === 0 && (
//               <div className="col-md-4">
//                 <label className="form-label">Taluka *</label>
//                 <select className="form-select" disabled>
//                   <option>No Talukas Found</option>
//                 </select>
//               </div>
//             )}

//             {/* Phone */}
//             <div className="col-md-4">
//               <label className="form-label">Mobile *</label>
//               <input
//                 type="text"
//                 name="phone"
//                 className="form-control"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             {/* Email */}
//             <div className="col-md-4">
//               <label className="form-label">Email *</label>
//               <input
//                 type="text"
//                 name="email"
//                 className="form-control"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             {/* Age */}
//             <div className="col-md-4">
//               <label className="form-label">Age *</label>
//               <input
//                 type="number"
//                 name="age"
//                 className="form-control"
//                 value={formData.age}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             {/* Password */}
//             <div className="col-md-4 position-relative">
//               <label className="form-label">Password *</label>
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 placeholder="**********"
//                 className="form-control"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//               />
//               <span
//                 onClick={() => setShowPassword((prev) => !prev)}
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

//           <div className="mt-3">
//             <button type="submit" className="btn btn-danger" disabled={loading}>
//               {loading ? "Saving..." : "Save"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default AddActivist;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import RegionDropdown from "./RegionDropdown"; // 👈 We'll use the nested dropdown we built

// function AddActivist() {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [showPassword, setShowPassword] = useState(false);

//   // ✅ State for form fields
//   const [formData, setFormData] = useState({
//     name: "",
//     age: "",
//     email: "",
//     role: "taluka_admin",
//     password: "",
//     phone: "",
//   });

//   const [regions, setRegions] = useState([]); // full district→taluka data
//   const [selectedRegion, setSelectedRegion] = useState(null); // object selected from dropdown

//   const API_LOCATIONS = "https://shramjivi-backend.onrender.com/api/locations/";
//   const API2 = "https://shramjivi-backend.onrender.com/api/auth/users/";

//   // ✅ Fetch region data from API
//   // useEffect(() => {
//   //   const fetchRegions = async () => {
//   //     try {
//   //       const res = await fetch(API_LOCATIONS, {
//   //         headers: {
//   //           Authorization: `Bearer ${localStorage.getItem("token")}`,
//   //         },
//   //       });
//   //       const data = await res.json();

//   //       // Normalize: add "type" to help identify node level
//   //       const normalized = (data.districts || []).map((d) => ({
//   //         ...d,
//   //         type: "district",
//   //         talukas: d.talukas?.map((t) => ({
//   //           ...t,
//   //           type: "taluka",
//   //           local_governances: t.local_governances?.map((g) => ({
//   //             ...g,
//   //             type: "local_governance",
//   //             villages: g.villages?.map((v) => ({
//   //               ...v,
//   //               type: "village",
//   //             })),
//   //           })),
//   //         })),
//   //       }));

//   //       setRegions(normalized);
//   //     } catch (err) {
//   //       console.error("Error fetching regions:", err);
//   //       setError("Unable to load regions");
//   //     }
//   //   };

//   //   fetchRegions();
//   // }, []);

//   // useEffect(() => {
//   //   const fetchRegions = async () => {
//   //     try {
//   //       const res = await fetch(API_LOCATIONS, {
//   //         headers: {
//   //           Authorization: `Bearer ${localStorage.getItem("token")}`,
//   //         },
//   //       });
//   //       const data = await res.json();

//   //       // const normalized = (data.districts || []).map((d) => ({
//   //       //   ...d,
//   //       //   type: "district",
//   //       //   district_id: d.id,
//   //       //   talukas: d.talukas?.map((t) => ({
//   //       //     ...t,
//   //       //     type: "taluka",
//   //       //     district_id: d.id, // 👈 parent id reference
//   //       //     taluka_id: t.id,
//   //       //     local_governances: t.local_governances?.map((g) => ({
//   //       //       ...g,
//   //       //       type: "local_governance",
//   //       //       district_id: d.id,
//   //       //       taluka_id: t.id,
//   //       //       local_governance_id: g.id,
//   //       //       villages: g.villages?.map((v) => ({
//   //       //         ...v,
//   //       //         type: "village",
//   //       //         district_id: d.id,
//   //       //         taluka_id: t.id,
//   //       //         local_governance_id: g.id,
//   //       //         village_id: v.id,
//   //       //       })),
//   //       //     })),
//   //       //   })),
//   //       // }));

//   //       const normalized = (data.districts || []).map((d) => ({
//   //         ...d,
//   //         type: "district",
//   //         district_id: d.id, // keep parent ref
//   //         id: d.id, // ✅ keep generic id for dropdown
//   //         talukas: d.talukas?.map((t) => ({
//   //           ...t,
//   //           type: "taluka",
//   //           id: t.id,
//   //           taluka_id: t.id,
//   //           district_id: d.id,
//   //           local_governances: t.local_governances?.map((g) => ({
//   //             ...g,
//   //             type: "local_governance",
//   //             id: g.id,
//   //             local_governance_id: g.id,
//   //             taluka_id: t.id,
//   //             district_id: d.id,
//   //             villages: g.villages?.map((v) => ({
//   //               ...v,
//   //               type: "village",
//   //               id: v.id,
//   //               village_id: v.id,
//   //               local_governance_id: g.id,
//   //               taluka_id: t.id,
//   //               district_id: d.id,
//   //             })),
//   //           })),
//   //         })),
//   //       }));

//   //       console.log("Normalized regions:", normalized);
//   //       setRegions(normalized);
//   //     } catch (err) {
//   //       console.error("Error fetching regions:", err);
//   //       setError("Unable to load regions");
//   //     }
//   //   };

//   //   fetchRegions();
//   // }, []);

//   useEffect(() => {
//     const fetchRegions = async () => {
//       try {
//         const res = await fetch(API_LOCATIONS, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });

//         const data = await res.json();
//         console.log("Raw API response:", data);

//         // 🔑 Auto-detect districts array from possible keys
//         const districtsArray =
//           data.districts || data.data || data.results || data || [];

//         if (!Array.isArray(districtsArray)) {
//           console.warn("Unexpected API response format:", data);
//           setRegions([]); // fallback to empty array
//           return;
//         }

//         const normalized = districtsArray.map((d) => ({
//   ...d,
//   type: "district",
//   id: d.id,
//   district_id: d.id,
//   name: d.name || `District ${d.id}`, // 👈 fallback name
//   talukas: d.talukas?.map((t) => ({
//     ...t,
//     type: "taluka",
//     id: t.id,
//     taluka_id: t.id,
//     district_id: d.id,
//     name: t.name || `Taluka ${t.id}`, // 👈 fallback name
//     local_governances: t.local_governances?.map((g) => ({
//       ...g,
//       type: "local_governance",
//       id: g.id,
//       local_governance_id: g.id,
//       taluka_id: t.id,
//       district_id: d.id,
//       name: g.name || `Governance ${g.id}`, // 👈 fallback name
//       villages: g.villages?.map((v) => ({
//         ...v,
//         type: "village",
//         id: v.id,
//         village_id: v.id,
//         local_governance_id: g.id,
//         taluka_id: t.id,
//         district_id: d.id,
//         name: v.name || `Village ${v.id}`, // 👈 fallback name
//       })),
//     })),
//   })),
// }));

//         console.log("Normalized regions:", normalized);
//         setRegions(normalized);
//       } catch (err) {
//         console.error("Error fetching regions:", err);
//         setError("Unable to load regions");
//       }
//     };

//     fetchRegions();
//   }, []);

//   useEffect(() => {
//   console.log("Role changed:", formData.role);
// }, [formData.role]);

//   // ✅ Handle input changes
//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!selectedRegion) {
//       setError("Please select a region");
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       let districtId = null,
//         talukaId = null,
//         governanceId = null,
//         villageId = null;

//       if (selectedRegion.type === "district") {
//         districtId = selectedRegion.district_id;
//       } else if (selectedRegion.type === "taluka") {
//         talukaId = selectedRegion.taluka_id;
//         districtId = selectedRegion.district_id;
//       } else if (selectedRegion.type === "local_governance") {
//         governanceId = selectedRegion.local_governance_id;
//         talukaId = selectedRegion.taluka_id;
//         districtId = selectedRegion.district_id;
//       } else if (selectedRegion.type === "village") {
//         villageId = selectedRegion.village_id;
//         governanceId = selectedRegion.local_governance_id;
//         talukaId = selectedRegion.taluka_id;
//         districtId = selectedRegion.district_id;
//       }

//       const payload = {
//         name: formData.name,
//         phone: formData.phone,
//         role: formData.role,
//         position: "",
//         district: districtId,
//         taluka: talukaId,
//         local_governance: governanceId,
//         village: villageId,
//         password: formData.password,
//         email: formData.email,
//         age: formData.age,
//       };

//       console.log("Payload before submit:", payload);

//       const response = await fetch(API2, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         credentials: "include",
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) {
//         const errData = await response.json().catch(() => null);
//         console.error("Backend error response:", errData);
//         throw new Error(
//           errData?.detail ||
//             errData?.message ||
//             `Failed to create activist: ${response.status}`
//         );
//       }

//       navigate("/activists", { state: { updatedAt: Date.now() } });
//     } catch (err) {
//       console.error("AddActivist error:", err);
//       setError(err.message || "Unknown error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="main-container p-3">
//       <div className="container-body mb-4 d-lg-block d-md-block d-none">
//         <div className="add-activist-header d-lg-flex d-md-flex d-none align-items-center gap-2 pt-3 px-3">
//           <span className="material-symbols-outlined">home</span>
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
//               disabled={loading}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="btn btn-danger add-activist-save-btn"
//               onClick={handleSubmit}
//               disabled={loading}
//             >
//               {loading ? "Saving..." : "Save"}
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="d-flex justify-content-between align-items-center mb-lg-2 mb-md-2 mb-0 pt-lg-3 pt-md-2 pt-0 px-3 d-lg-none d-md-none d-flex">
//         <h4 className="d-lg-block d-md-block d-none">Add Activist</h4>
//         <div className="d-flex gap-2 activist-action-buttons">
//           <button
//             type="button"
//             className="btn btn-outline-secondary me-2 add-activist-cancel-btn"
//             onClick={() => navigate("/activists")}
//             disabled={loading}
//           >
//             Cancel
//           </button>
//           <button
//             // type="submit"
//             className="add-activist-save-btn"
//             onClick={handleSubmit}
//             disabled={loading}
//           >
//             {loading ? "Saving..." : "Save"}
//           </button>
//         </div>
//       </div>

//       <div className="main-container">
//         <div className="container-body">
//           {error && <p className="text-danger">{error}</p>}

//           <form className="p-3" onSubmit={handleSubmit}>
//             <div className="row g-3">
//               {/* Name */}
//               <div className="col-md-4">
//                 <h4 className="d-lg-none d-md-none d-block">Add Activist</h4>
//                 <label className="form-label">
//                   Name <span className="text-danger fw-bold">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   className="form-control"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               {/* Age */}
//               <div className="col-md-4">
//                 <label className="form-label">
//                   Age <span className="text-danger fw-bold">*</span>
//                 </label>
//                 <input
//                   type="number"
//                   name="age"
//                   className="form-control"
//                   value={formData.age}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               {/* Email */}
//               <div className="col-md-4">
//                 <label className="form-label">
//                   Email <span className="text-danger fw-bold">*</span>
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   className="form-control"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               {/* Role */}
//               <div className="col-md-4">
//                 <label className="form-label">
//                   Role <span className="text-danger fw-bold">*</span>
//                 </label>
//                 <select
//                   name="role"
//                   className="form-select"
//                   value={formData.role}
//                   onChange={handleChange}
//                 >
//                   <option value="taluka_admin">Taluka Admin</option>
//                   <option value="district_admin">District Admin</option>
//                   <option value="state_admin">State Admin</option>
//                 </select>
//               </div>

//               {/* Region (Nested Dropdown) */}
//               <div className="col-md-4">
//                 <label className="form-label">
//                   Region <span className="text-danger fw-bold">*</span>
//                 </label>
//                 <RegionDropdown
//                   regions={regions}
//                   onSelect={(item) => {
//                     console.log("Selected Region:", item);
//                     setSelectedRegion(item);
//                   }}
//                 />
//               </div>

//               {/* Mobile Number */}
//               <div className="col-md-4">
//                 <label className="form-label">
//                   Mobile <span className="text-danger fw-bold">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="phone"
//                   className="form-control"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               {/* Password */}

//               <div className="col-md-4 position-relative">
//                 <label className="form-label">
//                   Password <span className="text-danger fw-bold">*</span>
//                 </label>
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   placeholder="**********"
//                   className="form-control"
//                   value={formData.password}
//                   onChange={handleChange}
//                   required
//                 />
//                 <span
//                   onClick={() => setShowPassword((prev) => !prev)}
//                   style={{
//                     position: "absolute",
//                     right: "20px",
//                     top: "80%",
//                     transform: "translateY(-50%)",
//                     cursor: "pointer",
//                   }}
//                 >
//                   {showPassword ? (
//                     <span className="material-symbols-outlined">
//                       visibility
//                     </span>
//                   ) : (
//                     <span className="material-symbols-outlined">
//                       visibility_off
//                     </span>
//                   )}
//                 </span>
//               </div>
//             </div>
//             </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AddActivist;

// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import RegionDropdown from "./RegionDropdown";

// function AddActivist() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [showPassword, setShowPassword] = useState(false);

//   // ✅ If we are coming from "Edit" button, activist data is passed here
//   const editingActivist = location.state?.activist || null;

//   const [formData, setFormData] = useState({
//     name: "",
//     age: "",
//     email: "",
//     role: "taluka_admin",
//     password: "",
//     phone: "",
//   });

//   const [regions, setRegions] = useState([]);
//   const [selectedRegion, setSelectedRegion] = useState(null);

//   const API_LOCATIONS = "https://shramjivi-backend.onrender.com/api/locations/";
//   const API_CREATE = "https://shramjivi-backend.onrender.com/api/auth/users/";
//   const API_UPDATE = (id) =>
//     `https://shramjivi-backend.onrender.com/api/activists/${id}/`;

//   // ✅ Prefill data if editing
//   useEffect(() => {
//     if (editingActivist) {
//       setFormData((prev) => ({
//         ...prev,
//         name: editingActivist.name || "",
//         age: editingActivist.age || "",
//         email: editingActivist.email || "",
//         role: editingActivist.role || "taluka_admin",
//         phone: editingActivist.phone || editingActivist.mobile || "",
//         password: "", // always empty for security
//       }));

//       // Prefill region for display (read-only)
//       if (editingActivist.region) {
//         setSelectedRegion({
//           type: "district",
//           district_id:
//             editingActivist.region?.district_id ||
//             editingActivist.region?.district ||
//             null,
//         });
//       }
//     }
//   }, [editingActivist]);

//   // ✅ Fetch regions
//   useEffect(() => {
//     const fetchRegions = async () => {
//       try {
//         const res = await fetch(API_LOCATIONS, {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         });

//         const data = await res.json();
//         const districtsArray =
//           data.districts || data.data || data.results || data || [];

//         if (!Array.isArray(districtsArray)) return setRegions([]);

//         const normalized = districtsArray.map((d) => ({
//           ...d,
//           type: "district",
//           id: d.id,
//           district_id: d.id,
//           name: d.name || `District ${d.id}`,
//           talukas: d.talukas?.map((t) => ({
//             ...t,
//             type: "taluka",
//             id: t.id,
//             taluka_id: t.id,
//             district_id: d.id,
//             name: t.name || `Taluka ${t.id}`,
//           })),
//         }));

//         setRegions(normalized);
//       } catch (err) {
//         console.error("Error fetching regions:", err);
//         setError("Unable to load regions");
//       }
//     };

//     fetchRegions();
//   }, []);

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       let response;

//       if (editingActivist) {
//         // ✅ Only send phone and password for update
//         const payload = {
//           phone: formData.phone,
//           ...(formData.password ? { password: formData.password } : {}),
//         };

//         response = await fetch(API_UPDATE(editingActivist.id), {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//           credentials: "include",
//           body: JSON.stringify(payload),
//         });
//       } else {
//         // ✅ Normal CREATE mode
//         const payload = {
//           name: formData.name,
//           phone: formData.phone,
//           role: formData.role,
//           district: selectedRegion?.district_id || null,
//           password: formData.password,
//           email: formData.email,
//           age: formData.age,
//         };

//         response = await fetch(API_CREATE, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//           credentials: "include",
//           body: JSON.stringify(payload),
//         });
//       }

//       if (!response.ok) {
//         const errData = await response.json().catch(() => null);
//         throw new Error(
//           errData?.detail || errData?.message || `Failed: ${response.status}`
//         );
//       }

//       navigate("/activists", { state: { updatedAt: Date.now() } });
//     } catch (err) {
//       console.error("Submit error:", err);
//       setError(err.message || "Unknown error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="main-container p-3">
//       <div className="container-body">
//         <h4>{editingActivist ? "Edit Activist" : "Add Activist"}</h4>
//         {error && <p className="text-danger">{error}</p>}

//         <form className="p-3" onSubmit={handleSubmit}>
//           <div className="row g-3">
//             {/* Name (Read-only when editing) */}
//             <div className="col-md-4">
//               <label className="form-label">Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 className="form-control"
//                 value={formData.name}
//                 onChange={handleChange}
//                 readOnly={!!editingActivist}
//                 required
//               />
//             </div>

//             {/* Age */}
//             <div className="col-md-4">
//               <label className="form-label">Age</label>
//               <input
//                 type="number"
//                 name="age"
//                 className="form-control"
//                 value={formData.age}
//                 onChange={handleChange}
//                 readOnly={!!editingActivist}
//                 required
//               />
//             </div>

//             {/* Email */}
//             <div className="col-md-4">
//               <label className="form-label">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 className="form-control"
//                 value={formData.email}
//                 onChange={handleChange}
//                 readOnly={!!editingActivist}
//                 required
//               />
//             </div>

//             {/* Role */}
//             <div className="col-md-4">
//               <label className="form-label">Role</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 value={formData.role.replace("_", " ")}
//                 readOnly
//               />
//             </div>

//             {/* Region */}
//             <div className="col-md-4">
//               <label className="form-label">Region</label>
//               {editingActivist ? (
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={
//                     editingActivist.region?.district ||
//                     editingActivist.region?.taluka ||
//                     "N/A"
//                   }
//                   readOnly
//                 />
//               ) : (
//                 <RegionDropdown
//                   regions={regions}
//                   onSelect={(item) => setSelectedRegion(item)}
//                 />
//               )}
//             </div>

//             {/* Phone (Editable) */}
//             <div className="col-md-4">
//               <label className="form-label">Phone</label>
//               <input
//                 type="text"
//                 name="phone"
//                 className="form-control"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             {/* Password (Editable) */}
//             <div className="col-md-4 position-relative">
//               <label className="form-label">Password</label>
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 className="form-control"
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder={
//                   editingActivist ? "Enter new password" : "********"
//                 }
//                 required={!editingActivist}
//               />
//               <span
//                 onClick={() => setShowPassword((prev) => !prev)}
//                 style={{
//                   position: "absolute",
//                   right: "20px",
//                   top: "80%",
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

//           <div className="mt-4">
//             <button
//               type="button"
//               className="btn btn-outline-secondary me-2"
//               onClick={() => navigate("/activists")}
//               disabled={loading}
//             >
//               Cancel
//             </button>
//             <button type="submit" className="btn btn-danger" disabled={loading}>
//               {loading ? "Saving..." : editingActivist ? "Update" : "Save"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default AddActivist;

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RegionDropdown from "./RegionDropdown";

function AddActivist() {
  const navigate = useNavigate();
  const { id } = useParams(); // ✅ Get user ID for edit mode

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [editingActivist, setEditingActivist] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    role: "taluka_admin",
    password: "",
    phone: "",
  });

  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(null);

  const API_LOCATIONS = "https://shramjivi-backend.onrender.com/api/locations/";
  const API_ACTIVISTS = "https://shramjivi-backend.onrender.com/api/activists/";
  const API_USERS = "https://shramjivi-backend.onrender.com/api/auth/users/";

  // ✅ Fetch regions
  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const res = await fetch(API_LOCATIONS, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const data = await res.json();
        const districtsArray =
          data.districts || data.data || data.results || data || [];

        if (!Array.isArray(districtsArray)) return setRegions([]);

        const normalized = districtsArray.map((d) => ({
          ...d,
          type: "district",
          id: d.id,
          district_id: d.id,
          name: d.name || `District ${d.id}`,
          talukas: d.talukas?.map((t) => ({
            ...t,
            type: "taluka",
            id: t.id,
            taluka_id: t.id,
            district_id: d.id,
            name: t.name || `Taluka ${t.id}`,
            local_governances: t.local_governances?.map((g) => ({
              ...g,
              type: "local_governance",
              id: g.id,
              local_governance_id: g.id,
              taluka_id: t.id,
              district_id: d.id,
              name: g.name || `Governance ${g.id}`,
              villages: g.villages?.map((v) => ({
                ...v,
                type: "village",
                id: v.id,
                village_id: v.id,
                local_governance_id: g.id,
                taluka_id: t.id,
                district_id: d.id,
                name: v.name || `Village ${v.id}`,
              })),
            })),
          })),
        }));

        setRegions(normalized);
      } catch (err) {
        console.error("Error fetching regions:", err);
        setError("Unable to load regions");
      }
    };

    fetchRegions();
  }, []);

  // ✅ Fetch activist details for edit mode
  useEffect(() => {
    if (!id) return;

    const fetchActivist = async () => {
      try {
        setLoading(true);

        const res1 = await fetch(`${API_ACTIVISTS}${id}/`);
        if (!res1.ok) throw new Error("Failed to fetch activist details");
        const activistData = await res1.json();

        // Only call user API if email/age are not in activistData
        let email = activistData.email || "";
        let age = activistData.age || "";

        if (!email || !age) {
          try {
            const res2 = await fetch(`${API_USERS}${id}/`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            });
            if (res2.ok) {
              const userData = await res2.json();
              email = userData.email ?? email;
              age = userData.age ?? age;
            }
          } catch (err) {
            console.warn("Could not fetch user data:", err);
          }
        }

        console.log("Fetched activist:", activistData);
        setEditingActivist(activistData);

        setFormData({
          name: activistData.name,
          role: activistData.role,
          phone: activistData.phone,
          email,
          age,
          password: "",
        });

        // Preselect region
        setSelectedRegion(
          activistData.region
            ? {
                type: "district", // fallback
                district_id: activistData.region.district_id ?? null,
                taluka_id: activistData.region.taluka_id ?? null,
                ...activistData.region,
              }
            : null
        );
      } catch (err) {
        console.error("Failed to fetch activist for edit:", err);
        setError("Unable to load activist details");
      } finally {
        setLoading(false);
      }
    };

    fetchActivist();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = {
        phone: formData.phone,
        password: formData.password,
      };

      const url = id ? `${API_ACTIVISTS}${id}/` : API_USERS;
      const method = id ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => null);
        throw new Error(
          errData?.detail ||
            errData?.message ||
            `Failed to ${id ? "update" : "create"} activist`
        );
      }

      navigate("/activists", { state: { updatedAt: Date.now() } });
    } catch (err) {
      console.error("AddActivist error:", err);
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-container p-3">
      <div className="container-body">
        {error && <p className="text-danger">{error}</p>}
        <form className="p-3" onSubmit={handleSubmit}>
          <div className="row g-3">
            {/* Name (read-only in edit mode) */}
            <div className="col-md-4">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                readOnly={!!editingActivist}
                required
              />
            </div>

            {/* Age */}
            <div className="col-md-4">
              <label className="form-label">Age</label>
              <input
                type="number"
                name="age"
                className="form-control"
                value={formData.age}
                onChange={handleChange}
                readOnly={!!editingActivist}
              />
            </div>

            {/* Email */}
            <div className="col-md-4">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                readOnly={!!editingActivist}
              />
            </div>

            {/* Role (locked in edit mode) */}
            <div className="col-md-4">
              <label className="form-label">Role</label>
              <select
                name="role"
                className="form-select"
                value={formData.role}
                onChange={handleChange}
                disabled={!!editingActivist}
              >
                <option value="taluka_admin">Taluka Admin</option>
                <option value="district_admin">District Admin</option>
                <option value="state_admin">State Admin</option>
              </select>
            </div>

            {/* Region Dropdown */}
            <div className="col-md-4">
              <label className="form-label">Region</label>
              <RegionDropdown
                regions={regions}
                selectedRegion={selectedRegion}
                onSelect={(item) => setSelectedRegion(item)}
                disabled={!!editingActivist}
              />
            </div>

            {/* Editable Phone */}
            <div className="col-md-4">
              <label className="form-label">Mobile</label>
              <input
                type="text"
                name="phone"
                className="form-control"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            {/* Editable Password */}
            <div className="col-md-4 position-relative">
              <label className="form-label">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                placeholder="**********"
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

          <div className="mt-3 d-flex gap-2">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => navigate("/activists")}
              disabled={loading}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-danger" disabled={loading}>
              {loading ? "Saving..." : id ? "Update" : "Save"}
            </button>
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
