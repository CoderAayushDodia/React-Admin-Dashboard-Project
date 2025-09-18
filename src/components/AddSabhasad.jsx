// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function AddSabhasad({ addNewActivist }) {
//   const navigate = useNavigate();
//   // const [showPassword, setShowPassword] = useState(false);

//   const [formData, setFormData] = useState({
//     name: "",
//     role: "",
//     region: "",
//     mobile: "",
//     password: "",
//     image: null,
//   });

//   // const handleChange = (e) => {
//   //   setFormData({ ...formData, [e.target.name]: e.target.value });
//   // };

//    const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "image") {
//       setFormData({ ...formData, image: files[0] }); // ✅ handle image file
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     addNewActivist(formData); //pass data to parent
//     navigate("/sabhasad"); //redirect back to activist list
//   };

//   return (
//     <div className="main-container p-3">
//       <div className="container-body mb-4 d-lg-block d-md-block d-none">
//         <div className="add-activist-header d-lg-flex d-md-flex d-none align-items-center gap-2 pt-3 px-3 ">
//           <span className="material-symbols-outlined">home</span>
//           <i className="fa fa-angle-right"></i>
//           <p className="mb-0">Sabhasad Management</p>
//           <i className="fa fa-angle-right"></i>
//           <p className="mb-0">Add Sabhasad</p>
//         </div>
//         <div className="d-flex justify-content-between align-items-center mb-2 pt-3 px-3">
//           <h4>Add Sabhasad</h4>
//           <div className="d-flex gap-2 activist-action-buttons">
//             <button
//               type="button"
//               className="btn btn-outline-secondary me-2 add-activist-cancel-btn"
//               onClick={() => navigate("/sabhasad")}
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
//         <h4 className="d-lg-block d-md-block d-none">Add Sabhasad</h4>
//         <div className="d-lg-none d-md-none d-flex gap-2 activist-action-buttons">
//           <button
//             type="button"
//             className="btn btn-outline-secondary me-2 add-activist-cancel-btn"
//             onClick={() => navigate("/sabhasad")}
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
//               <h4 className="d-lg-none d-md-none d-block">Add Sabhasad</h4>
//               <label className="form-label">
//                 Receipt No <span className="text-danger fw-bold">*</span>
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
//                 Date <span className="text-danger fw-bold">*</span>
//               </label>
//               <input
//                 type="date"
//                 name="role"
//                 className="form-control"
//                 value={formData.role}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="col-md-4">
//               <label className="form-label">
//                 Name <span className="text-danger fw-bold">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 className="form-control"
//                 value={formData.region}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="col-md-4">
//               <label className="form-label">
//                 Mobile <span className="text-danger fw-bold">*</span>
//               </label>
//               <input
//                 type="number"
//                 name="mobile"
//                 className="form-control"
//                 // value={formData.mobile}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="col-md-4">
//               <label className="form-label">
//                 Age <span className="text-danger fw-bold">*</span>
//               </label>
//               <input
//                 type="number"
//                 name="age"
//                 className="form-control"
//                 // value="Age"
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="col-md-4">
//               <label className="form-label">
//                 Address/Village <span className="text-danger fw-bold">*</span>
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
//                 Taluka <span className="text-danger fw-bold">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="taluka"
//                 className="form-control "
//                 // value={formData.password}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="col-md-4 position-relative">
//               <label className="form-label">
//                 District <span className="text-danger fw-bold">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="district"
//                 className="form-control "
//                 // value={formData.password}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="col-md-4 position-relative">
//               <label className="form-label">
//                 Village Council <span className="text-danger fw-bold">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="village-council"
//                 className="form-control "
//                 // value={formData.password}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//           </div>
//         </form>
//       </div>

//       <div className="container-body">
//         <form action="#" className="p-3">
//           <div className="row g-3">
//             <div className="col-md-4">
//               <label className="form-label">
//                 Donation (₹) <span className="text-danger fw-bold">*</span>
//               </label>
//               <input
//                 type="number"
//                 name="donation"
//                 className="form-control"
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="col-md-4">
//               <label className="form-label">
//                 Donation in Words <span className="text-danger fw-bold">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="donation"
//                 className="form-control"
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="col-md-4">
//               <label className="form-label">
//                 Upload Image <span className="text-danger fw-bold">*</span>
//               </label>
//               <input
//                 type="file"
//                 name="image"
//                 className="form-control"
//                 accept="image/*"
//                 onChange={handleChange}
//                 required
//               />
//               {/* ✅ Preview if file selected */}
//               {formData.image && (
//                 <div className="mt-2">
//                   <img
//                     src={URL.createObjectURL(formData.image)}
//                     alt="Preview"
//                     style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "8px" }}
//                   />
//                 </div>
//               )}
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default AddSabhasad;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import RegionDropdown from "./RegionDropdown";

function AddSabhasad() {
  const navigate = useNavigate();

  // ✅ State for receipt form
  const [formData, setFormData] = useState({
    receipt_book: "",
    receipt_no: "",
    member_name: "",
    phone: "",
    gender: "",
    age: "",
    village_council: "",
    donation_in_words: "",
    amount: "",
    date: "",
    local_governance: null,
    image_saved_id: 1, // default for now
  });

  // ✅ State for region dropdown
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(null);

  const API_LOCATIONS = "https://shramjivi-backend.onrender.com/api/locations/";

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
          })),
        }));

        setRegions(normalized);
      } catch (err) {
        console.error("Error fetching regions:", err);
      }
    };

    fetchRegions();
  }, []);

  // ✅ Handle input change
  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  const handleChange = (e) => {
  const { name, type, files, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: type === "file" ? files[0] : value, // ✅ store File object for image
  }));
};

  // ✅ Submit handler (POST)
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!formData.receipt_book || !formData.receipt_no) {
  //     alert("Please fill required fields.");
  //     return;
  //   }

  //   try {
  //     const payload = {
  //       ...formData,
  //       district: selectedRegion?.district_id || 0,
  //       taluka: selectedRegion?.taluka_id || 0,
  //     };

  //     console.log("🚀 Posting sabhasad payload:", payload);

  //     const response = await fetch(
  //       "https://shramjivi-backend.onrender.com/api/receipts/",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //         credentials: "include",
  //         body: JSON.stringify(payload),
  //       }
  //     );

  //     if (!response.ok) {
  //       const errData = await response.json().catch(() => null);
  //       throw new Error(
  //         errData?.detail || `Failed to save data: ${response.statusText}`
  //       );
  //     }

  //     const data = await response.json();
  //     console.log("✅ Receipt Added:", data);
  //     navigate("/sabhasad");
  //   } catch (error) {
  //     console.error("❌ Error saving data:", error);
  //     alert("Something went wrong while saving data!");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.receipt_book || !formData.receipt_no) {
      alert("Please fill required fields.");
      return;
    }

    try {
      let imageId = formData.image_saved_id; // default value

      // ✅ 1. If user selected an image, upload it first
      if (formData.image) {
        const imgData = new FormData();
        imgData.append("file", formData.image);

        const imgResponse = await fetch(
          "https://shramjivi-backend.onrender.com/api/images/",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            credentials: "include",
            body: imgData, // ✅ send FormData (no JSON.stringify here)
          }
        );

        if (!imgResponse.ok) throw new Error("Image upload failed");

        const imgResult = await imgResponse.json();
        imageId = imgResult.id; // ✅ assuming API returns { id: <image_id> }
      }

      // ✅ 2. Prepare payload for main request
      const payload = {
        ...formData,
        image_saved_id: imageId,
        district: selectedRegion?.district_id || 0,
        taluka: selectedRegion?.taluka_id || 0,
      };

      delete payload.image; // ❌ remove raw file object before sending JSON

      console.log("🚀 Posting sabhasad payload:", payload);

      // ✅ 3. POST main sabhasad data
      const response = await fetch(
        "https://shramjivi-backend.onrender.com/api/receipts/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          credentials: "include",
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errData = await response.json().catch(() => null);
        throw new Error(errData?.detail || `Failed to save data`);
      }

      const data = await response.json();
      console.log("✅ Sabhasad Added:", data);
      navigate("/sabhasad");
    } catch (error) {
      console.error("❌ Error saving data:", error);
      alert("Something went wrong while saving data!");
    }
  };

  return (
    <div className="main-container p-3">
      {/* Breadcrumb */}
      <div className="container-body mb-4 d-lg-block d-md-block d-none">
        <div className="add-activist-header d-lg-flex d-md-flex d-none align-items-center gap-2 pt-3 px-3">
          <span className="material-symbols-outlined">home</span>
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
              onClick={() => navigate("/receipts")}
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

      <div className="container-body mb-4">
        <form onSubmit={handleSubmit} className="p-3">
          <div className="row g-3">
            {/* Receipt No */}
            <div className="col-md-4">
              <label className="form-label">
                Receipt Number <span className="text-danger fw-bold">*</span>
              </label>
              <input
                type="text"
                name="receipt_no"
                className="form-control"
                value={formData.receipt_no}
                onChange={handleChange}
              />
            </div>

            {/* Receipt Book Number */}
            <div className="col-md-4">
              <label className="form-label">
                Receipt Book Number{" "}
                <span className="text-danger fw-bold">*</span>
              </label>
              <input
                type="text"
                name="receipt_book"
                className="form-control"
                value={formData.receipt_book}
                onChange={handleChange}
                required
              />
            </div>

            {/* Member Name */}
            <div className="col-md-4">
              <label className="form-label">
                Name <span className="text-danger fw-bold">*</span>
              </label>
              <input
                type="text"
                name="member_name"
                className="form-control"
                value={formData.member_name}
                onChange={handleChange}
              />
            </div>
            {/* Phone */}
            <div className="col-md-4">
              <label className="form-label">
                Phone <span className="text-danger fw-bold">*</span>
              </label>
              <input
                type="text"
                name="phone"
                className="form-control"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            {/* Gender */}
            <div className="col-md-4">
              <label className="form-label">
                Gender <span className="text-danger fw-bold">*</span>
              </label>
              <input
                type="text"
                name="gender"
                className="form-control"
                value={formData.gender}
                onChange={handleChange}
              />
            </div>
            {/* Age */}
            <div className="col-md-4">
              <label className="form-label">
                Age <span className="text-danger fw-bold">*</span>
              </label>
              <input
                type="text"
                name="age"
                className="form-control"
                value={formData.age}
                onChange={handleChange}
              />
            </div>

            {/* Region Dropdown */}
            <div className="col-md-4">
              <label className="form-label">
                Region <span className="text-danger fw-bold">*</span>
              </label>
              <RegionDropdown
                regions={regions}
                onSelect={(item) => setSelectedRegion(item)}
              />
            </div>

            {/* Village Council */}
            <div className="col-md-4">
              <label className="form-label">
                Village Council <span className="text-danger fw-bold">*</span>
              </label>
              <input
                type="text"
                name="village_council"
                className="form-control"
                value={formData.village_council}
                onChange={handleChange}
              />
            </div>

            {/* Date */}
            <div className="col-md-4">
              <label className="form-label">
                Date <span className="text-danger fw-bold">*</span>
              </label>
              <input
                type="date"
                name="date"
                className="form-control"
                value={formData.date}
                onChange={handleChange}
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
                name="amount"
                className="form-control"
                value={formData.amount}
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
                name="donation_in_words"
                className="form-control"
                value={formData.donation_in_words}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">
                Upload Image <span className="text-danger fw-bold">*</span>
              </label>
              <input
                type="file"
                name="image"
                className="form-control"
                accept="image/*"
                onChange={handleChange}
                required
              />
              {/* ✅ Show preview ONLY if it's a File */}
              {formData.image instanceof File && (
                <div className="mt-2">
                  <img
                    src={URL.createObjectURL(formData.image)}
                    alt="Preview"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddSabhasad;
