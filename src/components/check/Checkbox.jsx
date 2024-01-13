import React, { useState } from "react";

const Checkbox = ({ label }) => {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    setChecked(e.target.checked);
  };

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={handleCheckboxChange}
        />
        {label}
      </label>
    </div>
  );
};

export default Checkbox;