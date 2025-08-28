import React, { useState, useRef, useEffect } from "react";
// import { regionsData } from "../data/regions";

function NestedSelect({ regions }) {
  const [open, setOpen] = useState(false);
  const [openRegions, setOpenRegions] = useState({});
  const [selected, setSelected] = useState("Regions");
  const dropdownRef = useRef(null);

  const toggleRegion = (name) => {
    setOpenRegions((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleSelect = (item) => {
    setSelected(item);
    setOpen(false); // close dropdown after selecting
  };

  const renderRegions = (items) => {
    return (
      <ul className="list-unstyled ms-3 mb-0 cursor-pointer">
        {items.map((item, index) => (
          <li key={index}>
            <div
              className="d-flex align-items-center cursor-pointer"
              onClick={() => {
                if (item.children) {
                  toggleRegion(item.name); // expand/collapse children
                } else if (item.monthly || item.annually) {
                  handleSelect(item); // select leaf node with data
                }
              }}
            >
              <span className="me-2">
                {item.children ? (
                  openRegions[item.name] ? (
                    <i className="fa fa-angle-down text-muted"></i>
                  ) : (
                    <i className="fa fa-angle-right text-muted"></i>
                  )
                ) : (
                  <i
                    className="fa fa-angle-right text-muted"
                    style={{ fontSize: "1rem" }}
                  ></i>
                )}
              </span>
              <span>{item.name}</span>
            </div>

            {item.children &&
              openRegions[item.name] &&
              renderRegions(item.children)}
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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="position-relative cursor-pointer"
      ref={dropdownRef}
      //   style={{ width: "250px" }}
    >
      {/* Fake select box */}
      <div
        className="cursor-pointer d-inline-flex align-items-center custom-select"
        onClick={() => setOpen((prev) => !prev)}
      >
        {selected}
        <i className="fa fa-angle-down ms-2"></i>
      </div>

      {open && (
        <div
          className="position-absolute bg-white border rounded shadow p-1 cursor-pointer"
          style={{ top: "100%", left: 0, width: "180px", zIndex: 1000 }}
        >
          {renderRegions(regions)}
        </div>
      )}
    </div>
  );
}

export default NestedSelect;

// // const NestedSelect = ({ regions, onSelect }) => {

//   import React, { useState } from "react";

// const NestedSelect = ({ regions, onSelect }) => {
//   const [selectedPath, setSelectedPath] = useState([]);

//   const handleChange = (level, value) => {
//     const newPath = selectedPath.slice(0, level);
//     newPath[level] = value;
//     setSelectedPath(newPath);

//     let node = null;
//     let list = regions;

//     for (let name of newPath) {
//       node = list.find((r) => r.name === name);
//       if (!node) break;
//       list = node.children || [];
//     }

//     if (node) onSelect(node);
//   };

//   const dropdowns = [];
//   let level = 0;
//   let list = regions;

//   while (list && list.length > 0) {
//     dropdowns.push(
//       <select
//         key={level}
//         className="form-select mb-2"
//         value={selectedPath[level] || ""}
//         onChange={(e) => handleChange(level, e.target.value)}
//       >
//         <option value="">Select</option>
//         {list.map((r) => (
//           <option key={r.name} value={r.name}>
//             {r.name}
//           </option>
//         ))}
//       </select>
//     );

//     const selected = list.find((r) => r.name === selectedPath[level]);
//     list = selected?.children || null;
//     level++;
//   }

//   return <div>{dropdowns}</div>;
// };

// export default NestedSelect;

// //   return (
// //     <select
// //       onChange={(e) => {
// //         const selectedName = e.target.value;

// //         // Find object recursively
// //         const findRegion = (nodes, name) => {
// //           for (let node of nodes) {
// //             if (node.name === name) return node;
// //             if (node.children) {
// //               const found = findRegion(node.children, name);
// //               if (found) return found;
// //             }
// //           }
// //           return null;
// //         };

// //         const regionObj = findRegion(regions, selectedName);
// //         onSelect(regionObj);
// //       }}
// //     >
// //       <option value="">Select region</option>
// //       {regions.map((region) => (
// //         <option key={region.name} value={region.name}>
// //           {region.name}
// //         </option>
// //       ))}
// //     </select>
// //   );
// // };

// // export default NestedSelect;
