import React from "react";
import LikeImage from "../../img/sessions/like.svg";
import CommentImage from "../../img/sessions/comment.svg";
import FavoriteImage from "../../img/sessions/fave.svg";
import Edit from "../../img/sessions/edit.svg";
import { Checkbox } from "..";
import { rootAddress } from "../../http/axios-requests";
import { useNavigate } from "react-router-dom";

const PhotoCard = ({
  photo,
  disableRedirect,
  callback,
  array,
  disableEdit,
  disableCheck,
  mainPhoto,
  changeMainPhoto,
  notAuthor,
}) => {
  const navigate = useNavigate();

  const [key, setKey] = React.useState(Math.random);

  return (
    <div
      className="photos_card"
      onClick={() => {
        if (mainPhoto) {
          changeMainPhoto(photo.id, photo.gallery_image.id);
        }
      }}
    >
      <div className="photos_card_photo_wrapper">
        <img
          onClick={() =>
            !disableRedirect &&
            navigate(
              !notAuthor
                ? `/profile/photo/${photo.id}`
                : `/public/photo/${photo.id}`
            )
          }
          src={`${rootAddress}${photo.gallery_image.photo}`}
          alt="card"
          className="photos_card_photo"
        />
        <div className="photos_card_photo_checkbox">
          {!disableCheck && (
            <Checkbox
              value={array.includes(photo.id)}
              callback={() => {
                if (array.includes(photo.id)) {
                  array.splice(array.indexOf(photo.id), 1);
                  callback(array);
                  setKey(Math.random);
                  console.log(array);
                } else {
                  array.push(photo.id);
                  callback(array);
                  setKey(Math.random);
                  console.log(array);
                }
              }}
              key={key}
            />
          )}
        </div>
      </div>
      <div
        style={photo.id === mainPhoto ? { border: "solid #3C8278 1px" } : {}}
        className="photos_card_info"
      >
        <p className="photos_card_info_country">
          {photo.string_place_location.split(", ")[1]}
        </p>
        <div className="photos_card_info_title_wrapper">
          <p className="photos_card_info_title">{photo.name_image}</p>
          {!disableEdit && (
            <img
              onClick={() => navigate(`/profile/edit-photo/${photo.id}`)}
              src={Edit}
              alt="edit"
              className="photos_card_info_title_img"
            />
          )}
        </div>
        <div className="photos_card_info_comm">
          <div className="photos_card_info_comm_likes">
            <img
              src={LikeImage}
              alt="like"
              className="photos_card_info_comm_likes_image"
            />
            <p className="photos_card_info_comm_likes_p">{photo.likes}</p>
          </div>
          <div className="photos_card_info_comm_comments">
            <img
              src={CommentImage}
              alt="like"
              className="photos_card_info_comm_comments_image"
            />
            <p className="photos_card_info_comm_comments_p">{photo.comments}</p>
          </div>
          <div className="photos_card_info_comm_fave">
            <img
              src={FavoriteImage}
              alt="like"
              className="photos_card_info_comm_fave_image"
            />
            <p className="photos_card_info_comm_fave_p">{photo.favorites}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoCard;
