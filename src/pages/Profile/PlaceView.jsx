import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import "../../styles/Profile/PhotoView.scss";
import Back from "../../img/addModules/arrow-back.svg";
import Like from "../../img/sessions/like.svg";
import CommentImg from "../../img/sessions/comment.svg";
import Fave from "../../img/sessions/favorite.svg";
import LikeDisabled from "../../img/sessions/likeDisabled.svg";
import FaveDisabled from "../../img/sessions/favoriteDisabled.svg";
import View from "../../img/sessions/view.svg";
import Lock from "../../img/photoView/lock.svg";
import Geo from "../../img/photoView/map.svg";
import Timer from "../../img/photoView/timer.svg";
import { Comment } from "../../components";
import { GreenButton } from "../../components";
import Requests, { rootAddress } from "../../http/axios-requests";
import { openSuccessAlert } from "../../redux/actions/userData";
import { useDispatch } from "react-redux";
import ImageGallery from "react-image-gallery";
import Camera from "../../img/placeView/photo.svg";
import Money from "../../img/placeView/money.svg";
import Work from "../../img/placeView/work.svg";

const PlaceView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const params = useParams();
  const placeId = params.id;

  const [loaded, setLoaded] = React.useState();
  const [place, setPlace] = React.useState();
  const [comment, setComment] = React.useState();
  const [commentingId, setCommentingId] = React.useState();
  const [quotingId, setQuotingId] = React.useState();
  const [comments, setComments] = React.useState();

  const [photos, setPhotos] = React.useState();

  React.useEffect(() => {
    !loaded &&
      Requests.getSinglePlace(placeId)
        .then((res) => {
          setLoaded(true);
          setPlace(res.data);
          setPhotos(
            res.data.place_image.map((photo) => {
              return {
                original: `${rootAddress}${photo.photo}`,
                originalClass: "photo_view_content_left_image_slider",
              };
            })
          );
        })
        .then(() => {
          Requests.getPlaceComments(placeId).then((res) => {
            setComments(res.data);
            setLoaded(true);
          });
        });
  }, [loaded, placeId]);

  const likeHandle = () => {
    if (place.is_liked) {
      Requests.unlikePlace(placeId).then(() => {
        Requests.getSinglePlace(placeId).then((res) => {
          setLoaded(true);
          setPlace(res.data);
        });
      });
    } else
      Requests.likePlace(placeId).then(() => {
        Requests.getSinglePlace(placeId).then((res) => {
          setLoaded(true);
          setPlace(res.data);
        });
      });
  };

  const favoriteHandle = () => {
    if (place.in_favorite) {
      Requests.deleteFavoritePlace(placeId).then(() => {
        Requests.getSinglePlace(placeId).then((res) => {
          setLoaded(true);
          setPlace(res.data);
        });
      });
    } else
      Requests.addPlaceToFavorites(placeId).then(() => {
        Requests.getSinglePlace(placeId).then((res) => {
          setLoaded(true);
          setPlace(res.data);
        });
      });
  };

  const handleComment = () => {
    Requests.createPlaceComment(placeId, comment).then(() => {
      dispatch(openSuccessAlert("Комментарий опубликован!"));
      Requests.getSinglePlace(placeId)
        .then((res) => {
          setPlace(res.data);
        })
        .then(() => {
          Requests.getPlaceComments(placeId).then((res) => {
            setComments(res.data);
            setLoaded(true);
          });
        });
    });
  };

  return (
    <div className="photo_view">
      <div className="photo_view_header">
        <img src={Back} alt="back" className="add_photo_header_arrow" />
        <p
          onClick={() => navigate("/profile/places")}
          className="photo_view_header_p"
        >
          Все места для съемок
        </p>
      </div>
      <div className="photo_view_content">
        <div className="photo_view_content_left">
          {photos && (
            <div style={{ borderRadius: "8px" }}>
              <ImageGallery
                items={photos}
                showThumbnails
                showPlayButton={false}
              />
            </div>
          )}
          <div className="photo_view_content_left_activities">
            <div className="photo_view_content_left_activities_left">
              <img
                src={View}
                alt="views"
                className="photo_view_content_left_activities_img"
              />
              <p className="photo_view_content_left_activities_p">
                {place && place.views}
              </p>

              <img
                src={place && place.is_liked ? Like : LikeDisabled}
                alt="likes"
                className="photo_view_content_left_activities_img"
                onClick={likeHandle}
              />
              <p className="photo_view_content_left_activities_p">
                {place && place.likes}
              </p>

              <img
                src={CommentImg}
                alt="comments"
                className="photo_view_content_left_activities_img"
              />
              <p className="photo_view_content_left_activities_p">
                {place && place.comments}
              </p>

              <img
                src={place && place.in_favorite ? Fave : FaveDisabled}
                alt="favorites"
                className="photo_view_content_left_activities_img"
                onClick={favoriteHandle}
              />
              <p className="photo_view_content_left_activities_p">
                {place && place.favorites}
              </p>
            </div>
            <p className="photo_view_content_left_activities_date">
              {place &&
                `${place.was_added.split("").splice(8, 2).join("")} ${
                  place.was_added.split("").splice(5, 2).join("") === "01"
                    ? "января"
                    : place.was_added.split("").splice(5, 2).join("") === "02"
                    ? "февраля"
                    : place.was_added.split("").splice(5, 2).join("") === "03"
                    ? "марта"
                    : place.was_added.split("").splice(5, 2).join("") === "04"
                    ? "апреля"
                    : place.was_added.split("").splice(5, 2).join("") === "05"
                    ? "мая"
                    : place.was_added.split("").splice(5, 2).join("") === "06"
                    ? "июня"
                    : place.was_added.split("").splice(5, 2).join("") === "07"
                    ? "июля"
                    : place.was_added.split("").splice(5, 2).join("") === "08"
                    ? "авугста"
                    : place.was_added.split("").splice(5, 2).join("") === "09"
                    ? "сентября"
                    : place.was_added.split("").splice(5, 2).join("") === "10"
                    ? "октября"
                    : place.was_added.split("").splice(5, 2).join("") === "11"
                    ? "ноября"
                    : place.was_added.split("").splice(5, 2).join("") === "12"
                    ? "декабря"
                    : ""
                } ${place.was_added.split("").splice(0, 4).join("")}`}
            </p>
          </div>
          <h1 className="photo_view_content_left_title">
            {place && place.name_place}
          </h1>
          <p className="photo_view_content_left_description">
            {place && place.description}
          </p>
          <div className="photo_view_content_left_textarea">
            <textarea
              placeholder={"Ваш комментарий"}
              className="photo_view_content_left_textarea_field"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <div className="photo_view_content_left_textarea_button">
              <GreenButton
                text={"Комментировать"}
                width={"210px"}
                height={"38px"}
                callback={handleComment}
              />
            </div>
          </div>
          <div className="photo_view_content_left_comment">
            {comments &&
              comments.map((comment, idx) => (
                <Comment comment={comment} key={idx} />
              ))}
          </div>
        </div>
        <div className="photo_view_content_right">
          <div
            style={{ height: "100px" }}
            className="photo_view_content_right_table"
          >
            <div className="photo_view_content_right_table_row">
              <img
                src={Lock}
                alt="published"
                className="photo_view_content_right_table_row_img"
              />
              <p className="photo_view_content_right_table_row_p">
                Опубликовано
              </p>
            </div>

            <GreenButton
              width={"180px"}
              height={"38px"}
              text={"Редактировать"}
              callback={() =>
                navigate(`/profile/edit-session/${place && place.id}`)
              }
            />
          </div>
          <div className="photo_view_content_right_geo">
            <img
              src={Geo}
              alt="geolocation"
              className="photo_view_content_right_geo_img"
            />
            <p className="photo_view_content_right_geo_p">
              {place && place.string_place_location}
            </p>
          </div>
          <div className="photo_view_content_right_map">
            {place && place.place_location && (
              <YMaps>
                <Map
                  width={"255px"}
                  height={"110px"}
                  defaultState={{
                    center:
                      place &&
                      place.place_location
                        .split("(")[1]
                        .split(")")[0]
                        .split(" "),
                    zoom: 12,
                  }}
                >
                  <Placemark
                    geometry={
                      place &&
                      place.place_location
                        .split("(")[1]
                        .split(")")[0]
                        .split(" ")
                    }
                  />
                </Map>
              </YMaps>
            )}
          </div>
          <div className="photo_view_content_right_specs">
            <div className="photo_view_content_right_spec">
              <img
                src={Camera}
                alt="camera"
                className="photo_view_content_right_spec_img"
              />
              <p className="photo_view_content_right_spec_p">
                {place && place.photo_camera}
              </p>
            </div>

            <div className="photo_view_content_right_spec_row">
              <div className="photo_view_content_right_spec">
                <img
                  src={Money}
                  alt="cost"
                  className="photo_view_content_right_spec_img"
                />
                <p className="photo_view_content_right_spec_p">
                  {place && place.cost}
                </p>
              </div>
            </div>

            <div className="photo_view_content_right_spec_row">
              <div className="photo_view_content_right_spec">
                <img
                  src={Work}
                  alt="payment"
                  className="photo_view_content_right_spec_img"
                />
                <p className="photo_view_content_right_spec_p">
                  {place && place.payment}
                </p>
              </div>
            </div>
          </div>

          <div className="photo_view_content_right_categories">
            <p className="photo_view_content_right_categories_title">
              Категории:
            </p>
            <p className="photo_view_content_right_categories_p">
              {place &&
                place.category
                  .map((category) => category.name_category)
                  .join(", ")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceView;
