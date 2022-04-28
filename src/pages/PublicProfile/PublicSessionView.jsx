import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import "../../styles/Profile/PhotoView.scss";
import Back from "../../img/addModules/arrow-back.svg";
import Like from "../../img/sessions/like.svg";
import CommentImg from "../../img/sessions/comment.svg";
import Fave from "../../img/sessions/favorite.svg";
import LikeDisabled from "../../img/sessions/likeDisabled.svg";
import CommentImgDisabled from "../../img/sessions/commentDisabled.svg";
import FaveDisabled from "../../img/sessions/favoriteDisabled.svg";
import View from "../../img/sessions/view.svg";
import Lock from "../../img/photoView/lock.svg";
import Money from "../../img/photoView/money.svg";
import Geo from "../../img/photoView/map.svg";
import Timer from "../../img/photoView/timer.svg";
import { Comment, PhotoViewAlbum } from "../../components";
import { GreenButton } from "../../components";
import Requests, { rootAddress } from "../../http/axios-requests";
import { openSuccessAlert } from "../../redux/actions/userData";
import { useDispatch } from "react-redux";
import ImageGallery from "react-image-gallery";
import { RequestWindow } from "../../components";

const PublicSessionView = ({ setProfileId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const params = useParams();
  const sessionId = params.id;

  const [loaded, setLoaded] = React.useState();
  const [session, setSession] = React.useState();
  const [comment, setComment] = React.useState();
  const [commentingId, setCommentingId] = React.useState();
  const [quotingId, setQuotingId] = React.useState();
  const [comments, setComments] = React.useState();

  const [photos, setPhotos] = React.useState();

  const [reqWindowAcive, setReqWindowActive] = React.useState(false);

  React.useEffect(() => {
    !loaded &&
      localStorage.getItem("key") &&
      Requests.getSingleSession(sessionId).then((res) => {
        setLoaded(true);
        setSession(res.data);
        setPhotos(
          res.data.photos.map((photo) => {
            return {
              original: `${rootAddress}${photo.photo}`,
              originalClass: "photo_view_content_left_image_slider",
            };
          })
        );
      });

    !loaded &&
      !localStorage.getItem("key") &&
      Requests.getSingleSessionUnauth(sessionId).then((res) => {
        setLoaded(true);
        setSession(res.data);
        setPhotos(
          res.data.photos.map((photo) => {
            return {
              original: `${rootAddress}${photo.photo}`,
              originalClass: "photo_view_content_left_image_slider",
            };
          })
        );
      });
  }, [loaded]);

  React.useEffect(() => {
    !loaded &&
      Requests.getSingleSession(sessionId)
        .then((res) => {
          setSession(res.data);
        })
        .then(() => {
          Requests.getSessionComments(sessionId).then((res) => {
            setComments(res.data);
            setLoaded(true);
          });
        });
  }, [loaded, sessionId]);

  React.useEffect(() => {
    session && setProfileId(session.profile.id);
  }, [session]);

  const likeHandle = () => {
    if (session.is_liked) {
      Requests.unlikeSession(sessionId).then(() => {
        Requests.getSingleSession(sessionId).then((res) => {
          setLoaded(true);
          setSession(res.data);
        });
      });
    } else
      Requests.likeSession(sessionId).then(() => {
        Requests.getSingleSession(sessionId).then((res) => {
          setLoaded(true);
          setSession(res.data);
        });
      });
  };

  const favoriteHandle = () => {
    if (session.in_favorite) {
      Requests.deleteFavoriteSession(sessionId).then(() => {
        Requests.getSingleSession(sessionId).then((res) => {
          setLoaded(true);
          setSession(res.data);
        });
      });
    } else
      Requests.addFavoriteSession(sessionId).then(() => {
        Requests.getSingleSession(sessionId).then((res) => {
          setLoaded(true);
          setSession(res.data);
        });
      });
  };

  const handleComment = () => {
    Requests.createPhotoComment(sessionId, comment).then(() => {
      dispatch(openSuccessAlert("Комментарий опубликован!"));
      Requests.getSinglePhoto(sessionId)
        .then((res) => {
          setSession(res.data);
        })
        .then(() => {
          Requests.getPhotoComments(sessionId).then((res) => {
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
          onClick={() => navigate(`/public/sessions/${session.profile.id}`)}
          className="photo_view_header_p"
        >
          Все фотосессии автора
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
                {session && session.views}
              </p>

              <img
                src={session && session.is_liked ? Like : LikeDisabled}
                alt="likes"
                className="photo_view_content_left_activities_img"
                onClick={likeHandle}
              />
              <p className="photo_view_content_left_activities_p">
                {session && session.likes}
              </p>

              <img
                src={CommentImg}
                alt="comments"
                className="photo_view_content_left_activities_img"
              />
              <p className="photo_view_content_left_activities_p">
                {session && session.comments}
              </p>

              <img
                src={session && session.in_favorite ? Fave : FaveDisabled}
                alt="favorites"
                className="photo_view_content_left_activities_img"
                onClick={favoriteHandle}
              />
              <p className="photo_view_content_left_activities_p">
                {session && session.favorites}
              </p>
            </div>
            <p className="photo_view_content_left_activities_date">
              {session &&
                `${session.session_date.split("").splice(8, 2).join("")} ${
                  session.session_date.split("").splice(5, 2).join("") === "01"
                    ? "января"
                    : session.session_date.split("").splice(5, 2).join("") ===
                      "02"
                    ? "февраля"
                    : session.session_date.split("").splice(5, 2).join("") ===
                      "03"
                    ? "марта"
                    : session.session_date.split("").splice(5, 2).join("") ===
                      "04"
                    ? "апреля"
                    : session.session_date.split("").splice(5, 2).join("") ===
                      "05"
                    ? "мая"
                    : session.session_date.split("").splice(5, 2).join("") ===
                      "06"
                    ? "июня"
                    : session.session_date.split("").splice(5, 2).join("") ===
                      "07"
                    ? "июля"
                    : session.session_date.split("").splice(5, 2).join("") ===
                      "08"
                    ? "авугста"
                    : session.session_date.split("").splice(5, 2).join("") ===
                      "09"
                    ? "сентября"
                    : session.session_date.split("").splice(5, 2).join("") ===
                      "10"
                    ? "октября"
                    : session.session_date.split("").splice(5, 2).join("") ===
                      "11"
                    ? "ноября"
                    : session.session_date.split("").splice(5, 2).join("") ===
                      "12"
                    ? "декабря"
                    : ""
                } ${session.session_date.split("").splice(0, 4).join("")}`}
            </p>
          </div>
          <h1 className="photo_view_content_left_title">
            {session && session.session_name}
          </h1>
          <p className="photo_view_content_left_description">
            {session && session.session_description}
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
              {session && session.string_session_location}
            </p>
          </div>
          <div className="photo_view_content_right_map">
            {session && session.session_location && (
              <YMaps>
                <Map
                  width={"255px"}
                  height={"110px"}
                  defaultState={{
                    center:
                      session &&
                      session.session_location
                        .split("(")[1]
                        .split(")")[0]
                        .split(" "),
                    zoom: 12,
                  }}
                >
                  <Placemark
                    geometry={
                      session &&
                      session.session_location
                        .split("(")[1]
                        .split(")")[0]
                        .split(" ")
                    }
                  />
                </Map>
              </YMaps>
            )}
          </div>
          <div className="photo_view_content_right_data">
            <p className="photo_view_content_right_data_p">
              Тип съемки:{" "}
              <span className="photo_view_content_right_data_span">
                Свадебная
              </span>
            </p>
            <p className="photo_view_content_right_data_p">
              Дата проведения:{" "}
              <span className="photo_view_content_right_data_span">
                {session &&
                  `${session.session_date.split("").splice(8, 2).join("")} ${
                    session.session_date.split("").splice(5, 2).join("") ===
                    "01"
                      ? "января"
                      : session.session_date.split("").splice(5, 2).join("") ===
                        "02"
                      ? "февраля"
                      : session.session_date.split("").splice(5, 2).join("") ===
                        "03"
                      ? "марта"
                      : session.session_date.split("").splice(5, 2).join("") ===
                        "04"
                      ? "апреля"
                      : session.session_date.split("").splice(5, 2).join("") ===
                        "05"
                      ? "мая"
                      : session.session_date.split("").splice(5, 2).join("") ===
                        "06"
                      ? "июня"
                      : session.session_date.split("").splice(5, 2).join("") ===
                        "07"
                      ? "июля"
                      : session.session_date.split("").splice(5, 2).join("") ===
                        "08"
                      ? "авугста"
                      : session.session_date.split("").splice(5, 2).join("") ===
                        "09"
                      ? "сентября"
                      : session.session_date.split("").splice(5, 2).join("") ===
                        "10"
                      ? "октября"
                      : session.session_date.split("").splice(5, 2).join("") ===
                        "11"
                      ? "ноября"
                      : session.session_date.split("").splice(5, 2).join("") ===
                        "12"
                      ? "декабря"
                      : ""
                  } ${session.session_date.split("").splice(0, 4).join("")}`}
              </span>
            </p>
          </div>
          <GreenButton
            width={"180px"}
            height={"38px"}
            text={"Запрос на съемку"}
            margin={"20px 0 0 0"}
            callback={() => setReqWindowActive(true)}
          />
        </div>
      </div>
      <RequestWindow
        user={session && session.profile}
        active={reqWindowAcive}
        setActive={setReqWindowActive}
      />
    </div>
  );
};

export default PublicSessionView;
