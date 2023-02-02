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

function TrainingRequest({
  profile,
  status,
  toMe,
  type,
  request_id,
  reload,
  request,
}) {
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

  const changeRequestStatus = (status) => {
    Requests.changeTrainingRequestStatus({
      request: request_id,
      status: status,
    })
      .then((res) => {
        dispatch(
          openSuccessAlert(
            status === "ACCEPTED"
              ? "Участник добавлен в обчуние!"
              : status === "REJECTED"
              ? "Запрос на обучение отклонен!"
              : ""
          )
        );
        reload(!reload);
      })
      .catch((err) => dispatch(openErrorAlert(err.response.data.error)));
  };

  return (
    <div className="team_card">
      <div className="team_card_avatar_wrapper">
        <img
          src={`data:image/png;base64,${profile.avatar}`}
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
            Запрос на{" "}
            {request.training.profile.id === userData.id ? "Ваше" : ""} обучение
            "{request.training.training_title}"{" "}
            {request.training.profile.id === userData.id
              ? ""
              : `пользователя ${
                  request.training.profile.name +
                  " " +
                  request.training.profile.surname
                }`}
          </p>
          <p className="team_card_info_third_specs">
            {profile && profile.string_location?.split(", ")[1]}
          </p>
        </div>
        {type === "request" && toMe && (
          <p className="team_card_info_fourth">Запрос мне</p>
        )}
        {type === "request" && !toMe && (
          <p className="team_card_info_fourth">Запрос от меня</p>
        )}
        {/* <p className='team_card_info_fourth delete'>Удалить из списка</p> */}
        {/* <p className='team_card_info_fourth reccomend'>Рекомендовать</p> */}
        {/* <p className='team_card_info_fourth reccomended'>Рекомендован</p> */}
        {type === "request" && status === "ACCEPTED" && (
          <p className="team_card_info_status accepted">ОДОБРЕН</p>
        )}
        {type === "request" && status === "AWAITING" && !toMe && (
          <p className="team_card_info_status pending">НА РАССМОТРЕНИИ</p>
        )}
        {type === "request" && status === "REJECTED" && (
          <p className="team_card_info_status rejected">ОТКЛОНЕН</p>
        )}
        {type === "request" && toMe && status === "AWAITING" && (
          <div className="team_card_info_status_buttons">
            <GreenButton
              text={"Принять"}
              width={"180px"}
              height={"38px"}
              margin={"10px 10px 0 0"}
              callback={() => changeRequestStatus("ACCEPTED")}
            />

            <RedButton
              text={"Отклонить"}
              width={"180px"}
              height={"38px"}
              margin={"10px 0 0 0"}
              callback={() => changeRequestStatus("REJECTED")}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default TrainingRequest;
