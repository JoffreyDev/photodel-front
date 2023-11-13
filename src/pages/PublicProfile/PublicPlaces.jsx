import React from "react";
import SortImage from "../../img/sessions/sort.svg";
import { SelectInput, PlaceCard } from "../../components";
import "../../styles/Profile/Places.scss";
import { useParams } from "react-router-dom";
import Requests from "../../http/axios-requests";
import { PublicHeader } from "..";
import { ScreenLoader } from "../../components";
import SortImageInvert from "../../img/commonImages/sort-.svg";

const Places = () => {
  const params = useParams();
  const profileId = params.id;

  const [places, setPlaces] = React.useState();

  const [selectedPlaces, setSelectedPlaces] = React.useState([]);
  const [profileData, setPorfileData] = React.useState();

  const [dataLoading, setDataLoading] = React.useState(true);

  const [sortField, setSortField] = React.useState(1);
  const [sortType, setSortType] = React.useState("+");

  React.useEffect(() => {
    profileId &&
      Requests.getPlacesList(profileId).then((res) => {
        setPlaces(res.data);
        setDataLoading(false);
      });

    Requests.getPublicProfile(profileId).then((res) =>
      setPorfileData(res.data)
    );
  }, [profileId]);

  return (
    <div className="places">
      <PublicHeader profile={profileData} />
      <div className="places_header">
        <h1 className="places_header_title">МЕСТА ДЛЯ СЪЕМОК</h1>
        {false && (
          <div className="places_header_select">
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
      <div className="places_options">
        <div className="places_options_left">
          <p className="places_options_left_p">
            Всего:{" "}
            <span className="places_options_left_p_span">
              {places && places.length}
            </span>
          </p>
        </div>
      </div>
      <div className="places_cards">
        {places &&
          places.map((place, idx) => (
            <PlaceCard
              callback={setSelectedPlaces}
              array={selectedPlaces}
              place={place}
              key={idx}
              disableCheck
              disableEdit
              notAuthor
            />
          ))}
        {places && places.length === 0 && (
          <div className="photos_cards_empty">
            <h1 className="photos_cards_empty_title">
              Нам жаль, мест не найдено :(
            </h1>
          </div>
        )}
        {dataLoading && <ScreenLoader height={"30%"} />}
      </div>
    </div>
  );
};

export default Places;
