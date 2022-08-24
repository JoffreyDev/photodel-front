import React from "react";
import { rootAddress } from "../../http/axios-requests";
import Avatar from "../../img/photoView/avatar.png";
import Online from "../../img/sessions/online.svg";
import Offline from "../../img/commonImages/offline.svg";

const RequestFirstMessageBlock = ({ message }) => {
  return (
    <div className="chat_message_wrapper">
      <div className="chat_message_top">
        <img
          src={`${rootAddress}${message.avatar}`}
          alt="avatar"
          className="chat_message_top_avatar"
        />
        <img
          src={message.online !== "None" ? Online : Offline}
          alt="online"
          className="chat_message_top_online"
        />
        <p className="chat_message_top_name">{`${message.name} ${message.surname}`}</p>
        <p className="chat_message_top_time">
          {" "}
          {message.timestamp &&
            `${
              message.timestamp.split("").splice(8, 2)[0] === "0"
                ? message.timestamp.split("").splice(9, 1).join("")
                : message.timestamp.split("").splice(8, 2).join("")
            } ${
              message.timestamp.split("").splice(5, 2).join("") === "01"
                ? "января"
                : message.timestamp.split("").splice(5, 2).join("") === "02"
                ? "февраля"
                : message.timestamp.split("").splice(5, 2).join("") === "03"
                ? "марта"
                : message.timestamp.split("").splice(5, 2).join("") === "04"
                ? "апреля"
                : message.timestamp.split("").splice(5, 2).join("") === "05"
                ? "мая"
                : message.timestamp.split("").splice(5, 2).join("") === "06"
                ? "июня"
                : message.timestamp.split("").splice(5, 2).join("") === "07"
                ? "июля"
                : message.timestamp.split("").splice(5, 2).join("") === "08"
                ? "августа"
                : message.timestamp.split("").splice(5, 2).join("") === "09"
                ? "сентября"
                : message.timestamp.split("").splice(5, 2).join("") === "10"
                ? "октября"
                : message.timestamp.split("").splice(5, 2).join("") === "11"
                ? "ноября"
                : message.timestamp.split("").splice(5, 2).join("") === "12"
                ? "декабря"
                : ""
            }, ${message.timestamp.split("").splice(11, 5).join("")}`}
        </p>
      </div>
      <div className="chat_request_first_message">
        <p className="chat_request_first_message_title">Запрос на съемку</p>
        <div className="chat_request_first_message_data_body">
          <table className="chat_request_first_message_data_table">
            <tr className="chat_request_first_message_data_table_tr">
              <td className="chat_request_first_message_data_body_left_p">
                Место съемки:
              </td>
              <td className="chat_request_first_message_data_body_right_p">
                {message.place_filming}
              </td>
            </tr>
            <tr className="chat_request_first_message_data_table_tr">
              <td className="chat_request_first_message_data_body_left_p">
                Дата съемки:
              </td>
              <td className="chat_request_first_message_data_body_right_p">
                {`${message.filming_timestamp
                  .split("")
                  .splice(8, 2)
                  .join("")}.${message.filming_timestamp
                  .split("")
                  .splice(2, 2)
                  .join("")}.${message.filming_timestamp
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
                {message.filming_timestamp.split("").splice(11, 5).join("")}
              </td>
            </tr>
            <tr className="chat_request_first_message_data_table_tr">
              <td className="chat_request_first_message_data_body_left_p">
                Тип съемки:
              </td>
              <td className="chat_request_first_message_data_body_right_p">
                {message.filming_type}
              </td>
            </tr>
            <tr className="chat_request_first_message_data_table_tr">
              <td className="chat_request_first_message_data_body_left_p">
                Кол-во человек:
              </td>
              <td className="chat_request_first_message_data_body_right_p">
                {message.count_person}
              </td>
            </tr>
            <tr className="chat_request_first_message_data_table_tr">
              <td className="chat_request_first_message_data_body_left_p">
                Бюджет съемки:
              </td>
              <td className="chat_request_first_message_data_body_right_p">
                {message.filming_budget}
              </td>
            </tr>
            <tr className="chat_request_first_message_data_table_tr">
              <td className="chat_request_first_message_data_body_left_p">
                Примечание:
              </td>
              <td className="chat_request_first_message_data_body_right_p">
                {message.description}
              </td>
            </tr>
          </table>
          <div className="chat_request_first_message_data_body_right"></div>
        </div>
      </div>
    </div>
  );
};

export default RequestFirstMessageBlock;
