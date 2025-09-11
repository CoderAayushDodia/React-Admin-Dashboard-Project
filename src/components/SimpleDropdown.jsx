// import React, { useState } from "react";

// function SimpleDropdown({ options, selected, onChange }) {
//   const [open, setOpen] = useState(false);

//   return (
//     <div className="custom-dropdown">
//       {/* Selected value */}
//       <span className="dropdown-selected" onClick={() => setOpen(!open)}>
//         {selected} <i className="fa-solid fa-angle-down"></i>
//       </span>

//       {/* Dropdown list */}
//       {open && (
//         <div className="dropdown-options">
//           {options.map((option) => (
//             <div
//               key={option}
//               className="dropdown-option"
//               onClick={() => {
//                 onChange(option);
//                 setOpen(false);
//               }}
//             >
//               {option}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default SimpleDropdown;

// SimpleDropdown.jsx
// import React, { useState } from "react";

// function SimpleDropdown({ options = [], selected, onChange }) {
//   const [open, setOpen] = useState(false);
//    const dropdownRef = useRef(null);

//   return (
//     <div className="custom-dropdown">
//       <span className="dropdown-selected" onClick={() => setOpen(!open)}>
//         {selected ?? "Select"} <i className="fa-solid fa-angle-down"></i>
//       </span>

//       {open && (
//         <div className="dropdown-options">
//           {options.map((option) => (
//             <div
//               key={`${option}-${index}`}
//               className="dropdown-option"
//               onClick={() => {
//                 onChange(option);
//                 setOpen(false);
//               }}
//             >
//               {option}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default SimpleDropdown;

import React, { useState, useEffect, useRef } from "react";

function SimpleDropdown({ options = [], selected, onChange }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      {/* Selected value */}
      <span
        className="dropdown-selected"
        role="button"
        tabIndex={0}
        onClick={() => options.length > 0 && setOpen(!open)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen((prev) => !prev);
          }
        }}
      >
        {selected ?? "Select"} <i className="fa-solid fa-angle-down"></i>
      </span>

      {/* Dropdown list */}
      {open && (
        <div className="dropdown-options">
          {options.length > 0 ? (
            options.map((option, index) => (
              <div
                key={`${option}-${index}`}
                className={`dropdown-option ${
                  selected === option ? "active" : ""
                }`}
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
              >
                {option}
              </div>
            ))
          ) : (
            <div className="dropdown-option disabled">No options</div>
          )}
        </div>
      )}
    </div>
  );
}

export default SimpleDropdown;
