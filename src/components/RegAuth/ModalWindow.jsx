import React from "react";
import "../../styles/RegAuth.scss";

const ModalWindow = ({
  moduleActive,
  setModuleActive,
  children,
  width,
  notAlign,
}) => {
  return (
    <div
      className={moduleActive ? "reg_auth_wrapper active" : "reg_auth_wrapper"}
      style={notAlign ? { alignItems: "flex-start" } : { alignItems: "center" }}
    >
      <div
        style={width ? { width: width } : {}}
        className={
          moduleActive ? "reg_auth_content active" : "reg_auth_content"
        }
      >
        {children}
      </div>
    </div>
  );
};

export default ModalWindow;
