import { MuiModal } from "..";
import React from "react";
import { Checkbox, PhotoCard, GreenButton } from "..";
import Shape from "../../img/commonImages/shape.svg";

const PhotoFullScreen = ({
  photo,
  modalActive,
  setModalActive,
  width,
  height,
}) => {
  return (
    <MuiModal open={modalActive} setOpen={setModalActive}>
      <div
        className={
          modalActive
            ? "edit_album_popup_wrapper active"
            : "edit_album_popup_wrapper"
        }
        onClick={() => setModalActive(false)}
      >
        <div className="photo_view_fullscreen_content">
          <img
            src={photo}
            alt="photo"
            className="photo_view_fullscreen_content_image"
            style={width ? { width: width + "px", height: height + "px" } : {}}
          />
          <img
            src={Shape}
            alt="shape"
            className="photo_view_fullscreen_content_shape"
            onClick={() => setModalActive(false)}
          />
        </div>
      </div>
    </MuiModal>
  );
};

export default PhotoFullScreen;
