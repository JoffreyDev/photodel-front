import React from "react";
import LikeImage from "../../img/trainings/like.svg";
import CommentImage from "../../img/trainings/comment.svg";
import FavoriteImage from "../../img/trainings/fave.svg";
import Edit from "../../img/trainings/edit.svg";
import { Checkbox } from "..";
import { rootAddress } from "../../http/axios-requests";
import { useNavigate } from "react-router-dom";
import money from "../../img/trainings/money.svg";
import types from "../../img/trainings/type.svg";
import users from "../../img/trainings/users.svg";
import calendar from "../../img/trainings/calendar.svg";
import "../../styles/Profile/Training.scss";

const TrainingCardMain = ({
  training,
  disableRedirect,
  callback,
  array,
  disableCheck,
  disableEdit,
  notAuthor,
  halfContent,
  showDistance,
}) => {
  const navigate = useNavigate();

  const [key, setKey] = React.useState(Math.random);

  return (
    <div
      className={
        halfContent ? "training_card map_active" : "training_card map_disabled"
      }
    >
      <div className="training_card_photo_wrapper">
        <img
          src={`${rootAddress}${training?.main_photo?.photo}`}
          alt="card"
          className="training_card_photo"
          onClick={() =>
            !disableRedirect &&
            navigate(
              !notAuthor
                ? `/profile/training/${training.id}`
                : `/public/training/${training.id}`
            )
          }
        />
        <div className="training_card_photo_checkbox">
          {!disableCheck && (
            <Checkbox
              value={array.includes(training.id)}
              callback={() => {
                if (array.includes(training.id)) {
                  array.splice(array.indexOf(training.id), 1);
                  callback(array);
                  setKey(Math.random);
                  console.log(array);
                } else {
                  array.push(training.id);
                  callback(array);
                  setKey(Math.random);
                  console.log(array);
                }
              }}
              key={key}
            />
          )}
        </div>
      </div>
      <div className="training_card_info">
        <p className="training_card_info_country">
          {showDistance
            ? training?.string_place_location?.split(",")[1] +
              " | ~" +
              training?.diff_distance
            : ""}
        </p>
        <div className="training_card_info_title_wrapper">
          <p
            onClick={() => navigate(`/public/training/${training.id}`)}
            className="training_card_info_title"
          >
            {training?.training_title}
          </p>
          {!disableEdit && (
            <img
              src={Edit}
              alt="edit"
              className="training_card_info_title_img"
            />
          )}
        </div>
        <div className="training_card_properties">
          <div className="training_card_properties_column">
            <div className="training_card_properties_column_left">
              <img
                src={calendar}
                alt="date"
                className="training_card_properties_column_left_date"
              />
              <p className="training_card_properties_column_left_text">
                {training &&
                  training.start_date &&
                  `${
                    training.start_date.split("").splice(8, 2)[0] === "0"
                      ? training.start_date.split("").splice(9, 1).join("")
                      : training.start_date.split("").splice(8, 2).join("")
                  } ${
                    training.start_date.split("").splice(5, 2).join("") === "01"
                      ? "янв"
                      : training.start_date.split("").splice(5, 2).join("") ===
                        "02"
                      ? "фев"
                      : training.start_date.split("").splice(5, 2).join("") ===
                        "03"
                      ? "мар"
                      : training.start_date.split("").splice(5, 2).join("") ===
                        "04"
                      ? "апр"
                      : training.start_date.split("").splice(5, 2).join("") ===
                        "05"
                      ? "мая"
                      : training.start_date.split("").splice(5, 2).join("") ===
                        "06"
                      ? "июня"
                      : training.start_date.split("").splice(5, 2).join("") ===
                        "07"
                      ? "июля"
                      : training.start_date.split("").splice(5, 2).join("") ===
                        "08"
                      ? "авг"
                      : training.start_date.split("").splice(5, 2).join("") ===
                        "09"
                      ? "сент"
                      : training.start_date.split("").splice(5, 2).join("") ===
                        "10"
                      ? "окт"
                      : training.start_date.split("").splice(5, 2).join("") ===
                        "11"
                      ? "ноя"
                      : training.start_date.split("").splice(5, 2).join("") ===
                        "12"
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
                    training.end_date.split("").splice(5, 2).join("") === "01"
                      ? "янв"
                      : training.end_date.split("").splice(5, 2).join("") ===
                        "02"
                      ? "фев"
                      : training.end_date.split("").splice(5, 2).join("") ===
                        "03"
                      ? "мар"
                      : training.end_date.split("").splice(5, 2).join("") ===
                        "04"
                      ? "апр"
                      : training.end_date.split("").splice(5, 2).join("") ===
                        "05"
                      ? "мая"
                      : training.end_date.split("").splice(5, 2).join("") ===
                        "06"
                      ? "июня"
                      : training.end_date.split("").splice(5, 2).join("") ===
                        "07"
                      ? "июля"
                      : training.end_date.split("").splice(5, 2).join("") ===
                        "08"
                      ? "авг"
                      : training.end_date.split("").splice(5, 2).join("") ===
                        "09"
                      ? "сент"
                      : training.end_date.split("").splice(5, 2).join("") ===
                        "10"
                      ? "окт"
                      : training.end_date.split("").splice(5, 2).join("") ===
                        "11"
                      ? "ноя"
                      : training.end_date.split("").splice(5, 2).join("") ===
                        "12"
                      ? "дек"
                      : ""
                  }`}
              </p>
            </div>
            <div className="training_card_properties_column_left">
              <img
                src={types}
                alt="type"
                className="training_card_properties_column_left_type"
              />
              <p className="training_card_properties_column_left_text">
                {training?.place}
              </p>
            </div>
          </div>
          <div className="training_card_properties_column">
            <div className="training_card_properties_column_right">
              <img
                src={money}
                alt="price"
                className="training_card_properties_column_right_price"
              />
              <p className="training_card_properties_column_right_text">
                {training?.cost} руб.
              </p>
            </div>

            <div className="training_card_properties_column_right">
              <img
                src={users}
                alt="members"
                className="training_card_properties_column_right_members"
              />
              <p className="training_card_properties_column_right_text">
                {training?.summary_members - training?.reserved_places} свободно
              </p>
            </div>
          </div>
        </div>
        {training?.training_orgs[0] && (
          <div className="training_card_manager">
            <p className="training_card_manager_title">Организатор</p>
            <div className="training_card_manager_account">
              <img
                src={`data:image/png;base64,${training?.training_orgs[0].avatar}`}
                alt="avatar"
                className="training_card_manager_account_avatar"
              />
              <p className="training_card_manager_account_name">
                {training?.training_orgs[0].name +
                  " " +
                  training?.training_orgs[0].surname}
              </p>
              <p className="training_card_manager_account_count">+1</p>
            </div>
          </div>
        )}
        <div className="training_card_profile">
          <p className="training_card_profile_title">Автор</p>
          <div className="training_card_profile_prof">
            <img
              src={`data:image/png;base64,${training?.profile?.avatar}`}
              alt="avatar"
              className="training_card_profile_prof_avatar"
            />
            <p className="training_card_profile_prof_name">
              {training?.profile?.name + " " + training?.profile?.surname}
            </p>
          </div>
        </div>
        <div className="training_card_info_comm">
          <div className="training_card_info_comm_likes">
            <img
              src={LikeImage}
              alt="like"
              className="training_card_info_comm_likes_image"
            />
            <p className="training_card_info_comm_likes_p">{training?.likes}</p>
          </div>
          <div className="training_card_info_comm_comments">
            <img
              src={CommentImage}
              alt="like"
              className="training_card_info_comm_comments_image"
            />
            <p className="training_card_info_comm_comments_p">
              {training?.comments}
            </p>
          </div>
          <div className="training_card_info_comm_fave">
            <img
              src={FavoriteImage}
              alt="like"
              className="training_card_info_comm_fave_image"
            />
            <p className="training_card_info_comm_fave_p">
              {training?.favorites}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingCardMain;
