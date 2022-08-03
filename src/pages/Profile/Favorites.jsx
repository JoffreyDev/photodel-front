import React from "react";
import SortImage from "../../img/sessions/sort.svg";
import {
  SelectInput,
  Checkbox,
  ProfileCard,
  PhotoCard,
  PlaceCard,
  SessionCard,
} from "../../components";
import "../../styles/Profile/Favorites.scss";
import Requests from "../../http/axios-requests";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ScreenLoader } from "../../components";

function Favorites() {
  const navigate = useNavigate();
  const { userData } = useSelector(({ userData }) => userData);
  const [profiles, setProfiles] = React.useState();
  const [photos, setPhotos] = React.useState();
  const [places, setPlaces] = React.useState();
  const [sessions, setSessions] = React.useState();
  const [component, setComponent] = React.useState("profiles");
  const [sortType, setSortType] = React.useState(1);
  const [action, setAction] = React.useState(1);
  const [selectedPositions, setSelectedPositions] = React.useState([]);

  const [dataLoading, setDataLoading] = React.useState(true);

  React.useEffect(() => {
    if (userData) {
      setDataLoading(true);
      if (component === "profiles") {
        Requests.getFavoriteProfiles(userData.id).then((res) => {
          setProfiles(res.data);
          setDataLoading(false);
        });
      } else if (component === "photos") {
        setDataLoading(true);
        Requests.getFavoritePhotos(userData.id).then((res) => {
          setPhotos(res.data);
          setDataLoading(false);
        });
      } else if (component === "places") {
        setDataLoading(true);
        Requests.getFavoritePlaces(userData.id).then((res) => {
          setPlaces(res.data);
          setDataLoading(false);
        });
      } else if (component === "sessions") {
        setDataLoading(true);
        Requests.getFavoriteSessions(userData.id).then((res) => {
          setSessions(res.data);
          setDataLoading(false);
        });
      }
    }
  }, [component, userData]);

  React.useEffect(() => {
    if (!localStorage.getItem("access")) navigate("/");
  }, []);

  return (
    <div className="favorites">
      <div className="favorites_header">
        <div className="favorites_header_wrapper">
          <h1
            className={
              component === "profiles"
                ? "favorites_header_title_first active"
                : "favorites_header_title_first"
            }
            onClick={() => setComponent("profiles")}
          >
            ПРОФИЛИ
          </h1>
          <h1
            className={
              component === "photos"
                ? "favorites_header_title_first active"
                : "favorites_header_title_first"
            }
            onClick={() => setComponent("photos")}
          >
            ФОТО
          </h1>
          <h1
            className={
              component === "places"
                ? "favorites_header_title_first active"
                : "favorites_header_title_first"
            }
            onClick={() => setComponent("places")}
          >
            МЕСТА
          </h1>
          <h1
            className={
              component === "sessions"
                ? "favorites_header_title_first active"
                : "favorites_header_title_first"
            }
            onClick={() => setComponent("sessions")}
          >
            ФОТОСЕССИИ
          </h1>
        </div>

        <div className="favorites_header_select">
          <img
            src={SortImage}
            alt="sort"
            className="favorites_header_select_image"
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
            value={sortType}
          />
        </div>
      </div>
      <div className="photos_options">
        <div className="photos_options_left favorites">
          <p className="photos_options_left_p">
            Всего: <span className="photos_options_left_p_span">0</span>
          </p>
          <Checkbox marginBottom={"0px"} label={"Выбрать все"} />
        </div>

        <div className="photos_options_right">
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
          <div className="photos_options_left mobile">
            <p className="photos_options_left_p">
              Всего: <span className="photos_options_left_p_span">0</span>
            </p>
            <Checkbox marginBottom={"0px"} label={"Выбрать все"} />
          </div>
        </div>
      </div>
      <div className="favorites_body">
        {profiles &&
          component === "profiles" &&
          !dataLoading &&
          profiles.map((profile, idx) => (
            <ProfileCard
              array={selectedPositions}
              callback={setSelectedPositions}
              profile={profile}
              key={idx}
            />
          ))}
        {profiles &&
          component === "profiles" &&
          profiles.length === 0 &&
          !dataLoading && (
            <div className="photos_cards_empty">
              <h1 className="photos_cards_empty_title">
                Нет избранных профилей.
              </h1>
            </div>
          )}

        {dataLoading && <ScreenLoader height={"30%"} />}

        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {photos &&
            component === "photos" &&
            !dataLoading &&
            photos.map((photo, idx) => (
              <PhotoCard
                array={selectedPositions}
                callback={setSelectedPositions}
                photo={photo.gallery}
                key={idx}
              />
            ))}
          {photos &&
            component === "photos" &&
            photos.length === 0 &&
            !dataLoading && (
              <div className="photos_cards_empty">
                <h1 className="photos_cards_empty_title">
                  Нет избранных фотографий.
                </h1>
              </div>
            )}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {places &&
            component === "places" &&
            !dataLoading &&
            places.map((place, idx) => (
              <PlaceCard
                array={selectedPositions}
                callback={setSelectedPositions}
                place={place.place}
                key={idx}
              />
            ))}
          {places &&
            component === "places" &&
            places.length === 0 &&
            !dataLoading && (
              <div className="photos_cards_empty">
                <h1 className="photos_cards_empty_title">
                  Нет избранных мест.
                </h1>
              </div>
            )}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {sessions &&
            component === "sessions" &&
            !dataLoading &&
            sessions.map((session, idx) => (
              <SessionCard
                array={selectedPositions}
                callback={setSelectedPositions}
                session={session.photo_session}
                key={idx}
              />
            ))}
          {sessions &&
            component === "sessions" &&
            sessions.length === 0 &&
            !dataLoading && (
              <div className="photos_cards_empty">
                <h1 className="photos_cards_empty_title">
                  Нет избранных фотосессий.
                </h1>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

export default Favorites;
