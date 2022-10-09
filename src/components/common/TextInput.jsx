import React from "react";

const TextInput = ({
  width,
  height,
  value,
  callback,
  label,
  placeholder,
  type,
  disabled,
}) => {
  return (
    <div
      style={width ? { width: `${width}` } : {}}
      className="common_text_input_wrapper"
    >
      <label className="common_text_input_label">{label}</label>
      <input
        style={width ? { width: `${width}`, height: `${height}` } : {}}
        value={value}
        onChange={(e) => callback(e.target.value)}
        type={type === "pass" ? "password" : "text"}
        className="common_text_input"
        placeholder={placeholder ? placeholder : ""}
        disabled={disabled}
      />
    </div>
  );
};

export default TextInput;
