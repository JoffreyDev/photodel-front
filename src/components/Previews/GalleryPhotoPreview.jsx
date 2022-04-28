import React from "react";
import Like from "../../img/photoView/like.svg";
import Fave from "../../img/photoView/fave.svg";
import Comment from "../../img/photoView/comment.svg";
import { rootAddress } from "../../http/axios-requests";
import { useNavigate } from "react-router-dom";

function GalleryPhotoPreview({ photo, isAuthor, width, height }) {
  const navigate = useNavigate();
  return (
    <div className="main_photo_body_photo_wrapper">
      <img
        style={width ? { height: `${height}px`, width: `${width}px` } : {}}
        className="main_photo_body_photo"
        src={`${rootAddress}${photo.gallery_image.photo}`}
      />
      <div
        onClick={() => navigate(`/public/photo/${photo.id}`)}
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
          <p className="main_photo_body_photo_layout_top_p">{photo.comments}</p>
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
    </div>
  );
}

export default GalleryPhotoPreview;
