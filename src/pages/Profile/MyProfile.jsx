import Status from "../../img/profile/confirm.svg";
import Time from "../../img/profile/time.svg";
import Verified from "../../img/profile/check.svg";
import Rating from "../../img/profile/rating.svg";
import Pro from "../../img/profile/pro.svg";
import "../../styles/Profile/MyProfile.scss";
import { GreenButton } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import React from "react";
import { setDataLoaded } from "../../redux/actions/siteEntities";

const MyProfile = () => {
  const handleOpenProfileEdit = () => {
    navigate("/profile/edit-profile");
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //проверка заполнения данных в полях профиля
  function isJson(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  const { userData } = useSelector(({ userData }) => userData);

  React.useEffect(() => {
    if (!localStorage.getItem("access")) navigate("/");
  }, []);

  React.useEffect(() => {
    if (userData && !userData.is_change) {
      navigate("/profile/edit-profile");
      dispatch(setDataLoaded(true));
    } else if (userData && userData.is_change) {
      dispatch(setDataLoaded(true));
    }
  }, [userData]);

  return (
    <div className="my_profile_wrapper">
      {userData && userData.is_change && (
        <div>
          <div className="my_profile_header">
            <img
              src={`data:image/png;base64,${userData.avatar}`}
              alt="Avatar"
              className="my_profile_avatar"
            />
            <div className="my_profile_header_data">
              <div className="my_profile_header_upper_row">
                <div className="my_profile_header_upper_row_left">
                  <p className="my_profile_header_upper_row_name">
                    {userData.name + " " + userData.surname}
                  </p>
                  {userData?.pro_account > 0 && userData?.status === 2 && (
                    <img
                      src={Pro}
                      alt="Pro status"
                      className="my_profile_header_upper_row_pro"
                    />
                  )}
                  <p className="my_profile_header_upper_row_pro_period">
                    {userData?.pro_subscription_expiration &&
                      userData?.status === 2 &&
                      userData?.pro_subscription_expiration &&
                      `до ${
                        userData?.pro_subscription_expiration
                          .split("")
                          .splice(8, 2)[0] === "0"
                          ? userData?.pro_subscription_expiration
                              .split("")
                              .splice(9, 1)
                              .join("")
                          : userData?.pro_subscription_expiration
                              .split("")
                              .splice(8, 2)
                              .join("")
                      } ${
                        userData?.pro_subscription_expiration
                          .split("")
                          .splice(5, 2)
                          .join("") === "01"
                          ? "января"
                          : userData?.pro_subscription_expiration
                              .split("")
                              .splice(5, 2)
                              .join("") === "02"
                          ? "февраля"
                          : userData?.pro_subscription_expiration
                              .split("")
                              .splice(5, 2)
                              .join("") === "03"
                          ? "марта"
                          : userData?.pro_subscription_expiration
                              .split("")
                              .splice(5, 2)
                              .join("") === "04"
                          ? "апреля"
                          : userData?.pro_subscription_expiration
                              .split("")
                              .splice(5, 2)
                              .join("") === "05"
                          ? "мая"
                          : userData?.pro_subscription_expiration
                              .split("")
                              .splice(5, 2)
                              .join("") === "06"
                          ? "июня"
                          : userData?.pro_subscription_expiration
                              .split("")
                              .splice(5, 2)
                              .join("") === "07"
                          ? "июля"
                          : userData?.pro_subscription_expiration
                              .split("")
                              .splice(5, 2)
                              .join("") === "08"
                          ? "августа"
                          : userData?.pro_subscription_expiration
                              .split("")
                              .splice(5, 2)
                              .join("") === "09"
                          ? "сентября"
                          : userData?.pro_subscription_expiration
                              .split("")
                              .splice(5, 2)
                              .join("") === "10"
                          ? "октября"
                          : userData?.pro_subscription_expiration
                              .split("")
                              .splice(5, 2)
                              .join("") === "11"
                          ? "ноября"
                          : userData?.pro_subscription_expiration
                              .split("")
                              .splice(5, 2)
                              .join("") === "12"
                          ? "декабря"
                          : ""
                      }`}
                  </p>
                  {userData?.status === 2 && (
                    <p style={{cursor: 'pointer'}} onClick={() => navigate('/profile/finance')} className="my_profile_header_upper_row_pro_prolong">
                      Продлить
                    </p>
                  )}
                </div>
                {userData?.status === 2 && (
                  <div className="my_profile_header_upper_row_right">
                    <img
                      src={Rating}
                      alt="Rating"
                      className="my_profile_header_upper_row_rating_img"
                    />
                    <p className="my_profile_header_upper_row_rating_p">
                      {userData && userData.rating}
                    </p>
                  </div>
                )}
              </div>
              <div className="my_profile_header_middle_row">
                <div className="my_profile_header_middle_row_registered">
                  <img
                    src={Time}
                    alt="Register date"
                    className="my_profile_header_middle_row_registered_img"
                  />
                  <p className="my_profile_header_middle_row_registered_p">
                    {userData &&
                      `C ${
                        userData.date_register
                          .split("")
                          .splice(5, 2)
                          .join("") === "01"
                          ? "января"
                          : userData.date_register
                              .split("")
                              .splice(5, 2)
                              .join("") === "02"
                          ? "февраля"
                          : userData.date_register
                              .split("")
                              .splice(5, 2)
                              .join("") === "03"
                          ? "марта"
                          : userData.date_register
                              .split("")
                              .splice(5, 2)
                              .join("") === "04"
                          ? "апреля"
                          : userData.date_register
                              .split("")
                              .splice(5, 2)
                              .join("") === "05"
                          ? "мая"
                          : userData.date_register
                              .split("")
                              .splice(5, 2)
                              .join("") === "06"
                          ? "июня"
                          : userData.date_register
                              .split("")
                              .splice(5, 2)
                              .join("") === "07"
                          ? "июля"
                          : userData.date_register
                              .split("")
                              .splice(5, 2)
                              .join("") === "08"
                          ? "августа"
                          : userData.date_register
                              .split("")
                              .splice(5, 2)
                              .join("") === "09"
                          ? "сентября"
                          : userData.date_register
                              .split("")
                              .splice(5, 2)
                              .join("") === "10"
                          ? "октября"
                          : userData.date_register
                              .split("")
                              .splice(5, 2)
                              .join("") === "11"
                          ? "ноября"
                          : userData.date_register
                              .split("")
                              .splice(5, 2)
                              .join("") === "12"
                          ? "декабря"
                          : ""
                      } ${userData.date_register
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
                {userData.ready_status && (
                  <div className="my_profile_header_middle_row_status">
                    <img
                      src={Status}
                      alt="Status"
                      className="my_profile_header_middle_row_status_img"
                    />
                    <p className="my_profile_header_middle_row_status_p">
                      {userData.ready_status === "BUSY"
                        ? "Занят"
                        : userData.ready_status === "FREE"
                        ? "Свободен"
                        : ""}
                    </p>
                  </div>
                )}
              </div>
              <GreenButton
                text={"Редактировать"}
                width={"180px"}
                height={"38px"}
                callback={handleOpenProfileEdit}
                margin={"20px 0 0 0"}
              />
            </div>
          </div>

          <div className="my_profile_common_data">
            <p className="my_profile_common_data_title">Общие данные</p>
            <table>
              {userData && JSON.parse(userData.type_pro).length >= 1 && (
                <tr>
                  <td className="my_profile_common_data_content_left_li">
                    Категория:
                  </td>
                  <td className="my_profile_common_data_content_right_li">
                    {userData?.status === 2
                      ? isJson(userData.type_pro) &&
                        JSON.parse(userData.type_pro).map((item, index) => {
                          if (
                            index + 1 !==
                            JSON.parse(userData.type_pro).length
                          ) {
                            return Object.values(item)[0] + ", ";
                          } else {
                            return Object.values(item)[0];
                          }
                        })
                      : "Пользователь"}
                  </td>
                </tr>
              )}

              {userData &&
                userData?.status === 2 &&
                JSON.parse(userData.spec_model_or_photographer).length >= 1 && (
                  <tr>
                    <td className="my_profile_common_data_content_left_li">
                      Специализация:
                    </td>
                    <td className="my_profile_common_data_content_right_li">
                      {" "}
                      {isJson(userData.spec_model_or_photographer) &&
                        JSON.parse(userData.spec_model_or_photographer).map(
                          (item, index) => {
                            if (
                              index + 1 !==
                              JSON.parse(userData.spec_model_or_photographer)
                                .length
                            ) {
                              return Object.values(item)[0] + ", ";
                            } else {
                              return Object.values(item)[0];
                            }
                          }
                        )}
                    </td>
                  </tr>
                )}

              {userData &&
                userData?.status === 2 &&
                JSON.parse(userData.filming_geo).length >= 1 && (
                  <tr>
                    <td className="my_profile_common_data_content_left_li">
                      География съемок:
                    </td>
                    <td className="my_profile_common_data_content_right_li">
                      {isJson(userData.filming_geo) &&
                        JSON.parse(userData.filming_geo).map((item, index) => {
                          if (
                            index + 1 !==
                            JSON.parse(userData.filming_geo).length
                          ) {
                            return Object.values(item)[0] + ", ";
                          } else {
                            return Object.values(item)[0];
                          }
                        })}
                    </td>
                  </tr>
                )}

              {userData.cost_services && userData?.status === 2 && (
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

              {userData.work_condition && userData?.status === 2 && (
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

              {userData.photo_technics && userData?.status === 2 && (
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

              {userData && JSON.parse(userData.languages).length >= 1 && (
                <tr>
                  <td className="my_profile_common_data_content_left_li">
                    {" "}
                    Владение языками:
                  </td>
                  <td className="my_profile_common_data_content_right_li">
                    {isJson(userData.languages) &&
                      JSON.parse(userData.languages).map((item, index) => {
                        if (
                          index + 1 !==
                          JSON.parse(userData.languages).length
                        ) {
                          return Object.values(item)[0] + ", ";
                        } else {
                          return Object.values(item)[0];
                        }
                      })}
                  </td>
                </tr>
              )}
            </table>
          </div>

          {userData && userData.about && (
            <div className="my_profile_about">
              <p className="my_profile_about_title">Обо мне</p>
              <div className="my_profile_about_content">
                <p
                  dangerouslySetInnerHTML={{
                    __html: userData && userData.about,
                  }}
                  className="my_profile_about_content_p"
                ></p>
              </div>
            </div>
          )}

          {userData && (userData.phone || userData.site) && (
            <div className="my_profile_contacts">
              <p className="my_profile_contacts_title">Контакты</p>
              <div className="my_profile_contacts_content">
                <table>
                  {userData.string_location && (
                    <tr>
                      <td className="my_profile_common_data_content_left_li">
                        {" "}
                        Местонахождение:
                      </td>
                      <td className="my_profile_common_data_content_right_li">
                        {userData.string_location && userData.string_location}
                      </td>
                    </tr>
                  )}

                  {userData.phone && userData?.status === 2 && (
                    <tr>
                      <td className="my_profile_common_data_content_left_li">
                        {" "}
                        Телефон:
                      </td>
                      <td className="my_profile_common_data_content_right_li">
                        {userData.phone && userData.phone}
                      </td>
                    </tr>
                  )}

                  {userData.site && userData?.status === 2 && (
                    <tr>
                      <td className="my_profile_common_data_content_left_li">
                        Сайт:
                      </td>
                      <td className="my_profile_common_data_content_right_li">
                        {userData.site && userData.site}
                      </td>
                    </tr>
                  )}
                </table>
              </div>
            </div>
          )}

          <div>
            {userData.location_now && userData?.status === 2 && (
              <div className="my_profile_temp_location">
                <p className="my_profile_temp_location_title">
                  Временная геолокация
                </p>
                <div className="my_profile_temp_location_content">
                  <table>
                    {userData.string_location_now && (
                      <tr>
                        <td className="my_profile_common_data_content_left_li">
                          {" "}
                          Нахожусь сейчас:
                        </td>
                        <td className="my_profile_common_data_content_right_li">
                          {userData.string_location_now}
                        </td>
                      </tr>
                    )}

                    {userData.date_stay_start && (
                      <tr>
                        <td className="my_profile_common_data_content_left_li">
                          {" "}
                          Даты пребывания:
                        </td>
                        <td className="my_profile_common_data_content_right_li">
                          {`${userData.date_stay_start.split("T")[0]} - ${
                            userData.date_stay_end.split("T")[0]
                          }`}
                        </td>
                      </tr>
                    )}

                    {userData.message && (
                      <tr>
                        <td className="my_profile_common_data_content_left_li">
                          Сообщение:
                        </td>
                        <td className="my_profile_common_data_content_right_li">
                          {userData.message}
                        </td>
                      </tr>
                    )}
                  </table>
                </div>
              </div>
            )}

            {userData?.status === 2 && (
              <div className="my_profile_stats">
                <p className="my_profile_stats_title">Статистика</p>
                <div className="my_profile_stats_content">
                  <div className="my_profile_stats_content_upper">
                    <div className="my_profile_stats_content_upper_stat">
                      <p className="my_profile_stats_content_upper_key">
                        Просмотры:
                      </p>
                      <p className="my_profile_stats_content_upper_value">
                        {" "}
                        {userData && userData.statistics.me_count_views}
                      </p>
                    </div>

                    <div className="my_profile_stats_content_upper_stat">
                      <p className="my_profile_stats_content_upper_key">
                        Комментарии:
                      </p>
                      <p className="my_profile_stats_content_upper_value">
                        {userData && userData.statistics.my_count_commetns}
                      </p>
                    </div>

                    <div className="my_profile_stats_content_upper_stat">
                      <p className="my_profile_stats_content_upper_key">
                        В избранном:
                      </p>
                      <p className="my_profile_stats_content_upper_value">
                        {" "}
                        {userData && userData.statistics.me_count_favorites}
                      </p>
                    </div>
                  </div>

                  <div className="my_profile_stats_content_lower">
                    <div className="my_profile_stats_content_lower_stat">
                      <p className="my_profile_stats_content_lower_key">
                        Лайки:
                      </p>
                      <p className="my_profile_stats_content_lower_value">
                        {userData && userData.statistics.me_count_likes}
                      </p>
                    </div>

                    <div className="my_profile_stats_content_lower_stat">
                      <p className="my_profile_stats_content_lower_key">
                        Отзывы:
                      </p>
                      <p className="my_profile_stats_content_lower_value">0</p>
                    </div>

                    <div className="my_profile_stats_content_lower_stat">
                      <p className="my_profile_stats_content_lower_key">
                        Избранные:
                      </p>
                      <p className="my_profile_stats_content_lower_value">
                        {" "}
                        {userData && userData.statistics.me_count_favorites}
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
                      {userData && userData.statistics.my_requests}
                    </p>
                  </div>

                  {false && (
                    <div className="my_profile_requests_content_upper_stat">
                      <p className="my_profile_requests_content_upper_key">
                        Запросы на обучение:
                      </p>
                      <p className="my_profile_requests_content_upper_value">
                        1096
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
