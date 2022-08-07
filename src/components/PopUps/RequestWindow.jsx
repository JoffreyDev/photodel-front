import React from "react";
import "../../styles/Profile/Requests.scss";
import {
  ModalWindow,
  GreenButton,
  TextInput,
  GreyButton,
  SingleDateInput,
} from "..";
import Online from "../../img/commonImages/online.svg";
import Offline from "../../img/commonImages/offline.svg";
import Requests from "../../http/axios-requests";
import { useDispatch } from "react-redux";
import { openErrorAlert, openSuccessAlert } from "../../redux/actions/userData";
import { useSelector } from "react-redux";

const RequestWindow = ({ active, setActive, user, width, notAlign }) => {
  const [time, setTime] = React.useState();
  const [duration, setDuration] = React.useState();
  const [message, setMessage] = React.useState();
  const [place, setPlace] = React.useState();
  const [type, setType] = React.useState();
  const [count, setCount] = React.useState();
  const [budget, setBudget] = React.useState();
  const [email, setEmail] = React.useState();
  const [code, setCode] = React.useState();

  const { isLoggedIn } = useSelector(({ userData }) => userData);

  const [step, setStep] = React.useState(1);

  const dispatch = useDispatch();

  const unsetData = () => {
    setTime("");
    setDuration("");
    setMessage("");
    setPlace("");
    setType("");
    setCount("");
    setBudget("");
  };

  const createRequestHandle = () => {
    if (isLoggedIn) {
      Requests.createNewRequest({
        filming_timestamp: time,
        hours_duration: duration,
        place_filming: place,
        filming_type: type,
        filming_status: "NEW",
        count_person: count,
        filming_budget: budget,
        description: message,
        place: place,
        request_receiver_id: user.id,
      })
        .then(() => {
          dispatch(openSuccessAlert("Запрос успешно отправлен!"));
          setActive(false);
        })
        .catch(() => dispatch(openErrorAlert("Произошла ошибка")));
    } else {
      Requests.createNewRequestUnauth({
        filming_timestamp: time,
        hours_duration: duration,
        place_filming: place,
        filming_type: type,
        filming_status: "NEW",
        count_person: count,
        filming_budget: budget,
        description: message,
        place: place,
        request_receiver_id: user.id,
        email: email,
      })
        .then(() => {
          dispatch(openSuccessAlert("Запрос успешно отправлен!"));
          setStep(2);
        })
        .catch(() => dispatch(openErrorAlert("Произошла ошибка")));
    }
  };

  const handleCheck = () => {
    Requests.checkUnauthRequest({ code: code, email: email }).then(() =>
      dispatch(openSuccessAlert("Запрос успешно отправлен!"))
    );
  };

  return (
    <ModalWindow
      width={width ? width : "40vw"}
      moduleActive={active}
      setModuleActive={setActive}
      notAlign={notAlign}
    >
      {step === 1 && (
        <div>
          <div className="reg_auth_header">
            <h1 className="reg_auth_header_title">Запрос на съемку</h1>
            <svg
              style={{
                padding: "5px",
                boxSizing: "content-box",
                cursor: "pointer",
              }}
              onClick={() => setActive(false)}
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.41 6.99994L12.71 2.70994C12.8983 2.52164 13.0041 2.26624 13.0041 1.99994C13.0041 1.73364 12.8983 1.47825 12.71 1.28994C12.5217 1.10164 12.2663 0.99585 12 0.99585C11.7337 0.99585 11.4783 1.10164 11.29 1.28994L7 5.58994L2.71 1.28994C2.5217 1.10164 2.2663 0.99585 2 0.99585C1.7337 0.99585 1.4783 1.10164 1.29 1.28994C1.1017 1.47825 0.995908 1.73364 0.995908 1.99994C0.995908 2.26624 1.1017 2.52164 1.29 2.70994L5.59 6.99994L1.29 11.2899C1.19627 11.3829 1.12188 11.4935 1.07111 11.6154C1.02034 11.7372 0.994202 11.8679 0.994202 11.9999C0.994202 12.132 1.02034 12.2627 1.07111 12.3845C1.12188 12.5064 1.19627 12.617 1.29 12.7099C1.38296 12.8037 1.49356 12.8781 1.61542 12.9288C1.73728 12.9796 1.86799 13.0057 2 13.0057C2.13201 13.0057 2.26272 12.9796 2.38458 12.9288C2.50644 12.8781 2.61704 12.8037 2.71 12.7099L7 8.40994L11.29 12.7099C11.383 12.8037 11.4936 12.8781 11.6154 12.9288C11.7373 12.9796 11.868 13.0057 12 13.0057C12.132 13.0057 12.2627 12.9796 12.3846 12.9288C12.5064 12.8781 12.617 12.8037 12.71 12.7099C12.8037 12.617 12.8781 12.5064 12.9289 12.3845C12.9797 12.2627 13.0058 12.132 13.0058 11.9999C13.0058 11.8679 12.9797 11.7372 12.9289 11.6154C12.8781 11.4935 12.8037 11.3829 12.71 11.2899L8.41 6.99994Z"
                fill="#50A398"
              />
            </svg>
          </div>
          <div className="requests_window_user_data">
            <img
              src={`data:image/png;base64,${user && user.avatar}`}
              alt="avatar"
              className="requests_window_user_data_avatar"
            />
            <img
              src={user && user.user_channel_name ? Online : Offline}
              alt="online"
              className="requests_window_user_data_online"
            />
            <p className="requests_window_user_data_name">
              {user && `${user.name} ${user.surname}`}
            </p>
          </div>
          <div className="requests_window_fields">
            <div className="requests_window_field">
              <SingleDateInput
                label={"Дата и время съемки"}
                width={"100%"}
                height={"38px"}
                value={time}
                callback={setTime}
              />
            </div>{" "}
            <div className="requests_window_field">
              <TextInput
                label={"Длительность, часов"}
                width={"100%"}
                height={"38px"}
                value={duration}
                callback={setDuration}
              />
            </div>{" "}
            <div className="requests_window_field">
              <TextInput
                label={"Место проведения"}
                width={"100%"}
                height={"38px"}
                value={place}
                callback={setPlace}
              />
            </div>{" "}
            <div className="requests_window_field">
              <TextInput
                label={"Тип съемки"}
                width={"100%"}
                height={"38px"}
                value={type}
                callback={setType}
              />
            </div>{" "}
            <div className="requests_window_field">
              <TextInput
                label={"Количество человек"}
                width={"100%"}
                height={"38px"}
                value={count}
                callback={setCount}
              />
            </div>
            <div className="requests_window_field">
              <TextInput
                label={"Бюджет съемки"}
                width={"100%"}
                height={"38px"}
                value={budget}
                callback={setBudget}
              />
            </div>
            {!isLoggedIn && (
              <div className="requests_window_field">
                <TextInput
                  label={"Ваш Email для подтверждения"}
                  width={"100%"}
                  height={"38px"}
                  value={email}
                  callback={setEmail}
                />
              </div>
            )}
          </div>
          <div className="requests_window_textarea">
            <label className="common_text_input_label">Примечание</label>
            <textarea
              style={{ resize: "none", width: "100%", marginTop: "5px" }}
              className="my_profile_about_textarea"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div className="requests_window_buttons">
            <GreyButton
              text={"Сбросить"}
              width={"180px"}
              height={"38px"}
              callback={unsetData}
            />
            <GreenButton
              text={isLoggedIn ? "Отправить" : "Далее"}
              width={"180px"}
              height={"38px"}
              margin={"12px 0 0 0 "}
              callback={createRequestHandle}
            />
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <div className="reg_auth_header">
            <h1 className="reg_auth_header_title">Запрос на съемку</h1>
            <svg
              style={{ padding: "5px", boxSizing: "content-box" }}
              onClick={() => setActive(false)}
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.41 6.99994L12.71 2.70994C12.8983 2.52164 13.0041 2.26624 13.0041 1.99994C13.0041 1.73364 12.8983 1.47825 12.71 1.28994C12.5217 1.10164 12.2663 0.99585 12 0.99585C11.7337 0.99585 11.4783 1.10164 11.29 1.28994L7 5.58994L2.71 1.28994C2.5217 1.10164 2.2663 0.99585 2 0.99585C1.7337 0.99585 1.4783 1.10164 1.29 1.28994C1.1017 1.47825 0.995908 1.73364 0.995908 1.99994C0.995908 2.26624 1.1017 2.52164 1.29 2.70994L5.59 6.99994L1.29 11.2899C1.19627 11.3829 1.12188 11.4935 1.07111 11.6154C1.02034 11.7372 0.994202 11.8679 0.994202 11.9999C0.994202 12.132 1.02034 12.2627 1.07111 12.3845C1.12188 12.5064 1.19627 12.617 1.29 12.7099C1.38296 12.8037 1.49356 12.8781 1.61542 12.9288C1.73728 12.9796 1.86799 13.0057 2 13.0057C2.13201 13.0057 2.26272 12.9796 2.38458 12.9288C2.50644 12.8781 2.61704 12.8037 2.71 12.7099L7 8.40994L11.29 12.7099C11.383 12.8037 11.4936 12.8781 11.6154 12.9288C11.7373 12.9796 11.868 13.0057 12 13.0057C12.132 13.0057 12.2627 12.9796 12.3846 12.9288C12.5064 12.8781 12.617 12.8037 12.71 12.7099C12.8037 12.617 12.8781 12.5064 12.9289 12.3845C12.9797 12.2627 13.0058 12.132 13.0058 11.9999C13.0058 11.8679 12.9797 11.7372 12.9289 11.6154C12.8781 11.4935 12.8037 11.3829 12.71 11.2899L8.41 6.99994Z"
                fill="#50A398"
              />
            </svg>
          </div>
          <div className="reg_auth_content_fields">
            <p
              className="reg_auth_content_lower_p"
              style={{ textAlign: "center", marginBottom: "20px" }}
            >
              Письмо с кодом для подтверждения запроса отправлено на Вашу почту.
              Введите его ниже.
            </p>
            <TextInput
              label={"Код из письма"}
              width={"100%"}
              height={"38px"}
              value={code}
              callback={setCode}
            />
            <GreenButton
              text={"Отправить"}
              width={"180px"}
              height={"38px"}
              margin={"12px 0 0 0 "}
              callback={handleCheck}
            />
          </div>
        </div>
      )}
    </ModalWindow>
  );
};

export default RequestWindow;
