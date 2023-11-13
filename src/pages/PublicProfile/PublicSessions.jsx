import React from "react";
import SortImage from "../../img/sessions/sort.svg";
import { SelectInput, SessionCard } from "../../components";
import "../../styles/Profile/Sessions.scss";
import { useParams } from "react-router-dom";
import Requests from "../../http/axios-requests";
import { PublicHeader } from "..";
import { ScreenLoader } from "../../components";
import SortImageInvert from "../../img/commonImages/sort-.svg";

const Sessions = () => {
  const params = useParams();
  const profileId = params.id;

  const [sessions, setSessions] = React.useState();
  const [dataLoading, setDataLoading] = React.useState(true);
  const [profileData, setPorfileData] = React.useState();

  const [sortField, setSortField] = React.useState(1);
  const [sortType, setSortType] = React.useState("+");

  React.useEffect(() => {
    profileId &&
      Requests.getSessions(profileId).then((res) => {
        setDataLoading(false);
        setSessions(res.data);
      });

    Requests.getPublicProfile(profileId).then((res) =>
      setPorfileData(res.data)
    );
  }, [profileId]);

  return (
    <div className="sessions">
      <PublicHeader profile={profileData} />
      <div className="sessions_header">
        <h1 className="sessions_header_title">ФОТОСЕССИИ</h1>
        {false && (
          <div className="sessions_header_select">
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
      <div className="sessions_options">
        <div className="sessions_options_left">
          <p className="sessions_options_left_p">
            Всего:{" "}
            <span className="sessions_options_left_p_span">
              {sessions && sessions.length}
            </span>
          </p>
        </div>
      </div>
      <div className="sessions_cards">
        {sessions &&
          sessions.map((session, idx) => (
            <SessionCard
              session={session}
              key={idx}
              notAuthor
              disableCheck
              disableEdit
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
    </div>
  );
};

export default Sessions;
