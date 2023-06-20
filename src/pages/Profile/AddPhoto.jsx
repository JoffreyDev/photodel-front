import React from "react";
import Back from "../../img/addModules/arrow-back.svg";
import {
  TextInput,
  Checkbox,
  GreyButton,
  GreenButton,
  AutoCompleteInput,
} from "../../components";
import AddImage from "../../img/sessions/add.svg";
import "../../styles/Profile/AddPhoto.scss";
import Requests from "../../http/axios-requests";
import { useNavigate } from "react-router-dom";
import { openSuccessAlert, openErrorAlert } from "../../redux/actions/userData";
import { useDispatch, useSelector } from "react-redux";
import EXIF from "exif-js";
import Resizer from "react-image-file-resizer";

const AddPhoto = () => {
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

  const { prosSpecs } = useSelector(({ siteEntities }) => siteEntities);
  const { userData, userCoords } = useSelector(({ userData }) => userData);
  const [loaded, setLoaded] = React.useState(false);

  const [loadedAlbums, setLoadedAlbums] = React.useState();

  const [exifData, setExifData] = React.useState();

  const navigate = useNavigate();

  const dispatch = useDispatch();

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

  //инициализация карты
  const handleLoad = () => {
    window.ymaps.ready(init);

    function init() {
      var myPlacemark,
        myMap = new window.ymaps.Map(
          "map",
          {
            center: userCoords ? userCoords : [55.751574, 37.573856],
            zoom: 9,
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
    setTimeout(() => handleLoad(), 3000);
  }, []);

  //ресайз
  const resizeFile = (file, weight) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        1200,
        1200,
        "JPEG",
        weight > 2e6 ? 60 : weight > 1e6 ? 80 : weight > 4e5 ? 90 : 100,
        0,
        (uri) => {
          resolve(uri);
          setLoadedPhoto(uri);
          dispatch(
            openSuccessAlert("Фото было сжато, так как вес превышал 400Кб")
          );
        },
        "base64"
      );
    });

  //получение base64 фото
  function getBase64(file, callback) {
    const reader = new FileReader();

    reader.addEventListener("load", () => callback(reader.result));

    reader.readAsDataURL(file);
  }

  //обработка чтения фото из инпута
  const handlePhotoRead = (e) => {
    let parsedFile = e.target.files[0];

    if (parsedFile.size > 4e5) {
      resizeFile(parsedFile, parsedFile.size);
    }

    EXIF.getData(e.target.files[0], function () {
      var allMetaData = EXIF.getAllTags(this);
      setExifData(allMetaData);
    });

    if (parsedFile.size <= 4e5) {
      getBase64(parsedFile, function (base64Data) {
        setLoadedPhoto(base64Data); // Here you can have your code which uses Base64 for its operation, // file to Base64 by oneshubh
      });
    }
  };

  React.useEffect(() => {
    if (exifData) {
      exifData.Make &&
        exifData.Model &&
        setCamera(`${exifData.Make} ${exifData.Model}`);
      exifData.ISOSpeedRatings && setISO(`${exifData.ISOSpeedRatings}`);
      exifData.FocalLength?.numerator &&
        exifData.FocalLength?.denominator &&
        setFocusDistance(`${exifData.FocalLength.numerator}mm`);
      exifData.FNumber?.numerator &&
        exifData.FNumber?.denominator &&
        setAperture(
          `f/${exifData.FNumber.numerator / exifData.FNumber.denominator}`
        );
      exifData.ExposureTime?.numerator &&
        exifData.ExposureTime?.denominator &&
        setExcerpt(
          `${exifData.ExposureTime.numerator}/${exifData.ExposureTime.denominator}s`
        );
      exifData.Flash &&
        setFlash(exifData.Flash.includes("Flash fired") ? "Да" : "Нет");
      dispatch(openSuccessAlert("Доступные данные EXIF были заполнены."));
    }
  }, [exifData]);

  const handlePhotoCreate = () => {
    if (!loadedPhoto) {
      dispatch(openErrorAlert("Загрузите фото!"));
      return;
    } else if (!title) {
      dispatch(openErrorAlert("Не указано название!"));
      return;
    } else if (!coords) {
      dispatch(openErrorAlert("Не указано местоположение!"));
      return;
    } else if (!category) {
      dispatch(openErrorAlert("Не указана категория!"));
      return;
    } else if (!albums) {
      dispatch(openErrorAlert("Не указаны связанные альбомы!"));
      return;
    }
    Requests.createImage(loadedPhoto).then((res) => {
      Requests.createPhoto({
        gallery_image: res.data.id,
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
        iso: ISO,
        is_sell: canBuy,
      }).then((res) => {
        dispatch(openSuccessAlert("Фото успешно опубликовано!"));
        navigate("/profile/photos");
      });
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
              src={loadedPhoto}
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
            label={"Укажите местоположение на карте, после чего закройте карту"}
            callback={setAddressLine}
            value={addressLine}
            disabled
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
            limit={15}
          />

          <TextInput
            width={"100%"}
            height={"38px"}
            placeholder="Введите данные"
            label={"Диафрагма"}
            callback={setAperture}
            value={aperture}
            limit={15}
          />

          <TextInput
            width={"100%"}
            height={"38px"}
            placeholder="Введите данные"
            label={"Фокусное расстоние"}
            callback={setFocusDistance}
            value={focusDistance}
            limit={15}
          />

          <TextInput
            width={"100%"}
            height={"38px"}
            placeholder="Введите данные"
            label={"Выдержка"}
            callback={setExcerpt}
            value={excerpt}
            limit={15}
          />

          <TextInput
            width={"100%"}
            height={"38px"}
            placeholder="Введите данные"
            label={"ISO"}
            callback={setISO}
            value={ISO}
            limit={15}
          />

          <TextInput
            width={"100%"}
            height={"38px"}
            placeholder="Введите данные"
            label={"Вспышка"}
            callback={setFlash}
            value={flash}
            limit={15}
          />
          <h1 className="add_photo_left_content_h1 margin">Категории</h1>
          {prosSpecs && (
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
          {loadedAlbums && (
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
          <div className="add_photo_right_content_window">
            <ul className="add_photo_right_content_ul">
              <li className="add_photo_right_content_li">
                <div className="photos_options_right_add">
                  <img
                    src={AddImage}
                    alt="add"
                    className="photos_options_right_add_image"
                  />
                  <label
                    htmlFor="file_input"
                    className="photos_options_right_add_p"
                  >
                    Загрузить фото
                  </label>
                  <input
                    id="file_input"
                    type="file"
                    className="hidden_file_input"
                    onChange={(e) => handlePhotoRead(e)}
                  />
                </div>
              </li>
              <li className="add_photo_right_content_li">
                <Checkbox
                  marginBottom={"0px"}
                  label={"Можно купить"}
                  value={canBuy}
                  callback={() => {
                    setCanBuy(!canBuy);
                    console.log(canBuy);
                  }}
                />
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="add_photo_buttons">
        <div style={{ marginRight: "15px " }}>
          <GreyButton text={"Отменить"} width={"180px"} height={"38px"} />
        </div>
        <GreenButton
          text={"Сохранить"}
          width={"180px"}
          height={"38px"}
          callback={handlePhotoCreate}
          margin={"13px 0 0 0"}
        />
      </div>
    </div>
  );
};

export default AddPhoto;
