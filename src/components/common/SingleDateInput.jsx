import React from "react";

const SingleDateInput = ({ width, height, value, callback, label }) => {
  return (
    <div className="common_text_input_wrapper">
      <label className="common_text_input_label">{label}</label>
      <input
        style={width ? { width: `${width}`, height: `${height}` } : {}}
        onChange={(e) => {
          callback(e.target.value);
        }}
        type="datetime-local"
        className="common_text_input"
        value={value}
      />
    </div>
  );
};

export default SingleDateInput;
