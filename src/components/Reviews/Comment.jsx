import React from "react";
import Avatar from "../../img/photoView/avatar.png";
import Online from "../../img/photoView/online.svg";
import Pro from "../../img/photoView/pro.svg";
import "../../styles/Modules/Reviews.scss";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Trash } from "../../img/commonImages/trash.svg";
import Edit from "../../img/sessions/edit.svg";
import { useSelector } from "react-redux";

const Comment = ({ comment, onEditClick, onDeleteClick }) => {
  const navigate = useNavigate();
  const { userData } = useSelector(({ userData }) => userData);

  return (
    <div className="reviews_comment">
      <div className="reviews_comment_upper">
        <div className="reviews_comment_upper_left">
          <img
            src={`data:image/png;base64,${comment.sender_comment.avatar}`}
            alt="avatar"
            className="reviews_comment_upper_avatar"
            onClick={() =>
              navigate(`/public/profile/${comment.sender_comment.id}`)
            }
            style={{ cursor: "pointer" }}
          />
          {comment.sender_comment.user_channel_name && (
            <img
              src={Online}
              alt="online"
              className="reviews_comment_upper_online"
            />
          )}
          <p
            onClick={() =>
              navigate(`/public/profile/${comment.sender_comment.id}`)
            }
            style={{ cursor: "pointer" }}
            className="reviews_comment_upper_name"
          >{`${comment.sender_comment.name} ${comment.sender_comment.surname}`}</p>
          {comment.sender_comment.pro_account > 0 && (
            <img src={Pro} alt="pro" className="reviews_comment_upper_pro" />
          )}
          <p className="reviews_comment_upper_date">
            {" "}
            {comment &&
              `${comment.timestamp.split("").splice(8, 2).join("")} ${
                comment.timestamp.split("").splice(5, 2).join("") === "01"
                  ? "января"
                  : comment.timestamp.split("").splice(5, 2).join("") === "02"
                  ? "февраля"
                  : comment.timestamp.split("").splice(5, 2).join("") === "03"
                  ? "марта"
                  : comment.timestamp.split("").splice(5, 2).join("") === "04"
                  ? "апреля"
                  : comment.timestamp.split("").splice(5, 2).join("") === "05"
                  ? "мая"
                  : comment.timestamp.split("").splice(5, 2).join("") === "06"
                  ? "июня"
                  : comment.timestamp.split("").splice(5, 2).join("") === "07"
                  ? "июля"
                  : comment.timestamp.split("").splice(5, 2).join("") === "08"
                  ? "августа"
                  : comment.timestamp.split("").splice(5, 2).join("") === "09"
                  ? "сентября"
                  : comment.timestamp.split("").splice(5, 2).join("") === "10"
                  ? "октября"
                  : comment.timestamp.split("").splice(5, 2).join("") === "11"
                  ? "ноября"
                  : comment.timestamp.split("").splice(5, 2).join("") === "12"
                  ? "декабря"
                  : ""
              } ${comment.timestamp.split("").splice(0, 4).join("")}`}
          </p>
        </div>
        {comment.sender_comment.id === userData.id && (
          <div className="reviews_comment_upper_right">
            <img
              src={Edit}
              alt="edit"
              className="reviews_comment_upper_right_edit"
              onClick={() => onEditClick(comment.content, comment.id)}
            />
            <Trash
              className="reviews_comment_upper_right_delete"
              onClick={() => onDeleteClick(comment.id)}
            />
          </div>
        )}
      </div>
      <div className="reviews_comment_lower">
        <p className="reviews_comment_lower_article">{comment.content}</p>
      </div>
    </div>
  );
};

export default Comment;
