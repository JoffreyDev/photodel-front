import React from "react";
import "../../styles/common.scss";

const GreyButton = ({ width, height, text, callback, margin }) => {
  return (
    <input
      onClick={() => callback()}
      type="button"
      value={text}
      className="common_grey_button"
      style={width ? { width: `${width}`, height: `${height}`, margin: `${margin}` } : {}}
    />
  );
};

export default GreyButton;
