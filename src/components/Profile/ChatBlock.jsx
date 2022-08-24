import React from "react";
import Avatar from "../../img/photoView/avatar.png";
import Online from "../../img/sessions/online.svg";
import Offline from "../../img/commonImages/offline.svg";
import { rootAddress } from "../../http/axios-requests";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ChatBlock = ({ data }) => {
  const navigate = useNavigate();

  const { userData } = useSelector(({ userData }) => userData);
  return (
    <div
      onClick={() => navigate(`/profile/chat/${data.id}`)}
      className="messages_chat_wrapper"
    >
      <img
        src={`${rootAddress}${data.avatar_interviewer}`}
        alt="avatar"
        className="messages_chat_avatar"
      />
      <div className="messages_chat_info">
        <div className="messages_chat_info_top">
          <div style={{ display: "flex" }}>
            <img
              src={data.online ? Online : Offline}
              alt="online"
              className="messages_chat_info_top_online"
            />
            <p className="messages_chat_info_top_name">{`${data.name_interviewer} ${data.surname_interviewer}`}</p>
          </div>
          <p className="messages_chat_info_top_time">
            {data.date_last_message
              ? `${
                  data.date_last_message.split("").splice(8, 2)[0] === "0"
                    ? data.date_last_message.split("").splice(9, 1).join("")
                    : data.date_last_message.split("").splice(8, 2).join("")
                } ${
                  data.date_last_message.split("").splice(5, 2).join("") ===
                  "01"
                    ? "января"
                    : data.date_last_message.split("").splice(5, 2).join("") ===
                      "02"
                    ? "февраля"
                    : data.date_last_message.split("").splice(5, 2).join("") ===
                      "03"
                    ? "марта"
                    : data.date_last_message.split("").splice(5, 2).join("") ===
                      "04"
                    ? "апреля"
                    : data.date_last_message.split("").splice(5, 2).join("") ===
                      "05"
                    ? "мая"
                    : data.date_last_message.split("").splice(5, 2).join("") ===
                      "06"
                    ? "июня"
                    : data.date_last_message.split("").splice(5, 2).join("") ===
                      "07"
                    ? "июля"
                    : data.date_last_message.split("").splice(5, 2).join("") ===
                      "08"
                    ? "августа"
                    : data.date_last_message.split("").splice(5, 2).join("") ===
                      "09"
                    ? "сентября"
                    : data.date_last_message.split("").splice(5, 2).join("") ===
                      "10"
                    ? "октября"
                    : data.date_last_message.split("").splice(5, 2).join("") ===
                      "11"
                    ? "ноября"
                    : data.date_last_message.split("").splice(5, 2).join("") ===
                      "12"
                    ? "декабря"
                    : ""
                }, ${data.date_last_message.split("").splice(11, 5).join("")}`
              : "Нет сообщений"}
          </p>
        </div>
        <div className="messages_chat_info_low">
          {data.last_message ? (
            <div className="messages_chat_info_low_left">
              <img
                src={
                  data.is_last_message
                    ? `${rootAddress}${userData.avatar_last_message}`
                    : `${rootAddress}${data.avatar_last_message}`
                }
                alt="avatar"
                className="messages_chat_info_low_left_avatar"
              />
              <p className="messages_chat_info_low_left_p">
                {data.last_message}
              </p>
            </div>
          ) : (
            <p className="messages_chat_info_top_time">
              В чате пока что пусто.
            </p>
          )}
          {data.not_read_messages !== 0 && (
            <div className="messages_chat_info_low_right">
              <p className="messages_chat_info_low_right_number">
                {data.not_read_messages}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatBlock;
