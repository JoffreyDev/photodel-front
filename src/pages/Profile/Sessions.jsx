import React from "react";
import SortImage from "../../img/sessions/sort.svg";
import { SelectInput, Checkbox, SessionCard } from "../../components";
import AddImage from "../../img/sessions/add.svg";
import "../../styles/Profile/Sessions.scss";
import { useNavigate } from "react-router-dom";
import Requests from "../../http/axios-requests";
import { useSelector, useDispatch } from "react-redux";
import { openErrorAlert, openSuccessAlert } from "../../redux/actions/userData";
import SortImageInvert from "../../img/commonImages/sort-.svg";
import { Submit } from "../../components";
import { ScreenLoader } from "../../components";
import {ReactComponent as Trash} from '../../img/commonImages/trash.svg'

const Sessions = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userData } = useSelector(({ userData }) => userData);

  const [sessions, setSessions] = React.useState();

  const [selectedSessions, setSelectedSessions] = React.useState([]);
  const [allSessionsSelected, setAllSessionsSelected] = React.useState(false);
  const [action, setAction] = React.useState("");

  const [submitActive, setSubmitActive] = React.useState(false);

  const [ignored, forceUpdate] = React.useReducer((x) => x + 1, 0);

  const [sortField, setSortField] = React.useState(1);
  const [sortType, setSortType] = React.useState("+");

  const [dataLoading, setDataLoading] = React.useState(true);

  React.useEffect(() => {
    if (!localStorage.getItem("access")) navigate("/");
  }, []);

  React.useEffect(() => {
    userData.id &&
      Requests.getSessions(
        userData.id,
        sortField === 1 ? "id" : sortField === 2 ? "views" : "",
        sortType
      ).then((res) => {
        setSessions(res.data);
        setDataLoading(false);
      });
  }, [userData.id, sortType, sortField]);

  const deleteHandle = () => {
    Requests.deleteSessions(selectedSessions).then((res) => {
      setSelectedSessions([]);
      setAction("");
      Requests.getSessions(userData.id).then((res) => setSessions(res.data));
      dispatch(openSuccessAlert("Фотосессии успешно удалены!"));

      setSubmitActive(false);
    });
  };


  return (
    <div className="sessions">
      <div className="sessions_header">
        <h1 className="sessions_header_title">ФОТОСЕССИИ</h1>
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
              {sessions && sessions.length}
            </span>
          </p>
          <Checkbox
            value={allSessionsSelected}
            callback={() => {
              if (allSessionsSelected) {
                setSelectedSessions([]);
                setAllSessionsSelected(false);
                forceUpdate();
              } else {
                sessions.forEach((session) =>
                  selectedSessions.push(session.id)
                );
                setSelectedSessions(selectedSessions);
                setAllSessionsSelected(true);
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
                if (sessions.length >= 1 && userData.pro_account === 0) {
                  dispatch(
                    openErrorAlert(
                      "Чтобы добавить больше 1 фотосессии, пожалуйста, обновитесь до пакета Стандарт"
                    )
                  );
                  return;
                } else if (sessions.length >= 3 && userData.pro_account === 1) {
                  dispatch(
                    openErrorAlert(
                      "Чтобы добавить больше 3 фотосессий, пожалуйста, обновитесь до пакета Максимум"
                    )
                  );
                  return;
                } else navigate("/profile/add-session");
              }}
              className="places_options_right_add_p"
            >
              Добавить фотосессию
            </p>
          </div>
          <Trash onClick={() => {
          if (selectedSessions.length === 0 ) {
            return 
          } else {
            setSubmitActive(true)
          }
         }} className="places_options_right_delete" />
        </div>
      </div>
      <div className="sessions_cards">
        {sessions &&
          sessions.map((session, idx) => (
            <SessionCard
              session={session}
              key={idx}
              callback={setSelectedSessions}
              array={selectedSessions}
            />
          ))}
        {sessions && sessions.length === 0 && (
          <div className="photos_cards_empty">
            <h1 className="photos_cards_empty_title">
              Нам жаль, фотосессий не найдено :(
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

export default Sessions;
