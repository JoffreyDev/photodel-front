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

const Trainings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userData } = useSelector(({ userData }) => userData);

  const [trainings, setTrainings] = React.useState();

  const [submitActive, setSubmitActive] = React.useState(false);

  const [selectedTrainings, setSelectedtrainings] = React.useState([]);
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
      setSelectedtrainings([]);
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
      <div className="training_header">
        <h1 className="training_header_title">ОБУЧЕНИЕ</h1>
        <div className="training_header_select">
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
      <div className="training_options">
        <div className="training_options_left">
          <div className="training_options_right">
            <p className="training_options_left_p">
              Всего:{" "}
              <span className="training_options_left_p_span">
                {trainings && trainings.length}
              </span>
            </p>
            <Checkbox
              value={allTrainingsSelected}
              callback={() => {
                if (allTrainingsSelected) {
                  setSelectedtrainings([]);
                  setAlltrainingsSelected(false);
                  forceUpdate();
                } else {
                  trainings.forEach((training) =>
                    selectedTrainings.push(training.id)
                  );
                  setSelectedtrainings(selectedTrainings);
                  setAlltrainingsSelected(true);
                  forceUpdate();
                }
              }}
              marginBottom={"0px"}
              label={"Выбрать все"}
            />
          </div>
          <div className="training_options_right">
            <div className="training_options_right_add">
              <img
                src={AddImage}
                alt="add"
                className="training_options_right_add_image"
              />
              <p
                onClick={() => navigate("/profile/add-training")}
                className="training_options_right_add_p"
              >
                Добавить мероприятие
              </p>
            </div>
            <SelectInput
              width={200}
              marginBottom={"10px"}
              values={[
                {
                  id: 1,
                  value: "Удалить",
                },
              ]}
              value={action}
              placeholder={"Выберите действие"}
              onChange={(e) => setAction(e.target.value)}
              label={"Выберите действие"}
              labelId="demo-multiple-name-label"
            />
          </div>
        </div>
      </div>
      <div className="training_cards">
        {trainings &&
          trainings.map((training, idx) => (
            <TrainingCardMain
              training={training}
              key={idx}
              callback={setSelectedtrainings}
              array={selectedTrainings}
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
