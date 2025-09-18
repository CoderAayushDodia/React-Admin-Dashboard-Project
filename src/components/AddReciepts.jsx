// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import NameDropdown from "./NamesDropdown";

// function AddReciepts({ addNewActivist }) {
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

// //   const handleChange = (e) => {
// //   const { name, value } = e.target;
// //   setFormData((prev) => ({
// //     ...prev,
// //     [name]: value, // ✅ This keeps previous name intact unless name field changes
// //   }));
// // };


//   const handleSubmit = (e) => {
//     e.preventDefault();
//     addNewActivist(formData); //pass data to parent
//     navigate("/receipts"); //redirect back to activist list
//   };

//   return (
//     <div className="main-container p-3">
//       <div className="container-body mb-4 d-lg-block d-md-block d-none">
//         <div className="add-activist-header d-lg-flex d-md-flex d-none align-items-center gap-2 pt-3 px-3 ">
//           <span class="material-symbols-outlined">home</span>
//           <i className="fa fa-angle-right"></i>
//           <p className="mb-0">Receipts Management</p>
//           <i className="fa fa-angle-right"></i>
//           <p className="mb-0">Add Receipt</p>
//         </div>
//         <div className="d-flex justify-content-between align-items-center mb-2 pt-3 px-3">
//           <h4>Add Receipts</h4>
//           <div className="d-flex gap-2 activist-action-buttons">
//             <button
//               type="button"
//               className="btn btn-outline-secondary me-2 add-activist-cancel-btn"
//               onClick={() => navigate("/receipts")}
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
//         <h4 className="d-lg-block d-md-block d-none">Add Reciepts</h4>
//         <div className="d-lg-none d-md-none d-flex gap-2 activist-action-buttons">
//           <button
//             type="button"
//             className="btn btn-outline-secondary me-2 add-activist-cancel-btn"
//             onClick={() => navigate("/receipts")}
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
//               <h4 className="d-lg-none d-md-none d-block">Add Receipts</h4>
//               <label className="form-label">
//                 Reciept Book Numeber{" "}
//                 <span className="text-danger fw-bold">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="RecieptBookNumber"
//                 className="form-control"
//                 // value={formData.bookNumber}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             {/* <div className="col-md-4">
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
//             </div> */}

//             {/* Name Dropdown */}
//             <div className="col-md-4">
//               <h4 className="d-lg-none d-md-none d-block">Add Activist</h4>
//               <label className="form-label">
//                 Name <span className="text-danger fw-bold">*</span>
//               </label>

//               <NameDropdown
//                 value={formData.name}
//                 onChange={(selectedName) =>
//                   setFormData((prev) => ({ ...prev, name: selectedName }))
//                 }
//                 // disabled={fetchingData || loading}
//               />
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default AddReciepts;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NameDropdown from "./NamesDropdown";

function AddReciepts() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    book_number: "",
    language: "Marathi", // Default value, can make dropdown later if needed
    assigned_to: "", // Will store ID from dropdown
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.book_number || !formData.assigned_to) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      const response = await fetch(
        "https://shramjivi-backend.onrender.com/api/receipt-books/",
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
        throw new Error(`Failed to save data: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("✅ Receipt Book Added:", data);

      // Redirect back to receipts list
      navigate("/receipts");
    } catch (error) {
      console.error("❌ Error saving data:", error);
      alert("Something went wrong while saving data!");
    }
  };

  return (
    <div className="main-container p-3">
      <div className="container-body mb-4 d-lg-block d-md-block d-none">
        <div className="add-activist-header d-lg-flex d-md-flex d-none align-items-center gap-2 pt-3 px-3 ">
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
            <div className="col-md-4">
              <label className="form-label">
                Receipt Book Number{" "}
                <span className="text-danger fw-bold">*</span>
              </label>
              <input
                type="text"
                name="book_number"
                className="form-control"
                value={formData.book_number}
                onChange={handleChange}
                required
              />
            </div>

            {/* Dropdown for Assigned Person */}
            <div className="col-md-4">
              <label className="form-label">
                Assign To <span className="text-danger fw-bold">*</span>
              </label>
              <NameDropdown
                value={formData.assigned_to}
                onChange={(selectedId) =>
                  setFormData((prev) => ({ ...prev, assigned_to: selectedId }))
                }
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddReciepts;
