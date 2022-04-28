import React from "react";
import { useSelector, useDispatch } from "react-redux";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { useNavigate } from "react-router-dom";
import { toggleIsLoggenIn } from "../../redux/actions/userData";

const LoggedUserPopup = ({ setLoggedUserPopupActive }) => {
  const { userData } = useSelector(({ userData }) => userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickAway = () => {
    setLoggedUserPopupActive(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className="main_page_header_top_row_popup">
        <div className="main_page_header_top_row_popup_top">
          <img
            src={`data:image/png;base64,${userData.avatar}`}
            alt="avatar"
            className="main_page_header_top_row_popup_top_avatar"
          />
          <p className="main_page_header_top_row_popup_top_name">
            {`${userData.name} ${userData.surname}`}
          </p>
        </div>
        <p
          onClick={() => {
            navigate("/profile/data");
            setLoggedUserPopupActive(false);
          }}
          className="main_page_header_top_row_popup_stroke"
        >
          Мой профиль
        </p>
        <p
          onClick={() => {
            navigate("/profile/messages");
            setLoggedUserPopupActive(false);
          }}
          className="main_page_header_top_row_popup_stroke"
        >
          Мои сообщения
        </p>
        <p
          onClick={() => {
            navigate("/profile/requests");
            setLoggedUserPopupActive(false);
          }}
          className="main_page_header_top_row_popup_stroke"
        >
          Запросы на съемку
        </p>
        <p
          onClick={() => {
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
            dispatch(toggleIsLoggenIn(false));
            navigate("/");
          }}
          className="main_page_header_top_row_popup_stroke"
        >
          Выйти
        </p>
      </div>
    </ClickAwayListener>
  );
};

export default LoggedUserPopup;
