import React from "react";
import { Header, Footer } from "../../components";
import ProfileDis from "../../img/profile/profile-dis.svg";
import ProfileActive from "../../img/profile/profile-active.svg";
import RequestsDis from "../../img/profile/requests-dis.svg";
import RequestsActive from "../../img/profile/requests-active.svg";
import MessageDis from "../../img/profile/message-dis.svg";
import MessageActive from "../../img/profile/message-active.svg";
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
import MoneyDis from "../../img/commonImages/money.svg";
import Money from "../../img/profile/money.svg";
import StudyDis from "../../img/commonImages/study.svg";
import StudyAct from "../../img/commonImages/study_active.svg";
import SettingsActive from "../../img/profile/settings-active.svg";
import "../../styles/Profile/ProfileBasis.scss";
import {
  MyProfile,
  ProfileEdit,
  Sessions,
  Photos,
  Albums,
  EditAlbum,
  AddAlbum,
  AddPhoto,
  PhotoView,
  EditPhoto,
  AlbumView,
  AddSession,
  SessionView,
  Places,
  AddPlace,
  Messages,
  Chat,
  PlaceView,
  Favorites,
  Requests,
  RequestChat,
  EditSession,
  EditPlace,
} from "..";
import { useParams, useNavigate } from "react-router-dom";
import { ScreenLoader, TeamInviteComponent } from "../../components";
import { useSelector } from "react-redux";
import { ThemeContext, themes } from "../../components/Theme/ThemeContext";
import Trainings from "./Trainings";
import TrainingView from "./TrainingView";
import EditTraining from "./EditTraining";
import AddTraining from "./AddTraining";
import Team from "./Team";
import Reviews from "./Reviews";
import Finance from "./Finance";
import Settings from "./Settings";

const ProfileBasis = ({ mainSocket }) => {
  const params = useParams();
  const component = params.component;

  const { userData, notifications } = useSelector(({ userData }) => userData);

  const navigate = useNavigate();

  React.useEffect(() => {
    window.scroll(0, 0);
    document.title = "Фотодел";
  }, []);

  React.useEffect(() => {
    if (!localStorage.getItem("access")) navigate("/");
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
                onClick={() => navigate("/profile/data")}
                className={
                  component === "data"
                    ? "profile_basis_module_choice_li active"
                    : "profile_basis_module_choice_li"
                }
              >
                <img
                  src={component === "data" ? ProfileActive : ProfileDis}
                  className="profile_basis_module_choice_img"
                  alt="menu choice"
                />
                <p
                  className={
                    component === "data"
                      ? "profile_basis_module_choice_p active"
                      : "profile_basis_module_choice_p"
                  }
                >
                  Мой профиль
                </p>
              </li>
              <li
                onClick={() => navigate("/profile/requests")}
                className={
                  component === "requests"
                    ? "profile_basis_module_choice_li active"
                    : "profile_basis_module_choice_li"
                }
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
                  Запросы{" "}
                  {notifications[0]?.new_requests > 0 && (
                    <span>
                      <div className="notifications_counter_wrapper profile">
                        <p>{notifications[0].new_requests}</p>
                      </div>
                    </span>
                  )}
                </p>
              </li>
              <li
                onClick={() => navigate("/profile/messages")}
                className={
                  component === "messages"
                    ? "profile_basis_module_choice_li active"
                    : "profile_basis_module_choice_li"
                }
              >
                <img
                  src={
                    component === "messages" || component === "chat"
                      ? MessageActive
                      : MessageDis
                  }
                  className="profile_basis_module_choice_img"
                  alt="menu choice"
                />
                <p
                  className={
                    component === "messages" || component === "chat"
                      ? "profile_basis_module_choice_p active"
                      : "profile_basis_module_choice_p"
                  }
                >
                  Сообщения{" "}
                  {notifications[0]?.new_messages > 0 && (
                    <span>
                      <div className="notifications_counter_wrapper profile">
                        <p>{1}</p>
                      </div>
                    </span>
                  )}
                </p>
              </li>

              {userData.status === 2 && (
                <li
                  onClick={() => navigate("/profile/reviews")}
                  className={
                    component === "reviews"
                      ? "profile_basis_module_choice_li active"
                      : "profile_basis_module_choice_li"
                  }
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
                    Отзывы{" "}
                    {notifications[0]?.new_reviews > 0 && (
                      <span>
                        <div className="notifications_counter_wrapper profile">
                          <p>{notifications[0].new_reviews}</p>
                        </div>
                      </span>
                    )}
                  </p>
                </li>
              )}

              {userData.status === 2 && (
                <li
                  onClick={() => navigate("/profile/photos")}
                  className={
                    component === "photos" ||
                    component === "albums" ||
                    component === "photo" ||
                    component === "album" ||
                    component === "add-photo" ||
                    component === "add-album"
                      ? "profile_basis_module_choice_li active"
                      : "profile_basis_module_choice_li"
                  }
                >
                  <img
                    src={
                      component === "photos" ||
                      component === "albums" ||
                      component === "photo" ||
                      component === "album" ||
                      component === "add-photo" ||
                      component === "add-album"
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
                      component === "album" ||
                      component === "add-photo" ||
                      component === "add-album"
                        ? "profile_basis_module_choice_p active"
                        : "profile_basis_module_choice_p"
                    }
                  >
                    Фотографии
                  </p>
                </li>
              )}
              {userData.status === 2 && (
                <li
                  onClick={() => navigate("/profile/places")}
                  className={
                    component === "places" ||
                    component === "place" ||
                    component === "add-place"
                      ? "profile_basis_module_choice_li active"
                      : "profile_basis_module_choice_li"
                  }
                >
                  <img
                    src={
                      component === "places" ||
                      component === "place" ||
                      component === "add-place"
                        ? PlacesActive
                        : PlacesDis
                    }
                    className="profile_basis_module_choice_img"
                    alt="menu choice"
                  />
                  <p
                    className={
                      component === "places" ||
                      component === "place" ||
                      component === "add-place"
                        ? "profile_basis_module_choice_p active"
                        : "profile_basis_module_choice_p"
                    }
                  >
                    места для съемок
                  </p>
                </li>
              )}
              {userData.status === 2 && (
                <li
                  onClick={() => navigate("/profile/sessions")}
                  className={
                    component === "sessions" || component === "session"
                      ? "profile_basis_module_choice_li active"
                      : "profile_basis_module_choice_li"
                  }
                >
                  <img
                    src={
                      component === "sessions" ||
                      component === "session" ||
                      component === "add-session"
                        ? AlbumActive
                        : AlbumDis
                    }
                    className="profile_basis_module_choice_img"
                    alt="menu choice"
                  />
                  <p
                    className={
                      component === "sessions" ||
                      component === "session" ||
                      component === "add-session"
                        ? "profile_basis_module_choice_p active"
                        : "profile_basis_module_choice_p"
                    }
                  >
                    Фотосессии
                  </p>
                </li>
              )}

              <li
                onClick={() => navigate("/profile/favorites")}
                className={
                  component === "favorites"
                    ? "profile_basis_module_choice_li active"
                    : "profile_basis_module_choice_li"
                }
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
              {userData.status === 2 && (
                <li
                  onClick={() => navigate("/profile/trainings")}
                  className={
                    component === "trainings" ||
                    component === "training" ||
                    component === "add-training"
                      ? "profile_basis_module_choice_li active"
                      : "profile_basis_module_choice_li"
                  }
                >
                  <img
                    src={component === "trainings" ? AlbumActive : AlbumDis}
                    className="profile_basis_module_choice_img"
                    alt="menu choice"
                  />
                  <p
                    className={
                      component === "trainings" ||
                      component === "training" ||
                      component === "add-training"
                        ? "profile_basis_module_choice_p active"
                        : "profile_basis_module_choice_p"
                    }
                  >
                    Обучение
                  </p>
                </li>
              )}
              {userData.status === 2 && (
                <li
                  onClick={() => navigate("/profile/team")}
                  className={
                    component === "team"
                      ? "profile_basis_module_choice_li active"
                      : "profile_basis_module_choice_li"
                  }
                >
                  <img
                    src={component === "team" ? TeamActive : TeamDis}
                    className="profile_basis_module_choice_img"
                    alt="menu choice"
                  />
                  <p
                    className={
                      component === "team"
                        ? "profile_basis_module_choice_p active"
                        : "profile_basis_module_choice_p"
                    }
                  >
                    Команда{" "}
                  </p>
                </li>
              )}

              <li
                onClick={() => navigate("/profile/settings")}
                className="profile_basis_module_choice_li"
              >
                <img
                  src={component === "settings" ? SettingsActive : SettingsDis}
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
              {userData.status === 2 && (
                <li
                  onClick={() => navigate("/profile/finance")}
                  className="profile_basis_module_choice_li"
                >
                  <img
                    src={component === "finance" ? Money : MoneyDis}
                    className="profile_basis_module_choice_img"
                    alt="menu choice"
                  />
                  <p
                    className={
                      component === "finance"
                        ? "profile_basis_module_choice_p active"
                        : "profile_basis_module_choice_p"
                    }
                  >
                    Финансы
                  </p>
                </li>
              )}
            </ul>
          </div>
          <div className="profile_basis_module_component">
            {/*  {!isLoaded && <ScreenLoader />} */}
            {component === "data" && <MyProfile component={component} />}
            {component === "edit-profile" && (
              <ProfileEdit component={component} />
            )}
            {component === "sessions" && <Sessions component={component} />}
            {component === "photos" && <Photos component={component} />}
            {component === "albums" && <Albums component={component} />}
            {component === "edit-album" && <EditAlbum component={component} />}
            {component === "add-album" && <AddAlbum component={component} />}
            {component === "add-photo" && <AddPhoto component={component} />}
            {component === "edit-photo" && <EditPhoto />}
            {component === "photo" && <PhotoView />}
            {component === "album" && <AlbumView />}
            {component === "place" && <PlaceView />}
            {component === "add-session" && <AddSession />}
            {component === "session" && <SessionView />}
            {component === "training" && <TrainingView />}
            {component === "team" && <Team />}
            {component === "places" && <Places />}
            {component === "add-place" && <AddPlace component={component} />}
            {component === "messages" && <Messages mainSocket={mainSocket} />}
            {component === "chat" && <Chat />}
            {component === "favorites" && <Favorites />}
            {component === "trainings" && <Trainings />}
            {component === "requests" && <Requests />}
            {component === "add-training" && (
              <AddTraining component={component} />
            )}
            {component === "request" && <RequestChat mainSocket={mainSocket} />}
            {component === "edit-training" && (
              <EditTraining component={component} />
            )}
            {component === "edit-session" && (
              <EditSession component={component} />
            )}
            {component === "edit-place" && <EditPlace component={component} />}
            {component === "reviews" && <Reviews component={component} />}
            {component === "invite-to-team" && <TeamInviteComponent />}
            {component === "finance" && <Finance />}
            {component === "settings" && <Settings />}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfileBasis;
