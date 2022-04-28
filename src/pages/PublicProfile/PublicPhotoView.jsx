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
import Geo from "../../img/photoView/map.svg";
import Aperture from "../../img/photoView/aperture.svg";
import FocalLength from "../../img/photoView/focalLength.svg";
import ISO from "../../img/photoView/iso.svg";
import Camera from "../../img/photoView/photo.svg";
import Timer from "../../img/photoView/timer.svg";
import { Comment, PhotoViewAlbum } from "../../components";
import { GreenButton, PhotoFullScreen } from "../../components";
import Requests, { rootAddress } from "../../http/axios-requests";
import { openSuccessAlert } from "../../redux/actions/userData";
import { useDispatch } from "react-redux";
import { PublicHeader } from "..";
import Fullscreen from "../../img/commonImages/fullscreen.svg";

const PublicPhotoView = ({ setProfileId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const params = useParams();
  const photoId = params.id;

  const [loaded, setLoaded] = React.useState();
  const [photo, setPhoto] = React.useState();
  const [photoWidth, setPhotoWidth] = React.useState();
  const [photoHeight, setPhotoHeight] = React.useState();
  const [comments, setComments] = React.useState();
  const [comment, setComment] = React.useState();
  const [commentingId, setCommentingId] = React.useState();
  const [quotingId, setQuotingId] = React.useState();
  const [fullScreenActive, setFullScreenActive] = React.useState(false);

  React.useEffect(() => {
    !loaded &&
      localStorage.getItem("key") &&
      Requests.getSinglePhoto(photoId)
        .then((res) => {
          setPhoto(res.data);
          getImageHeight(`${rootAddress}${res.data.gallery_image.photo}`);
          getImageWidth(`${rootAddress}${res.data.gallery_image.photo}`);
        })
        .then(() => {
          Requests.getPhotoComments(photoId).then((res) => {
            setComments(res.data);
            setLoaded(true);
          });
        });

    !loaded &&
      !localStorage.getItem("key") &&
      Requests.getSinglePhotoUnauth(photoId)
        .then((res) => {
          setPhoto(res.data);
          getImageHeight(`${rootAddress}${res.data.gallery_image.photo}`);
          getImageWidth(`${rootAddress}${res.data.gallery_image.photo}`);
        })
        .then(() => {
          Requests.getPhotoComments(photoId).then((res) => {
            setComments(res.data);
            setLoaded(true);
          });
        });
  }, [loaded, photoId]);

  React.useEffect(() => {
    photo && setProfileId(photo.profile.id);
  }, [photo]);

  const likeHandle = () => {
    if (photo.is_liked) {
      Requests.unlikePhoto(photoId).then(() => {
        Requests.getSinglePhoto(photoId).then((res) => {
          setLoaded(true);
          setPhoto(res.data);
        });
      });
    } else
      Requests.likePhoto(photoId).then(() => {
        Requests.getSinglePhoto(photoId).then((res) => {
          setLoaded(true);
          setPhoto(res.data);
        });
      });
  };

  const favoriteHandle = () => {
    if (photo.in_favorite) {
      Requests.deleteFavoritePhoto(photoId).then(() => {
        Requests.getSinglePhoto(photoId).then((res) => {
          setLoaded(true);
          setPhoto(res.data);
        });
      });
    } else
      Requests.addFavoritePhoto(photoId).then(() => {
        Requests.getSinglePhoto(photoId).then((res) => {
          setLoaded(true);
          setPhoto(res.data);
        });
      });
  };

  const handleComment = () => {
    Requests.createPhotoComment(photoId, comment).then(() => {
      dispatch(openSuccessAlert("Комментарий опубликован!"));
      Requests.getSinglePhoto(photoId)
        .then((res) => {
          setPhoto(res.data);
        })
        .then(() => {
          Requests.getPhotoComments(photoId).then((res) => {
            setComments(res.data);
            setLoaded(true);
          });
        });
    });
  };

  const getImageHeight = (image) => {
    var img = new Image();
    img.src = image;
    img.onload = function () {
      setPhotoHeight(img.height);
    };
  };

  const getImageWidth = (image) => {
    var img = new Image();
    img.src = image;
    img.onload = function () {
      setPhotoWidth(img.width);
    };
  };

  return (
    <div className="photo_view">
      <PublicHeader profile={photo && photo.profile} />
      <div className="photo_view_header">
        <img src={Back} alt="back" className="add_photo_header_arrow" />
        <p
          onClick={() => navigate(`/public/photos/${photo.profile.id}`)}
          className="photo_view_header_p"
        >
          Все фотографии автора
        </p>
      </div>
      <div className="photo_view_content">
        <div className="photo_view_content_left">
          {photo && (
            <div className="photo_view_content_left_image_wrapper">
              <img
                src={
                  photo && `${rootAddress}${photo && photo.gallery_image.photo}`
                }
                alt="main"
                className="photo_view_content_left_image"
              />
              <img
                src={Fullscreen}
                alt="fullscreen"
                className="photo_view_content_left_image_fullscreen"
                onClick={() => setFullScreenActive(true)}
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
                {photo && photo.views}
              </p>

              <img
                src={photo && photo.is_liked ? Like : LikeDisabled}
                alt="likes"
                className="photo_view_content_left_activities_img"
                onClick={likeHandle}
              />
              <p className="photo_view_content_left_activities_p">
                {photo && photo.likes}
              </p>

              <img
                src={CommentImg}
                alt="comments"
                className="photo_view_content_left_activities_img"
              />
              <p className="photo_view_content_left_activities_p">
                {photo && photo.comments}
              </p>

              <img
                src={photo && photo.in_favorite ? Fave : FaveDisabled}
                alt="favorites"
                className="photo_view_content_left_activities_img"
                onClick={favoriteHandle}
              />
              <p className="photo_view_content_left_activities_p">
                {photo && photo.favorites}
              </p>
            </div>
            <p className="photo_view_content_left_activities_date">
              {photo &&
                `${photo.was_added.split("").splice(8, 2).join("")} ${
                  photo.was_added.split("").splice(5, 2).join("") === "01"
                    ? "января"
                    : photo.was_added.split("").splice(5, 2).join("") === "02"
                    ? "февраля"
                    : photo.was_added.split("").splice(5, 2).join("") === "03"
                    ? "марта"
                    : photo.was_added.split("").splice(5, 2).join("") === "04"
                    ? "апреля"
                    : photo.was_added.split("").splice(5, 2).join("") === "05"
                    ? "мая"
                    : photo.was_added.split("").splice(5, 2).join("") === "06"
                    ? "июня"
                    : photo.was_added.split("").splice(5, 2).join("") === "07"
                    ? "июля"
                    : photo.was_added.split("").splice(5, 2).join("") === "08"
                    ? "авугста"
                    : photo.was_added.split("").splice(5, 2).join("") === "09"
                    ? "сентября"
                    : photo.was_added.split("").splice(5, 2).join("") === "10"
                    ? "октября"
                    : photo.was_added.split("").splice(5, 2).join("") === "11"
                    ? "ноября"
                    : photo.was_added.split("").splice(5, 2).join("") === "12"
                    ? "декабря"
                    : ""
                } ${photo.was_added.split("").splice(0, 4).join("")}`}
            </p>
          </div>
          <h1 className="photo_view_content_left_title">
            {photo && photo.name_image}
          </h1>
          <p className="photo_view_content_left_description">
            {photo && photo.description}
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
          <div className="photo_view_content_right_geo">
            <img
              src={Geo}
              alt="geolocation"
              className="photo_view_content_right_geo_img"
            />
            <p className="photo_view_content_right_geo_p">
              {photo && photo.string_place_location}
            </p>
          </div>
          <div className="photo_view_content_right_map">
            {photo && photo.place_location && (
              <YMaps>
                <Map
                  width={"255px"}
                  height={"110px"}
                  defaultState={{
                    center:
                      photo &&
                      photo.place_location
                        .split("(")[1]
                        .split(")")[0]
                        .split(" "),
                    zoom: 12,
                  }}
                >
                  <Placemark
                    geometry={
                      photo &&
                      photo.place_location
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
                {photo && photo.photo_camera}
              </p>
            </div>

            <div className="photo_view_content_right_spec_row">
              <div className="photo_view_content_right_spec">
                <img
                  src={Aperture}
                  alt="camera"
                  className="photo_view_content_right_spec_img"
                />
                <p className="photo_view_content_right_spec_p">
                  {photo && photo.aperture}
                </p>
              </div>
              <div className="photo_view_content_right_spec">
                <img
                  src={FocalLength}
                  alt="camera"
                  className="photo_view_content_right_spec_img"
                />
                <p className="photo_view_content_right_spec_p">
                  {photo && photo.focal_len}
                </p>
              </div>
            </div>

            <div className="photo_view_content_right_spec_row">
              <div className="photo_view_content_right_spec">
                <img
                  src={Timer}
                  alt="camera"
                  className="photo_view_content_right_spec_img"
                />
                <p className="photo_view_content_right_spec_p">
                  {photo && photo.excerpt}
                </p>
              </div>
              <div className="photo_view_content_right_spec">
                <img
                  src={ISO}
                  alt="camera"
                  className="photo_view_content_right_spec_img"
                />
                <p className="photo_view_content_right_spec_p">
                  {photo && photo.iso}
                </p>
              </div>
            </div>
          </div>
          <div className="photo_view_content_right_categories">
            <p className="photo_view_content_right_categories_title">
              Категории:
            </p>
            <p className="photo_view_content_right_categories_p">
              {photo &&
                photo.category.map((category) => category.name_spec).join(", ")}
            </p>
          </div>
          <div className="photo_view_content_right_albums">
            <p className="photo_view_content_right_albums_title">
              Фото в {photo && photo.album.length} альбоме (-ах):
            </p>
            {photo &&
              photo.album.map((album) => (
                <PhotoViewAlbum album={album} isPublic />
              ))}
          </div>
          <div className="photo_view_content_right_days">
            <p className="photo_view_content_right_days_title">Фото дня</p>
            <p className="photo_view_content_right_days_p">
              Становилось 3 раза
            </p>
          </div>
          <GreenButton
            width={"180px"}
            height={"38px"}
            disabled
            text={"Купить фото"}
            callback={() =>
              navigate(`/profile/edit-photo/${photo && photo.id}`)
            }
            margin={"20px 0 0 0"}
          />
        </div>
      </div>
      <PhotoFullScreen
        modalActive={fullScreenActive}
        setModalActive={setFullScreenActive}
        photo={`${rootAddress}${photo && photo.gallery_image.photo}`}
        width={photoWidth}
        height={photoHeight}
      />
    </div>
  );
};

export default PublicPhotoView;
