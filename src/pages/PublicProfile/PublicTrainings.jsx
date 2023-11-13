import React from "react";
import SortImage from "../../img/sessions/sort.svg";
import { SelectInput } from "../../components";
import "../../styles/Profile/Training.scss";
import { useParams } from "react-router-dom";
import Requests from "../../http/axios-requests";
import { PublicHeader } from "..";
import { ScreenLoader } from "../../components";
import TrainingCardMain from "../../components/Previews/TrainingCardMain";
import SortImageInvert from "../../img/commonImages/sort-.svg";

const Training = () => {
  const params = useParams();
  const profileId = params.id;

  const [trainings, setTrainings] = React.useState();
  const [dataLoading, setDataLoading] = React.useState(true);
  const [profileData, setPorfileData] = React.useState();

  const [sortField, setSortField] = React.useState(1);
  const [sortType, setSortType] = React.useState("+");

  React.useEffect(() => {
    profileId &&
      Requests.getTrainingsList(
        profileId,
        sortField === 1 ? "id" : sortField === 2 ? "views" : "",
        sortType
      ).then((res) => {
        setDataLoading(false);
        setTrainings(res.data);
      });

    Requests.getPublicProfile(profileId).then((res) =>
      setPorfileData(res.data)
    );
  }, [profileId, sortType, sortField]);

  return (
    <div className="training">
      <PublicHeader profile={profileData} />
      <div className="training_header">
        <h1 className="training_header_title">ОБУЧЕНИЕ</h1>
        {false && (
          <div className="training_header_select">
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
      <div className="training_options">
        <div className="training_options_left">
          <p className="training_options_left_p">
            Всего:{" "}
            <span className="training_options_left_p_span">
              {trainings && trainings.length}
            </span>
          </p>
        </div>
      </div>
      <div className="training_cards">
        {trainings &&
          trainings.map((session, idx) => (
            <TrainingCardMain
              training={session}
              key={idx}
              notAuthor
              disableCheck
              disableEdit
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
    </div>
  );
};

export default Training;
