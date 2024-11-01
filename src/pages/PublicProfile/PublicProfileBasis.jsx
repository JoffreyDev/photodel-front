import React from "react";
import {
  Header,
  Footer,
  MyTeamCard,
  RecommendCard,
  RecommendedCard,
} from "../../components";
import ProfileDis from "../../img/profile/profile-dis.svg";
import ProfileActive from "../../img/profile/profile-active.svg";
import ReviewDis from "../../img/profile/review-dis.svg";
import ReviewActive from "../../img/profile/review-active.svg";
import PhotoDis from "../../img/profile/photo-dis.svg";
import PhotoActive from "../../img/profile/photo-active.svg";
import PlacesActive from "../../img/profile/places-active.svg";
import PlacesDis from "../../img/profile/places-dis.svg";
import AlbumDis from "../../img/profile/album-dis.svg";
import AlbumActive from "../../img/profile/album-active.svg";
import TeamDis from "../../img/profile/team-dis.svg";
import TeamActive from "../../img/profile/team-active.svg";
import BookmarkDis from "../../img/profile/bookmark-dis.svg";
import BookmarkActive from "../../img/profile/bookmark-active.svg";
import SettingsDis from "../../img/profile/settings-dis.svg";
import SettingsActive from "../../img/profile/settings-active.svg";
import RequestsDis from "../../img/profile/requests-dis.svg";
import RequestsActive from "../../img/profile/requests-active.svg";
import "../../styles/Profile/ProfileBasis.scss";
import {
  SessionView,
  PublicPhotos,
  PublicAlbums,
  PublicPhotoView,
  PublicPlaces,
  PublicAlbumView,
  PublicPlaceView,
  PublicSessions,
  PublicSessionView,
  PublicFavorites,
  PublicRequests,
  PublicTrainings,
  PublicReviews,
  PublicTeam,
  MyTeam,
  Recommend,
  Recommended,
} from "..";
import { useParams, useNavigate } from "react-router-dom";
import PublicProfile from "./PublicProfile";
import { ScreenLoader } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import { ThemeContext, themes } from "../../components/Theme/ThemeContext";
import PublicTrainingView from "./PublicTrainingView";

const PublicProfileBasis = ({ mainSocket }) => {
  const params = useParams();
  const component = params.component;
  const id = params.id;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [profileId, setProfileId] = React.useState(Number(id));

  const { isLoaded } = useSelector(({ siteEntities }) => siteEntities);

  React.useEffect(() => {
    window.scroll(0, 0);
    document.title = "Фотодел";
  }, []);

  return (
    <div>
      <ThemeContext.Consumer>
        {({ theme, setTheme }) => (
          <Header styled={theme === "dark" ? "main" : "themed"} border={true} />
        )}
      </ThemeContext.Consumer>
      <div className="profile_basis">
        <div className="profile_basis_content">
          <div className="profile_basis_module_choice">
            <ul className="profile_basis_module_choice_ul">
              <li
                onClick={() => navigate(`/public/profile/${profileId}`)}
                className="profile_basis_module_choice_li"
              >
                <img
                  src={component === "profile" ? ProfileActive : ProfileDis}
                  className="profile_basis_module_choice_img"
                  alt="menu choice"
                />
                <p
                  className={
                    component === "profile"
                      ? "profile_basis_module_choice_p active"
                      : "profile_basis_module_choice_p"
                  }
                >
                  Профиль
                </p>
              </li>

              {
                <li
                  onClick={() => navigate(`/public/reviews/${profileId}`)}
                  className="profile_basis_module_choice_li"
                >
                  <img
                    src={component === "reviews" ? ReviewActive : ReviewDis}
                    className="profile_basis_module_choice_img"
                    alt="menu choice"
                  />
                  <p
                    className={
                      component === "reviews"
                        ? "profile_basis_module_choice_p active"
                        : "profile_basis_module_choice_p"
                    }
                  >
                    Отзывы
                  </p>
                </li>
              }

              <li
                onClick={() => navigate(`/public/photos/${profileId}`)}
                className="profile_basis_module_choice_li"
              >
                <img
                  src={
                    component === "photos" ||
                    component === "albums" ||
                    component === "photo" ||
                    component === "album"
                      ? PhotoActive
                      : PhotoDis
                  }
                  className="profile_basis_module_choice_img"
                  alt="menu choice"
                />
                <p
                  className={
                    component === "photos" ||
                    component === "albums" ||
                    component === "photo" ||
                    component === "album"
                      ? "profile_basis_module_choice_p active"
                      : "profile_basis_module_choice_p"
                  }
                >
                  Фотографии
                </p>
              </li>

              <li
                onClick={() => navigate(`/public/places/${profileId}`)}
                className="profile_basis_module_choice_li"
              >
                <img
                  src={
                    component === "places" || component === "place"
                      ? PlacesActive
                      : PlacesDis
                  }
                  className="profile_basis_module_choice_img"
                  alt="menu choice"
                />
                <p
                  className={
                    component === "places" || component === "place"
                      ? "profile_basis_module_choice_p active"
                      : "profile_basis_module_choice_p"
                  }
                >
                  места для съемок
                </p>
              </li>

              <li
                onClick={() => navigate(`/public/sessions/${profileId}`)}
                className="profile_basis_module_choice_li"
              >
                <img
                  src={
                    component === "sessions" || component === "session"
                      ? AlbumActive
                      : AlbumDis
                  }
                  className="profile_basis_module_choice_img"
                  alt="menu choice"
                />
                <p
                  className={
                    component === "sessions" || component === "session"
                      ? "profile_basis_module_choice_p active"
                      : "profile_basis_module_choice_p"
                  }
                >
                  Фотосессии
                </p>
              </li>
              <li
                onClick={() => navigate(`/public/trainings/${profileId}`)}
                className="profile_basis_module_choice_li"
              >
                <img
                  src={
                    component === "trainings" || component === "training"
                      ? AlbumActive
                      : AlbumDis
                  }
                  className="profile_basis_module_choice_img"
                  alt="menu choice"
                />
                <p
                  className={
                    component === "trainings" || component === "training"
                      ? "profile_basis_module_choice_p active"
                      : "profile_basis_module_choice_p"
                  }
                >
                  Обучение
                </p>
              </li>
              <li
                onClick={() => navigate(`/public/team/${profileId}`)}
                className="profile_basis_module_choice_li"
              >
                <img
                  src={
                    component === "team" ||
                    component === "recommend" ||
                    component === "recommended"
                      ? TeamActive
                      : TeamDis
                  }
                  className="profile_basis_module_choice_img"
                  alt="menu choice"
                />
                <p
                  className={
                    component === "team" ||
                    component === "recommend" ||
                    component === "recommended"
                      ? "profile_basis_module_choice_p active"
                      : "profile_basis_module_choice_p"
                  }
                >
                  Команда
                </p>
              </li>

              <li
                onClick={() => navigate(`/public/requests/${profileId}`)}
                className="profile_basis_module_choice_li"
              >
                <img
                  src={component === "requests" ? RequestsActive : RequestsDis}
                  className="profile_basis_module_choice_img"
                  alt="menu choice"
                />
                <p
                  className={
                    component === "requests"
                      ? "profile_basis_module_choice_p active"
                      : "profile_basis_module_choice_p"
                  }
                >
                  Запросы
                </p>
              </li>

              <li
                onClick={() => navigate(`/public/favorites/${profileId}`)}
                className="profile_basis_module_choice_li"
              >
                <img
                  src={component === "favorites" ? BookmarkActive : BookmarkDis}
                  className="profile_basis_module_choice_img"
                  alt="menu choice"
                />
                <p
                  className={
                    component === "favorites"
                      ? "profile_basis_module_choice_p active"
                      : "profile_basis_module_choice_p"
                  }
                >
                  Избранное
                </p>
              </li>

              {false && (
                <li
                  onClick={() => navigate("/profile/settings")}
                  className="profile_basis_module_choice_li"
                >
                  <img
                    src={
                      component === "settings" ? SettingsActive : SettingsDis
                    }
                    className="profile_basis_module_choice_img"
                    alt="menu choice"
                  />
                  <p
                    className={
                      component === "settings"
                        ? "profile_basis_module_choice_p active"
                        : "profile_basis_module_choice_p"
                    }
                  >
                    Настройки
                  </p>
                </li>
              )}
            </ul>
          </div>
          <div className="profile_basis_module_component">
            {component === "profile" && (
              <PublicProfile
                setProfileId={setProfileId}
                component={component}
              />
            )}

            {component === "sessions" && (
              <PublicSessions
                setProfileId={setProfileId}
                component={component}
              />
            )}
            {component === "trainings" && (
              <PublicTrainings
                setProfileId={setProfileId}
                component={component}
              />
            )}
            {component === "photos" && (
              <PublicPhotos setProfileId={setProfileId} component={component} />
            )}
            {component === "albums" && (
              <PublicAlbums setProfileId={setProfileId} component={component} />
            )}
            {component === "reviews" && (
              <PublicReviews
                setProfileId={setProfileId}
                component={component}
              />
            )}
            {component === "team" && (
              <PublicTeam setProfileId={setProfileId} component={component} />
            )}
            {component === "myTeam" && (
              <MyTeam setProfileId={setProfileId} component={component} />
            )}
            {component === "recommend" && (
              <Recommend setProfileId={setProfileId} component={component} />
            )}
            {component === "recommended" && (
              <Recommended setProfileId={setProfileId} component={component} />
            )}
            {component === "photo" && (
              <PublicPhotoView setProfileId={setProfileId} />
            )}
            {component === "album" && (
              <PublicAlbumView setProfileId={setProfileId} />
            )}
            {component === "place" && (
              <PublicPlaceView setProfileId={setProfileId} />
            )}
            {component === "training" && (
              <PublicTrainingView setProfileId={setProfileId} />
            )}
            {component === "session" && (
              <PublicSessionView setProfileId={setProfileId} />
            )}
            {component === "places" && (
              <PublicPlaces setProfileId={setProfileId} />
            )}
            {component === "favorites" && (
              <PublicFavorites setProfileId={setProfileId} />
            )}
            {component === "requests" && (
              <PublicRequests setProfileId={setProfileId} />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PublicProfileBasis;
