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
import { Comment, PhotoViewAlbum, PhotoFullScreen, Submit } from "../../components";
import { GreenButton } from "../../components";
import Requests, { rootAddress } from "../../http/axios-requests";
import { openSuccessAlert } from "../../redux/actions/userData";
import { useDispatch } from "react-redux";
import { RequestWindow } from "../../components";
import LeftArrow from "../../img/commonImages/photo_left_arrow.svg";
import RightArrow from "../../img/commonImages/photo_right_arrow.svg";
import { PublicHeader } from "..";
import Skeleton from "@mui/material/Skeleton";
import { openErrorAlert } from "../../redux/actions/userData";

const PublicSessionView = ({ setProfileId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const params = useParams();
  const sessionId = params.id;

  const [loaded, setLoaded] = React.useState();
  const [reload, toggleReload] = React.useState(false);
  const [session, setSession] = React.useState();
  const [comment, setComment] = React.useState("");
  const [commentingId, setCommentingId] = React.useState();
  const [deletingId, setDeletingId] = React.useState();
  const [deleteModalOpen, setDeleteModalOpen] = React.useState();
  const [comments, setComments] = React.useState();

  const [photos, setPhotos] = React.useState();
  const [slideNumber, setSlideNumber] = React.useState(0);

  const [reqWindowAcive, setReqWindowActive] = React.useState(false);
  const [fullScreenActive, setFullScreenActive] = React.useState(false);

  const [dataLoading, setDataLoading] = React.useState(true);

  const onEditClick = (value, id) => {
    setComment(value);
    setCommentingId(id);
  };

  const editComment = () => {
    Requests.editPhotoSessionComment(commentingId, comment)
      .then(() => {
        dispatch(openSuccessAlert("Комментарий успешно отредактирован!"));
        setComment("");
        setCommentingId(null);
        toggleReload(!reload);
      })
      .catch((err) => dispatch(openErrorAlert(err.response.data)));
  };

  const deleteComment = () => {
    Requests.deletePhotoSessionComment(deletingId)
      .then(() => {
        dispatch(openSuccessAlert("Комментарий успешно удален!"));
        toggleReload(!reload);
        setDeleteModalOpen(false);
      })
      .catch((err) => dispatch(openErrorAlert(err.response.data)));
  };

  const onDeleteClick = (id) => {
    setDeletingId(id);
    setCommentingId('')
    setComment("");
    setDeleteModalOpen(true);
  };

  React.useEffect(() => {
    localStorage.getItem("access") &&
      Requests.getSingleSession(sessionId).then((res) => {
        setLoaded(true);
        setSession(res.data);
        setPhotos(
          res.data.photos.map((photo) => `${rootAddress}${photo.photo}`)
        );
        Requests.getSessionComments(sessionId).then((res) => {
          setComments(res.data);
          setDataLoading(false);
        });
      });

    !localStorage.getItem("access") &&
      Requests.getSingleSessionUnauth(sessionId).then((res) => {
        setLoaded(true);
        setSession(res.data);
        setPhotos(
          res.data.photos.map((photo) => `${rootAddress}${photo.photo}`)
        );
        Requests.getSessionComments(sessionId).then((res) => {
          setComments(res.data);
          setDataLoading(false);
        });
      });
  }, [loaded, reload]);

  React.useEffect(() => {
    session && setProfileId(session.profile.id);
  }, [session]);

  const likeHandle = () => {
    if (!localStorage.getItem("access")) {
      dispatch(openErrorAlert("Доступно только авторизованным пользователям!"));
      return;
    }
    if (session.is_liked) {
      Requests.unlikeSession(sessionId).then(() => {
        toggleReload(!reload);
      });
    } else
      Requests.likeSession(sessionId).then(() => {
        toggleReload(!reload);
      });
  };

  const favoriteHandle = () => {
    if (!localStorage.getItem("access")) {
      dispatch(openErrorAlert("Доступно только авторизованным пользователям!"));
      return;
    }
    if (session.in_favorite) {
      Requests.deleteFavoriteSession(sessionId).then(() => {
        toggleReload(!reload);
      });
    } else
      Requests.addFavoriteSession(sessionId).then(() => {
        toggleReload(!reload);
      });
  };

  const handleComment = () => {
    Requests.createSessionComment(sessionId, comment).then(() => {
      dispatch(openSuccessAlert("Комментарий опубликован!"));
      toggleReload(!reload);
      setComment("");
    });
  };

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

  return (
    <div className="photo_view">
      <PublicHeader profile={session && session.profile} />
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
          {photos && !dataLoading && (
            <div className="photo_view_content_left_image_wrapper">
              {photos.length > 1 && (
                <img
                  src={LeftArrow}
                  alt="prev"
                  className="photo_view_content_left_image_arrow left"
                  onClick={() => changePhoto("prev")}
                />
              )}
              <img
                src={photos && photos[slideNumber]}
                alt="image"
                className="photo_view_content_left_image"
                onClick={() => setFullScreenActive(true)}
              />
              {photos.length > 1 && (
                <img
                  src={RightArrow}
                  alt="next"
                  className="photo_view_content_left_image_arrow right"
                  onClick={() => changePhoto("next")}
                />
              )}
            </div>
          )}
          {dataLoading && (
            <div className="photo_view_content_left_image_wrapper">
              <Skeleton
                sx={{ borderRadius: 3 }}
                variant="rectangular"
                height={300}
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
                    ? "августа"
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
          {!dataLoading && (
            <h1 className="photo_view_content_left_title">
              {session && session.session_name}
            </h1>
          )}
          {dataLoading && (
            <Skeleton sx={{ borderRadius: 3 }} variant="text" width={50} />
          )}
          {!dataLoading && (
            <p className="photo_view_content_left_description">
              {session && session.session_description}
            </p>
          )}
          {dataLoading && (
            <Skeleton sx={{ borderRadius: 3 }} variant="text" width={100} />
          )}
          <div className="photo_view_content_right_geo mobile">
            <img
              src={Geo}
              alt="geolocation"
              className="photo_view_content_right_geo_img"
            />
            <p className="photo_view_content_right_geo_p">
              {session && session.string_session_location}
            </p>
          </div>
          <div className="photo_view_content_right_map mobile">
            {session && session.session_location && !dataLoading && (
              <YMaps>
                <Map
                  width={"100%"}
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
            {dataLoading && (
              <Skeleton
                sx={{ borderRadius: 3 }}
                variant="rectangular"
                height={100}
              />
            )}
          </div>
          <div className="photo_view_content_right_data mobile">
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
                      ? "августа"
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
          {window.screen.width <= 576 && (
            <GreenButton
              width={"180px"}
              height={"38px"}
              text={"Запрос на съемку"}
              margin={"20px 0 20px 0"}
              callback={() => setReqWindowActive(true)}
            />
          )}
          {localStorage.getItem("access") && (
            <div className="photo_view_content_left_textarea">
              <textarea
                placeholder={"Ваш комментарий"}
                className="photo_view_content_left_textarea_field"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <div className="photo_view_content_left_textarea_button">
                <GreenButton
                  text={commentingId ? "Сохранить" : "Комментировать"}
                  width={"210px"}
                  height={"38px"}
                  callback={commentingId ? editComment : handleComment}
                  disabled={comment.length === 0}
                />
              </div>
            </div>
          )}
          <div className="photo_view_content_left_comment">
            {comments &&
              comments.map((comment, idx) => (
                <Comment
                  comment={comment}
                  key={idx}
                  onEditClick={onEditClick}
                  onDeleteClick={onDeleteClick}
                />
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
            {session && session.session_location && !dataLoading && (
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
            {dataLoading && (
              <Skeleton
                sx={{ borderRadius: 3 }}
                variant="rectangular"
                height={100}
              />
            )}
          </div>
          <div className="photo_view_content_right_data">
            <p className="photo_view_content_right_data_p">
              Тип съемки:{" "}
              <span className="photo_view_content_right_data_span">
                {session?.session_category?.name_spec}
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
                      ? "августа"
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
          {window.screen.width > 576 && (
            <GreenButton
              width={"180px"}
              height={"38px"}
              text={"Запрос на съемку"}
              margin={"20px 0 0 0"}
              callback={() => setReqWindowActive(true)}
            />
          )}
          <h1 className="photos_rights_title">
            Объект авторского права. Использование без разрешения
            правообладателя запрещено.
          </h1>
        </div>
      </div>
      <RequestWindow
        user={session && session.profile}
        active={reqWindowAcive}
        setActive={setReqWindowActive}
        width={window.screen.width <= 576 ? "90vw" : "40vw"}
        notAlign={window.screen.width <= 576}
      />
      <PhotoFullScreen
        photo={photos && photos[slideNumber]}
        changePhoto={changePhoto}
        modalActive={fullScreenActive}
        setModalActive={setFullScreenActive}
        slider={photos && photos.length > 1}
      />

      <Submit
        text={"Вы уверены, что хотите удалить комментарий?"}
        callback={deleteComment}
        modalActive={deleteModalOpen}
        setModalActive={setDeleteModalOpen}
        setAction={setDeleteModalOpen}
      />
    </div>
  );
};

export default PublicSessionView;
