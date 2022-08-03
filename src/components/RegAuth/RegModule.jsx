import React from "react";
import ModalWindow from "./ModalWindow";
import { GreenButton, Checkbox } from "..";
import Requests from "../../http/axios-requests";

const RegModule = ({
  regModuleActive,
  setRegModuleActive,
  switchModals,
  setEmailSentModalActive,
}) => {
  const passRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
  const contactEmailRegExp =
    /^((([0-9A-Za-z]{1}[-0-9A-z.]{0,30}[0-9A-Za-z]?)|([0-9А-Яа-я]{1}[-0-9А-я.]{0,30}[0-9А-Яа-я]?))@([-A-Za-z]{1,}\.){1,}[-A-Za-z]{2,})$/;

  //состояние контроля полей
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [passwordSubmit, setPasswordSubmit] = React.useState();

  const [name, setName] = React.useState();
  const [surname, setSurname] = React.useState();
  const [olderThan18, setOlderThan18] = React.useState(false);
  const [regAsProfi, setRegAsProfi] = React.useState(false);

  //обработчик отправки запроса на регистрацию
  const onClickSubmit = () => {
    if (!name) {
      alert("Не указано имя!");
      return;
    } else if (!surname) {
      alert("Не указана фамилия!");
      return;
    } else if (!email) {
      alert("Не указана почта!");
      return;
    } else if (!password) {
      alert("Не указан пароль!");
      return;
    } else if (!passwordSubmit) {
      alert("Пароль не подтвержден!");
      return;
    } else if (passwordSubmit !== password) {
      alert("Пароли не совпадают!");
      return;
    } else if (!passRegExp.test(password)) {
      alert(
        "Пароль должен содержать 8 символов, 1 строчную букву, 1 заглавную букву, 1 цифру!"
      );
      return;
    } else if (!contactEmailRegExp.test(email)) {
      alert("Введен некорректный Email!");
      return;
    }

    Requests.register(email, password, passwordSubmit).then((res) => {
      Requests.updateProfile(
        name,
        surname,
        email,
        olderThan18,
        regAsProfi,
        res.data.token
      ).then(() => {
        Requests.sendEmailSubmitLink(res.data.token)
          .then(() => {
            setEmailSentModalActive(true);
            setRegModuleActive(false);
            setEmail("");
            setPassword("");
            setPasswordSubmit("");
            setName("");
            setSurname("");
          })
          .catch(() =>
            alert("Ошибка регистрации. Проверьте правильность ввода полей")
          );
      });
    });
  };

  return (
    <ModalWindow
      moduleActive={regModuleActive}
      setModuleActive={setRegModuleActive}
    >
      <div className="reg_auth_header">
        <h1 className="reg_auth_header_title">Регистрация</h1>
        <svg
          style={{
            padding: "5px",
            boxSizing: "content-box",
            cursor: "pointer",
          }}
          onClick={() => setRegModuleActive(false)}
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
        <div className="reg_auth_content_input_wrapper">
          <label className="reg_auth_content_label">Имя</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="reg_auth_content_input"
          />
        </div>
        <div className="reg_auth_content_input_wrapper">
          <label className="reg_auth_content_label">Фамилия</label>
          <input
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            type="text"
            className="reg_auth_content_input"
          />
        </div>
        <div className="reg_auth_content_input_wrapper">
          <label className="reg_auth_content_label">E-mail</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
            type="text"
            className="reg_auth_content_input"
          />
        </div>
        <div className="reg_auth_content_input_wrapper">
          <label className="reg_auth_content_label">Пароль</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="reg_auth_content_input"
          />
        </div>
        <div className="reg_auth_content_input_wrapper">
          <label className="reg_auth_content_label">Повторите пароль</label>
          <input
            value={passwordSubmit}
            onChange={(e) => setPasswordSubmit(e.target.value)}
            type="password"
            className="reg_auth_content_input"
          />
        </div>
        <div style={{ alignSelf: "flex-start" }}>
          <Checkbox
            callback={() => setOlderThan18(!olderThan18)}
            value={olderThan18}
            label={"Мне есть 18 лет"}
          />
          <Checkbox
            callback={() => setRegAsProfi(!regAsProfi)}
            value={regAsProfi}
            label={"Я регистрируюсь как Профи"}
          />
        </div>
        <GreenButton
          callback={onClickSubmit}
          text="Зарегистрироваться"
          width={"100%"}
          height={"38px"}
        />
        <p className="reg_auth_content_lower_p" onClick={() => switchModals()}>
          У меня уже есть аккаунт
        </p>
      </div>
    </ModalWindow>
  );
};

export default RegModule;
