import React from "react";
import Like from "../../img/photoView/like.svg";
import Fave from "../../img/photoView/fave.svg";
import Comment from "../../img/photoView/comment.svg";
import { rootAddress } from "../../http/axios-requests";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@mui/material";
import { NuPhotoSubmit } from "../../components";

function GalleryPhotoPreview({ photo, isAuthor, width, height, wrapperWidth }) {
  const navigate = useNavigate();
  const [nuModalActive, setNuModalActive] = React.useState(false);

  return (
    <div
      style={wrapperWidth ? { width: width } : {}}
      className="main_photo_body_photo_wrapper"
    >
      {photo && (
        <img
          style={width ? { height: height, width: width } : {}}
          className={
            photo.category[0] === 19 && !localStorage.getItem("nu")
              ? "main_photo_body_photo blured"
              : "main_photo_body_photo"
          }
          src={`${rootAddress}${photo.gallery_image.photo}`}
        />
      )}
      {!photo && (
        <Skeleton
          variant="rectangular"
          sx={{ borderRadius: 3 }}
          width={width ? width : 255}
          height={height ? height : 154}
        />
      )}
      {photo && (
        <div
          onClick={() =>
            photo.category[0] === 19 && !localStorage.getItem("nu")
              ? setNuModalActive(true)
              : navigate(`/public/photo/${photo.id}`)
          }
          className="main_photo_body_photo_layout"
        >
          <div className="main_photo_body_photo_layout_top">
            <img
              src={Like}
              alt="like"
              className="main_photo_body_photo_layout_top_img"
            />
            <p className="main_photo_body_photo_layout_top_p">{photo.likes}</p>
            <img
              src={Fave}
              alt="like"
              className="main_photo_body_photo_layout_top_img"
            />
            <p className="main_photo_body_photo_layout_top_p">
              {photo.favorites}
            </p>
            <img
              src={Comment}
              alt="like"
              className="main_photo_body_photo_layout_top_img"
            />
            <p className="main_photo_body_photo_layout_top_p">
              {photo.comments}
            </p>
          </div>
          {!isAuthor && (
            <div className="main_photo_body_photo_layout_low">
              <p className="main_photo_body_photo_layout_low_title">
                {photo.name_image}
              </p>
              <p className="main_photo_body_photo_layout_low_name">
                {`${photo.profile.name} ${photo.profile.surname}`}
              </p>
            </div>
          )}
        </div>
      )}
      {photo && (
        <NuPhotoSubmit
          nuModalActive={nuModalActive}
          setNuModalActive={setNuModalActive}
          callback={() => navigate(`/public/photo/${photo.id}`)}
        />
      )}
    </div>
  );
}

export default GalleryPhotoPreview;
