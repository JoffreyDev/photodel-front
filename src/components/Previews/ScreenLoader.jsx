import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import "../../styles/Profile/ScreenLoader.scss";

function ScreenLoader() {
  return (
    <div className="screenloader_overlay">
      <div className="screenloader_body">
        <CircularProgress color="success" />
      </div>
    </div>
  );
}

export default ScreenLoader;
