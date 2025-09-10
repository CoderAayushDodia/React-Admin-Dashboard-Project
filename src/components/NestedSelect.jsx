// import React, { useState, useRef, useEffect } from "react";
// // import { regionsData } from "../data/regions";

// function NestedSelect({ regions, onSelect }) {
//   const [open, setOpen] = useState(false);
//   const [openRegions, setOpenRegions] = useState({});
//   const [selectedLabel, setSelectedLabel] = useState("Regions");
//   const dropdownRef = useRef(null);

//   const toggleRegion = (name) => {
//     setOpenRegions((prev) => ({
//       ...prev,
//       [name]: !prev[name],
//     }));
//   };

//   const handleSelect = (item) => {
//     setSelectedLabel(item.taluka__name || "Regions");
//     setOpen(false); // close dropdown after selecting
//     if (typeof onSelect === "function") onSelect(item);
//   };

//   const renderRegions = (items) => {
//     return (
//       <ul className="list-unstyled ms-2 mb-0 cursor-pointer">
//         {items.map((item, index) => (
//           <li key={item.taluka__id ?? `region-${index}`}>
//             <div
//               className="d-flex align-items-center cursor-pointer"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 if (item.children) {
//                   toggleRegion(item.taluka__name);
//                 } else if (item.monthly || item.annually) {
//                   handleSelect(item);
//                 } else {
//                   // if there are nodes with no children and no monthly/annually, still select by name
//                   handleSelect(item);
//                 }
//               }}
//             >
//               <span className="">
//                 {item.children ? (
//                   openRegions[item.taluka__name] ? (
//                     <i className="fa fa-angle-down text-muted"></i>
//                   ) : (
//                     <i className="fa fa-angle-right text-muted"></i>
//                   )
//                 ) : (
//                   <i
//                     className="fa fa-angle-right text-muted"
//                     style={{ fontSize: "1rem" }}
//                   ></i>
//                 )}
//               </span>
//               <span>{item.taluka__name}</span>
//             </div>

//             {item.children &&
//               openRegions[item.taluka__name] &&
//               renderRegions(item.children)}
//           </li>
//         ))}
//       </ul>
//     );
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div
//       className="position-relative cursor-pointer"
//       ref={dropdownRef}
//       //   style={{ width: "250px" }}
//     >
//       {/* Fake select box */}
//       <div
//         className="cursor-pointer d-flex align-items-center justify-content-between custom-select flex-1"
//         onClick={() => setOpen((prev) => !prev)}
//         style={{ minWidth: 140 }}
//       >
//         {selectedLabel}
//         <i className="fa fa-angle-down flex-1"></i>
//       </div>

//       {open && (
//         <div
//           className="position-absolute bg-white border rounded shadow p-1 cursor-pointer"
//           style={{ top: "100%", left: 0, width: "140px", zIndex: 1000 }}
//         >
//           {renderRegions(regions)}
//         </div>
//       )}
//     </div>
//   );
// }

// export default NestedSelect;

// NestedSelect.jsx
import React, { useState, useRef, useEffect } from "react";

function NestedSelect({ regions = [], onSelect }) {
  const [open, setOpen] = useState(false);
  const [openRegions, setOpenRegions] = useState({});
  const [selectedLabel, setSelectedLabel] = useState("Regions");
  const dropdownRef = useRef(null);

  const toggleRegion = (name, e) => {
    e?.stopPropagation();
    setOpenRegions((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleSelect = (item, e) => {
    e?.stopPropagation();
    setSelectedLabel(item.taluka__name || item.name || "Regions");
    setOpen(false);
    if (typeof onSelect === "function") onSelect(item);
  };

  const renderRegions = (items) => {
    return (
      <ul className="list-unstyled ms-2 mb-0">
        {items.map((item, index) => (
          <li key={item.taluka__name ?? `region-${index}`}>
            <div className="d-flex align-items-center justify-content-between">
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span onClick={(e) => toggleRegion(item.taluka__name, e)} style={{ cursor: item.children ? "pointer" : "default" }}>
                  {item.children ? (
                    openRegions[item.taluka__name] ? (
                      <i className="fa fa-angle-down text-muted"></i>
                    ) : (
                      <i className="fa fa-angle-right text-muted"></i>
                    )
                  ) : (
                    <i className="fa fa-circle-notch text-muted" style={{ fontSize: "0.7rem" }}></i>
                  )}
                </span>

                {/* clicking the name selects the node (leaf or parent) */}
                <span onClick={(e) => handleSelect(item, e)} style={{ cursor: "pointer" }}>
                  {item.taluka__name} {item.total ? ` — ${item.total}` : ""}
                </span>
              </div>
            </div>

            {item.children && openRegions[item.taluka__name] && renderRegions(item.children)}
          </li>
        ))}
      </ul>
    );
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="position-relative cursor-pointer" ref={dropdownRef}>
      <div
        className="cursor-pointer d-flex align-items-center justify-content-between custom-select flex-1"
        onClick={() => setOpen((prev) => !prev)}
        style={{ minWidth: 140 }}
      >
        {selectedLabel}
        <i className="fa fa-angle-down flex-1"></i>
      </div>

      {open && (
        <div className="position-absolute bg-white border rounded shadow p-1" style={{ top: "100%", left: 0, width: "220px", zIndex: 1000 }}>
          {renderRegions(regions)}
        </div>
      )}
    </div>
  );
}

export default NestedSelect;
