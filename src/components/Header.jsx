import React, { useState, useRef, useEffect } from "react";

function Header({ OpenSidebar, regions, notifications }) {
  const [openRegions, setOpenRegions] = useState({}); // track open/close state
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const [showNotifications, setShowNotifications] = useState(false);
  const notifRef = useRef(null);

  const toggleRegion = (name) => {
    setOpenRegions((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const renderRegions = (items) => {
    return (
      <ul className="list-unstyled ps-3 mb-0">
        {items.map((item, index) => (
          <li key={index}>
            <div
              className="d-flex align-items-center cursor-pointer"
              onClick={() => item.children && toggleRegion(item.name)}
            >
              <span className="ms-2">
                {openRegions[item.name] ? (
                  <i className="fa fa-angle-down me-2 text-muted"></i>
                ) : (
                  <i className="fa fa-angle-right me-2 text-muted"></i>
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
        setShowDropdown(false);
      }
      if (
        notifRef.current &&
        !notifRef.current.contains(event.target) &&
        !event.target.closest(".notification")
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="header px-4 border-bottom">
      <div className="menu-icon me-2">
        <i className="fa-solid fa-bars" onClick={OpenSidebar}></i>
      </div>
      <div
        className="header-left rounded d-flex align-items-center position-relative d-lg-flex d-none"
        ref={dropdownRef}
      >
        <span>
          <i className="fa-solid fa-magnifying-glass"></i>
        </span>
        <input
          type="text"
          placeholder="Search"
          className="border-0 shadow-none form-control flex-grow-1"
          onFocus={() => setShowDropdown(true)}
        />

        {showDropdown && (
          <div
            className="position-absolute bg-white border rounded shadow p-2 dropdown-list"
            style={{ top: "100%", left: 0, width: "100%", zIndex: 1000 }}
            onMouseDown={(e) => e.preventDefault()} 
          >
            {renderRegions(regions)}
          </div>
        )}
      </div>
      <div className="header-title d-flex align-items-center gap-2 d-block d-lg-none">
        <img src="/image 5.png" alt="Logo" />
        <h2 className="mb-0">श्रमजीवी संघटना (महाराष्ट्र)</h2>
      </div>
      <div className="header-right d-flex align-items-center position-relative">
        <span className="material-symbols-outlined d-lg-block d-none"> settings </span>
        <span
          className="material-symbols-outlined notification p-1 cursor-pointer"
          onClick={() => setShowNotifications((prev) => !prev)}
        >
          notifications
        </span>

        {showNotifications && (
          <div
            ref={notifRef}
            className="bg-white border rounded shadow p-3 notification-modal"
            // style={{
            //   top: "140px",
            //   right: 0,
            //   width: "100%",
            //   maxWidth:"400px",
            //   margin: 0,
            //   zIndex: 2000,
            //   animation: "slideDown 0.3s ease forwards",
            // }}
          >
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h6 className="fw-bold mb-0">Notification</h6>
              <a href="#" className="text-danger small fw-bold">
                View All
              </a>
            </div>
            <div>
              {notifications.map((notif, index) => (
                <div
                  key={index}
                  className="d-flex align-items-center border-bottom py-2"
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={notif.image || "/Avatar.png"}
                    alt="user"
                    className="rounded-circle me-2"
                    style={{ width: "35px", height: "35px" }}
                  />
                  <div className="notification-text d-flex justify-content-between gap-2">
                    <p className="mb-0 small">{notif.message}</p>
                    <small className="text-muted">{notif.time}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <img src="/Avatar.png" alt="Profile photo" className=" d-lg-block d-none"/>
      </div>
    </header>
  );
}

export default Header;
