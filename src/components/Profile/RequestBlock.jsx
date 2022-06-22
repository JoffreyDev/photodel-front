import React from "react";
import { rootAddress } from "../../http/axios-requests";
import Avatar from "../../img/photoView/avatar.png";
import Online from "../../img/sessions/online.svg";
import { useNavigate } from "react-router-dom";
import Offline from "../../img/commonImages/offline.svg";
import New from "../../img/requests/new.svg";
import Accepted from "../../img/requests/add.svg";
import Completed from "../../img/requests/check.svg";
import Uncompleted from "../../img/requests/uncheсk.svg";

const RequestBlock = ({ request }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/profile/request/${request.id}`)}
      className="messages_chat_wrapper"
    >
      <img
        src={`${rootAddress}${request.avatar}`}
        alt="avatar"
        className="messages_chat_avatar"
      />
      <div className="messages_chat_info">
        <div className="messages_chat_info_top">
          <div style={{ display: "flex" }}>
            <img
              src={request.online ? Online : Offline}
              alt="online"
              className="messages_chat_info_top_online"
            />
            <p className="messages_chat_info_top_name">{`${request.name_interviewer} ${request.surname_interviewer}`}</p>
          </div>
          <p className="messages_chat_info_top_time">
            {request.date_last_message
              ? `${
                  request.date_last_message.split("").splice(8, 2)[0] === "0"
                    ? request.date_last_message.split("").splice(9, 1).join("")
                    : request.date_last_message.split("").splice(8, 2).join("")
                } ${
                  request.date_last_message.split("").splice(5, 2).join("") ===
                  "01"
                    ? "января"
                    : request.date_last_message
                        .split("")
                        .splice(5, 2)
                        .join("") === "02"
                    ? "февраля"
                    : request.date_last_message
                        .split("")
                        .splice(5, 2)
                        .join("") === "03"
                    ? "марта"
                    : request.date_last_message
                        .split("")
                        .splice(5, 2)
                        .join("") === "04"
                    ? "апреля"
                    : request.date_last_message
                        .split("")
                        .splice(5, 2)
                        .join("") === "05"
                    ? "мая"
                    : request.date_last_message
                        .split("")
                        .splice(5, 2)
                        .join("") === "06"
                    ? "июня"
                    : request.date_last_message
                        .split("")
                        .splice(5, 2)
                        .join("") === "07"
                    ? "июля"
                    : request.date_last_message
                        .split("")
                        .splice(5, 2)
                        .join("") === "08"
                    ? "авугста"
                    : request.date_last_message
                        .split("")
                        .splice(5, 2)
                        .join("") === "09"
                    ? "сентября"
                    : request.date_last_message
                        .split("")
                        .splice(5, 2)
                        .join("") === "10"
                    ? "октября"
                    : request.date_last_message
                        .split("")
                        .splice(5, 2)
                        .join("") === "11"
                    ? "ноября"
                    : request.date_last_message
                        .split("")
                        .splice(5, 2)
                        .join("") === "12"
                    ? "декабря"
                    : ""
                }, ${request.date_last_message
                  .split("")
                  .splice(11, 5)
                  .join("")}`
              : "Нет сообщений"}
          </p>
        </div>
        <div className="messages_chat_info_low">
          <p className="messages_chat_info_low_left_p">
            {request &&
              `${request.place_filming} | ${request.filming_timestamp
                .split("")
                .splice(8, 2)
                .join("")}.${request.filming_timestamp
                .split("")
                .splice(2, 2)
                .join("")}.${request.filming_timestamp
                .split("")
                .splice(0, 4)
                .join("")} | ${request.hours_duration.split("ч").join(" ч")}`}
          </p>
        </div>
        <div className="messages_chat_info_request_status">
          <img
            src={
              request.request_status === "NEW"
                ? New
                : request.request_status === "ACCEPTED"
                ? Accepted
                : request.request_status === "COMPLETED"
                ? Completed
                : request.request_status === "UNCOMPLETED"
                ? Uncompleted
                : request.request_status === "REJECTED"
                ? Uncompleted
                : ""
            }
            alt="status"
            className="messages_chat_info_request_status_img"
          />
          <div className="messages_chat_info_request_status_p">
            {request.request_status === "NEW"
              ? "Новый"
              : request.request_status === "ACCEPTED"
              ? "Принят"
              : request.request_status === "COMPLETED"
              ? "Завершен"
              : request.request_status === "UNCOMPLETED"
              ? "Отклонен"
              : request.request_status === "REJECTED"
              ? "Отклонен"
              : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestBlock;
