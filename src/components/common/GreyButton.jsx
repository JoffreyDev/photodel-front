import React from "react";
import "../../styles/common.scss";

const GreyButton = ({ width, height, text, callback }) => {
  return (
    <input
      onClick={() => callback()}
      type="button"
      value={text}
      className="common_grey_button"
      style={width ? { width: `${width}`, height: `${height}` } : {}}
    />
  );
};

export default GreyButton;
