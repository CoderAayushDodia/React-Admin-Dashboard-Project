import React, { useState } from "react";

function SimpleDropdown({ options, selected, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="custom-dropdown">
      {/* Selected value */}
      <span className="dropdown-selected" onClick={() => setOpen(!open)}>
        {selected} <i className="fa-solid fa-angle-down"></i>
      </span>

      {/* Dropdown list */}
      {open && (
        <div className="dropdown-options">
          {options.map((option) => (
            <div
              key={option}
              className="dropdown-option"
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SimpleDropdown;
