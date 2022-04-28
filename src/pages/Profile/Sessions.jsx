import React from "react";
import SortImage from "../../img/sessions/sort.svg";
import { SelectInput, Checkbox, SessionCard } from "../../components";
import AddImage from "../../img/sessions/add.svg";
import "../../styles/Profile/Sessions.scss";
import { useNavigate } from "react-router-dom";
import Requests from "../../http/axios-requests";
import { useSelector, useDispatch } from "react-redux";
import { openSuccessAlert } from "../../redux/actions/userData";
import SortImageInvert from "../../img/commonImages/sort-.svg";

const Sessions = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userData } = useSelector(({ userData }) => userData);

  const [sessions, setSessions] = React.useState();

  const [selectedSessions, setSelectedSessions] = React.useState([]);
  const [allSessionsSelected, setAllSessionsSelected] = React.useState(false);
  const [action, setAction] = React.useState("");

  const [ignored, forceUpdate] = React.useReducer((x) => x + 1, 0);

  const [sortField, setSortField] = React.useState(1);
  const [sortType, setSortType] = React.useState("+");

  React.useEffect(() => {
    userData.id &&
      Requests.getSessions(
        userData.id,
        sortField === 1 ? "id" : sortField === 2 ? "views" : "",
        sortType
      ).then((res) => setSessions(res.data));
  }, [userData.id, sortType, sortField]);

  React.useEffect(() => {
    if (action === 1) {
      Requests.deleteSessions(selectedSessions).then((res) => {
        setSelectedSessions([]);
        setAction("");
        Requests.getSessions(userData.id).then((res) => setSessions(res.data));
        dispatch(openSuccessAlert("Фотосессии успешно удалены!"));
      });
    }
  }, [action]);

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
      <div className="sessions_options">
        <div className="sessions_options_left">
          <p className="sessions_options_left_p">
            Всего:{" "}
            <span className="sessions_options_left_p_span">
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
        </div>

        <div className="sessions_options_right">
          <div className="sessions_options_right_add">
            <img
              src={AddImage}
              alt="add"
              className="sessions_options_right_add_image"
            />
            <p
              onClick={() => navigate("/profile/add-session")}
              className="sessions_options_right_add_p"
            >
              Добавить фотосессию
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
            onChange={(e) => setAction(e.target.value)}
            label={"Выберите действие"}
            labelId="demo-multiple-name-label"
          />
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
      </div>
    </div>
  );
};

export default Sessions;
