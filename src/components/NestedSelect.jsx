import React, { useState, useRef, useEffect } from "react";
// import { regionsData } from "../data/regions";

function NestedSelect({ regions, onSelect }) {
  const [open, setOpen] = useState(false);
  const [openRegions, setOpenRegions] = useState({});
  const [selectedLabel, setSelectedLabel] = useState("Regions");
  const dropdownRef = useRef(null);

  const toggleRegion = (name) => {
    setOpenRegions((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleSelect = (item) => {
    setSelectedLabel(item.name || "Regions");
    setOpen(false); // close dropdown after selecting
    if (typeof onSelect === "function") onSelect(item);
  };

  const renderRegions = (items) => {
    return (
      <ul className="list-unstyled ms-2 mb-0 cursor-pointer">
        {items.map((item, index) => (
          <li key={`${item.name}-${index}`}>
            <div
              className="d-flex align-items-center cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                if (item.children) {
                  toggleRegion(item.name);
                } else if (item.monthly || item.annually) {
                  handleSelect(item);
                } else {
                  // if there are nodes with no children and no monthly/annually, still select by name
                  handleSelect(item);
                }
              }}
            >
              <span className="">
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
        className="cursor-pointer d-flex align-items-center justify-content-between custom-select flex-1"
        onClick={() => setOpen((prev) => !prev)}
        style={{ minWidth: 140 }}
      >
        {selectedLabel}
        <i className="fa fa-angle-down flex-1"></i>
      </div>

      {open && (
        <div
          className="position-absolute bg-white border rounded shadow p-1 cursor-pointer"
          style={{ top: "100%", left: 0, width: "140px", zIndex: 1000 }}
        >
          {renderRegions(regions)}
        </div>
      )}
    </div>
  );
}

export default NestedSelect;