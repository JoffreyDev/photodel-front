import React from "react";
import Trash from "../../img/trainings/trash.svg";
import Requests from "../../http/axios-requests";
import { useDispatch } from "react-redux";
import { openErrorAlert, openSuccessAlert } from "../../redux/actions/userData";
import { Submit } from "../../components";
import { useNavigate } from "react-router-dom";
import ChangePassword from "../../components/PopUps/ChangePassword";

const Settings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [submitOpen, setSubmitOpen] = React.useState();
  const [changePasswordOpen, setChangePasswordOpen] = React.useState();

  const deleteProfile = () => {
    Requests.deleteProfile()
      .then((res) => {
        dispatch(openSuccessAlert("Профиль успешно удален"));
        setSubmitOpen(false);
        navigate("/");
        window.location.reload();
      })
      .catch(() =>
        dispatch(openErrorAlert("При удалении аккаунта произошла ошибка!"))
      );
  };

  const changePassword = (oldPass, newPass) => {
    Requests.changePassword(oldPass, newPass)
      .then(() => {
        dispatch(openSuccessAlert("Пароль успешно изменен!"));
        setChangePasswordOpen(false);
      })
      .catch((e) => dispatch(openErrorAlert(e.response.data.message)));
  };

  return (
    <>
      <h1
        style={{ marginTop: "20px", marginBottom: "20px" }}
        className="places_header_title"
      >
        Смена пароля
      </h1>
      <div
        className="photos_options_right_add"
        onClick={() => setChangePasswordOpen(true)}
      >
        <label htmlFor="file_input" className="photos_options_right_add_p">
          Сменить пароль
        </label>
      </div>
      <h1
        style={{ marginTop: "20px", marginBottom: "20px" }}
        className="places_header_title"
      >
        Удаление аккаунта
      </h1>
      <div
        className="photos_options_right_add"
        onClick={() => setSubmitOpen(true)}
      >
        <img src={Trash} alt="add" className="photos_options_right_add_image" />
        <label htmlFor="file_input" className="photos_options_right_add_p">
          Удалить аккаунт
        </label>
      </div>
      <Submit
        modalActive={submitOpen}
        callback={deleteProfile}
        setModalActive={setSubmitOpen}
        setAction={() => setSubmitOpen("")}
        text={
          "Вы уверены, что хотите удалить свой профиль? Это действие невозможно отменить."
        }
      />

      <ChangePassword
        modalActive={changePasswordOpen}
        callback={changePassword}
        setModalActive={setChangePasswordOpen}
        setAction={() => setChangePasswordOpen("")}
      />
    </>
  );
};

export default Settings;
