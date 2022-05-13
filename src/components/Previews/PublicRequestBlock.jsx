import React from "react";
import Online from "../../img/commonImages/online.svg";
import Offline from "../../img/commonImages/offline.svg";
import Avatar from "../../img/profile/avatar.png";
import New from "../../img/requests/new.svg";
import Accepted from "../../img/requests/add.svg";
import Completed from "../../img/requests/check.svg";
import Uncompleted from "../../img/requests/uncheсk.svg";
import { useNavigate } from "react-router-dom";
import Like from "../../img/commonImages/like.svg";
import Loading from "../../img/commonImages/loading.gif";

function PublicRequestBlock({ request }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/public/profile/${request.profile.id}`)}
      className="requests_public_preview"
    >
      <img
        src={`data:image/png;base64,${request.profile.avatar}`}
        alt="avatar"
        className="requests_public_preview_avatar"
      />
      <div className="requests_public_preview_data">
        <div className="requests_public_preview_data_upper">
          <img
            src={request.profile.user_channel_name ? Online : Offline}
            alt="online"
            className="requests_public_preview_data_upper_online"
          />
          <p className="requests_public_preview_data_upper_name">
            {`${request.profile.name} ${request.profile.surname}`}
          </p>
        </div>
        <p className="requests_public_preview_data_middle">
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
              .join("")} | ${request.hours_duration}`}
        </p>
        <div className="requests_public_preview_data_lower">
          <img
            src={
              request.filming_status === "NEW"
                ? New
                : request.filming_status === "ACCEPTED"
                ? Accepted
                : request.filming_status === "REJECTED"
                ? Uncompleted
                : request.filming_status === "COMPLETED"
                ? Completed
                : request.filming_status === "UNCOMPLETED"
                ? Uncompleted
                : ""
            }
            alt="new"
            className="requests_public_preview_data_lower_status"
          />
          <p className="requests_public_preview_data_lower_status_p">
            {request.filming_status === "NEW"
              ? "Новый"
              : request.filming_status === "ACCEPTED"
              ? "Принят"
              : request.filming_status === "REJECTED"
              ? "Отклонен"
              : request.filming_status === "COMPLETED"
              ? "Завершен"
              : request.filming_status === "UNCOMPLETED"
              ? "Не завершен"
              : ""}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PublicRequestBlock;
