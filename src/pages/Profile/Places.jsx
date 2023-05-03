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
import { Submit } from "../../components";
import { ScreenLoader } from "../../components";
import { openErrorAlert } from "../../redux/actions/userData";

const Places = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userData } = useSelector(({ userData }) => userData);

  const [places, setPlaces] = React.useState();

  const [selectedPlaces, setSelectedPlaces] = React.useState([]);
  const [allPlacesSelected, setAllPlacesSelected] = React.useState(false);
  const [action, setAction] = React.useState("");

  const [ignored, forceUpdate] = React.useReducer((x) => x + 1, 0);

  const [submitActive, setSubmitActive] = React.useState(false);

  const [sortField, setSortField] = React.useState(1);
  const [sortType, setSortType] = React.useState("+");

  const [dataLoading, setDataLoading] = React.useState(true);

  React.useEffect(() => {
    if (!localStorage.getItem("access")) navigate("/");
  }, []);

  React.useEffect(() => {
    userData.id &&
      Requests.getPlacesList(
        userData.id,
        sortField === 1 ? "id" : sortField === 2 ? "views" : "",
        sortType
      ).then((res) => {
        setDataLoading(false);
        setPlaces(res.data);
      });
  }, [userData.id, sortType, sortField]);

  const deleteHandle = () => {
    Requests.deleteFilmPlaces(selectedPlaces).then((res) => {
      setSelectedPlaces([]);
      setAction("");
      Requests.getPlacesList(userData.id).then((res) => setPlaces(res.data));
      dispatch(openSuccessAlert("Места успешно удалены!"));
      setSubmitActive(false);
    });
  };

  React.useEffect(() => {
    if (action === 1) {
      setSubmitActive(true);
    }
  }, [action]);

  return (
    <div className="places">
      <div className="places_header">
        <h1 className="places_header_title">МЕСТА ДЛЯ СЪЕМОК</h1>
        <p className="photos_options_left_p mobile noBorder">
          Всего:{" "}
          <span className="photos_options_left_p_span">
            {places && places.length}
          </span>
        </p>
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
          <div className="places_header_select mobile">
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
                setSortType(
                  sortType === "+" ? "-" : sortType === "-" ? "+" : ""
                )
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

        <div className="places_options_right">
          <div className="places_options_right_add">
            <img
              src={AddImage}
              alt="add"
              className="places_options_right_add_image"
            />
            <p
              onClick={() => {
                if (places.length >= 5 && userData.pro_account === 0) {
                  dispatch(
                    openErrorAlert(
                      "Чтобы добавить больше 5 мест для съемок, пожалуйста, обновитесь до пакета Стандарт"
                    )
                  );
                  return;
                } else if (places.length >= 15 && userData.pro_account === 1) {
                  dispatch(
                    openErrorAlert(
                      "Чтобы добавить больше 15 мест для съемок, пожалуйста, обновитесь до пакета Максимум"
                    )
                  );
                  return;
                } else navigate("/profile/add-place");
              }}
              className="places_options_right_add_p"
            >
              Добавить место
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
        {places && places.length === 0 && (
          <div className="photos_cards_empty">
            <h1 className="photos_cards_empty_title">
              Нам жаль, мест не найдено :(
            </h1>
          </div>
        )}
        {dataLoading && <ScreenLoader height={"30%"} />}
      </div>
      <Submit
        modalActive={submitActive}
        setModalActive={setSubmitActive}
        callback={deleteHandle}
        setAction={setAction}
      />
    </div>
  );
};

export default Places;
