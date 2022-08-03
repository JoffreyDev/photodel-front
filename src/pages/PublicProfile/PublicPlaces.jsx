import React from "react";
import SortImage from "../../img/sessions/sort.svg";
import { SelectInput, Checkbox, PlaceCard } from "../../components";
import AddImage from "../../img/sessions/add.svg";
import "../../styles/Profile/Places.scss";
import { useNavigate, useParams } from "react-router-dom";
import Requests from "../../http/axios-requests";
import { useSelector, useDispatch } from "react-redux";
import { openSuccessAlert } from "../../redux/actions/userData";
import { PublicHeader } from "..";
import { ScreenLoader } from "../../components";

const Places = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const params = useParams();
  const profileId = params.id;

  const { userData } = useSelector(({ userData }) => userData);

  const [places, setPlaces] = React.useState();

  const [selectedPlaces, setSelectedPlaces] = React.useState([]);
  const [allPlacesSelected, setAllPlacesSelected] = React.useState(false);
  const [action, setAction] = React.useState("");
  const [profileData, setPorfileData] = React.useState();

  const [dataLoading, setDataLoading] = React.useState(true);

  const [ignored, forceUpdate] = React.useReducer((x) => x + 1, 0);

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
        <div className="places_header_select">
          <img
            src={SortImage}
            alt="sort"
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
          />
        </div>
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
