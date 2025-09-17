// import React, { useState } from "react";

// function Sidebar({ openSidebarToggle, OpenSidebar, menuItems }) {
//   const [openIndex, setOpenIndex] = useState(null);

//   const handleToggle = (index) => {
//     setOpenIndex(openIndex === index ? null : index); // toggle, only one open
//   };

//   return (
//     <aside
//       id="sideBar"
//       className={`border-end ${
//         openSidebarToggle ? "sidebar-responsive" : "  "
//       }`}
//     >
//       <div className="sidebar-title px-3 py-3">
//         <img src="/image 5.png" alt="Logo" />
//         <span className="close-icon" onClick={OpenSidebar}>
//           <i className="fa-solid fa-xmark"></i>
//         </span>
//       </div>
//       <ul className="sidebar-list1 list-unstyled px-3 py-1">
//         {menuItems.map((item, index) => (
//           <li key={index} className="mb-1">
//             {/* Parent Item */}
//             <div
//               className={`px-3 py-2 rounded-3 ${
//                 item.active ? "text-danger bg-danger-subtle fw-semibold" : ""
//               }`}
//               style={{ cursor: item.children ? "pointer" : "default" }}
//               onClick={() => item.children && handleToggle(index)}
//             >
//               <span
//                 className={`d-block ${
//                   item.active ? "text-danger" : "text-dark"
//                 }`}
//               >
//                 {item.name}
//               </span>
//             </div>

//             {/* Children Items */}
//             {item.children && openIndex === index && (
//               <ul className="list-unstyled ms-4 mt-1">
//                 {item.children.map((sub, subIndex) => (
//                   <li key={subIndex} className="py-1 fw-bold">
//                     <span className="text-dark">{sub}</span>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </li>
//         ))}
//       </ul>
//     </aside>
//   );
// }

// export default Sidebar;

// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";

// function Sidebar({ openSidebarToggle, OpenSidebar, menuItems = [] }) {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [openIndex, setOpenIndex] = useState(null);
//   const [activeIndex, setActiveIndex] = useState(0); // default to Dashboard

//   // ✅ Force navigate to /dashboard on first mount if URL is root or unknown
//   useEffect(() => {
//     if (location.pathname === "/" || location.pathname === "") {
//       navigate("/dashboard", { replace: true }); // replace avoids adding history entry
//       setActiveIndex(0); // make Dashboard active
//     }
//   }, [location.pathname, navigate]);

//   const handleToggle = (index) => {
//     setOpenIndex(openIndex === index ? null : index);
//     setActiveIndex(index);
//   };

//   const handleNavigate = (link, parentIndex) => {
//     if (typeof parentIndex === "number") setActiveIndex(parentIndex);
//     if (!link) return;
//     navigate(link);
//   };

//   return (
//     <aside
//       id="sideBar"
//       className={`border-end ${openSidebarToggle ? "sidebar-responsive" : ""}`}
//     >
//       <div className="sidebar-title px-3 py-3">
//         <img src="/image 5.png" alt="Logo" />
//         <span className="close-icon" onClick={OpenSidebar}>
//           <i className="fa-solid fa-xmark"></i>
//         </span>
//       </div>

//       <ul className="sidebar-list1 list-unstyled px-3 py-1">
//         {menuItems.map((item, index) => (
//           <li key={index} className="mb-1">
//             <div
//               className={`px-3 py-2 rounded-3 ${
//                 activeIndex === index
//                   ? "text-danger bg-danger-subtle fw-semibold"
//                   : "text-dark"
//               }`}
//               style={{
//                 cursor: item.children ? "pointer" : item.link ? "pointer" : "default",
//               }}
//               onClick={() =>
//                 item.children ? handleToggle(index) : handleNavigate(item.link, index)
//               }
//             >
//               <span
//                 className={`d-block ${
//                   activeIndex === index ? "text-danger" : "text-dark"
//                 }`}
//               >
//                 {item.name}
//               </span>
//             </div>

//             {item.children && openIndex === index && (
//               <ul className="list-unstyled ms-4 mt-1">
//                 {item.children.map((sub, subIndex) => (
//                   <li
//                     key={subIndex}
//                     className="py-1"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       setActiveIndex(index);
//                       handleNavigate(sub.link, index);
//                     }}
//                     style={{ cursor: sub.link ? "pointer" : "default" }}
//                   >
//                     <span className="text-dark">{sub.name}</span>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </li>
//         ))}
//       </ul>
//     </aside>
//   );
// }

// export default Sidebar;

// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";

// function Sidebar({ openSidebarToggle, OpenSidebar, menuItems = [] }) {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [openIndex, setOpenIndex] = useState(null);
//   const [activeIndex, setActiveIndex] = useState(null);

//   // ✅ Sync activeIndex with current URL path
//   useEffect(() => {
//     const currentPath = location.pathname;

//     // Find index of menu item whose link matches current path
//     const matchedIndex = menuItems.findIndex((item) => item.link === currentPath);

//     if (matchedIndex !== -1) {
//       setActiveIndex(matchedIndex);
//     } else {
//       setActiveIndex(null); // No active item (for pages like /notifications)
//     }
//   }, [location.pathname, menuItems]);

//   const handleToggle = (index) => {
//     setOpenIndex(openIndex === index ? null : index);
//     setActiveIndex(index);
//   };

//   const handleNavigate = (link, parentIndex) => {
//     if (typeof parentIndex === "number") setActiveIndex(parentIndex);
//     if (!link) return;
//     navigate(link);
//   };

//   return (
//     <aside
//       id="sideBar"
//       className={`border-end ${openSidebarToggle ? "sidebar-responsive" : ""}`}
//     >
//       {/* Logo + Close Button */}
//       <div className="sidebar-title px-3 py-3">
//         <img src="/image 5.png" alt="Logo" />
//         <span className="close-icon" onClick={OpenSidebar}>
//           <i className="fa-solid fa-xmark"></i>
//         </span>
//       </div>

//       {/* Menu Items */}
//       <ul className="sidebar-list1 list-unstyled px-3 py-1">
//         {menuItems.map((item, index) => {
//           const isActive = activeIndex === index;

//           return (
//             <li key={index} className="mb-1">
//               <div
//                 className={`px-3 py-2 rounded-3 ${
//                   isActive ? "text-danger bg-danger-subtle fw-semibold" : "text-dark"
//                 }`}
//                 style={{
//                   cursor:
//                     item.children || item.link ? "pointer" : "default",
//                 }}
//                 onClick={() =>
//                   item.children
//                     ? handleToggle(index)
//                     : handleNavigate(item.link, index)
//                 }
//               >
//                 <span className={`d-block ${isActive ? "text-danger" : "text-dark"}`}>
//                   {item.name}
//                 </span>
//               </div>

//               {/* Submenu */}
//               {item.children && openIndex === index && (
//                 <ul className="list-unstyled ms-4 mt-1">
//                   {item.children.map((sub, subIndex) => {
//                     const isSubActive = sub.link === location.pathname;
//                     return (
//                       <li
//                         key={subIndex}
//                         className={`py-1 ${isSubActive ? "fw-semibold text-danger" : ""}`}
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleNavigate(sub.link, index);
//                         }}
//                         style={{ cursor: sub.link ? "pointer" : "default" }}
//                       >
//                         <span>{sub.name}</span>
//                       </li>
//                     );
//                   })}
//                 </ul>
//               )}
//             </li>
//           );
//         })}
//       </ul>
//     </aside>
//   );
// }

// export default Sidebar;

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Sidebar({ openSidebarToggle, OpenSidebar, menuItems = [] }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [openIndex, setOpenIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);

  // ✅ Sync activeIndex & openIndex with current route
  useEffect(() => {
    const currentPath = location.pathname;

    // Find parent index where currentPath starts with menuItem.link
    const matchedIndex = menuItems.findIndex((item) => {
      if (!item.link) return false;
      return currentPath.startsWith(item.link);
    });

    if (matchedIndex !== -1) {
      setActiveIndex(matchedIndex);
      setOpenIndex(matchedIndex); // auto-open parent if it has children
    } else {
      setActiveIndex(null);
      setOpenIndex(null);
    }
  }, [location.pathname, menuItems]);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
    setActiveIndex(index);
  };

  const handleNavigate = (link, parentIndex) => {
    if (typeof parentIndex === "number") setActiveIndex(parentIndex);
    if (!link) return;
    navigate(link);
  };

  return (
    <aside
      id="sideBar"
      className={`border-end ${openSidebarToggle ? "sidebar-responsive" : ""}`}
    >
      {/* Logo + Close */}
      <div className="sidebar-title px-3 py-3">
        <img src="/image 5.png" alt="Logo" style={{ transform: 'scaleX(-1)' }} />
        <span className="close-icon" onClick={OpenSidebar}>
          <i className="fa-solid fa-xmark"></i>
        </span>
      </div>

      {/* Sidebar Menu */}
      <ul className="sidebar-list1 list-unstyled px-3 py-1">
        {menuItems.map((item, index) => {
          const isActive = activeIndex === index;
          return (
            <li key={index} className="mb-1">
              {/* Parent Item */}
              <div
                className={`px-3 py-2 rounded-3 ${
                  isActive ? "text-danger bg-danger-subtle fw-semibold" : "text-dark"
                }`}
                style={{
                  cursor: item.children || item.link ? "pointer" : "default",
                }}
                onClick={() =>
                  item.children
                    ? handleToggle(index)
                    : handleNavigate(item.link, index)
                }
              >
                <span className={`d-block ${isActive ? "text-danger" : "text-dark"}`}>
                  {item.name}
                </span>
              </div>

              {/* Submenu */}
              {item.children && openIndex === index && (
                <ul className="list-unstyled ms-4 mt-1">
                  {item.children.map((sub, subIndex) => {
                    const isSubActive = location.pathname.startsWith(sub.link);
                    return (
                      <li
                        key={subIndex}
                        className={`py-1 ${
                          isSubActive ? "fw-semibold text-danger" : "text-dark"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNavigate(sub.link, index);
                        }}
                        style={{ cursor: sub.link ? "pointer" : "default" }}
                      >
                        <span>{sub.name}</span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

export default Sidebar;



// // import React, { useState, useEffect, useRef } from "react";
// // import { useNavigate, useLocation } from "react-router-dom";

// // function Sidebar({ openSidebarToggle, OpenSidebar, menuItems = [] }) {
// //   const navigate = useNavigate();
// //   const location = useLocation();

// //   const [activeIndex, setActiveIndex] = useState(null);
// //   const [openIndex, setOpenIndex] = useState(null);
// //   const initializedRef = useRef(false);

// //   const resolveRoute = (link) => {
// //     if (!link) return "/dashboard"; // ✅ default route
// //     return link.startsWith("/dashboard") ? link : `/dashboard${link}`;
// //   };

// //   const normalize = (p) => {
// //     if (!p) return "";
// //     return p === "/" ? p : p.replace(/\/+$/, ""); // remove trailing slashes
// //   };

// //   // 🔑 URL + menuItems decide the activeIndex
// //   useEffect(() => {
// //     if (!menuItems || menuItems.length === 0) return;

// //     const currentPath = normalize(location.pathname);
// //     let matchedIndex = menuItems.findIndex((item) => {
// //       const itemRoute = normalize(resolveRoute(item.link));
// //       return (
// //         currentPath === itemRoute ||
// //         currentPath.startsWith(itemRoute + "/") ||
// //         currentPath.startsWith(itemRoute)
// //       );
// //     });

// //     // ✅ fallback: if no item matches, select the first one (dashboard)
// //     if (matchedIndex === -1) matchedIndex = 0;

// //     setActiveIndex(matchedIndex);
// //     initializedRef.current = true;
// //   }, [location.pathname, menuItems]); // ✅ watch menuItems too

// //   const handleItemClick = (index, link) => {
// //     setOpenIndex(menuItems[index]?.children ? index : null);
// //     navigate(resolveRoute(link));
// //     // ❌ Don't manually setActiveIndex — let URL change handle it
// //   };

// //   return (
// //     <aside
// //       id="sideBar"
// //       className={`border-end ${openSidebarToggle ? "sidebar-responsive" : ""}`}
// //     >
// //       <div className="sidebar-title px-3 py-3">
// //         <img src="/image 5.png" alt="Logo" />
// //         <span className="close-icon" onClick={OpenSidebar}>
// //           <i className="fa-solid fa-xmark"></i>
// //         </span>
// //       </div>

// //       <ul className="sidebar-list1 list-unstyled px-3 py-1">
// //         {menuItems.map((item, index) => {
// //           const isActive = index === activeIndex;
// //           return (
// //             <li key={index} className="mb-1">
// //               <div
// //                 onClick={() => handleItemClick(index, item.link)}
// //                 className={`px-3 py-2 rounded-3 ${
// //                   isActive
// //                     ? "text-danger bg-danger-subtle fw-semibold"
// //                     : "text-dark"
// //                 }`}
// //                 style={{ cursor: "pointer" }}
// //               >
// //                 <span className={`d-block ${isActive ? "text-danger" : "text-dark"}`}>
// //                   {item.name}
// //                 </span>
// //               </div>

// //               {item.children && openIndex === index && (
// //                 <ul className="list-unstyled ms-4 mt-1">
// //                   {item.children.map((sub, subIndex) => (
// //                     <li key={subIndex} className="py-1 fw-bold" style={{ cursor: "pointer" }}>
// //                       <span className="text-dark">{sub}</span>
// //                     </li>
// //                   ))}
// //                 </ul>
// //               )}
// //             </li>
// //           );
// //         })}
// //       </ul>
// //     </aside>
// //   );
// // }

// // export default Sidebar;
