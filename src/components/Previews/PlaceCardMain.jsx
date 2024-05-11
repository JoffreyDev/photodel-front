import React from "react";
import LikeImage from "../../img/sessions/like.svg";
import CommentImage from "../../img/sessions/comment.svg";
import FavoriteImage from "../../img/sessions/fave.svg";
import Edit from "../../img/sessions/edit.svg";
import { Checkbox } from "..";
import { rootAddress } from "../../http/axios-requests";
import { useNavigate } from "react-router-dom";

const PlaceCard = ({
  place,
  disableRedirect,
  callback,
  array,
  disableCheck,
  disableEdit,
  notAuthor,
  halfContent,
}) => {
  const navigate = useNavigate();

  function limitString(str, limit) {
    return str.length > limit ? str.substring(0, limit) + "..." : str;
  }

  const [key, setKey] = React.useState(Math.random);

  return (
    <div
      className={
        halfContent ? "sessions_card map_active" : "sessions_card map_disabled"
      }
      onClick={() =>
        !disableRedirect &&
        navigate(
          !notAuthor
            ? `/profile/place/${place.id}`
            : `/public/place/${place.id}`
        )
      }
    >
      <div className="sessions_card_photo_wrapper">
        <img
          src={`${rootAddress}${place.main_photo.photo}`}
          alt="card"
          className="sessions_card_photo"
        />
        <div className="sessions_card_photo_checkbox">
          {!disableCheck && (
            <Checkbox
              value={array.includes(place.id)}
              callback={() => {
                if (array.includes(place.id)) {
                  array.splice(array.indexOf(place.id), 1);
                  callback(array);
                  setKey(Math.random);
                  console.log(array);
                } else {
                  array.push(place.id);
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
      <div className="sessions_card_info">
        <p className="sessions_card_info_country">
          {limitString(place.string_place_location, 12) +
            " | ~" +
            place.diff_distance}
        </p>
        <div className="sessions_card_info_title_wrapper">
          <p className="sessions_card_info_title">
            {limitString(place.name_place, 15)}
          </p>
          {!disableEdit && (
            <img
              src={Edit}
              alt="edit"
              className="sessions_card_info_title_img"
            />
          )}
        </div>
        <div className="sessions_card_profile">
          <img
            src={`data:image/png;base64,${place.profile.avatar}`}
            alt="avatar"
            className="sessions_card_profile_avatar"
          />
          <p className="sessions_card_profile_name">
            {place.profile.name + " " + place.profile.surname}
          </p>
        </div>
        <div className="sessions_card_info_comm">
          <div className="sessions_card_info_comm_likes">
            <img
              src={LikeImage}
              alt="like"
              className="sessions_card_info_comm_likes_image"
            />
            <p className="sessions_card_info_comm_likes_p">{place.likes}</p>
          </div>
          <div className="sessions_card_info_comm_comments">
            <img
              src={CommentImage}
              alt="like"
              className="sessions_card_info_comm_comments_image"
            />
            <p className="sessions_card_info_comm_comments_p">
              {place.comments}
            </p>
          </div>
          <div className="sessions_card_info_comm_fave">
            <img
              src={FavoriteImage}
              alt="like"
              className="sessions_card_info_comm_fave_image"
            />
            <p className="sessions_card_info_comm_fave_p">{place.favorites}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;
