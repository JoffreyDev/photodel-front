import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import "../../styles/Profile/ScreenLoader.scss";
import { useDispatch } from "react-redux";
import { setDataLoaded } from "../../redux/actions/siteEntities";

function ScreenLoader({ height }) {
  const dispatch = useDispatch();

  return (
    <div
      style={height ? { height: height } : {}}
      className="screenloader_overlay"
    >
      <div className="screenloader_body">
        <CircularProgress color="success" />
      </div>
    </div>
  );
}

export default ScreenLoader;
