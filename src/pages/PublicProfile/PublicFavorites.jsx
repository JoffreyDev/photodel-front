import React from "react";
import SortImage from "../../img/sessions/sort.svg";
import {
  SelectInput,
  Checkbox,
  ProfileCard,
  PhotoCard,
  PlaceCard,
  SessionCard,
  GalleryPhotoPreview,
} from "../../components";
import "../../styles/Profile/Favorites.scss";
import Requests from "../../http/axios-requests";
import { useSelector } from "react-redux";
import { PublicHeader } from "..";
import { useParams } from "react-router-dom";

function PublicFavorites() {
  const params = useParams();
  const profileId = params.id;

  const { userData } = useSelector(({ userData }) => userData);
  const [profiles, setProfiles] = React.useState();
  const [photos, setPhotos] = React.useState();
  const [places, setPlaces] = React.useState();
  const [sessions, setSessions] = React.useState();
  const [component, setComponent] = React.useState("profiles");
  const [sortType, setSortType] = React.useState(1);
  const [action, setAction] = React.useState(1);
  const [selectedPositions, setSelectedPositions] = React.useState([]);
  const [profileData, setPorfileData] = React.useState();

  React.useEffect(() => {
    if (component === "profiles") {
      Requests.getFavoriteProfiles(Number(profileId)).then((res) =>
        setProfiles(res.data)
      );
    } else if (component === "photos") {
      Requests.getFavoritePhotos(Number(profileId)).then((res) =>
        setPhotos(res.data)
      );
    } else if (component === "places") {
      Requests.getFavoritePlaces(Number(profileId)).then((res) =>
        setPlaces(res.data)
      );
    } else if (component === "sessions") {
      Requests.getFavoriteSessions(Number(profileId)).then((res) =>
        setSessions(res.data)
      );
    }

    Requests.getPublicProfile(profileId).then((res) =>
      setPorfileData(res.data)
    );
  }, [component, userData]);

  return (
    <div className="favorites">
      <PublicHeader profile={profileData} />
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
        <div style={{ marginBottom: "20px" }} className="photos_options_left">
          <p className="photos_options_left_p">
            Всего:{" "}
            <span className="photos_options_left_p_span">
              {component === "profiles"
                ? profiles && profiles.length
                : component === "photos"
                ? photos && photos.length
                : component === "places"
                ? places && places.length
                : component === "sessions"
                ? sessions && sessions.length
                : ""}
            </span>
          </p>
        </div>
      </div>
      <div className="favorites_body">
        {profiles &&
          component === "profiles" &&
          profiles.map((profile, idx) => (
            <ProfileCard disableCheck profile={profile} key={idx} />
          ))}
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {photos &&
            component === "photos" &&
            photos.map((photo, idx) => (
              <GalleryPhotoPreview photo={photo.gallery} key={idx} />
            ))}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {places &&
            component === "places" &&
            places.map((place, idx) => (
              <PlaceCard disableCheck place={place.place} key={idx} />
            ))}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {sessions &&
            component === "sessions" &&
            sessions.map((session, idx) => (
              <SessionCard
                disableCheck
                session={session.photo_session}
                key={idx}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default PublicFavorites;
