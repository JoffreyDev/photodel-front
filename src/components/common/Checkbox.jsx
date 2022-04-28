import React from "react";
import "../../styles/common.scss";

const Checkbox = ({ label, callback, value, marginBottom }) => {
  const id = Math.random();

  return (
    <div
      style={
        marginBottom ? { marginBottom: marginBottom } : { marginBottom: "25px" }
      }
      className="common_checkbox_wrapper"
    >
      <input
        type="checkbox"
        className="common_checkbox"
        id={`common_checkbox${id}`}
        checked={value}
        onChange={callback}
      />
      <label htmlFor={`common_checkbox${id}`} className="common_checkbox_label">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
