import React from "react";
import "../../styles/common.scss";

const GreenButton = ({ width, height, text, callback, margin, disabled }) => {
  return (
    <input
      onClick={() => callback()}
      type="button"
      value={text}
      className="common_green_button"
      style={
        width
          ? { width: `${width}`, height: `${height}`, margin: `${margin}` }
          : {}
      }
      disabled={disabled}
    />
  );
};

export default GreenButton;
