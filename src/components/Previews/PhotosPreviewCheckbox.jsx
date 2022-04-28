import React from "react";
import { Checkbox } from "..";

const PhotosPreviewCheckbox = ({
  image,
  main,
  setMain,
  id,
  active,
  setActive,
  key,
}) => {
  return (
    <div className="add_session_left_content_photo_preview_wrapper">
      <img
        src={image}
        className={
          main
            ? "add_session_left_content_photo_preview main"
            : "add_session_left_content_photo_preview"
        }
        onClick={() => {
          setMain(id);
        }}
        alt="preview"
      />
      <div className="add_session_left_content_photo_preview_checkbox">
        <Checkbox value={active} callback={setActive} />
      </div>
    </div>
  );
};

export default PhotosPreviewCheckbox;
