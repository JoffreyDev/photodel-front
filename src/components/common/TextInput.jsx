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
  lock,
}) => {
  return (
    <div
      style={width ? { width: `${width}` } : {}}
      className={
        lock ? "common_text_input_wrapper lock" : "common_text_input_wrapper"
      }
    >
      {lock && (
        <div className="common_text_input_wrapper_lock center">
          <h1 className="common_text_input_wrapper_lock_h1">
            {" "}
            Доступно только для Pro
          </h1>
        </div>
      )}
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
