import React, { useRef } from "react";
import { NotifyBlock } from "../index";
import "../../styles/Profile/Notifications.css";
import { useSelector, useDispatch } from "react-redux";
import Requests from "../../http/axios-requests";
import { setNotifications } from "../../redux/actions/userData";

const NotifyPopUp = ({ notifyPopUpActive, setActive }) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const onClick = (e) => {
      if (notifyRef.current) {
        notifyRef.current.contains(e.target) || setActive(false);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const { notifications } = useSelector(({ userData }) => userData);

  const notifyRef = useRef(null);
  const notifyBlockRef = useRef(null);
  const [viewedNotifications, setViewedNotifications] = React.useState();

  const readAllNotifications = () => {
    Requests.readNotifications(
      notifications.map((notification) => notification.id)
    ).then(() =>
      Requests.getNotifications().then((res) =>
        dispatch(setNotifications(res.data))
      )
    );
  };

  return (
    <div ref={notifyRef}>
      <div
        className={
          notifyPopUpActive
            ? "dropdown-notify-menu-wrapper active"
            : "dropdown-notify-menu-wrapper"
        }
      >
        <div className="dropdown-notify-menu-content">
          {notifications.length == 0 && (
            <h1
              style={{ fontSize: "14px" }}
              className="photos_cards_empty_title"
            >
              Нет новых уведомлений
            </h1>
          )}

          {notifications.length >= 1 && (
            <h1
              style={{ fontSize: "11px", alignSelf: "flex-end" }}
              className="photos_cards_empty_title"
              onClick={readAllNotifications}
            >
              Прочитать все
            </h1>
          )}
          {notifications.length >= 1 &&
            notifications.map((notification, idx) => (
              <NotifyBlock
                notification={notification}
                setActive={setActive}
                key={idx}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default NotifyPopUp;
