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

function Favorites() {
  const { userData } = useSelector(({ userData }) => userData);
  const [profiles, setProfiles] = React.useState();
  const [photos, setPhotos] = React.useState();
  const [places, setPlaces] = React.useState();
  const [sessions, setSessions] = React.useState();
  const [component, setComponent] = React.useState("profiles");
  const [sortType, setSortType] = React.useState(1);
  const [action, setAction] = React.useState(1);
  const [selectedPositions, setSelectedPositions] = React.useState([]);

  React.useEffect(() => {
    if (userData) {
      if (component === "profiles") {
        Requests.getFavoriteProfiles(userData.id).then((res) =>
          setProfiles(res.data)
        );
      } else if (component === "photos") {
        Requests.getFavoritePhotos(userData.id).then((res) =>
          setPhotos(res.data)
        );
      } else if (component === "places") {
        Requests.getFavoritePlaces(userData.id).then((res) =>
          setPlaces(res.data)
        );
      } else if (component === "sessions") {
        Requests.getFavoriteSessions(userData.id).then((res) =>
          setSessions(res.data)
        );
      }
    }
  }, [component, userData]);

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
        <div className="photos_options_left">
          <p className="photos_options_left_p">
            Всего: <span className="photos_options_left_p_span">0</span>
          </p>
          <Checkbox marginBottom={"0px"} label={"Выбрать все"} />
        </div>

        <div className="photos_options_right">
          <SelectInput
            width={200}
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
      </div>
      <div className="favorites_body">
        {profiles &&
          component === "profiles" &&
          profiles.map((profile, idx) => (
            <ProfileCard
              array={selectedPositions}
              callback={setSelectedPositions}
              profile={profile}
              key={idx}
            />
          ))}
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {photos &&
            component === "photos" &&
            photos.map((photo, idx) => (
              <PhotoCard
                array={selectedPositions}
                callback={setSelectedPositions}
                photo={photo.gallery}
                key={idx}
              />
            ))}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {places &&
            component === "places" &&
            places.map((place, idx) => (
              <PlaceCard
                array={selectedPositions}
                callback={setSelectedPositions}
                place={place.place}
                key={idx}
              />
            ))}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {sessions &&
            component === "sessions" &&
            sessions.map((session, idx) => (
              <SessionCard
                array={selectedPositions}
                callback={setSelectedPositions}
                session={session.photo_session}
                key={idx}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Favorites;
