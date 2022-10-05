import React from "react";
import { useNavigate } from "react-router-dom";
import profileComment from "../../img/mainPage/profileComment.png";

const LastCommentComponent = ({ comment, subj }) => {
  const navigate = useNavigate();

  return (
    <div className="main_page_last_comments_section_content_comment_wrapper">
      <h3
        onClick={() =>
          navigate(
            `/public/photo/${
              comment && subj === "photo"
                ? comment && comment.gallery__id
                : subj === "place"
                ? comment && comment.place__id
                : subj === "session"
                ? comment && comment.photo_session__id
                : ""
            }`
          )
        }
        className="main_page_last_comments_section_content_comment_title"
        style={{ cursor: "pointer" }}
      >
        {comment && subj === "photo"
          ? comment && comment.gallery__name_image
          : subj === "place"
          ? comment && comment.place__name_place
          : subj === "session"
          ? comment && comment.photo_session__session_name
          : ""}
      </h3>
      <p
        onClick={() =>
          navigate(
            `/public/photo/${
              comment && subj === "photo"
                ? comment && comment.gallery__id
                : subj === "place"
                ? comment && comment.place__id
                : subj === "session"
                ? comment && comment.photo_session__id
                : ""
            }`
          )
        }
        style={{ cursor: "pointer" }}
        className="main_page_last_comments_section_content_comment_content"
      >
        {comment && comment.content}
      </p>
      <div className="main_page_last_comments_section_content_comment_lower_table">
        {false && (
          <img
            src={profileComment}
            alt=""
            className="main_page_last_comments_section_content_comment_lower_table_profile_image"
          />
        )}
        {comment && comment.sender_comment__user_channel_name && (
          <svg
            className="main_page_last_comments_section_content_comment_lower_table_profile_online"
            width="4"
            height="4"
            viewBox="0 0 4 4"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="2" cy="2" r="2" fill="#50A398" />
          </svg>
        )}
        <p
          onClick={() =>
            navigate(`/public/profile/${comment.sender_comment__id}`)
          }
          className="main_page_last_comments_section_content_comment_lower_table_profile_name"
          style={{ cursor: "pointer" }}
        >
          {comment && comment.sender_comment__name}{" "}
          {comment && comment.sender_comment__surname}
        </p>
        {false && (
          <svg
            className="main_page_last_comments_section_content_comment_lower_table_profile_pro"
            width="35"
            height="18"
            viewBox="0 0 35 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="35" height="18" rx="4" fill="#50A398" />
            <path
              d="M9.20206 5.29994H6.03406V12.9999H7.46406V10.7779H9.20206C11.2261 10.7779 12.4801 9.73294 12.4801 8.03894C12.4801 6.33394 11.2261 5.29994 9.20206 5.29994ZM9.13606 9.56794H7.46406V6.50994H9.13606C10.3901 6.50994 11.0391 7.07094 11.0391 8.03894C11.0391 9.00694 10.3901 9.56794 9.13606 9.56794Z"
              fill="white"
            />
            <path
              d="M20.4861 12.9999L18.7151 10.4699C19.7601 10.0629 20.3541 9.20494 20.3541 8.03894C20.3541 6.33394 19.1001 5.29994 17.0761 5.29994H13.9081V12.9999H15.3381V10.7559H17.0761C17.1751 10.7559 17.2741 10.7559 17.3731 10.7449L18.9461 12.9999H20.4861ZM18.9131 8.03894C18.9131 9.00694 18.2641 9.57894 17.0101 9.57894H15.3381V6.50994H17.0101C18.2641 6.50994 18.9131 7.07094 18.9131 8.03894Z"
              fill="white"
            />
            <path
              d="M25.551 13.1099C27.938 13.1099 29.698 11.4379 29.698 9.14994C29.698 6.86194 27.938 5.18994 25.551 5.18994C23.164 5.18994 21.404 6.87294 21.404 9.14994C21.404 11.4269 23.164 13.1099 25.551 13.1099ZM25.551 11.8559C24 11.8559 22.845 10.7229 22.845 9.14994C22.845 7.57694 24 6.44394 25.551 6.44394C27.102 6.44394 28.257 7.57694 28.257 9.14994C28.257 10.7229 27.102 11.8559 25.551 11.8559Z"
              fill="white"
            />
          </svg>
        )}
        <p className="main_page_last_comments_section_content_comment_lower_table_date">
          {comment &&
            comment.timestamp &&
            `${
              comment.timestamp.split("").splice(8, 2)[0] === "0"
                ? comment.timestamp.split("").splice(9, 1).join("")
                : comment.timestamp.split("").splice(8, 2).join("")
            } ${
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
            }, ${
              comment && comment.timestamp.split("").splice(11, 5).join("")
            }`}
        </p>
      </div>
    </div>
  );
};

export default LastCommentComponent;
