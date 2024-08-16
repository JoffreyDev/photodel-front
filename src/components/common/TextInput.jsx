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
  limit,
  numberRequired,
  required,
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
      <label className="common_text_input_label">{label} {required &&  <span style={{ color: "red", opacity: "0.8" }}>*</span>}</label>
      <input
        style={width ? { width: `${width}`, height: `${height}` } : {}}
        value={value}
        onChange={
          limit
            ? (e) => {
                if (e.target.value.length > limit) {
                  return;
                } else callback(e.target.value);
              }
            : (e) => callback(e.target.value)
        }
        type={type === "pass" ? "password" : numberRequired ? "number" : "text"}
        className="common_text_input"
        placeholder={placeholder ? placeholder : ""}
        disabled={disabled}
      />
    </div>
  );
};

export default TextInput;
