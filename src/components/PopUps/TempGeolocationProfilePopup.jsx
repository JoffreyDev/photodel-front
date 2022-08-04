import React from "react";
import Online from "../../img/commonImages/online.svg";
import Offline from "../../img/commonImages/offline.svg";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import { MuiModal } from "..";
import Shape from "../../img/commonImages/shape.svg";

const TempGeolocationProfilePopup = ({
  avatar,
  onilne,
  name,
  surname,
  coords,
  string_location,
  setModalActive,
  modalActive,
  date_stay_start,
  date_stay_end,
  message,
}) => {
  return (
    <MuiModal open={modalActive} setOpen={setModalActive}>
      <div
        className={
          modalActive
            ? "edit_album_popup_wrapper active"
            : "edit_album_popup_wrapper"
        }
        onClick={() => setModalActive(false)}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="my_profile_geolocation_popup temp"
        >
          <div className="my_profile_geolocation_popup_content">
            <div className="my_profile_geolocation_popup_content_upper">
              <h1 className="my_profile_geolocation_popup_content_upper_title">
                Временная геолокация
              </h1>
              <img
                src={Shape}
                alt="close"
                className="my_profile_geolocation_popup_content_upper_shape"
                onClick={() => setModalActive(false)}
              />
            </div>
            <div className="my_profile_geolocation_popup_content_data">
              <img
                src={`data:image/png;base64,${avatar}`}
                alt=""
                className="my_profile_geolocation_popup_content_data_avatar"
              />
              <img
                className="my_profile_geolocation_popup_content_data_online"
                src={onilne ? Online : Offline}
              />
              <p className="my_profile_geolocation_popup_content_data_name">{`${name} ${surname}`}</p>
            </div>
            <div className="my_profile_geolocation_popup_content_map">
              <YMaps>
                <Map
                  width={"100%"}
                  height={"300px"}
                  defaultState={{
                    center:
                      coords && coords.split("(")[1].split(")")[0].split(" "),
                    zoom: 12,
                  }}
                  modules={["package.full"]}
                >
                  <Placemark
                    geometry={
                      coords && coords.split("(")[1].split(")")[0].split(" ")
                    }
                    options={{
                      iconLayout: "default#image",
                      // Своё изображение иконки метки.
                      iconImageHref: "https://photodel.ru/media/marker.svg",
                      // Размеры метки.
                      iconImageSize: [60, 84],
                    }}
                    properties={{
                      hintContent: string_location,
                    }}
                    modules={["geoObject.addon.hint"]}
                  />
                </Map>
              </YMaps>
            </div>
            <table className="my_profile_geolocation_popup_content_table">
              <tr>
                <td className="my_profile_geolocation_popup_content_table_left">
                  Нахожусь сейчас{" "}
                </td>
                <td className="my_profile_geolocation_popup_content_table_right">
                  {string_location}
                </td>
              </tr>
              <tr>
                <td className="my_profile_geolocation_popup_content_table_left">
                  Даты пребывания
                </td>
                <td className="my_profile_geolocation_popup_content_table_right">
                  {`${date_stay_start
                    .split("T")[0]
                    .replaceAll("-", ".")} - ${date_stay_end
                    .split("T")[0]
                    .replaceAll("-", ".")}`}
                </td>
              </tr>
            </table>
            <p className="my_profile_geolocation_popup_content_message">
              {message}
            </p>
          </div>
        </div>
      </div>
    </MuiModal>
  );
};

export default TempGeolocationProfilePopup;
