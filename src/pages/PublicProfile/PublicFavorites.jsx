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
import { ScreenLoader } from "../../components";

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

  const [dataLoading, setDataLoading] = React.useState(true);

  React.useEffect(() => {
    if (component === "profiles") {
      Requests.getFavoriteProfiles(Number(profileId)).then((res) => {
        setProfiles(res.data);
        setDataLoading(false);
      });
    } else if (component === "photos") {
      setDataLoading(true);
      Requests.getFavoritePhotos(Number(profileId)).then((res) => {
        setPhotos(res.data);
        setDataLoading(false);
      });
    } else if (component === "places") {
      setDataLoading(true);
      Requests.getFavoritePlaces(Number(profileId)).then((res) => {
        setPlaces(res.data);
        setDataLoading(false);
      });
    } else if (component === "sessions") {
      setDataLoading(true);
      Requests.getFavoriteSessions(Number(profileId)).then((res) => {
        setSessions(res.data);
        setDataLoading(false);
      });
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
          !dataLoading &&
          profiles.map((profile, idx) => (
            <ProfileCard disableCheck profile={profile} key={idx} />
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
              <GalleryPhotoPreview photo={photo.gallery} key={idx} />
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
              <PlaceCard disableCheck place={place.place} key={idx} />
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
                disableCheck
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

export default PublicFavorites;
