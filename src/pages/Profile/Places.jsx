import React from "react";
import SortImage from "../../img/sessions/sort.svg";
import { SelectInput, Checkbox, PlaceCard } from "../../components";
import AddImage from "../../img/sessions/add.svg";
import "../../styles/Profile/Places.scss";
import { useNavigate } from "react-router-dom";
import Requests from "../../http/axios-requests";
import { useSelector, useDispatch } from "react-redux";
import { openSuccessAlert } from "../../redux/actions/userData";
import SortImageInvert from "../../img/commonImages/sort-.svg";

const Places = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userData } = useSelector(({ userData }) => userData);

  const [places, setPlaces] = React.useState();

  const [selectedPlaces, setSelectedPlaces] = React.useState([]);
  const [allPlacesSelected, setAllPlacesSelected] = React.useState(false);
  const [action, setAction] = React.useState("");

  const [ignored, forceUpdate] = React.useReducer((x) => x + 1, 0);

  const [sortField, setSortField] = React.useState(1);
  const [sortType, setSortType] = React.useState("+");

  React.useEffect(() => {
    userData.id &&
      Requests.getPlacesList(
        userData.id,
        sortField === 1 ? "id" : sortField === 2 ? "views" : "",
        sortType
      ).then((res) => setPlaces(res.data));
  }, [userData.id, sortType, sortField]);

  React.useEffect(() => {
    if (action === 1) {
      Requests.deleteFilmPlaces(selectedPlaces).then((res) => {
        setSelectedPlaces([]);
        setAction("");
        Requests.getPlacesList(userData.id).then((res) => setPlaces(res.data));
        dispatch(openSuccessAlert("Места успешно удалены!"));
      });
    }
  }, [action]);

  return (
    <div className="places">
      <div className="places_header">
        <h1 className="places_header_title">МЕСТА ДЛЯ СЪЕМОК</h1>
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
            className="places_header_select_image"
            onClick={() =>
              setSortType(sortType === "+" ? "-" : sortType === "-" ? "+" : "")
            }
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
              {places && places.length}
            </span>
          </p>
          <Checkbox
            value={allPlacesSelected}
            callback={() => {
              if (allPlacesSelected) {
                setSelectedPlaces([]);
                setAllPlacesSelected(false);
                forceUpdate();
              } else {
                places.forEach((place) => selectedPlaces.push(place.id));
                setSelectedPlaces(selectedPlaces);
                setAllPlacesSelected(true);
                forceUpdate();
              }
            }}
            marginBottom={"0px"}
            label={"Выбрать все"}
          />
        </div>

        <div className="places_options_right">
          <div className="places_options_right_add">
            <img
              src={AddImage}
              alt="add"
              className="places_options_right_add_image"
            />
            <p
              onClick={() => navigate("/profile/add-place")}
              className="places_options_right_add_p"
            >
              Добавить место для съемок
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
      <div className="places_cards">
        {places &&
          places.map((place, idx) => (
            <PlaceCard
              callback={setSelectedPlaces}
              array={selectedPlaces}
              place={place}
              key={idx}
            />
          ))}
      </div>
    </div>
  );
};

export default Places;
