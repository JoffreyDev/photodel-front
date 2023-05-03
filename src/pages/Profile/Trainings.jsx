import React from "react";
import SortImage from "../../img/sessions/sort.svg";
import { SelectInput, Checkbox } from "../../components";
import AddImage from "../../img/trainings/add.svg";
import "../../styles/Profile/Training.scss";
import { useNavigate } from "react-router-dom";
import Requests from "../../http/axios-requests";
import { useSelector, useDispatch } from "react-redux";
import { openSuccessAlert } from "../../redux/actions/userData";
import { ScreenLoader } from "../../components";
import TrainingCardMain from "../../components/Previews/TrainingCardMain";
import { Submit } from "../../components";
import SortImageInvert from "../../img/commonImages/sort-.svg";
import { openErrorAlert } from "../../redux/actions/userData";

const Trainings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userData } = useSelector(({ userData }) => userData);

  const [trainings, setTrainings] = React.useState();

  const [submitActive, setSubmitActive] = React.useState(false);

  const [selectedTrainings, setSelectedTrainings] = React.useState([]);
  const [allTrainingsSelected, setAlltrainingsSelected] = React.useState(false);
  const [action, setAction] = React.useState("");

  const [sortField, setSortField] = React.useState(1);
  const [sortType, setSortType] = React.useState("+");

  const [ignored, forceUpdate] = React.useReducer((x) => x + 1, 0);

  const [dataLoading, setDataLoading] = React.useState(true);

  React.useEffect(() => {
    if (!localStorage.getItem("access")) navigate("/");
  }, []);

  React.useEffect(() => {
    userData.id &&
      Requests.getTrainingsList(
        userData.id,
        sortField === 1 ? "id" : sortField === 2 ? "views" : "",
        sortType
      ).then((res) => {
        setDataLoading(false);
        setTrainings(res.data);
      });
  }, [userData.id, sortType, sortField]);

  React.useEffect(() => {
    if (action === 1) {
      setSubmitActive(true);
    }
  }, [action]);

  const deleteHandle = () => {
    Requests.deleteTraining(selectedTrainings).then((res) => {
      setSelectedTrainings([]);
      setAction("");
      Requests.getTrainingsList(userData.id).then((res) =>
        setTrainings(res.data)
      );
      dispatch(openSuccessAlert("Обучения успешно удалены!"));

      setSubmitActive(false);
    });
  };

  return (
    <div className="training">
      <div className="sessions_header">
        <h1 className="sessions_header_title">ОБУЧЕНИЯ</h1>
        <div className="sessions_header_select">
          <img
            src={
              sortType === "+"
                ? SortImage
                : sortType === "-"
                ? SortImageInvert
                : ""
            }
            onClick={() =>
              setSortType(sortType === "+" ? "-" : sortType === "-" ? "+" : "")
            }
            alt="sort"
            className="sessions_header_select_image"
          />
          <SelectInput
            values={[
              {
                id: 1,
                value: "По дате добавления",
              },
              {
                id: 2,
                value: "По популярности",
              },
            ]}
            width={190}
            nonBorder={true}
            fontSize={"13px"}
            marginBottom={"0px"}
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
          />
        </div>
      </div>
      <div className="places_options">
        <div className="places_options_left">
          <p className="places_options_left_p">
            Всего:{" "}
            <span className="places_options_left_p_span">
              {trainings && trainings.length}
            </span>
          </p>
          <Checkbox
            value={allTrainingsSelected}
            callback={() => {
              if (allTrainingsSelected) {
                allTrainingsSelected([]);
                setAlltrainingsSelected(false);
                forceUpdate();
              } else {
                trainings.forEach((training) =>
                  selectedTrainings.push(training.id)
                );
                allTrainingsSelected(selectedTrainings);
                setAlltrainingsSelected(true);
                forceUpdate();
              }
            }}
            marginBottom={"0px"}
            label={"Выбрать все"}
          />
          <div className="sessions_header_select mobile">
            <img
              src={
                sortType === "+"
                  ? SortImage
                  : sortType === "-"
                  ? SortImageInvert
                  : ""
              }
              onClick={() =>
                setSortType(
                  sortType === "+" ? "-" : sortType === "-" ? "+" : ""
                )
              }
              alt="sort"
              className="sessions_header_select_image"
            />
            <SelectInput
              values={[
                {
                  id: 1,
                  value: "По дате добавления",
                },
                {
                  id: 2,
                  value: "По популярности",
                },
              ]}
              width={190}
              nonBorder={true}
              fontSize={"13px"}
              marginBottom={"0px"}
              value={sortField}
              onChange={(e) => setSortField(e.target.value)}
            />
          </div>
        </div>

        <div className="places_options_right">
          <div className="places_options_right_add">
            <img
              src={AddImage}
              alt="add"
              className="places_options_right_add_image"
            />
            <p
              onClick={() => {
                if (userData.pro_account === 0) {
                  dispatch(
                    openErrorAlert(
                      "Чтобы добавить обучение, пожалуйста, обновитесь до пакета Стандарт"
                    )
                  );
                  return;
                } else if (
                  trainings.length >= 1 &&
                  userData?.pro_account === 1
                ) {
                  dispatch(
                    openErrorAlert(
                      "Чтобы добавить больше одного обучения, пожалуйста, обновитесь до пакета Максимум"
                    )
                  );
                  return;
                } else navigate("/profile/add-training");
              }}
              className="places_options_right_add_p"
            >
              Добавить мероприятие
            </p>
          </div>
          <SelectInput
            width={window.screen.width <= 576 ? 170 : 200}
            marginBottom={"10px"}
            values={[
              {
                id: 1,
                value: "Удалить",
              },
            ]}
            value={action}
            onChange={(e) => setAction(e.target.value)}
            label={"Выберите действие"}
            labelId="demo-multiple-name-label"
          />
        </div>
      </div>
      <div className="training_cards">
        {trainings &&
          trainings.map((training, idx) => (
            <TrainingCardMain
              training={training}
              key={idx}
              callback={setSelectedTrainings}
              array={selectedTrainings}
              halfContent={true}
            />
          ))}
        {trainings && trainings.length === 0 && (
          <div className="photos_cards_empty">
            <h1 className="photos_cards_empty_title">
              Нам жаль, обучений не найдено :(
            </h1>
          </div>
        )}
        {dataLoading && <ScreenLoader height={"30%"} />}
      </div>
      <Submit
        modalActive={submitActive}
        setModalActive={setSubmitActive}
        setAction={setAction}
        callback={deleteHandle}
      />
    </div>
  );
};

export default Trainings;
