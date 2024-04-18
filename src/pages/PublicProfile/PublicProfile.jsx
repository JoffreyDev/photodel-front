import Status from "../../img/profile/confirm.svg";
import Time from "../../img/profile/time.svg";
import Verified from "../../img/profile/check.svg";
import Rating from "../../img/profile/rating.svg";
import Pro from "../../img/profile/pro.svg";
import "../../styles/Profile/MyProfile.scss";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Requests from "../../http/axios-requests";
import React from "react";
import Online from "../../img/commonImages/online.svg";
import Offline from "../../img/commonImages/offline.svg";
import Location from "../../img/Public/map.svg";
import Pin from "../../img/commonImages/pin.svg";
import Mail from "../../img/Public/mail.svg";
import Req from "../../img/Public/request.svg";
import Fave from "../../img/Public/bookmark.svg";
import Web from "../../img/Public/web.svg";
import Phone from "../../img/Public/phone.svg";
import { openErrorAlert, openSuccessAlert } from "../../redux/actions/userData";
import { RequestWindow } from "../../components";
import {
  ScreenLoader,
  GeolocationProfilePopup,
  TempGeolocationProfilePopup,
} from "../../components";

const PublicProfile = ({ setProfileId }) => {
  const navigate = useNavigate();
  const params = useParams();
  const profileId = params.id;
  const dispatch = useDispatch();

  const [profileData, setProfileData] = React.useState();
  const [reqWindowAcive, setReqWindowActive] = React.useState(false);
  const [dataLoading, setDataLoading] = React.useState(true);

  const [locationPopupActive, setLocationPopupActive] = React.useState(false);
  const [tempLocationPopupActive, setTempLocationPopupActive] =
    React.useState(false);

  const { userData } = useSelector(({ userData }) => userData);

  React.useEffect(() => {
    Requests.getPublicProfile(profileId).then((res) => {
      setProfileData(res.data);
      setDataLoading(false);
    });
  }, [profileId]);

  const handleChatCreate = () => {
    Requests.createNewChat({
      sender: userData.id,
      receiver: Number(profileId),
    })
      .then((res) => navigate(`/profile/chat/${res.data.id}`))
      .catch((err) => {
        navigate(
          `/profile/chat/${Number(err.response.data.message.split("id=")[1])}`
        );
      });
  };

  const addToFavorite = () => {
    Requests.addFavoriteProfile(Number(profileId))
      .then(() => {
        dispatch(openSuccessAlert("Профиль добавлен в избранное!"));
        Requests.getPublicProfile(profileId).then((res) => {
          setProfileData(res.data);
          setDataLoading(false);
        });
      })
      .catch(() =>
        dispatch(
          openErrorAlert(
            "Произошла ошибка. Возможно, профиль уже есть в избранном."
          )
        )
      );
  };

  const deleteFromFavorite = () => {
    Requests.deleteFavoriteProfile(Number(profileId))
      .then(() => {
        dispatch(openSuccessAlert("Профиль удален из избранного!"));
        Requests.getPublicProfile(profileId).then((res) => {
          setProfileData(res.data);
          setDataLoading(false);
        });
      })
      .catch(() => dispatch(openErrorAlert("Произошла ошибка.")));
  };

  React.useEffect(() => {
    setProfileId(profileId);
  }, [profileId]);

  return (
    <div className="my_profile_wrapper">
      {dataLoading && <ScreenLoader />}
      {!dataLoading && (
        <div>
          <div className="my_profile_header">
            <img
              src={`data:image/png;base64,${profileData && profileData.avatar}`}
              alt="Avatar"
              className="my_profile_avatar"
            />
            <div className="my_profile_header_data">
              <div className="my_profile_header_upper_row">
                <div className="my_profile_header_upper_row_left">
                  <p className="my_profile_header_upper_row_name">
                    {profileData &&
                      profileData.name + " " + profileData.surname}
                  </p>
                  {profileData?.pro_account > 0 && profileData.status === 2 && (
                    <img
                      src={Pro}
                      alt="Pro status"
                      className="my_profile_header_upper_row_pro"
                    />
                  )}
                </div>
                {profileData.status === 2 && (
                  <div className="my_profile_header_upper_row_right">
                    <img
                      src={Rating}
                      alt="Rating"
                      className="my_profile_header_upper_row_rating_img"
                    />
                    <p className="my_profile_header_upper_row_rating_p">
                      {profileData && profileData.rating
                        ? profileData.rating
                        : "Пока нет рейтинга"}
                    </p>
                  </div>
                )}
              </div>
              <div className="my_profile_header_middle_row_online">
                <img
                  src={
                    profileData && profileData.user_channel_name
                      ? Online
                      : Offline
                  }
                  alt="online"
                  className="my_profile_header_middle_row_online_img"
                />
                <p className="my_profile_header_middle_row_online_p">
                  {profileData && profileData.user_channel_name
                    ? "В сети"
                    : "Не в сети"}
                </p>
              </div>
              <div className="my_profile_header_middle_row">
                <div className="my_profile_header_middle_row_registered">
                  <img
                    src={Time}
                    alt="Register date"
                    className="my_profile_header_middle_row_registered_img"
                  />
                  <p className="my_profile_header_middle_row_registered_p">
                    {profileData &&
                      `C ${
                        profileData.date_register
                          .split("")
                          .splice(5, 2)
                          .join("") === "01"
                          ? "января"
                          : profileData.date_register
                              .split("")
                              .splice(5, 2)
                              .join("") === "02"
                          ? "февраля"
                          : profileData.date_register
                              .split("")
                              .splice(5, 2)
                              .join("") === "03"
                          ? "марта"
                          : profileData.date_register
                              .split("")
                              .splice(5, 2)
                              .join("") === "04"
                          ? "апреля"
                          : profileData.date_register
                              .split("")
                              .splice(5, 2)
                              .join("") === "05"
                          ? "мая"
                          : profileData.date_register
                              .split("")
                              .splice(5, 2)
                              .join("") === "06"
                          ? "июня"
                          : profileData.date_register
                              .split("")
                              .splice(5, 2)
                              .join("") === "07"
                          ? "июля"
                          : profileData.date_register
                              .split("")
                              .splice(5, 2)
                              .join("") === "08"
                          ? "августа"
                          : profileData.date_register
                              .split("")
                              .splice(5, 2)
                              .join("") === "09"
                          ? "сентября"
                          : profileData.date_register
                              .split("")
                              .splice(5, 2)
                              .join("") === "10"
                          ? "октября"
                          : profileData.date_register
                              .split("")
                              .splice(5, 2)
                              .join("") === "11"
                          ? "ноября"
                          : profileData.date_register
                              .split("")
                              .splice(5, 2)
                              .join("") === "12"
                          ? "декабря"
                          : ""
                      } ${profileData.date_register
                        .split("")
                        .splice(0, 4)
                        .join("")}`}
                  </p>
                </div>
                {false && (
                  <div className="my_profile_header_middle_row_verified">
                    <img
                      src={Verified}
                      alt="Verified"
                      className="my_profile_header_middle_row_verified_img"
                    />
                    <p className="my_profile_header_middle_row_verified_p">
                      Подтвержден
                    </p>
                  </div>
                )}
                {profileData &&
                  profileData.ready_status &&
                  profileData.status === 2 && (
                    <div className="my_profile_header_middle_row_status">
                      <img
                        src={Status}
                        alt="Status"
                        className="my_profile_header_middle_row_status_img"
                      />
                      <p className="my_profile_header_middle_row_status_p">
                        {profileData.ready_status === "BUSY"
                          ? "Занят"
                          : profileData.ready_status === "FREE"
                          ? "Свободен"
                          : ""}
                      </p>
                    </div>
                  )}
              </div>
            </div>
          </div>
          {profileData &&
            profileData.string_location &&
            profileData.location && (
              <div className="my_profile_header_middle_row_locations">
                <div
                  onClick={() => setLocationPopupActive(true)}
                  className="my_profile_header_middle_row_location"
                >
                  <img
                    src={Location}
                    alt="location"
                    className="my_profile_header_middle_row_location_img"
                  />
                  <p className="my_profile_header_middle_row_location_p">
                    {" "}
                    {profileData && profileData.string_location}
                  </p>
                </div>

                {profileData.string_location_now &&
                  profileData.status === 2 &&
                  profileData.location_now &&
                  profileData.date_stay_start && (
                    <div
                      onClick={() => setTempLocationPopupActive(true)}
                      className="my_profile_header_middle_row_location"
                    >
                      <img
                        src={Pin}
                        alt="location"
                        className="my_profile_header_middle_row_location_img"
                      />
                      <p className="my_profile_header_middle_row_location_p">
                        Сейчас в{" "}
                        {profileData && profileData.string_location_now}
                      </p>
                    </div>
                  )}
              </div>
            )}

          <div className="my_profile_header_middle_row_buttons">
            {userData.id !== Number(profileId) &&
              localStorage.getItem("access") && (
                <div className="my_profile_header_middle_row_buttons_button mail">
                  <img
                    src={Mail}
                    alt="mail"
                    className="my_profile_header_middle_row_buttons_button_img"
                  />
                  <p
                    onClick={handleChatCreate}
                    className="my_profile_header_middle_row_buttons_mail_p"
                  >
                    Написать сообщение
                  </p>
                </div>
              )}
            {profileData.status === 2 && userData.id !== Number(profileId) && (
              <div className="my_profile_header_middle_row_buttons_button req">
                <img
                  src={Req}
                  alt="mail"
                  className="my_profile_header_middle_row_buttons_button_img"
                />
                <p
                  onClick={() => setReqWindowActive(true)}
                  className="my_profile_header_middle_row_buttons_mail_p notheme"
                >
                  Отправить запрос
                </p>
              </div>
            )}
            {userData.id !== Number(profileId) &&
              localStorage.getItem("access") && (
                <div className="my_profile_header_middle_row_buttons_button fave">
                  <img
                    src={Fave}
                    alt="mail"
                    className="my_profile_header_middle_row_buttons_button_img"
                  />
                  <p
                    onClick={
                      profileData.in_favorite
                        ? deleteFromFavorite
                        : addToFavorite
                    }
                    className="my_profile_header_middle_row_buttons_mail_p notheme"
                  >
                    {profileData.in_favorite
                      ? "Удалить из избранного"
                      : "Добавить в избранное"}
                  </p>
                </div>
              )}
          </div>

          <div className="my_profile_common_data">
            <p className="my_profile_common_data_title">Общие данные</p>
            <div className="my_profile_common_data_content">
              <table>
                {profileData && profileData.type_pro && (
                  <tr>
                    <td className="my_profile_common_data_content_left_li">
                      Категория:
                    </td>
                    <td className="my_profile_common_data_content_right_li">
                      {profileData && profileData.status === 1
                        ? "Пользователь"
                        : profileData.type_pro?.name_category}
                    </td>
                  </tr>
                )}

                {profileData &&
                  profileData.status === 2 &&
                  profileData.spec_model_or_photographer.length >= 1 && (
                    <tr>
                      <td className="my_profile_common_data_content_left_li">
                        Специализация:
                      </td>
                      <td className="my_profile_common_data_content_right_li">
                        {profileData &&
                          profileData.spec_model_or_photographer
                            .map((spec) => spec.name_spec)
                            .join(", ")}
                      </td>
                    </tr>
                  )}

                {profileData &&
                  profileData.filming_geo.length >= 1 &&
                  profileData.status === 2 && (
                    <tr>
                      <td className="my_profile_common_data_content_left_li">
                        География съемок:
                      </td>
                      <td className="my_profile_common_data_content_right_li">
                        {profileData &&
                          profileData.filming_geo
                            .map((geo) => geo.name_country)
                            .join(", ")}
                      </td>
                    </tr>
                  )}

                {userData.cost_services && profileData.status === 2 && (
                  <tr>
                    <td className="my_profile_common_data_content_left_li">
                      Стоимость услуг:
                    </td>
                    <td className="my_profile_common_data_content_right_li">
                      {" "}
                      {userData.cost_services && userData.cost_services}
                    </td>
                  </tr>
                )}

                {userData.work_condition && profileData.status === 2 && (
                  <tr>
                    <td className="my_profile_common_data_content_left_li">
                      {" "}
                      Условия работы:
                    </td>
                    <td className="my_profile_common_data_content_right_li">
                      {" "}
                      {userData.work_condition && userData.work_condition}
                    </td>
                  </tr>
                )}

                {userData.photo_technics && profileData.status === 2 && (
                  <tr>
                    <td className="my_profile_common_data_content_left_li">
                      {" "}
                      Фототехника:
                    </td>
                    <td className="my_profile_common_data_content_right_li">
                      {" "}
                      {userData.photo_technics && userData.photo_technics}
                    </td>
                  </tr>
                )}

                {profileData && profileData.languages.length >= 1 && (
                  <tr>
                    <td className="my_profile_common_data_content_left_li">
                      {" "}
                      Владение языками:
                    </td>
                    <td className="my_profile_common_data_content_right_li">
                      {profileData &&
                        profileData.languages
                          .map((lang) => lang.name_language)
                          .join(", ")}
                    </td>
                  </tr>
                )}
              </table>
            </div>
          </div>

          {profileData && profileData.about && (
            <div className="my_profile_about">
              <p className="my_profile_about_title">Обо мне</p>
              <div className="my_profile_about_content">
                <p className="my_profile_about_content_p">
                  {profileData && profileData.about}
                </p>
              </div>
            </div>
          )}

          {profileData &&
            (profileData.phone || profileData.site) &&
            profileData.status === 2 && (
              <div className="my_profile_contacts">
                <p className="my_profile_contacts_title">Контакты</p>
                <div className="my_profile_contacts_content public">
                  {profileData && profileData.phone && (
                    <div className="my_profile_contacts_content_row public">
                      <img
                        src={Phone}
                        alt="phone"
                        className="my_profile_contacts_content_row_img"
                      />
                      <p className="my_profile_contacts_content_row_p black">
                        {profileData && profileData.phone}
                      </p>
                    </div>
                  )}
                  {profileData && profileData.site && (
                    <div className="my_profile_contacts_content_row public">
                      <img
                        src={Web}
                        alt="site"
                        className="my_profile_contacts_content_row_img"
                      />
                      <p className="my_profile_contacts_content_row_p ">
                        {profileData && profileData.site}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

          <div>
            {profileData.status === 2 && (
              <div className="my_profile_stats">
                <p className="my_profile_stats_title">Статистика</p>
                <div className="my_profile_stats_content">
                  <div className="my_profile_stats_content_upper">
                    <div className="my_profile_stats_content_upper_stat">
                      <p className="my_profile_stats_content_upper_key">
                        Просмотры:
                      </p>
                      <p className="my_profile_stats_content_upper_value">
                        {profileData && profileData.statistics.me_count_views}
                      </p>
                    </div>

                    <div className="my_profile_stats_content_upper_stat">
                      <p className="my_profile_stats_content_upper_key">
                        Комментарии:{" "}
                      </p>
                      <p className="my_profile_stats_content_upper_value">
                        {" "}
                        {profileData &&
                          profileData.statistics.my_count_commetns}
                      </p>
                    </div>

                    <div className="my_profile_stats_content_upper_stat">
                      <p className="my_profile_stats_content_upper_key">
                        В избранном:{" "}
                      </p>
                      <p className="my_profile_stats_content_upper_value">
                        {" "}
                        {profileData &&
                          profileData.statistics.me_count_favorites}
                      </p>
                    </div>
                  </div>

                  <div className="my_profile_stats_content_lower">
                    <div className="my_profile_stats_content_lower_stat">
                      <p className="my_profile_stats_content_lower_key">
                        Лайки:{" "}
                      </p>
                      <p className="my_profile_stats_content_lower_value">
                        {" "}
                        {profileData && profileData.statistics.me_count_likes}
                      </p>
                    </div>

                    {
                      <div className="my_profile_stats_content_lower_stat">
                        <p className="my_profile_stats_content_lower_key">
                          Отзывы:{" "}
                        </p>
                        <p className="my_profile_stats_content_lower_value">
                          0
                        </p>
                      </div>
                    }

                    <div className="my_profile_stats_content_lower_stat">
                      <p className="my_profile_stats_content_lower_key">
                        Избранные:{" "}
                      </p>
                      <p className="my_profile_stats_content_lower_value">
                        {" "}
                        {profileData &&
                          profileData.statistics.me_count_favorites}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="my_profile_requests">
              <p className="my_profile_requests_title">Запросы</p>
              <div className="my_profile_requests_content">
                <div className="my_profile_requests_content_upper">
                  <div className="my_profile_requests_content_upper_stat">
                    <p className="my_profile_requests_content_upper_key">
                      Запросы на съемку:
                    </p>
                    <p className="my_profile_requests_content_upper_value">
                      {" "}
                      {profileData && profileData.statistics.my_requests}
                    </p>
                  </div>

                  {false && (
                    <div className="my_profile_requests_content_upper_stat">
                      <p className="my_profile_requests_content_upper_key">
                        Запросы на обучение:
                      </p>
                      <p className="my_profile_requests_content_upper_value">
                        {profileData && profileData.statistics.my_requests}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <RequestWindow
            user={profileData}
            active={reqWindowAcive}
            setActive={setReqWindowActive}
            width={window.screen.width <= 576 ? "90vw" : "40vw"}
            notAlign={window.screen.width <= 576}
          />
          {profileData.string_location && (
            <GeolocationProfilePopup
              avatar={profileData && profileData.avatar}
              name={profileData && profileData.name}
              surname={profileData && profileData.surname}
              coords={profileData && profileData.location}
              online={profileData && profileData.user_channel_name}
              string_location={profileData && profileData.string_location}
              modalActive={locationPopupActive}
              setModalActive={setLocationPopupActive}
            />
          )}
          {profileData.string_location_now && (
            <TempGeolocationProfilePopup
              avatar={profileData && profileData.avatar}
              name={profileData && profileData.name}
              surname={profileData && profileData.surname}
              coords={profileData && profileData.location_now}
              online={profileData && profileData.user_channel_name}
              string_location={profileData && profileData.string_location_now}
              modalActive={tempLocationPopupActive}
              setModalActive={setTempLocationPopupActive}
              message={profileData.message}
              date_stay_end={profileData.date_stay_end}
              date_stay_start={profileData.date_stay_start}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default PublicProfile;
