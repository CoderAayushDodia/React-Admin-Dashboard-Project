import React, { useState } from "react";

function Sidebar({ openSidebarToggle, OpenSidebar, menuItems }) {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index); // toggle, only one open
  };

  return (
    <aside
      id="sideBar"
      className={`border-end ${
        openSidebarToggle ? "sidebar-responsive" : "  "
      }`}
    >
      <div className="sidebar-title px-3 py-3">
        <img src="/image 5.png" alt="Logo" />
        <span className="close-icon" onClick={OpenSidebar}>
          <i className="fa-solid fa-xmark"></i>
        </span>
      </div>
      <ul className="sidebar-list1 list-unstyled px-3 py-1">
        {menuItems.map((item, index) => (
          <li key={index} className="mb-1">
            {/* Parent Item */}
            <div
              className={`px-3 py-2 rounded-3 ${
                item.active ? "text-danger bg-danger-subtle fw-semibold" : ""
              }`}
              style={{ cursor: item.children ? "pointer" : "default" }}
              onClick={() => item.children && handleToggle(index)}
            >
              <span
                className={`d-block ${
                  item.active ? "text-danger" : "text-dark"
                }`}
              >
                {item.name}
              </span>
            </div>

            {/* Children Items */}
            {item.children && openIndex === index && (
              <ul className="list-unstyled ms-4 mt-1">
                {item.children.map((sub, subIndex) => (
                  <li key={subIndex} className="py-1 fw-bold">
                    <span className="text-dark">{sub}</span>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
