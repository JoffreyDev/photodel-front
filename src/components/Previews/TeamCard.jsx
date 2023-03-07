import React from "react";
import "../../styles/Profile/Team.scss";
import Online from "../../img/commonImages/online.svg";
import GreenButton from "../../components/common/GreenButton";
import { useNavigate } from "react-router-dom";
import Offline from "../../img/commonImages/offline.svg";
import Requests from "../../http/axios-requests";
import { useSelector, useDispatch } from "react-redux";
import { openErrorAlert, openSuccessAlert } from "../../redux/actions/userData";
import RedButton from "../common/RedButton";
import { rootAddress } from "../../http/axios-requests";

function TeamCard({ profile, status, toMe, type, request_id, reload, base64 }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector(({ userData }) => userData);

  const inviteToTeam = () => {
    Requests.inviteToTeam({
      sender_id: userData.id,
      receiver_id: profile.id,
    })
      .then(() =>
        dispatch(openSuccessAlert("Приглашение в команду отправлено!"))
      )
      .catch((err) => dispatch(openErrorAlert(err.response.data.error)));
  };

  const changeInviteStatus = (status) => {
    Requests.changeInviteStatus({
      request_id: request_id,
      request_status: status,
    })
      .then((res) => {
        dispatch(
          openSuccessAlert(
            status === "ACCEPTED"
              ? "Приглашение в команду принято!"
              : status === "REJECTED"
              ? "Приглашение в команду отклонено!"
              : ""
          )
        );
        reload();
      })
      .catch((err) => dispatch(openErrorAlert(err.response.data.error)));
  };

  return (
    <div className="team_card">
      <div className="team_card_avatar_wrapper">
        <img
          src={
            !base64
              ? profile && `${rootAddress}${profile && profile.avatar}`
              : `data:image/png;base64,${profile && profile.avatar}`
          }
          alt="avatar"
          className="team_card_avatar"
          onClick={() => navigate(`/public/profile/${profile.id}`)}
        />
      </div>
      <div className="team_card_info">
        <div className="team_card_info_first">
          <img
            src={profile?.user_channel_name ? Online : Offline}
            alt="online"
            className="team_card_info_first_online"
          />
          <p
            className="team_card_info_first_name"
            onClick={() => navigate(`/public/profile/${profile.id}`)}
          >
            {`${profile && profile.name}  ${profile && profile.surname}`}
          </p>
        </div>
        <div className="team_card_info_third">
          <p className="team_card_info_third_category">
            {profile && profile.type_pro?.name_category}
          </p>
          <p className="team_card_info_third_specs">
            {profile && profile.string_location?.split(", ")[1]}
          </p>
        </div>
        {type === "search" && (
          <GreenButton
            text={"Отправить запрос"}
            width={"180px"}
            height={"38px"}
            margin={"10px 0 0 0"}
            callback={inviteToTeam}
          />
        )}
        {type === "request" && toMe && status !== "AWAITING" && (
          <p className="team_card_info_fourth">Запрос мне</p>
        )}
        {/* <p className='team_card_info_fourth delete'>Удалить из списка</p> */}
        {/* <p className='team_card_info_fourth reccomend'>Рекомендовать</p> */}
        {/* <p className='team_card_info_fourth reccomended'>Рекомендован</p> */}
        {type === "request" && status === "ACCEPTED" && !toMe && (
          <p className="team_card_info_status accepted">ОДОБРЕН</p>
        )}
        {type === "request" && status === "AWAITING" && !toMe && (
          <p className="team_card_info_status pending">НА РАССМОТРЕНИИ</p>
        )}
        {type === "request" && status === "REJECTED" && !toMe && (
          <p className="team_card_info_status rejected">ОТКЛОНЕН</p>
        )}
        {type === "request" && toMe && status === "AWAITING" && (
          <div className="team_card_info_status_buttons">
            <GreenButton
              text={"Принять"}
              width={"180px"}
              height={"38px"}
              margin={"10px 10px 0 0"}
              callback={() => changeInviteStatus("ACCEPTED")}
            />

            <RedButton
              text={"Отклонить"}
              width={"180px"}
              height={"38px"}
              margin={"10px 0 0 0"}
              callback={() => changeInviteStatus("REJECTED")}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default TeamCard;
