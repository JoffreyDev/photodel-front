import { MuiModal } from "..";
import React from "react";
import { Checkbox, PhotoCard, GreenButton } from "..";
import LeftArrow from "../../img/commonImages/photo_left_arrow.svg";
import RightArrow from "../../img/commonImages/photo_right_arrow.svg";

const PhotoFullScreen = ({
  photo,
  modalActive,
  setModalActive,
  changePhoto,
  slider,
}) => {
  const [photoWidth, setPhotoWidth] = React.useState();
  const [photoHeight, setPhotoHeight] = React.useState();

  const getImageHeight = (photo) => {
    var img = new Image();
    img.src = photo;
    img.onload = function () {
      setPhotoHeight(img.height);
    };
  };

  const getImageWidth = (photo) => {
    var img = new Image();
    img.src = photo;
    img.onload = function () {
      setPhotoWidth(img.width);
    };
  };

  React.useEffect(() => {
    getImageHeight(photo);
    getImageWidth(photo);
  }, [photo]);

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
        {slider && (
          <img
            src={LeftArrow}
            alt="prev"
            className="photo_view_content_left_image_arrow left"
            onClick={(e) => {
              e.stopPropagation();
              changePhoto("prev");
            }}
          />
        )}
        <div className="photo_view_fullscreen_content">
          <img
            src={photo}
            alt="photo"
            className="photo_view_fullscreen_content_image"
            style={
              photoWidth
                ? { width: photoWidth + "px", height: photoHeight + "px" }
                : {}
            }
            onClick={() => setModalActive(false)}
          />
          {slider && (
            <img
              src={RightArrow}
              alt="next"
              className="photo_view_content_left_image_arrow right"
              onClick={(e) => {
                e.stopPropagation();
                changePhoto("next");
              }}
            />
          )}
        </div>
      </div>
    </MuiModal>
  );
};

export default PhotoFullScreen;
