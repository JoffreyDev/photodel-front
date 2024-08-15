import React from "react";
import Trash from "../../img/trainings/trash.svg";
import Requests from "../../http/axios-requests";
import { useDispatch } from "react-redux";
import { openErrorAlert, openSuccessAlert } from "../../redux/actions/userData";
import { Submit } from "../../components";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [submitOpen, setSubmitOpen] = React.useState();

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

  return (
    <>
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
        text={
          "Вы уверены, что хотите удалить свой профиль? Это действие невозможно отменить."
        }
      />
    </>
  );
};

export default Settings;
