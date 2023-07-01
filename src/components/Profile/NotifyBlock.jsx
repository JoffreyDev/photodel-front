import React from "react";
import Shape from "../../img/addModules/shape.svg";
import { useNavigate } from "react-router-dom";
import Requests from "../../http/axios-requests";
import { useDispatch } from "react-redux";
import { setNotifications } from "../../redux/actions/userData";

const NotificationBlock = ({ notification, setActive }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch()

  const readNotification = (id) => {
    Requests.readNotifications([id]).then(() => {
      Requests.getNotifications().then((res) => {
        dispatch(setNotifications(res.data))
      })
    })
  }

  return (
    <div onClick={() => readNotification(notification.id)} style={{ width: "100%" }}>
      <a style={{ textDecoration: "none", width: "97%" }}>
        {(notification.type === "NEW_SESSION_LIKE" ||
          notification.type === "NEW_PHOTO_LIKE" ||
          notification.type === "NEW_PLACE_LIKE" ||
          notification.type === "NEW_TRAINING_LIKE") && (
          <div
            className="dropdown_notify_menu_notification_wrapper"
            onClick={() => {
              navigate(
                `/profile/${
                  notification.type === "NEW_SESSION_LIKE"
                    ? `session/${notification.action_position}`
                    : notification.type === "NEW_PHOTO_LIKE"
                    ? `photo/${notification.action_position}`
                    : notification.type === "NEW_PLACE_LIKE"
                    ? `place/${notification.action_position}`
                    : notification.type === "NEW_TRAINING_LIKE"
                    ? `training/${notification.action_position}`
                    : ""
                }`
              );
              setActive(false);
            }}
          >
            <div className="dropdown_notify_menu_notification_content">
              <div className="notification_upper_row">
                <p className="dropdown_notify_main_p">
                  У вас новый лайк на{" "}
                  <span style={{ cursor: "pointer" }}>
                    {notification.type === "NEW_SESSION_LIKE"
                      ? "фотосессии"
                      : notification.type === "NEW_PHOTO_LIKE"
                      ? "фото"
                      : notification.type === "NEW_PLACE_LIKE"
                      ? "месте для съемки"
                      : notification.type === "NEW_TRAINING_LIKE"
                      ? "обучении"
                      : ""}
                  </span>{" "}
                  от пользователя{" "}
                  {notification.sender_profile.name +
                    " " +
                    notification.sender_profile.surname}
                </p>
              </div>
            </div>
          </div>
        )}

        {(notification.type === "NEW_SESSION_FAVORITE" ||
          notification.type === "NEW_PHOTO_FAVORITE" ||
          notification.type === "NEW_PLACE_FAVORITE" ||
          notification.type === "NEW_TRAINING_FAVORITE") && (
          <div
            className="dropdown_notify_menu_notification_wrapper"
            onClick={() => {
              navigate(
                `/profile/${
                  notification.type === "NEW_SESSION_FAVORITE"
                    ? `session/${notification.action_position}`
                    : notification.type === "NEW_PHOTO_FAVORITE"
                    ? `photo/${notification.action_position}`
                    : notification.type === "NEW_PLACE_FAVORITE"
                    ? `place/${notification.action_position}`
                    : notification.type === "NEW_TRAINING_FAVORITE"
                    ? `training/${notification.action_position}`
                    : ""
                }`
              );
              setActive(false);
            }}
          >
            <div className="dropdown_notify_menu_notification_content">
              <div className="notification_upper_row">
                <p className="dropdown_notify_main_p">
                  Пользователь{" "}
                  {notification.sender_profile.name +
                    " " +
                    notification.sender_profile.surname}{" "}
                  добавил
                  <span style={{ cursor: "pointer" }}>
                    {notification.type === "NEW_SESSION_FAVORITE"
                      ? "вашу фотосессию"
                      : notification.type === "NEW_PHOTO_FAVORITE"
                      ? "ваше фото"
                      : notification.type === "NEW_PLACE_FAVORITE"
                      ? "ваше место для съемки"
                      : notification.type === "NEW_TRAINING_FAVORITE"
                      ? "ваше обучение"
                      : ""}{" "}
                  </span>{" "}
                  в избранное
                </p>
              </div>
            </div>
          </div>
        )}

        {(notification.type === "NEW_SESSION_COMMENT" ||
          notification.type === "NEW_PHOTO_COMMENT" ||
          notification.type === "NEW_PLACE_COMMENT" ||
          notification.type === "NEW_TRAINING_COMMENT") && (
          <div
            className="dropdown_notify_menu_notification_wrapper"
            onClick={() => {
              navigate(
                `/profile/${
                  notification.type === "NEW_SESSION_COMMENT"
                    ? `session/${notification.action_position}`
                    : notification.type === "NEW_PHOTO_COMMENT"
                    ? `photo/${notification.action_position}`
                    : notification.type === "NEW_PLACE_COMMENT"
                    ? `place/${notification.action_position}`
                    : notification.type === "NEW_TRAINING_COMMENT"
                    ? `training/${notification.action_position}`
                    : ""
                }`
              );
              setActive(false);
            }}
          >
            <div className="dropdown_notify_menu_notification_content">
              <div className="notification_upper_row">
                <p className="dropdown_notify_main_p">
                  Пользователь{" "}
                  {notification.sender_profile.name +
                    " " +
                    notification.sender_profile.surname}{" "}
                  добавил комментарий к{" "}
                  <span style={{ cursor: "pointer" }}>
                    {notification.type === "NEW_SESSION_COMMENT"
                      ? "вашей фотосессии"
                      : notification.type === "NEW_PHOTO_COMMENT"
                      ? "вашему фото"
                      : notification.type === "NEW_PLACE_COMMENT"
                      ? "вашему месту для съемки"
                      : notification.type === "NEW_TRAINING_COMMENT"
                      ? "вашему обучению"
                      : ""}{" "}
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}

        {(notification.type === "NEW_FILMING_REQUEST" ||
          notification.type === "NEW_TRAINING_REQUEST" ||
          notification.type === "NEW_TEAM_REQUEST") && (
          <div
            className="dropdown_notify_menu_notification_wrapper"
            onClick={() => {
              navigate(
                `/profile/${
                  notification.type === "NEW_FILMING_REQUEST"
                    ? `requests`
                    : notification.type === "NEW_TRAINING_REQUEST"
                    ? `requests`
                    : notification.type === "NEW_TEAM_REQUEST"
                    ? `requests`
                    : ""
                }`
              );
              setActive(false);
            }}
          >
            <div className="dropdown_notify_menu_notification_content">
              <div className="notification_upper_row">
                <p className="dropdown_notify_main_p">
                  Вы получили запрос{" "}
                  <span style={{ cursor: "pointer" }}>
                    {notification.type === "NEW_FILMING_REQUEST"
                      ? "на съемку"
                      : notification.type === "NEW_TRAINING_REQUEST"
                      ? "на обучение"
                      : notification.type === "NEW_TEAM_REQUEST"
                      ? "в команду"
                      : ""}{" "}
                  </span>{" "}
                  от пользователя{" "}
                  {notification.sender_profile.name +
                    " " +
                    notification.sender_profile.surname}{" "}
                </p>
              </div>
            </div>
          </div>
        )}

        {(notification.type === "NEW_REVIEW" ||
          notification.type === "NEW_MESSAGE") && (
          <div
            className="dropdown_notify_menu_notification_wrapper"
            onClick={() => {
              navigate(
                `/profile/${
                  notification.type === "NEW_REVIEW"
                    ? `reviews`
                    : notification.type === "NEW_MESSAGE"
                    ? `messages`
                    : ""
                }`
              );
              setActive(false);
            }}
          >
            <div className="dropdown_notify_menu_notification_content">
              <div className="notification_upper_row">
                <p className="dropdown_notify_main_p">
                  Вы получили{" "}
                  <span style={{ cursor: "pointer" }}>
                    {notification.type === "NEW_REVIEW"
                      ? "новый отзыв"
                      : notification.type === "NEW_MESSAGE"
                      ? "новое сообщение"
                      : ""}{" "}
                  </span>{" "}
                  от пользователя{" "}
                  {notification.sender_profile.name +
                    " " +
                    notification.sender_profile.surname}{" "}
                </p>
              </div>
            </div>
          </div>
        )}
      </a>
    </div>
  );
};

export default NotificationBlock;
