import React from "react";
import "../../styles/common.scss";

const RedButton = ({ width, height, text, callback }) => {
  return (
    <input
      onClick={() => callback()}
      type="button"
      value={text}
      className="common_red_button"
      style={width ? { width: `${width}`, height: `${height}` } : {}}
    />
  );
};

export default RedButton;
