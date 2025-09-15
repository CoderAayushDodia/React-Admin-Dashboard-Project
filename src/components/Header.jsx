import React, { useState, useRef } from "react";

function Header({ OpenSidebar, notifications }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const notifRef = useRef(null);

  return (
    <header className="header px-4 border-bottom">
      <div className="menu-icon me-2">
        <i className="fa-solid fa-bars" onClick={OpenSidebar}></i>
      </div>
      <div className="header-left rounded d-flex align-items-center position-relative d-lg-flex d-none">
        <span>
          <i className="fa-solid fa-magnifying-glass"></i>
        </span>
        <input
          type="text"
          placeholder="Search"
          className="border-0 shadow-none form-control flex-grow-1"
        />
      </div>
      <div className="header-title d-flex align-items-center gap-2 d-block d-lg-none">
        <img src="/image 5.png" alt="Logo" />
        <h2 className="mb-0">श्रमजीवी संघटना (महाराष्ट्र)</h2>
      </div>
      <div className="header-right d-flex align-items-center position-relative">
        <span className="material-symbols-outlined d-lg-block d-none">
          {" "}
          settings{" "}
        </span>
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
          >
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h6 className="fw-bold mb-0">Notification</h6>
              <a href="/notifications" className="text-danger small fw-bold">
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
        <a href="/">
          <img
            src="/Avatar.png"
            alt="Profile photo"
            className=" d-lg-block d-none"
          />
        </a>
      </div>
    </header>
  );
}

export default Header;
