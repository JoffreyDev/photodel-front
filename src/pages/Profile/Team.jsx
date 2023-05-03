import React from "react";
import SortImage from "../../img/sessions/sort.svg";
import { Checkbox, SelectInput, ProfileMainPreview } from "../../components";
import "../../styles/Profile/Team.scss";
import Requests from "../../http/axios-requests";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ScreenLoader } from "../../components";
import AddImage from "../../img/sessions/add.svg";
import TeamCard from "../../components/Previews/TeamCard";
import { openErrorAlert } from "../../redux/actions/userData";
import { useDispatch } from "react-redux";

function Team() {
  const navigate = useNavigate();
  const { userData } = useSelector(({ userData }) => userData);
  const dispatch = useDispatch();
  const [recs, setRecs] = React.useState([]);
  const [team, setTeam] = React.useState([]);
  const [requests, setRequests] = React.useState([]);
  const [component, setComponent] = React.useState("team");
  const [sortType, setSortType] = React.useState(1);
  const [action, setAction] = React.useState(1);
  const [selectedPositions, setSelectedPositions] = React.useState([]);

  const [reload, toggleReload] = React.useState(false);

  const [posCount, setPosCount] = React.useState("-");

  const [dataLoading, setDataLoading] = React.useState(true);
  let incomingRequests;
  let outgoingRequests;
  let resultArray;

  const { userCoords } = useSelector(({ userData }) => userData);

  React.useEffect(() => {
    if (userData) {
      setDataLoading(true);
      if (component === "requests") {
        Requests.getIncomingTeamRequests(userData.id).then((res) => {
          incomingRequests = res.data;
          Requests.getOutgoingTeamRequests(userData.id).then((res) => {
            outgoingRequests = res.data;
            resultArray = outgoingRequests.concat(incomingRequests);
            resultArray.sort((a, b) => a.id > b.id).reverse();
            setPosCount(resultArray.length);
            setRequests(resultArray);
            setDataLoading(false);
          });
        });
      } else if (component === "team") {
        Requests.getTeamList(userData.id, userCoords).then((res) => {
          setTeam(res.data);
          setPosCount(res.data.length);
          setDataLoading(false);
        });
      }
    }
  }, [component, userData, reload]);

  React.useEffect(() => {
    if (!localStorage.getItem("access")) navigate("/");
  }, []);

  return (
    <div className="team">
      <div className="team_header">
        <div className="team_header_wrapper">
          <h1
            className={
              component === "team"
                ? "team_header_title_first active"
                : "team_header_title_first"
            }
            onClick={() => setComponent("team")}
          >
            МОЯ КОМАНДА
          </h1>
          {false && (
            <h1
              className={
                component === "requests"
                  ? "team_header_title_first active"
                  : "team_header_title_first"
              }
              onClick={() => setComponent("requests")}
            >
              ЗАПРОСЫ
            </h1>
          )}
          {false && (
            <h1
              className={
                component === "recs"
                  ? "team_header_title_first active"
                  : "team_header_title_first"
              }
              onClick={() => setComponent("recs")}
            >
              РЕКОМЕНДАЦИИ
            </h1>
          )}
        </div>
        <div className="team_header_select">
          <img
            src={SortImage}
            alt="sort"
            className="team_header_select_image"
            style={{ opacity: "0", pointerEvents: "none" }}
          />
          <div style={{ opacity: "0", pointerEvents: "none" }}>
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
              value={sortType}
            />
          </div>
        </div>
      </div>
      <div className="photos_options">
        <div
          className="photos_options_left favorites"
          style={{ marginBottom: "20px" }}
        >
          <p className="photos_options_left_p">
            Всего:{" "}
            <span className="photos_options_left_p_span">{posCount}</span>
          </p>
          <div style={{ opacity: "0", pointerEvents: "none" }}>
            <Checkbox marginBottom={"0px"} label={"Выбрать все"} />
          </div>
        </div>

        <div className="photos_options_right">
          <div className="training_options_right_add">
            <img
              src={AddImage}
              alt="add"
              className="training_options_right_add_image"
            />
            <p
              onClick={() => {
                if (userData?.pro_account === 0) {
                  dispatch(
                    openErrorAlert(
                      "Чтобы добавить кого-то в команду, пожалуйста, обновитесь до пакета Стандарт"
                    )
                  );
                  return;
                } else navigate("/profile/invite-to-team");
              }}
              className="training_options_right_add_p"
            >
              Добавить в команду
            </p>
          </div>
          <div
            style={{
              opacity: "0",
              pointerEvents: "none",
              position: "absolute",
            }}
          >
            <SelectInput
              width={window.screen.width <= 576 ? 170 : 200}
              marginBottom={"10px"}
              values={[
                {
                  id: 1,
                  value: "Удалить",
                },
              ]}
              onChange={(e) => setAction(e.target.value)}
              label={"Выберите действие"}
              labelId="demo-multiple-name-label"
            />
          </div>
          <div className="photos_options_left mobile">
            <p className="photos_options_left_p">
              Всего: <span className="photos_options_left_p_span">0</span>
            </p>
            <Checkbox marginBottom={"0px"} label={"Выбрать все"} />
          </div>
        </div>
      </div>
      <div className="team_header_add"></div>
      <div className="team_body">
        {team &&
          component === "team" &&
          !dataLoading &&
          team.map((profile, idx) => (
            <ProfileMainPreview
              key={idx}
              profile={profile}
              reload={toggleReload}
            />
          ))}
        {team && component === "team" && team.length === 0 && !dataLoading && (
          <div className="photos_cards_empty">
            <h1 className="photos_cards_empty_title">Нет команды.</h1>
          </div>
        )}

        {dataLoading && <ScreenLoader height={"30%"} />}

        {requests &&
          component === "requests" &&
          !dataLoading &&
          requests.map((request, idx) => (
            <TeamCard
              type={"request"}
              key={idx}
              profile={request.invite_receiver}
              status={request.status}
              toMe={request.invite_receiver.id === userData.id}
              request_id={request.id}
              reload={toggleReload}
            />
          ))}
        {requests &&
          component === "requests" &&
          requests.length === 0 &&
          !dataLoading && (
            <div className="photos_cards_empty">
              <h1 className="photos_cards_empty_title">
                Нет приглашений в команду.
              </h1>
            </div>
          )}

        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {/*  {recs &&
            component === "recs" &&
            !dataLoading &&
            recs.map((rec, idx) => (
              <PlaceCard
                array={selectedPositions}
                callback={setSelectedPositions}
                key={idx}
              />
            ))}
          {recs &&
            component === "recs" &&
            recs.length === 0 &&
            !dataLoading && (
              <div className="photos_cards_empty">
                <h1 className="photos_cards_empty_title">Нет рекомендаций.</h1>
              </div>
            )} */}
        </div>
      </div>
    </div>
  );
}

export default Team;
