import React from "react";

const TextInput = ({ width, height, value, callback, label, placeholder }) => {
  return (
    <div className="common_text_input_wrapper">
      <label className="common_text_input_label">{label}</label>
      <input
        style={width ? { width: `${width}`, height: `${height}` } : {}}
        value={value}
        onChange={(e) => callback(e.target.value)}
        type="text"
        className="common_text_input"
        placeholder={placeholder ? placeholder : ""}
      />
    </div>
  );
};

export default TextInput;
