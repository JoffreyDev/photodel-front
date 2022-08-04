import React from "react";
import Back from "../../img/addModules/arrow-back.svg";
import {
  TextInput,
  Checkbox,
  GreyButton,
  GreenButton,
  AutoCompleteInput,
} from "../../components";
import { useSelector } from "react-redux";
import "../../styles/Profile/AddPhoto.scss";
import Requests, { rootAddress } from "../../http/axios-requests";
import { useNavigate, useParams } from "react-router-dom";
import { openErrorAlert, openSuccessAlert } from "../../redux/actions/userData";
import { useDispatch } from "react-redux";
import Delete from "../../img/photoView/delete.svg";
import Lock from "../../img/photoView/lock.svg";

const EditPhoto = () => {
  //состояния для полей и фото
  const [coords, setCoords] = React.useState();
  const [addressLine, setAddressLine] = React.useState();
  const [title, setTitle] = React.useState();
  const [description, setDescription] = React.useState();
  const [camera, setCamera] = React.useState();
  const [aperture, setAperture] = React.useState();
  const [focusDistance, setFocusDistance] = React.useState();
  const [excerpt, setExcerpt] = React.useState();
  const [ISO, setISO] = React.useState();
  const [flash, setFlash] = React.useState();
  const [category, setCategory] = React.useState(undefined);
  const [albums, setAlbums] = React.useState(undefined);
  const [loadedPhoto, setLoadedPhoto] = React.useState();
  const [canBuy, setCanBuy] = React.useState(false);
  const [photoHidden, setPhotoHidden] = React.useState(false);

  const { prosSpecs } = useSelector(({ siteEntities }) => siteEntities);
  const { userData } = useSelector(({ userData }) => userData);

  const [loaded, setLoaded] = React.useState(false);
  const [mapLoaded, setMapLoaded] = React.useState(false);

  const [loadedAlbums, setLoadedAlbums] = React.useState();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const params = useParams();
  const photoId = params.id;

  React.useEffect(() => {
    if (!localStorage.getItem("access")) navigate("/");
  }, []);

  //получаем альбомы юзера
  React.useEffect(() => {
    userData.id &&
      Requests.getAlbumsList(userData.id).then((res) => {
        setLoaded(true);
        setLoadedAlbums(res.data);
      });
  }, [loaded, userData.id]);

  //получаем данные фото
  React.useEffect(() => {
    !loaded &&
      Requests.getSinglePhoto(photoId).then((res) => {
        setLoaded(true);
        setTitle(res.data.name_image);
        setDescription(res.data.description);
        setCoords(
          res.data.place_location
            .split("(")[1]
            .split(")")[0]
            .split(" ")
            .reverse()
            .map(Number)
        );
        setAddressLine(res.data.string_place_location);
        setCamera(res.data.photo_camera);
        setLoadedPhoto(res.data.gallery_image.photo);
        setExcerpt(res.data.excerpt);
        setFocusDistance(res.data.focal_len);
        setFlash(res.data.flash);
        setCanBuy(res.data.is_sell);
        setCategory(
          res.data.category.map((item) => {
            return { id: item.id, name: item.name_spec };
          })
        );
        setAlbums(
          res.data.album.map((item) => {
            return { id: item.id, name: item.name_album };
          })
        );
        setPhotoHidden(res.data.is_hidden);
        setAperture(res.data.aperture);
        setISO(res.data.iso);
      });
  }, [loaded, photoId]);

  //инициализация карты
  const handleLoad = () => {
    window.ymaps.ready(init);

    function init() {
      var myPlacemark,
        myMap = new window.ymaps.Map(
          "map",
          {
            center: coords,
            zoom: 9,
            controls: ["fullscreenControl", "geolocationControl"],
          },
          {
            searchControlProvider: "yandex#search",
          }
        );

      // Слушаем клик на карте.
      myMap.events.add("click", function (e) {
        var coords = e.get("coords");
        setCoords(coords);

        // Если метка уже создана – просто передвигаем ее.
        if (myPlacemark) {
          myPlacemark.geometry.setCoordinates(coords);
        }
        // Если нет – создаем.
        else {
          myPlacemark = createPlacemark(coords);
          myMap.geoObjects.add(myPlacemark);
          // Слушаем событие окончания перетаскивания на метке.
          myPlacemark.events.add("dragend", function () {
            getAddress(myPlacemark.geometry.getCoordinates());
          });
        }
        getAddress(coords);
      });

      // Создание метки.
      function createPlacemark(coords) {
        return new window.ymaps.Placemark(
          coords,
          {
            iconCaption: "поиск...",
          },
          {
            preset: "islands#violetDotIconWithCaption",
            draggable: true,
          }
        );
      }

      // Определяем адрес по координатам (обратное геокодирование).
      function getAddress(coords) {
        myPlacemark.properties.set("iconCaption", "поиск...");
        window.ymaps.geocode(coords).then(function (res) {
          setAddressLine(
            res.geoObjects.get(0).getAddressLine().split(",")[0] +
              "," +
              res.geoObjects.get(0).getAddressLine().split(",")[1]
          );
          var firstGeoObject = res.geoObjects.get(0);

          myPlacemark.properties.set({
            // Формируем строку с данными об объекте.
            iconCaption: [
              // Название населенного пункта или вышестоящее административно-территориальное образование.
              firstGeoObject.getLocalities().length
                ? firstGeoObject.getLocalities()
                : firstGeoObject.getAdministrativeAreas(),
              // Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
              firstGeoObject.getThoroughfare() || firstGeoObject.getPremise(),
            ]
              .filter(Boolean)
              .join(", "),
            // В качестве контента балуна задаем строку с адресом объекта.
            balloonContent: firstGeoObject.getAddressLine(),
          });
        });
      }
    }
  };

  //прогружаем карту после подключения скрипта
  React.useEffect(() => {
    !mapLoaded &&
      coords &&
      setTimeout(() => {
        setMapLoaded(true);
        handleLoad();
      }, 3000);
  }, [coords, mapLoaded]);

  const handlePhotoUpdate = () => {
    Requests.updatePhoto({
      name_image: title,
      description: description,
      place_location: `SRID=4326;POINT (${coords[0]} ${coords[1]})`,
      string_place_location: addressLine,
      photo_camera: camera,
      focal_len: focusDistance,
      excerpt: excerpt,
      flash: flash,
      category: category.map((category) => category.id),
      album: albums.map((album) => album.id),
      aperture: aperture,
      id: photoId,
      is_sell: canBuy,
      iso: ISO,
    }).then(() => {
      dispatch(openSuccessAlert("Фото изменено!"));
      navigate("/profile/photos");
    });
  };

  const hidePhoto = () => {
    Requests.updateHiddenPhotoStatus({ is_hidden: true, id: photoId }).then(
      (res) => {
        dispatch(openSuccessAlert("Фото скрыто!"));
        navigate("/profile/photos");
      }
    );
  };

  const showPhoto = () => {
    Requests.updateHiddenPhotoStatus({ is_hidden: false, id: photoId }).then(
      (res) => {
        dispatch(openSuccessAlert("Фото показано!"));
        navigate("/profile/photos");
      }
    );
  };

  const deletePhoto = () => {
    Requests.deletePhoto([Number(photoId)]).then(() => {
      dispatch(openSuccessAlert("Фото удалено!"));
      navigate("/profile/photos");
    });
  };

  return (
    <div className="add_photo">
      <div className="add_photo_header">
        <img src={Back} alt="back" className="add_photo_header_arrow" />
        <p
          onClick={() => navigate("/profile/photos")}
          className="add_photo_header_p"
        >
          Все фотографии
        </p>
      </div>
      <div className="add_photo_content">
        <div className="add_photo_left_content">
          {loadedPhoto && (
            <img
              src={`${rootAddress}${loadedPhoto}`}
              className="add_photo_left_content_photo_preview"
              alt="preview"
            />
          )}
          <h1 className="add_photo_left_content_h1">Название и описание</h1>
          <TextInput
            width={"100%"}
            height={"38px"}
            placeholder="Введите название"
            callback={setTitle}
            value={title}
          />
          <textarea
            placeholder="Введите описание (+0,001 к рейтингу)"
            className="add_photo_left_content_textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <h1 className="add_photo_left_content_h1 margin">Место съемки</h1>
          <TextInput
            width={"100%"}
            height={"38px"}
            placeholder="Местоположение"
            label={"Введите местоположение или выберите на карте"}
            callback={setAddressLine}
            value={addressLine}
          />

          <div id="map" style={{ height: "135px", width: "100%" }}></div>

          <h1 className="add_photo_left_content_h1 margin">Данные о снимке</h1>
          <TextInput
            width={"100%"}
            height={"38px"}
            placeholder="Введите данные"
            label={"Фотоаппарат"}
            callback={setCamera}
            value={camera}
          />

          <TextInput
            width={"100%"}
            height={"38px"}
            placeholder="Введите данные"
            label={"Диафрагма"}
            callback={setAperture}
            value={aperture}
          />

          <TextInput
            width={"100%"}
            height={"38px"}
            placeholder="Введите данные"
            label={"Фокусное расстоние"}
            callback={setFocusDistance}
            value={focusDistance}
          />

          <TextInput
            width={"100%"}
            height={"38px"}
            placeholder="Введите данные"
            label={"Выдержка"}
            callback={setExcerpt}
            value={excerpt}
          />

          <TextInput
            width={"100%"}
            height={"38px"}
            placeholder="Введите данные"
            label={"ISO"}
            callback={setISO}
            value={ISO}
          />

          <TextInput
            width={"100%"}
            height={"38px"}
            placeholder="Введите данные"
            label={"Вспышка"}
            callback={setFlash}
            value={flash}
          />
          <h1 className="add_photo_left_content_h1 margin">Категории</h1>
          {prosSpecs && category && (
            <AutoCompleteInput
              values={
                prosSpecs &&
                prosSpecs.map((item) => {
                  return {
                    id: item.id,
                    name: item.name_spec,
                  };
                })
              }
              value={category}
              onChange={(e, value) => setCategory(value.map((item) => item))}
              placeholder={"Выберите категории"}
              width={"100%"}
            />
          )}
          <h1 className="add_photo_left_content_h1 margin">Фото в альбомах</h1>
          {loadedAlbums && albums && (
            <AutoCompleteInput
              values={
                loadedAlbums &&
                loadedAlbums.map((item) => {
                  return { id: item.id, name: item.name_album };
                })
              }
              value={albums}
              onChange={(e, value) => setAlbums(value.map((item) => item))}
              placeholder={"Выберите альбомы"}
              width={"100%"}
            />
          )}
        </div>

        <div className="add_photo_right_content">
          <div className="add_photo_right_content_window high">
            <ul className="add_photo_right_content_ul">
              <li className="add_photo_right_content_li">
                <div className="photos_options_right_add">
                  <img
                    src={Lock}
                    alt="add"
                    className="photos_options_right_add_image"
                  />
                  <label
                    onClick={() => {
                      photoHidden ? showPhoto() : hidePhoto();
                    }}
                    htmlFor="file_input"
                    className="photos_options_right_add_p"
                  >
                    {photoHidden ? "Показать фото" : "Скрыть фото"}
                  </label>
                </div>
              </li>
              <li className="add_photo_right_content_li">
                <div className="photos_options_right_add">
                  <img
                    src={Delete}
                    alt="add"
                    className="photos_options_right_add_image"
                  />
                  <label
                    className="photos_options_right_add_p"
                    onClick={() => deletePhoto()}
                  >
                    Удалить фото
                  </label>
                </div>
              </li>
              <li className="add_photo_right_content_li">
                <Checkbox
                  marginBottom={"0px"}
                  label={"Можно купить"}
                  value={canBuy}
                  callback={() => setCanBuy(!canBuy)}
                />
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="add_photo_buttons">
        <div style={{ marginRight: "15px " }}>
          <GreyButton
            text={"Отменить"}
            width={"180px"}
            height={"38px"}
            callback={() => navigate("/profile/photos")}
          />
        </div>
        <GreenButton
          text={"Сохранить"}
          width={"180px"}
          height={"38px"}
          callback={handlePhotoUpdate}
          margin={"13px 0 0 0"}
        />
      </div>
    </div>
  );
};

export default EditPhoto;
