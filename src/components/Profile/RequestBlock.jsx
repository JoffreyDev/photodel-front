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
import Incoming from "../../img/requests/incoming.png";
import { useSelector } from "react-redux";

const RequestBlock = ({ request, notAuth }) => {
  const navigate = useNavigate();

  const { userData } = useSelector(({ userData }) => userData);
  return (
    <div
      onClick={
        !notAuth ? () => navigate(`/profile/request/${request.id}`) : () => {}
      }
      className="messages_chat_wrapper autoHeight"
    >
      {!notAuth && (
        <img
          src={`${rootAddress}${request.avatar}`}
          alt="avatar"
          className="messages_chat_avatar"
        />
      )}
      <div className="messages_chat_info">
        <div className="messages_chat_info_top">
          <div style={{ display: "flex", alignItems: "center" }}>
            {!notAuth && (
              <img
                src={request.online ? Online : Offline}
                alt="online"
                className="messages_chat_info_top_online"
              />
            )}
            {!notAuth && (
              <p className="messages_chat_info_top_name">{`${request.name_interviewer} ${request.surname_interviewer}`}</p>
            )}
            {notAuth && (
              <p className="messages_chat_info_top_name">{`${request.email}`}</p>
            )}
          </div>
          {!notAuth && (
            <p className="messages_chat_info_top_time">
              {request.date_last_message
                ? `${
                    request.date_last_message.split("").splice(8, 2)[0] === "0"
                      ? request.date_last_message
                          .split("")
                          .splice(9, 1)
                          .join("")
                      : request.date_last_message
                          .split("")
                          .splice(8, 2)
                          .join("")
                  } ${
                    request.date_last_message
                      .split("")
                      .splice(5, 2)
                      .join("") === "01"
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
                      ? "августа"
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
          )}
        </div>
        <div className="messages_chat_info_low">
          {!notAuth && (
            <p className="messages_chat_info_low_left_p">
              {request &&
                `${request.place_filming} | ${request.filming_timestamp
                  .split("")
                  .splice(8, 2)
                  .join("")}.${request.filming_timestamp
                  .split("")
                  .splice(5, 2)
                  .join("")}.${request.filming_timestamp
                  .split("")
                  .splice(0, 4)
                  .join("")} | ${request.hours_duration.split("ч").join(" ч")}`}
            </p>
          )}
          {notAuth && (
            <p className="messages_chat_info_low_left_p">
              {request && (
                <div className="chat_request_first_message_data_body">
                  <table className="chat_request_first_message_data_table">
                    <tr className="chat_request_first_message_data_table_tr">
                      <td className="chat_request_first_message_data_body_left_p">
                        Место съемки:
                      </td>
                      <td className="chat_request_first_message_data_body_right_p">
                        {request.place_filming}
                      </td>
                    </tr>
                    <tr className="chat_request_first_message_data_table_tr">
                      <td className="chat_request_first_message_data_body_left_p">
                        Дата съемки:
                      </td>
                      <td className="chat_request_first_message_data_body_right_p">
                        {`${request.filming_timestamp
                          .split("")
                          .splice(8, 2)
                          .join("")}.${request.filming_timestamp
                          .split("")
                          .splice(5, 2)
                          .join("")}.${request.filming_timestamp
                          .split("")
                          .splice(0, 4)
                          .join("")}`}
                      </td>
                    </tr>
                    <tr className="chat_request_first_message_data_table_tr">
                      <td className="chat_request_first_message_data_body_left_p">
                        Время:
                      </td>
                      <td className="chat_request_first_message_data_body_right_p">
                        {request.filming_timestamp
                          .split("")
                          .splice(11, 5)
                          .join("")}
                      </td>
                    </tr>
                    <tr className="chat_request_first_message_data_table_tr">
                      <td className="chat_request_first_message_data_body_left_p">
                        Тип съемки:
                      </td>
                      <td className="chat_request_first_message_data_body_right_p">
                        {request.filming_type}
                      </td>
                    </tr>
                    <tr className="chat_request_first_message_data_table_tr">
                      <td className="chat_request_first_message_data_body_left_p">
                        Кол-во человек:
                      </td>
                      <td className="chat_request_first_message_data_body_right_p">
                        {request.count_person}
                      </td>
                    </tr>
                    <tr className="chat_request_first_message_data_table_tr">
                      <td className="chat_request_first_message_data_body_left_p">
                        Бюджет съемки:
                      </td>
                      <td className="chat_request_first_message_data_body_right_p">
                        {request.filming_budget}
                      </td>
                    </tr>
                    <tr className="chat_request_first_message_data_table_tr">
                      <td className="chat_request_first_message_data_body_left_p">
                        Примечание:
                      </td>
                      <td className="chat_request_first_message_data_body_right_p">
                        {request.description}
                      </td>
                    </tr>
                  </table>
                </div>
              )}
            </p>
          )}
        </div>
        <div className="messages_chat_info_request_status">
          {!notAuth && (
            <img
              src={Incoming}
              alt="status"
              className={
                request.sender_id === userData.id
                  ? "messages_chat_info_request_status_income"
                  : "messages_chat_info_request_status_income reverse"
              }
            />
          )}
          {!notAuth && (
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
          )}
          {!notAuth && (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestBlock;
