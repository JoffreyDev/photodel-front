import React from "react";
import photo from "../../img/mainPage/photo.png";

const PopularPhotoCard = () => {
  return (
    <div className="main_page_popular_photos_section_content_slider_card_wrapper">
      <img
        src={photo}
        alt=""
        className="main_page_popular_photos_section_content_slider_card_image"
      />
    </div>
  );
};

export default PopularPhotoCard;
