import React from "react";
import SortImage from "../../img/sessions/sort.svg";
import { Checkbox, SelectInput, ProfileMainPreview } from "../../components";
import "../../styles/Profile/Team.scss";
import Requests from "../../http/axios-requests";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ScreenLoader } from "../../components";
import AddImage from "../../img/sessions/add.svg";
import TeamCard from "../../components/Previews/TeamCard";
import SortImageInvert from "../../img/commonImages/sort-.svg";

function PublicTeam() {
  const params = useParams();
  const profileId = params.id;

  const navigate = useNavigate();
  const { userCoords, userData } = useSelector(({ userData }) => userData);
  const [team, setTeam] = React.useState([]);
  const [requests, setRequests] = React.useState([]);
  const [component, setComponent] = React.useState("team");
  const [sortField, setSortField] = React.useState(1);
  const [sortType, setSortType] = React.useState("+");

  const [posCount, setPosCount] = React.useState("-");

  const [dataLoading, setDataLoading] = React.useState(true);

  React.useEffect(() => {
    setDataLoading(true);
    Requests.getTeamList(profileId, userCoords).then((res) => {
      setTeam(res.data);
      setPosCount(res.data.length);
      setDataLoading(false);
    });
  }, [component, userData]);

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
            КОМАНДА
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
        {false && (
          <div className="team_header_select">
            <img
              src={
                sortType === "+"
                  ? SortImage
                  : sortType === "-"
                  ? SortImageInvert
                  : ""
              }
              alt="sort"
              onClick={() =>
                setSortType(
                  sortType === "+" ? "-" : sortType === "-" ? "+" : ""
                )
              }
              className="places_header_select_image"
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
        )}
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
          <div
            style={{
              opacity: "0",
              pointerEvents: "none",
              position: "absolute",
            }}
          ></div>
          <div className="photos_options_left mobile">
            <p className="photos_options_left_p">
              Всего:{" "}
              <span className="photos_options_left_p_span">{posCount}</span>
            </p>
            {false && <Checkbox marginBottom={"0px"} label={"Выбрать все"} />}
          </div>
        </div>
      </div>
      <div className="team_header_add"></div>
      <div className="team_body">
        {team &&
          component === "team" &&
          !dataLoading &&
          team.map((profile, idx) => (
            <ProfileMainPreview key={idx} profile={profile} />
          ))}
        {team && component === "team" && team.length === 0 && !dataLoading && (
          <div className="photos_cards_empty">
            <h1 className="photos_cards_empty_title">Нет команды.</h1>
          </div>
        )}

        {dataLoading && <ScreenLoader height={"30%"} />}

        <div style={{ display: "flex", flexWrap: "wrap" }}></div>
      </div>
    </div>
  );
}

export default PublicTeam;
