import React from "react";
import LikeImage from "../../img/sessions/like.svg";
import CommentImage from "../../img/sessions/comment.svg";
import FavoriteImage from "../../img/sessions/fave.svg";
import Edit from "../../img/sessions/edit.svg";
import { Checkbox } from "..";
import { rootAddress } from "../../http/axios-requests";
import { useNavigate } from "react-router-dom";

const SessionCard = ({
  session,
  disableRedirect,
  callback,
  array,
  disableEdit,
  disableCheck,
  notAuthor,
}) => {
  const navigate = useNavigate();
  const [key, setKey] = React.useState(Math.random);

  return (
    <div className="sessions_card">
      <div className="sessions_card_photo_wrapper">
        <img
          src={`${rootAddress}${session.main_photo.photo}`}
          alt="card"
          className="sessions_card_photo"
          onClick={() =>
            !disableRedirect &&
            navigate(
              !notAuthor
                ? `/profile/session/${session.id}`
                : `/public/session/${session.id}`
            )
          }
        />
        {!disableCheck && (
          <div className="sessions_card_photo_checkbox">
            <Checkbox
              value={array.includes(session.id)}
              callback={() => {
                if (array.includes(session.id)) {
                  array.splice(array.indexOf(session.id), 1);
                  callback(array);
                  setKey(Math.random);
                  console.log(array);
                } else {
                  array.push(session.id);
                  callback(array);
                  setKey(Math.random);
                  console.log(array);
                }
              }}
              key={key}
            />
          </div>
        )}
      </div>
      <div className="sessions_card_info">
        <p className="sessions_card_info_country">
          {session.string_session_location.split(",")[0]}
        </p>
        <div className="sessions_card_info_title_wrapper">
          <p className="sessions_card_info_title">{session.session_name}</p>
          {!disableEdit && (
            <img
              src={Edit}
              alt="edit"
              className="sessions_card_info_title_img"
            />
          )}
        </div>
        <div className="sessions_card_info_comm">
          <div className="sessions_card_info_comm_likes">
            <img
              src={LikeImage}
              alt="like"
              className="sessions_card_info_comm_likes_image"
            />
            <p className="sessions_card_info_comm_likes_p">{session.likes}</p>
          </div>
          <div className="sessions_card_info_comm_comments">
            <img
              src={CommentImage}
              alt="like"
              className="sessions_card_info_comm_comments_image"
            />
            <p className="sessions_card_info_comm_comments_p">
              {session.comments}
            </p>
          </div>
          <div className="sessions_card_info_comm_fave">
            <img
              src={FavoriteImage}
              alt="like"
              className="sessions_card_info_comm_fave_image"
            />
            <p className="sessions_card_info_comm_fave_p">
              {session.favorites}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionCard;
