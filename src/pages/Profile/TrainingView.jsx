import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import "../../styles/Profile/TrainingView.scss";
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
import { AddToTrainingCard, Comment } from "../../components";
import { GreenButton, PhotoFullScreen } from "../../components";
import Requests, { rootAddress } from "../../http/axios-requests";
import { openErrorAlert, openSuccessAlert } from "../../redux/actions/userData";
import { useDispatch } from "react-redux";
import Camera from "../../img/placeView/photo.svg";
import Money from "../../img/placeView/money.svg";
import Work from "../../img/placeView/work.svg";
import { RequestWindow } from "../../components";
import LeftArrow from "../../img/commonImages/photo_left_arrow.svg";
import RightArrow from "../../img/commonImages/photo_right_arrow.svg";
import { PublicHeader } from "..";
import Skeleton from "@mui/material/Skeleton";
import Pro from "../../img/profile/pro.svg";
import money from "../../img/trainings/money.svg";
import types from "../../img/trainings/type.svg";
import users from "../../img/trainings/users.svg";
import calendar from "../../img/trainings/calendar.svg";
import { useSelector } from "react-redux";

const TrainingView = ({ setProfileId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userData, isLoggedIn } = useSelector(({ userData }) => userData);

  const params = useParams();
  const trainingId = params.id;

  const [loaded, setLoaded] = React.useState();
  const [training, setTraining] = React.useState();
  const [comment, setComment] = React.useState();
  const [commentingId, setCommentingId] = React.useState();
  const [quotingId, setQuotingId] = React.useState();
  const [comments, setComments] = React.useState();
  const [fullScreenActive, setFullScreenActive] = React.useState(false);

  const [photos, setPhotos] = React.useState();
  const [slideNumber, setSlideNumber] = React.useState(0);

  const [reqWindowAcive, setReqWindowActive] = React.useState(false);
  const [dataLoading, setDataLoading] = React.useState(true);

  React.useEffect(() => {
    !loaded &&
      localStorage.getItem("key") &&
      Requests.getSingleTraining(trainingId)
        .then((res) => {
          setLoaded(true);
          setTraining(res.data);
          setPhotos(
            res.data.training_images.map(
              (photo) => `${rootAddress}${photo.photo}`
            )
          );
          setDataLoading(false);
        })
        .then(() => {
          Requests.getTrainingComments(trainingId).then((res) => {
            setComments(res.data);
            setLoaded(true);
          });
        });

    !loaded &&
      !localStorage.getItem("key") &&
      Requests.getSingleTrainingUnauth(trainingId)
        .then((res) => {
          setLoaded(true);
          setTraining(res.data);
          console.log(res.data);
          setPhotos(
            res.data.training_images.map(
              (photo) => `${rootAddress}${photo.photo}`
            )
          );
          setDataLoading(false);
        })
        .then(() => {
          Requests.getTrainingComments(trainingId).then((res) => {
            setComments(res.data);
            setLoaded(true);
          });
        });
  }, [loaded, trainingId]);

  const likeHandle = () => {
    if (training.is_liked) {
      Requests.unlikeTraining(trainingId).then(() => {
        Requests.getSingleTraining(trainingId).then((res) => {
          setLoaded(true);
          setTraining(res.data);
        });
      });
    } else
      Requests.likeTraining(trainingId).then(() => {
        Requests.getSingleTraining(trainingId).then((res) => {
          setLoaded(true);
          setTraining(res.data);
        });
      });
  };

  const favoriteHandle = () => {
    if (training.in_favorite) {
      Requests.deleteFavoriteTraining([trainingId]).then(() => {
        Requests.getSingleTraining(trainingId).then((res) => {
          setLoaded(true);
          setTraining(res.data);
        });
      });
    } else
      Requests.addFavoriteTraining(trainingId).then(() => {
        Requests.getSingleTraining(trainingId).then((res) => {
          setLoaded(true);
          setTraining(res.data);
        });
      });
  };

  const handleComment = () => {
    Requests.addTrainingComment(trainingId, comment).then(() => {
      dispatch(openSuccessAlert("Комментарий опубликован!"));
      Requests.getSingleTraining(trainingId)
        .then((res) => {
          setTraining(res.data);
          setComment("");
        })
        .then(() => {
          Requests.getTrainingComments(trainingId).then((res) => {
            setComments(res.data);
            setLoaded(true);
          });
        });
    });
  };

  const handleRequest = () => {
    if (!isLoggedIn) {
      dispatch(
        openErrorAlert("Запись доступна только авторизованным пользователям!")
      );
      return;
    }
    Requests.sendTrainingRequest(userData.id, trainingId)
      .then((res) =>
        dispatch(openSuccessAlert("Запрос на обучение успешно отправлен!"))
      )
      .catch((err) => dispatch(openErrorAlert(err.response.data.error)));
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
    <div className="training_view">
      <PublicHeader profile={training && training.profile} />
      <div className="training_view_header">
        <img src={Back} alt="back" className="add_photo_header_arrow" />
        <p
          onClick={() => navigate(`/public/trainings/${training.profile.id}`)}
          className="training_view_header_p"
        >
          Все мероприятия
        </p>
      </div>
      <div className="photo_view_content_right_table mobile">
        <div className="photo_view_content_right_table_row">
          <img
            src={Lock}
            alt="published"
            className="photo_view_content_right_table_row_img"
          />
          <p className="photo_view_content_right_table_row_p">Опубликовано</p>
        </div>

        <GreenButton
          width={"180px"}
          height={"38px"}
          text={"Редактировать"}
          callback={() =>
            navigate(`/profile/edit-training/${training && training.id}`)
          }
        />
      </div>
      <div className="training_view_content">
        <div className="training_view_content_left">
          {photos && !dataLoading && (
            <div className="training_view_content_left_image_wrapper">
              {photos.length > 1 && (
                <img
                  src={LeftArrow}
                  alt="prev"
                  className="training_view_content_left_image_arrow left"
                  onClick={() => changePhoto("prev")}
                />
              )}
              <img
                src={photos && photos[slideNumber]}
                alt="image"
                className="training_view_content_left_image"
                onClick={() => setFullScreenActive(true)}
              />
              {photos.length > 1 && (
                <img
                  src={RightArrow}
                  alt="next"
                  className="training_view_content_left_image_arrow right"
                  onClick={() => changePhoto("next")}
                />
              )}
            </div>
          )}
          {dataLoading && (
            <div className="training_view_content_left_image_wrapper">
              <Skeleton
                sx={{ borderRadius: 3 }}
                variant="rectangular"
                height={300}
              />
            </div>
          )}
          <div className="training_view_content_left_activities">
            <div className="training_view_content_left_activities_left">
              <img
                src={View}
                alt="views"
                className="training_view_content_left_activities_img"
              />
              <p className="training_view_content_left_activities_p">
                {training && training.views}
              </p>

              <img
                src={training && training.is_liked ? Like : LikeDisabled}
                alt="likes"
                className="training_view_content_left_activities_img"
                onClick={likeHandle}
              />
              <p className="training_view_content_left_activities_p">
                {training && training.likes}
              </p>

              <img
                src={CommentImg}
                alt="comments"
                className="training_view_content_left_activities_img"
              />
              <p className="training_view_content_left_activities_p">
                {training && training.comments}
              </p>

              <img
                src={training && training.in_favorite ? Fave : FaveDisabled}
                alt="favorites"
                className="training_view_content_left_activities_img"
                onClick={favoriteHandle}
              />
              <p className="training_view_content_left_activities_p">
                {training && training.favorites}
              </p>
            </div>
            <p className="training_view_content_left_activities_date">
              {training &&
                `${training.was_added.split("").splice(8, 2).join("")} ${
                  training.was_added.split("").splice(5, 2).join("") === "01"
                    ? "января"
                    : training.was_added.split("").splice(5, 2).join("") ===
                      "02"
                    ? "февраля"
                    : training.was_added.split("").splice(5, 2).join("") ===
                      "03"
                    ? "марта"
                    : training.was_added.split("").splice(5, 2).join("") ===
                      "04"
                    ? "апреля"
                    : training.was_added.split("").splice(5, 2).join("") ===
                      "05"
                    ? "мая"
                    : training.was_added.split("").splice(5, 2).join("") ===
                      "06"
                    ? "июня"
                    : training.was_added.split("").splice(5, 2).join("") ===
                      "07"
                    ? "июля"
                    : training.was_added.split("").splice(5, 2).join("") ===
                      "08"
                    ? "августа"
                    : training.was_added.split("").splice(5, 2).join("") ===
                      "09"
                    ? "сентября"
                    : training.was_added.split("").splice(5, 2).join("") ===
                      "10"
                    ? "октября"
                    : training.was_added.split("").splice(5, 2).join("") ===
                      "11"
                    ? "ноября"
                    : training.was_added.split("").splice(5, 2).join("") ===
                      "12"
                    ? "декабря"
                    : ""
                } ${training.was_added.split("").splice(0, 4).join("")}`}
            </p>
          </div>
          {!dataLoading && (
            <h1 className="training_view_content_left_title">
              {training && training.training_title}
            </h1>
          )}
          {dataLoading && (
            <Skeleton sx={{ borderRadius: 3 }} variant="text" width={50} />
          )}
          {!dataLoading && (
            <p className="training_view_content_left_description">
              {training && training.training_description}
            </p>
          )}
          {dataLoading && (
            <Skeleton sx={{ borderRadius: 3 }} variant="text" width={100} />
          )}
          <div className="training_view_content_right_geo mobile">
            <img
              src={Geo}
              alt="geolocation"
              className="training_view_content_right_geo_img"
            />
            <p className="training_view_content_right_geo_p">
              {training && training.string_place_location}
            </p>
          </div>
          <div className="training_properties_mobile">
            <div className="training_view_content_right_map mobile">
              {training && training.place_location && !dataLoading && (
                <YMaps>
                  <Map
                    width={"100%"}
                    height={"100px"}
                    defaultState={{
                      center:
                        training &&
                        training.place_location
                          .split("(")[1]
                          .split(")")[0]
                          .split(" "),
                      zoom: 12,
                    }}
                  >
                    <Placemark
                      geometry={
                        training &&
                        training.place_location
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
            <div>
              <div className="training_view_content_right_specs">
                <div
                  title="Камера"
                  className="training_view_content_right_spec"
                >
                  <img
                    src={types}
                    title="Место проведения"
                    alt="Место"
                    className="training_view_content_right_spec_img"
                  />
                  <p className="training_view_content_right_spec_p">
                    {training && training?.place === "Online"
                      ? "Онлайн"
                      : training?.place === "Offline"
                      ? "Оффлайн"
                      : "-"}
                  </p>
                </div>

                <div className="training_view_content_right_spec_row">
                  <div
                    title="Даты"
                    className="training_view_content_right_spec"
                  >
                    <img
                      src={calendar}
                      alt="даты"
                      className="training_view_content_right_spec_img"
                    />
                    <p className="training_view_content_right_spec_p">
                      {training &&
                        training.start_date &&
                        `${
                          training.start_date.split("").splice(8, 2)[0] === "0"
                            ? training.start_date
                                .split("")
                                .splice(9, 1)
                                .join("")
                            : training.start_date
                                .split("")
                                .splice(8, 2)
                                .join("")
                        } ${
                          training.start_date
                            .split("")
                            .splice(5, 2)
                            .join("") === "01"
                            ? "янв"
                            : training.start_date
                                .split("")
                                .splice(5, 2)
                                .join("") === "02"
                            ? "фев"
                            : training.start_date
                                .split("")
                                .splice(5, 2)
                                .join("") === "03"
                            ? "мар"
                            : training.start_date
                                .split("")
                                .splice(5, 2)
                                .join("") === "04"
                            ? "апр"
                            : training.start_date
                                .split("")
                                .splice(5, 2)
                                .join("") === "05"
                            ? "мая"
                            : training.start_date
                                .split("")
                                .splice(5, 2)
                                .join("") === "06"
                            ? "июня"
                            : training.start_date
                                .split("")
                                .splice(5, 2)
                                .join("") === "07"
                            ? "июля"
                            : training.start_date
                                .split("")
                                .splice(5, 2)
                                .join("") === "08"
                            ? "авг"
                            : training.start_date
                                .split("")
                                .splice(5, 2)
                                .join("") === "09"
                            ? "сент"
                            : training.start_date
                                .split("")
                                .splice(5, 2)
                                .join("") === "10"
                            ? "окт"
                            : training.start_date
                                .split("")
                                .splice(5, 2)
                                .join("") === "11"
                            ? "ноя"
                            : training.start_date
                                .split("")
                                .splice(5, 2)
                                .join("") === "12"
                            ? "дек"
                            : ""
                        }`}{" "}
                      -{" "}
                      {training &&
                        training.end_date &&
                        `${
                          training.end_date.split("").splice(8, 2)[0] === "0"
                            ? training.end_date.split("").splice(9, 1).join("")
                            : training.end_date.split("").splice(8, 2).join("")
                        } ${
                          training.end_date.split("").splice(5, 2).join("") ===
                          "01"
                            ? "янв"
                            : training.end_date
                                .split("")
                                .splice(5, 2)
                                .join("") === "02"
                            ? "фев"
                            : training.end_date
                                .split("")
                                .splice(5, 2)
                                .join("") === "03"
                            ? "мар"
                            : training.end_date
                                .split("")
                                .splice(5, 2)
                                .join("") === "04"
                            ? "апр"
                            : training.end_date
                                .split("")
                                .splice(5, 2)
                                .join("") === "05"
                            ? "мая"
                            : training.end_date
                                .split("")
                                .splice(5, 2)
                                .join("") === "06"
                            ? "июня"
                            : training.end_date
                                .split("")
                                .splice(5, 2)
                                .join("") === "07"
                            ? "июля"
                            : training.end_date
                                .split("")
                                .splice(5, 2)
                                .join("") === "08"
                            ? "авг"
                            : training.end_date
                                .split("")
                                .splice(5, 2)
                                .join("") === "09"
                            ? "сент"
                            : training.end_date
                                .split("")
                                .splice(5, 2)
                                .join("") === "10"
                            ? "окт"
                            : training.end_date
                                .split("")
                                .splice(5, 2)
                                .join("") === "11"
                            ? "ноя"
                            : training.end_date
                                .split("")
                                .splice(5, 2)
                                .join("") === "12"
                            ? "дек"
                            : ""
                        }`}
                    </p>
                  </div>
                </div>

                <div className="training_view_content_right_spec_row">
                  <div
                    title="Стоимость"
                    className="training_view_content_right_spec"
                  >
                    <img
                      src={money}
                      alt="payment"
                      className="training_view_content_right_spec_img"
                    />
                    <p className="training_view_content_right_spec_p">
                      {training && training.cost ? training.cost : "нет"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="training_view_content_right_categories">
                <p className="training_view_content_right_categories_title">
                  Категория:
                </p>
                <p className="training_view_content_right_categories_p">
                  {training && training?.training_category?.name_category}
                </p>
              </div>

              <div className="training_view_content_right_categories">
                <p className="training_view_content_right_categories_title">
                  Предоплата:
                </p>
                <p className="training_view_content_right_categories_p">
                  {training?.first_payment}
                </p>
              </div>
              <div className="training_view_content_right_places">
                <p className="training_view_content_right_places_p">
                  {training?.summary_members - training?.reserved_places} ИЗ{" "}
                  {training?.summary_members} МЕСТ СВОБОДНО
                </p>
              </div>

              {training?.reserved_places < training?.summary_members && (
                <GreenButton
                  width={"180px"}
                  height={"38px"}
                  text={"Записаться"}
                  callback={handleRequest}
                  margin={"20px 0 20px 0 "}
                />
              )}
            </div>

            <div className="training_view_content_right_team mobile">
              {training && training.training_orgs.length > 0 && (
                <div className="training_view_content_right_team_single">
                  <p className="training_view_content_right_team_single_title">
                    Организаторы
                  </p>
                  {training &&
                    training.training_orgs.length > 0 &&
                    training.training_orgs.map((org, idx) => {
                      return <AddToTrainingCard profile={org} key={idx} view />;
                    })}
                </div>
              )}
              {training && training.training_team.length > 0 && (
                <div className="training_view_content_right_team_single">
                  <p className="training_view_content_right_team_single_title">
                    Команда
                  </p>
                  {training &&
                    training.training_team.length > 0 &&
                    training.training_team.map((member, idx) => {
                      return (
                        <AddToTrainingCard profile={member} key={idx} view />
                      );
                    })}
                </div>
              )}
              {training && training.training_members.length > 0 && (
                <div className="training_view_content_right_team_single">
                  <p className="training_view_content_right_team_single_title">
                    Участники
                  </p>
                  {training &&
                    training.training_members.length > 0 &&
                    training.training_members.map((member, idx) => {
                      return (
                        <AddToTrainingCard profile={member} key={idx} view />
                      );
                    })}
                </div>
              )}
            </div>
          </div>

          {localStorage.getItem("access") && (
            <div className="training_view_content_left_textarea">
              <textarea
                placeholder={"Ваш комментарий"}
                className="training_view_content_left_textarea_field"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <div className="training_view_content_left_textarea_button">
                <GreenButton
                  text={"Комментировать"}
                  width={"210px"}
                  height={"38px"}
                  callback={handleComment}
                />
              </div>
            </div>
          )}
          <div className="photo_view_content_left_comment">
            {comments &&
              comments.map((comment, idx) => (
                <Comment comment={comment} key={idx} />
              ))}
          </div>
        </div>
        <div className="training_view_content_right">
          <div className="training_view_content_right_geo">
            <img
              src={Geo}
              alt="geolocation"
              className="training_view_content_right_geo_img"
            />
            <p className="training_view_content_right_geo_p">
              {training && training.string_place_location}
            </p>
          </div>
          <div className="training_properties_pc">
            <div className="training_view_content_right_map">
              {training && training.place_location && !dataLoading && (
                <YMaps>
                  <Map
                    width={"255px"}
                    height={"110px"}
                    defaultState={{
                      center:
                        training &&
                        training.place_location
                          .split("(")[1]
                          .split(")")[0]
                          .split(" "),
                      zoom: 12,
                    }}
                  >
                    <Placemark
                      geometry={
                        training &&
                        training.place_location
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
            <div className="training_view_content_right_specs">
              <div title="Камера" className="training_view_content_right_spec">
                <img
                  src={types}
                  title="Место проведения"
                  alt="Место"
                  className="training_view_content_right_spec_img"
                />
                <p className="training_view_content_right_spec_p">
                  {training && training?.place === "Online"
                    ? "Онлайн"
                    : training?.place === "Offline"
                    ? "Оффлайн"
                    : "-"}
                </p>
              </div>

              <div className="training_view_content_right_spec_row">
                <div title="Даты" className="training_view_content_right_spec">
                  <img
                    src={calendar}
                    alt="даты"
                    className="training_view_content_right_spec_img"
                  />
                  <p className="training_view_content_right_spec_p">
                    {training &&
                      training.start_date &&
                      `${
                        training.start_date.split("").splice(8, 2)[0] === "0"
                          ? training.start_date.split("").splice(9, 1).join("")
                          : training.start_date.split("").splice(8, 2).join("")
                      } ${
                        training.start_date.split("").splice(5, 2).join("") ===
                        "01"
                          ? "янв"
                          : training.start_date
                              .split("")
                              .splice(5, 2)
                              .join("") === "02"
                          ? "фев"
                          : training.start_date
                              .split("")
                              .splice(5, 2)
                              .join("") === "03"
                          ? "мар"
                          : training.start_date
                              .split("")
                              .splice(5, 2)
                              .join("") === "04"
                          ? "апр"
                          : training.start_date
                              .split("")
                              .splice(5, 2)
                              .join("") === "05"
                          ? "мая"
                          : training.start_date
                              .split("")
                              .splice(5, 2)
                              .join("") === "06"
                          ? "июня"
                          : training.start_date
                              .split("")
                              .splice(5, 2)
                              .join("") === "07"
                          ? "июля"
                          : training.start_date
                              .split("")
                              .splice(5, 2)
                              .join("") === "08"
                          ? "авг"
                          : training.start_date
                              .split("")
                              .splice(5, 2)
                              .join("") === "09"
                          ? "сент"
                          : training.start_date
                              .split("")
                              .splice(5, 2)
                              .join("") === "10"
                          ? "окт"
                          : training.start_date
                              .split("")
                              .splice(5, 2)
                              .join("") === "11"
                          ? "ноя"
                          : training.start_date
                              .split("")
                              .splice(5, 2)
                              .join("") === "12"
                          ? "дек"
                          : ""
                      }`}{" "}
                    -{" "}
                    {training &&
                      training.end_date &&
                      `${
                        training.end_date.split("").splice(8, 2)[0] === "0"
                          ? training.end_date.split("").splice(9, 1).join("")
                          : training.end_date.split("").splice(8, 2).join("")
                      } ${
                        training.end_date.split("").splice(5, 2).join("") ===
                        "01"
                          ? "янв"
                          : training.end_date
                              .split("")
                              .splice(5, 2)
                              .join("") === "02"
                          ? "фев"
                          : training.end_date
                              .split("")
                              .splice(5, 2)
                              .join("") === "03"
                          ? "мар"
                          : training.end_date
                              .split("")
                              .splice(5, 2)
                              .join("") === "04"
                          ? "апр"
                          : training.end_date
                              .split("")
                              .splice(5, 2)
                              .join("") === "05"
                          ? "мая"
                          : training.end_date
                              .split("")
                              .splice(5, 2)
                              .join("") === "06"
                          ? "июня"
                          : training.end_date
                              .split("")
                              .splice(5, 2)
                              .join("") === "07"
                          ? "июля"
                          : training.end_date
                              .split("")
                              .splice(5, 2)
                              .join("") === "08"
                          ? "авг"
                          : training.end_date
                              .split("")
                              .splice(5, 2)
                              .join("") === "09"
                          ? "сент"
                          : training.end_date
                              .split("")
                              .splice(5, 2)
                              .join("") === "10"
                          ? "окт"
                          : training.end_date
                              .split("")
                              .splice(5, 2)
                              .join("") === "11"
                          ? "ноя"
                          : training.end_date
                              .split("")
                              .splice(5, 2)
                              .join("") === "12"
                          ? "дек"
                          : ""
                      }`}
                  </p>
                </div>
              </div>

              <div className="training_view_content_right_spec_row">
                <div
                  title="Стоимость"
                  className="training_view_content_right_spec"
                >
                  <img
                    src={money}
                    alt="payment"
                    className="training_view_content_right_spec_img"
                  />
                  <p className="training_view_content_right_spec_p">
                    {training && training.cost ? training.cost : "нет"}
                  </p>
                </div>
              </div>
            </div>

            <div className="training_view_content_right_categories">
              <p className="training_view_content_right_categories_title">
                Категория:
              </p>
              <p className="training_view_content_right_categories_p">
                {training && training?.training_category?.name_category}
              </p>
            </div>

            <div className="training_view_content_right_categories">
              <p className="training_view_content_right_categories_title">
                Предоплата:
              </p>
              <p className="training_view_content_right_categories_p">
                {training?.first_payment}
              </p>
            </div>
            <div className="training_view_content_right_places">
              <p className="training_view_content_right_places_p">
                {training?.summary_members - training?.reserved_places} ИЗ{" "}
                {training?.summary_members} МЕСТ СВОБОДНО
              </p>
            </div>
            {window.screen.width > 576 &&
              training?.reserved_places < training?.summary_members && (
                <GreenButton
                  width={"180px"}
                  height={"38px"}
                  text={"Записаться"}
                  callback={handleRequest}
                  margin={"20px 0 20px 0 "}
                />
              )}
          </div>
          <div className="training_view_content_right_team">
            {training && training.training_orgs.length > 0 && (
              <div className="training_view_content_right_team_single">
                <p className="training_view_content_right_team_single_title">
                  Организаторы
                </p>
                {training &&
                  training.training_orgs.length > 0 &&
                  training.training_orgs.map((org, idx) => {
                    return <AddToTrainingCard profile={org} key={idx} view />;
                  })}
              </div>
            )}
            {training && training.training_team.length > 0 && (
              <div className="training_view_content_right_team_single">
                <p className="training_view_content_right_team_single_title">
                  Команда
                </p>
                {training &&
                  training.training_team.length > 0 &&
                  training.training_team.map((member, idx) => {
                    return (
                      <AddToTrainingCard profile={member} key={idx} view />
                    );
                  })}
              </div>
            )}
            {training && training.training_members.length > 0 && (
              <div className="training_view_content_right_team_single">
                <p className="training_view_content_right_team_single_title">
                  Участники
                </p>
                {training &&
                  training.training_members.length > 0 &&
                  training.training_members.map((member, idx) => {
                    return (
                      <AddToTrainingCard profile={member} key={idx} view />
                    );
                  })}
              </div>
            )}
          </div>
        </div>
      </div>
      <RequestWindow
        user={training && training.profile}
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
    </div>
  );
};

export default TrainingView;
