// import React, { useState, useRef, useEffect } from "react";

// function RegionDropdown({ regions = [], onSelect }) {
//   const [open, setOpen] = useState(false);
//   const [openNodes, setOpenNodes] = useState({});
//   const [selectedLabel, setSelectedLabel] = useState("Select Region");
//   const dropdownRef = useRef(null);

//   const toggleNode = (key, e) => {
//     e?.stopPropagation();
//     setOpenNodes((prev) => ({ ...prev, [key]: !prev[key] }));
//   };

//   const handleSelect = (item, e) => {
//     e?.stopPropagation();
//     setSelectedLabel(item.name);
//     setOpen(false);
//     if (typeof onSelect === "function") onSelect(item);
//   };

//   const renderNodes = (items, level = 0) => {
//     return (
//       <div style={{ marginLeft: level * 12 }}>
//         {items.map((item) => {
//           const key = `${item.type}-${item.id}`;
//           const isOpen = openNodes[key];

//           const children =
//             item.talukas || item.local_governances || item.villages || [];

//           const hasChildren = children.length > 0;

//           return (
//             <div key={key} className="mb-1">
//               <div
//                 className="d-flex align-items-center cursor-pointer"
//                 style={{ padding: "4px 6px" }}
//               >
//                 {hasChildren ? (
//                   <span
//                     onClick={(e) => toggleNode(key, e)}
//                     style={{ marginRight: 5 }}
//                   >
//                     {isOpen ? (
//                       <i className="fa fa-angle-down text-muted"></i>
//                     ) : (
//                       <i className="fa fa-angle-right text-muted"></i>
//                     )}
//                   </span>
//                 ) : (
//                   <span style={{ marginRight: 14 }}></span>
//                 )}

//                 <span onClick={(e) => handleSelect(item, e)}>
//                   {item.name}
//                 </span>
//               </div>

//               {hasChildren && isOpen && renderNodes(children, level + 1)}
//             </div>
//           );
//         })}
//       </div>
//     );
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div className="position-relative" ref={dropdownRef}>
//       <div
//         className="cursor-pointer d-flex align-items-center justify-content-between custom-select px-2 py-1 border rounded"
//         onClick={() => setOpen((prev) => !prev)}
//         style={{ minWidth: 180 }}
//       >
//         <span>{selectedLabel}</span>
//         <i className="fa fa-angle-down"></i>
//       </div>

//       {open && (
//         <div
//           className="position-absolute bg-white border rounded shadow p-2"
//           style={{
//             top: "100%",
//             left: 0,
//             width: "300px",
//             maxHeight: "300px",
//             overflowY: "auto",
//             zIndex: 1000,
//           }}
//         >
//           {renderNodes(regions)}
//         </div>
//       )}
//     </div>
//   );
// }

// export default RegionDropdown;

// import React, { useState, useRef, useEffect } from "react";

// function RegionDropdown({ regions = [], onSelect }) {
//   const [open, setOpen] = useState(false);
//   const [openNodes, setOpenNodes] = useState({});
//   const [selectedLabel, setSelectedLabel] = useState("Select Region");
//   const dropdownRef = useRef(null);

//   // Generate a unique key for each node
//   const getKey = (item) => {
//     if (item.type === "district") return `district-${item.district_id}`;
//     if (item.type === "taluka") return `taluka-${item.taluka_id}`;
//     if (item.type === "local_governance")
//       return `lg-${item.local_governance_id}`;
//     if (item.type === "village") return `village-${item.village_id}`;
//     return `${item.type}-unknown`;
//   };

//   const toggleNode = (key, e) => {
//     e?.stopPropagation();
//     setOpenNodes((prev) => ({ ...prev, [key]: !prev[key] }));
//   };

//   const handleSelect = (item, e) => {
//     e?.stopPropagation();
//     setSelectedLabel(item.name);
//     setOpen(false);
//     if (typeof onSelect === "function") onSelect(item);
//   };

//   const renderNodes = (items, level = 0) => {
//     return (
//       <div style={{ marginLeft: level * 12 }}>
//         {items.map((item) => {
//           const key = getKey(item);
//           const isOpen = openNodes[key];
//           const children =
//             item.talukas || item.local_governances || item.villages || [];
//           const hasChildren = children.length > 0;

//           return (
//             <div key={key} className="mb-1">
//               <div
//                 className="d-flex align-items-center justify-content-between"
//                 style={{ padding: "4px 6px", cursor: "pointer" }}
//               >
//                 <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
//                   {hasChildren ? (
//                     <span onClick={(e) => toggleNode(key, e)}>
//                       {isOpen ? (
//                         <i className="fa fa-angle-down text-muted"></i>
//                       ) : (
//                         <i className="fa fa-angle-right text-muted"></i>
//                       )}
//                     </span>
//                   ) : (
//                     <span style={{ width: 14 }}></span>
//                   )}

//                   <span onClick={(e) => handleSelect(item, e)}>
//                     {item.name}
//                   </span>
//                 </div>
//               </div>

//               {hasChildren && isOpen && renderNodes(children, level + 1)}
//             </div>
//           );
//         })}
//       </div>
//     );
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div className="position-relative" ref={dropdownRef}>
//       {/* Fake select box */}
//       <div
//         className="cursor-pointer d-flex align-items-center justify-content-between custom-select px-2 py-1 border rounded"
//         onClick={() => setOpen((prev) => !prev)}
//         style={{ minWidth: 180 }}
//       >
//         <span>{selectedLabel}</span>
//         <i className="fa fa-angle-down"></i>
//       </div>

//       {open && (
//         <div
//           className="position-absolute bg-white border rounded shadow p-2"
//           style={{
//             top: "100%",
//             left: 0,
//             width: "300px",
//             maxHeight: "300px",
//             overflowY: "auto",
//             zIndex: 1000,
//           }}
//         >
//           {renderNodes(regions)}
//         </div>
//       )}
//     </div>
//   );
// }

// export default RegionDropdown;

// import React, { useState, useRef, useEffect } from "react";

// function RegionDropdown({ regions = [], onSelect }) {
//   const [open, setOpen] = useState(false);
//   const [openNodes, setOpenNodes] = useState({});
//   const [selectedLabel, setSelectedLabel] = useState("Select Region");
//   const dropdownRef = useRef(null);

//   const toggleNode = (key, e) => {
//     e?.stopPropagation();
//     setOpenNodes((prev) => ({ ...prev, [key]: !prev[key] }));
//   };

//   const handleSelect = (item, e) => {
//     e?.stopPropagation();
//     setSelectedLabel(item.name);
//     setOpen(false);
//     if (typeof onSelect === "function") onSelect(item);
//   };

//   const renderNodes = (items, level = 0) => (
//     <div style={{ marginLeft: level * 12 }}>
//       {items.map((item) => {
//         const key = `${item.type}-${item.id}`;
//         const isOpen = openNodes[key];

//         const children =
//           item.talukas || item.local_governances || item.villages || [];
//         const hasChildren = children.length > 0;

//         return (
//           <div key={key} className="mb-1">
//             <div
//               className="d-flex align-items-center cursor-pointer"
//               style={{ padding: "4px 6px" }}
//             >
//               {hasChildren ? (
//                 <span
//                   onClick={(e) => toggleNode(key, e)}
//                   style={{ marginRight: 5 }}
//                 >
//                   {isOpen ? (
//                     <i className="fa fa-angle-down text-muted"></i>
//                   ) : (
//                     <i className="fa fa-angle-right text-muted"></i>
//                   )}
//                 </span>
//               ) : (
//                 <span style={{ marginRight: 14 }}></span>
//               )}

//               <span onClick={(e) => handleSelect(item, e)}>{item.name}</span>
//             </div>

//             {hasChildren && isOpen && renderNodes(children, level + 1)}
//           </div>
//         );
//       })}
//     </div>
//   );

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div className="position-relative" ref={dropdownRef}>
//       <div
//         className="cursor-pointer d-flex align-items-center justify-content-between custom-select px-2 py-1 border rounded"
//         onClick={() => setOpen((prev) => !prev)}
//         style={{ minWidth: 180 }}
//       >
//         <span>{selectedLabel}</span>
//         <i className="fa fa-angle-down"></i>
//       </div>

//       {open && (
//         <div
//           className="position-absolute bg-white border rounded shadow p-2"
//           style={{
//             top: "100%",
//             left: 0,
//             width: "300px",
//             maxHeight: "300px",
//             overflowY: "auto",
//             zIndex: 1000,
//           }}
//         >
//           {regions.length > 0 ? (
//             renderNodes(regions)
//           ) : (
//             <p className="text-muted text-center m-0">No regions found</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default RegionDropdown;

import React, { useState, useRef, useEffect } from "react";

function RegionDropdown({ regions = [], onSelect }) {
  const [open, setOpen] = useState(false);
  const [openNodes, setOpenNodes] = useState({});
  const [selectedLabel, setSelectedLabel] = useState("Select Region");
  const dropdownRef = useRef(null);

  const toggleNode = (key, e) => {
    e?.stopPropagation();
    setOpenNodes((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSelect = (item, e) => {
    e?.stopPropagation();
    setSelectedLabel(item.name);
    setOpen(false);
    if (typeof onSelect === "function") onSelect(item);
  };

  const renderNodes = (items, level = 0) => (
    <div style={{ marginLeft: level * 12 }}>
      {items.map((item) => {
        const key = `${item.type}-${item.id}`;
        const isOpen = openNodes[key];
        const children =
          item.talukas || item.local_governances || item.villages || [];
        const hasChildren = children.length > 0;

        return (
          <div key={key} className="mb-1">
            <div
              className="d-flex align-items-center cursor-pointer"
              style={{ padding: "4px 6px" }}
            >
              {hasChildren ? (
                <span
                  onClick={(e) => toggleNode(key, e)}
                  style={{ marginRight: 5 }}
                >
                  {isOpen ? (
                    <i className="fa fa-angle-down text-muted"></i>
                  ) : (
                    <i className="fa fa-angle-right text-muted"></i>
                  )}
                </span>
              ) : (
                <span style={{ marginRight: 14 }}></span>
              )}

              <span onClick={(e) => handleSelect(item, e)}>{item.name}</span>
            </div>

            {hasChildren && isOpen && renderNodes(children, level + 1)}
          </div>
        );
      })}
    </div>
  );

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
    <div className="position-relative" ref={dropdownRef}>
      <div
        className="cursor-pointer d-flex align-items-center justify-content-between custom-select px-2 py-1 border rounded"
        onClick={() => setOpen((prev) => !prev)}
        style={{ minWidth: 180 }}
      >
        <span>{selectedLabel}</span>
        <i className="fa fa-angle-down"></i>
      </div>

      {open && (
        <div
          className="position-absolute bg-white border rounded shadow p-2"
          style={{
            top: "100%",
            left: 0,
            width: "300px",
            maxHeight: "300px",
            overflowY: "auto",
            zIndex: 1000,
          }}
        >
          {regions.length > 0 ? (
            renderNodes(regions)
          ) : (
            <p className="text-muted text-center m-0">
              🔎 No regions loaded. Check API/console.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default RegionDropdown;
