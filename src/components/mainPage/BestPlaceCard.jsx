import React from "react";
import { rootAddress } from "../../http/axios-requests";
import placeImage from "../../img/mainPage/place.png";
import { useNavigate } from "react-router-dom";

const BestPlaceCard = ({ place, width }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/public/place/${place.id}`)}
      className="main_page_third_section_content_slider_card_wrapper"
    >
      <img
        src={`${rootAddress}${place.main_photo.photo}`}
        alt=""
        className="main_page_third_section_content_slider_card_image"
        style={width ? { width: width } : {}}
      />
      <div className="main_page_third_section_content_slider_card_author_name_wrapper">
        <div className="main_page_third_section_content_slider_card_author_name_wrapper_row">
          <p className="main_page_third_section_content_slider_card_author_name">
            {place.name_place}
          </p>
        </div>
      </div>
      <div className="main_page_third_section_content_slider_card_rating_wrapper">
        <svg
          className="main_page_third_section_content_slider_card_rating_image"
          width="17"
          height="15"
          viewBox="0 0 17 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.97339 2.59642C6.21854 -1.65886 0.642822 0.659279 0.642822 5.29471C0.642822 8.77556 8.28682 14.2206 8.97339 14.9286C9.66468 14.2206 16.9285 8.77556 16.9285 5.29471C16.9285 0.694421 11.7334 -1.65886 8.97339 2.59642Z"
            fill="#D86369"
          />
        </svg>
        <p className="main_page_third_section_content_slider_card_rating_count_likes">
          {place.likes}
        </p>
      </div>
      <p className="main_page_third_section_content_slider_card_location">
        {place.string_place_location.split(", ")[1]}
      </p>
    </div>
  );
};

export default BestPlaceCard;
