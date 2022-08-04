import React from "react";
import profileImage from "../../img/mainPage/profile.png";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@mui/material";

const PopularProCard = ({ profile }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/public/profile/${profile.id}`)}
      className="main_page_second_section_content_slider_card_wrapper"
    >
      {profile && (
        <img
          src={`data:image/png;base64,${profile.avatar}`}
          alt="avatar"
          className="main_page_second_section_content_slider_card_image"
        />
      )}
      {!profile && (
        <Skeleton
          variant="rectangular"
          sx={{ borderRadius: 3 }}
          width={100}
          height={100}
        />
      )}
      <div className="main_page_second_section_content_slider_card_author_name_wrapper">
        <div className="main_page_second_section_content_slider_card_author_name_wrapper_row">
          {profile && profile.user_channel_name && (
            <svg
              className="main_page_second_section_content_slider_card_author_name_wrapper_row_circle"
              width="4"
              height="4"
              viewBox="0 0 4 4"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="2" cy="2" r="2" fill="#50A398" />
            </svg>
          )}{" "}
          {profile && (
            <p className="main_page_second_section_content_slider_card_author_name">
              {profile.surname}
            </p>
          )}
          {!profile && <Skeleton variant="text" width={55} />}
        </div>

        {profile && (
          <p className="main_page_second_section_content_slider_card_author_name">
            {profile.name}
          </p>
        )}
        {!profile && <Skeleton variant="text" width={55} />}
      </div>
      {profile && (
        <div className="main_page_second_section_content_slider_card_rating_wrapper">
          <svg
            className="main_page_second_section_content_slider_card_rating_image"
            width="16"
            height="15"
            viewBox="0 0 16 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.9627 5.20683L10.4996 4.5582L8.50448 0.513474C8.44999 0.402732 8.36034 0.313083 8.2496 0.258591C7.97186 0.121482 7.63436 0.23574 7.49549 0.513474L5.50038 4.5582L1.03729 5.20683C0.914245 5.22441 0.801745 5.28242 0.715612 5.37031C0.611482 5.47734 0.554102 5.62133 0.55608 5.77064C0.558057 5.91995 0.619231 6.06237 0.726159 6.1666L3.95526 9.31484L3.19237 13.7603C3.17448 13.8638 3.18592 13.9701 3.2254 14.0674C3.26488 14.1646 3.33082 14.2488 3.41573 14.3105C3.50065 14.3722 3.60114 14.4088 3.70583 14.4163C3.81051 14.4237 3.91519 14.4017 4.00799 14.3527L7.99999 12.2539L11.992 14.3527C12.101 14.4107 12.2275 14.4301 12.3488 14.409C12.6547 14.3562 12.8603 14.0662 12.8076 13.7603L12.0447 9.31484L15.2738 6.1666C15.3617 6.08047 15.4197 5.96797 15.4373 5.84492C15.4848 5.5373 15.2703 5.25254 14.9627 5.20683Z"
              fill="#F2CF74"
            />
          </svg>
          <p className="main_page_second_section_content_slider_card_rating_mark">
            {profile.rating}
          </p>
        </div>
      )}
      {profile && (
        <p className="main_page_second_section_content_slider_card_profession">
          Фотограф
        </p>
      )}
      {!profile && <Skeleton variant="text" width={70} />}
      <p className="main_page_second_section_content_slider_card_location">
        {profile &&
          profile.string_location &&
          profile.string_location.split(", ")[1]}
      </p>
      {!profile && <Skeleton variant="text" width={80} />}
    </div>
  );
};

export default PopularProCard;
