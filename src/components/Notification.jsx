import React from "react";
import { useNavigate } from "react-router-dom";
import dashboardData from "../../public/dashboardData.json";

function AddReport() {
    const notifications = dashboardData.notifications || [];
  const navigate = useNavigate();
  // const [showPassword, setShowPassword] = useState(false);

 

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     addNewActivist(formData); //pass data to parent
//     navigate("/reports"); //redirect back to activist list
//   };

  return (
    <div className="main-container p-3" style={{backgroundColor: "#fff"}}>
      <div className="container-body mb-4 d-lg-block d-md-block d-none">
        <div className="add-activist-header d-lg-flex d-md-flex d-none align-items-center gap-2 pt-3 px-3 ">
          <span class="material-symbols-outlined">home</span>
          <i className="fa fa-angle-right"></i>
          <p className="mb-0">Notifications</p>
          
        </div>
        <div className="d-flex justify-content-between align-items-center mb-2 pt-3 px-3">
          <h4>Notifications</h4>
          <div className="d-flex gap-2 activist-action-buttons">
            <button
              type="button"
              className="btn btn-outline-secondary me-2 add-activist-cancel-btn"
              onClick={() => navigate("/dashboard")}
            >
              Cancel
            </button>
            
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-lg-2 mb-md-2 mb-0 pt-lg-3 pt-md-2 pt-0 px-3 d-lg-none d-md-none d-flex">
        <h4 className="d-lg-block d-md-block d-none">Notifications</h4>
        <div className="d-lg-none d-md-none d-flex gap-2 activist-action-buttons">
          <button
            type="button"
            className="btn btn-outline-secondary me-2 add-activist-cancel-btn"
            onClick={() => navigate("/reports")}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="add-activist-save-btn"
            // onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>

      {/* <div className="container-body mb-4 p-3">
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
      </div> */}

      {/* Notifications List */}
      <div
        className=""
        
      >
        {notifications.length === 0 ? (
          <p className="text-muted text-center my-3">No notifications found</p>
        ) : (
          <div className="d-flex flex-column gap-3">
            {notifications.map((notif, index) => (
              <div
                key={index}
                className="d-flex justify-content-between align-items-center border-bottom pb-2"
                style={{ cursor: "pointer" }}
              >
                {/* Left: Icon + Message */}
                <div className="d-flex align-items-center gap-3">
                  <img
                    src={notif.image || "/Avatar.png"}
                    alt="user"
                    className="rounded-circle"
                    style={{ width: "40px", height: "40px", objectFit: "cover" }}
                  />
                  <p className="mb-0 small fw-medium">{notif.message}</p>
                </div>

                {/* Right: Time */}
                <small className="text-muted">{notif.time}</small>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AddReport;

