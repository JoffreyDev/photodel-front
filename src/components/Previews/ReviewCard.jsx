import React from "react";
import "../../styles/Profile/Reviews.scss";
import Avatar from "../../img/profile/avatar.png";
import Online from "../../img/commonImages/online.svg";
import { useNavigate } from "react-router-dom";
import Pro from "../../img/profile/pro.svg";
import Rate from "../../img/commonImages/rate.svg";
import Photo from "../../img/reviews/photo.png";
import Add from "../../img/reviews/add.svg";
import Rating from "@mui/material/Rating";
import { rootAddress } from "../../http/axios-requests";
import { PhotoFullScreen } from "../../components";

function ReviewCard({ review }) {
  const [fullScreenActive, setFullScreenActive] = React.useState(false);

  const [photos, setPhotos] = React.useState();
  const [slideNumber, setSlideNumber] = React.useState(0);

  React.useEffect(() => {
    review.images?.length > 0 &&
      setPhotos(review.images.map((photo) => `${rootAddress}${photo.photo}`));
  }, []);

  const changePhoto = (dir) => {
    if (dir === "next") {
      if (slideNumber === photos.length - 1) setSlideNumber(0);
      else setSlideNumber(slideNumber + 1);
    }

    if (dir === "prev") {
      if (slideNumber === 0) setSlideNumber(photos.length - 1);
      else setSlideNumber(slideNumber - 1);
    }
  };

  const navigate = useNavigate();
  return (
    <div className="reviews_card">
      {review.status === false && (
        <div
          className="reviews_card_info"
          style={{
            backgroundColor:
              review.status === false && review.content.includes("/**")
                ? "#fc4903"
                : review.status === false
                ? "#fcce03"
                : "",
          }}
        >
          <span>
            {review.status === false && review.content.includes("/**")
              ? `Отзыв отклонен: ${review.content.split("/**")[1]}`
              : review.status === false
              ? "Отзыв на рассмотрении"
              : ""}
          </span>
        </div>
      )}
      <div className="reviews_card_head">
        <div className="reviews_card_head_left">
          <img
            src={`data:image/png;base64,${
              review && review.sender_profile.avatar
            }`}
            alt="avatar"
            className="reviews_card_head_left_avatar"
            onClick={() =>
              navigate(`/public/profile/${review.sender_profile.id}`)
            }
          />
          <img
            src={Online}
            alt="online"
            className="reviews_card_head_left_online"
          />
          <p
            onClick={() =>
              navigate(`/public/profile/${review.sender_profile.id}`)
            }
            className="reviews_card_head_left_name"
          >
            {review.sender_profile.name + " " + review.sender_profile.surname}
          </p>
          <img src={Pro} alt="pro" className="reviews_card_head_left_pro" />
          <p className="reviews_card_head_left_time">
            {" "}
            {review &&
              review.date &&
              `${
                review.date.split("").splice(8, 2)[0] === "0"
                  ? review.date.split("").splice(9, 1).join("")
                  : review.date.split("").splice(8, 2).join("")
              } ${
                review.date.split("").splice(5, 2).join("") === "01"
                  ? "января"
                  : review.date.split("").splice(5, 2).join("") === "02"
                  ? "февраля"
                  : review.date.split("").splice(5, 2).join("") === "03"
                  ? "марта"
                  : review.date.split("").splice(5, 2).join("") === "04"
                  ? "апреля"
                  : review.date.split("").splice(5, 2).join("") === "05"
                  ? "мая"
                  : review.date.split("").splice(5, 2).join("") === "06"
                  ? "июня"
                  : review.date.split("").splice(5, 2).join("") === "07"
                  ? "июля"
                  : review.date.split("").splice(5, 2).join("") === "08"
                  ? "августа"
                  : review.date.split("").splice(5, 2).join("") === "09"
                  ? "сентября"
                  : review.date.split("").splice(5, 2).join("") === "10"
                  ? "октября"
                  : review.date.split("").splice(5, 2).join("") === "11"
                  ? "ноября"
                  : review.date.split("").splice(5, 2).join("") === "12"
                  ? "декабря"
                  : ""
              }, ${review && review.date.split("").splice(11, 5).join("")}`}
          </p>
        </div>
        <div className="reviews_card_head_right">
          <div className="reviews_card_head_right_stars">
            <Rating name="read-only" value={review.mark} readOnly />
          </div>
        </div>
      </div>
      <div className="reviews_card_main">
        <p className="reviews_card_main_review">
          {review.content.split("/**")[0]}
        </p>
        <div className="reviews_card_main_photos">
          {review.images?.length > 0 &&
            review.images.map((image, idx) => (
              <img
                onClick={() => {
                  setFullScreenActive(true);
                  setSlideNumber(idx);
                }}
                className="reviews_card_main_photos_photo"
                src={`${rootAddress}${image.photo}`}
                alt="photo"
              />
            ))}
        </div>
      </div>
      {false && (
        <div className="reviews_card_addMore">
          <img src={Add} alt="add" className="reviews_card_addMore_plus" />
          <p className="reviews_card_addMore_p">Показать еще фото</p>
        </div>
      )}
      <PhotoFullScreen
        photo={photos && photos[slideNumber]}
        changePhoto={changePhoto}
        modalActive={fullScreenActive}
        setModalActive={setFullScreenActive}
        slider={photos && photos.length > 1}
      />
    </div>
  );
}

export default ReviewCard;
