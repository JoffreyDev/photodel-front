import React from "react";
import Back from "../../img/addModules/arrow-back.svg";
import {
  TextInput,
  Checkbox,
  GreyButton,
  GreenButton,
  SelectInput,
  PhotosPreviewCheckbox,
} from "../../components";
import AddImage from "../../img/sessions/add.svg";
import "../../styles/Profile/AddSession.scss";
import Requests from "../../http/axios-requests";
import { useNavigate } from "react-router-dom";
import { openSuccessAlert, openErrorAlert } from "../../redux/actions/userData";
import { useDispatch, useSelector } from "react-redux";

const AddSession = () => {
  let parsedFiles = [];

  const upsendPhotosArray = [];
  let mainPhotoId;

  const [sendPhotosArray, setSendPhotosArray] = React.useState([]);

  const { prosSpecs } = useSelector(({ siteEntities }) => siteEntities);
  //состояния для полей и фото
  const [coords, setCoords] = React.useState();
  const [addressLine, setAddressLine] = React.useState();
  const [title, setTitle] = React.useState();
  const [description, setDescription] = React.useState();
  const [date, setDate] = React.useState();
  const [category, setCategory] = React.useState();

  const [mainPhoto, setMainPhoto] = React.useState(0);
  const [selectedPhotos, setSelectedPhotos] = React.useState([]);
  const [key, setKey] = React.useState();
  const [action, setAction] = React.useState("");
  const [allPhotosSelected, setAllPhotosSelected] = React.useState(false);
  const [ignored, forceUpdate] = React.useReducer((x) => x + 1, 0);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!localStorage.getItem("access")) navigate("/");
  }, []);

  //инициализация карты
  const handleLoad = () => {
    window.ymaps.ready(init);

    function init() {
      var myPlacemark,
        myMap = new window.ymaps.Map(
          "map",
          {
            center: [55.753994, 37.622093],
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
    setTimeout(() => handleLoad(), 3000);
  }, []);

  //получение base64 фото
  function getBase64(file, callback) {
    const reader = new FileReader();

    reader.addEventListener("load", () => callback(reader.result));

    reader.readAsDataURL(file);
  }

  //обработчик добавления фотографий
  const handlePhotoRead = (e) => {
    if (sendPhotosArray.length + e.target.files.length > 10) {
      dispatch(openErrorAlert("Максимум 10 изображений!"));
      return;
    }
    parsedFiles = Array.from(e.target.files);
    parsedFiles.forEach((file) => {
      if (file.size > 4.9e6) {
        dispatch(
          openErrorAlert("Вес одной картинки не может превышать 5 мегабайт!")
        );
        return;
      }

      getBase64(file, function (base64Data) {
        sendPhotosArray.push(base64Data);
        setSendPhotosArray(sendPhotosArray); // Here you can have your code which uses Base64 for its operation, // file to Base64 by oneshubh
        forceUpdate();
      });
    });
  };

  const handleCreate = () => {
    if (!sendPhotosArray) {
      dispatch(openErrorAlert("Загрузите фото!"));
      return;
    } else if (!title) {
      dispatch(openErrorAlert("Не указано название!"));
      return;
    } else if (!description) {
      dispatch(openErrorAlert("Не указано описание!"));
      return;
    } else if (!coords) {
      dispatch(openErrorAlert("Не указано местоположение!"));
      return;
    } else if (!category) {
      dispatch(openErrorAlert("Не указана категория!"));
      return;
    } else if (!date) {
      dispatch(openErrorAlert("Не указана дата съемки!"));
      return;
    }
    sendPhotosArray.forEach((photo, idx) => {
      Requests.createImage(photo).then((res) => {
        upsendPhotosArray.push(res.data.id);
        if (idx === mainPhoto) {
          mainPhotoId = res.data.id;
        }
        if (upsendPhotosArray.length === sendPhotosArray.length) {
          Requests.createSession({
            session_name: title,
            session_description: description,
            session_location: `SRID=4326;POINT (${coords[0]} ${coords[1]})`,
            string_session_location: addressLine,
            session_date: date,
            session_сategory: category,
            photos: upsendPhotosArray,
            main_photo: mainPhotoId,
          }).then(() => {
            dispatch(openSuccessAlert("Фотосессия успешно добавлена!"));
            navigate("/profile/sessions");
          });
        } else return;
      });
    });
  };

  React.useEffect(() => {
    if (action === 1) {
      selectedPhotos.forEach((photo) => {
        if (sendPhotosArray.includes(photo)) {
          sendPhotosArray.splice(sendPhotosArray.indexOf(photo), 1);
          setSendPhotosArray(sendPhotosArray);
        }
      });
      setSelectedPhotos([]);
      setAction("");
      forceUpdate();
    }
  }, [action]);

  React.useEffect(() => {
    if (sendPhotosArray.length === 0) {
      setSelectedPhotos([]);
    }
  }, [sendPhotosArray]);

  return (
    <div className="add_session">
      <div className="add_session_header">
        <img src={Back} alt="back" className="add_session_header_arrow" />
        <p
          onClick={() => navigate("/profile/sessions")}
          className="add_session_header_p"
        >
          Все фотосессии
        </p>
      </div>
      {sendPhotosArray && sendPhotosArray.length >= 1 && (
        <div className="photos_options">
          <div className="photos_options_left">
            <p className="photos_options_left_p">
              Всего:{" "}
              <span className="photos_options_left_p_span">
                {sendPhotosArray && sendPhotosArray.length}
              </span>
            </p>
            <Checkbox
              value={allPhotosSelected}
              callback={() => {
                if (allPhotosSelected) {
                  setSelectedPhotos([]);
                  setAllPhotosSelected(false);
                  forceUpdate();
                } else {
                  sendPhotosArray.forEach((photo) =>
                    selectedPhotos.push(photo)
                  );
                  setSelectedPhotos(selectedPhotos);
                  setAllPhotosSelected(true);
                  console.log(selectedPhotos);
                  forceUpdate();
                }
              }}
              marginBottom={"0px"}
              label={"Выбрать все"}
            />
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
              label={"Выберите действие"}
              labelId="demo-multiple-name-label"
              value={action}
              onChange={(e) => setAction(e.target.value)}
            />
          </div>
        </div>
      )}
      <div className="add_session_content">
        <div className="add_session_left_content">
          {sendPhotosArray && sendPhotosArray.length >= 1 && (
            <div className="add_session_left_content_photo_div">
              {sendPhotosArray.length >= 1 &&
                sendPhotosArray.map((photo, idx) => (
                  <PhotosPreviewCheckbox
                    id={idx}
                    setMain={setMainPhoto}
                    main={mainPhoto === idx}
                    image={photo}
                    key={key + idx}
                    active={selectedPhotos.includes(photo)}
                    setActive={() => {
                      if (selectedPhotos.includes(photo)) {
                        selectedPhotos.splice(selectedPhotos.indexOf(photo), 1);
                        setSelectedPhotos(selectedPhotos);
                        forceUpdate();
                      } else {
                        selectedPhotos.push(photo);
                        setSelectedPhotos(selectedPhotos);
                        forceUpdate();
                      }
                    }}
                  />
                ))}
            </div>
          )}
          <h1 className="add_session_left_content_h1">Название и описание</h1>
          <TextInput
            width={"100%"}
            height={"38px"}
            placeholder="Введите название"
            callback={setTitle}
            value={title}
          />
          <textarea
            placeholder="Введите описание (+0,001 к рейтингу)"
            className="add_session_left_content_textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <h1 className="add_session_left_content_h1 margin">Место съемки</h1>
          <TextInput
            width={"100%"}
            height={"38px"}
            placeholder="Местоположение"
            label={"Введите местоположение или выберите на карте"}
            callback={setAddressLine}
            value={addressLine}
          />
          <div id="map" style={{ height: "135px", width: "100%" }}></div>
          <h1 className="add_session_left_content_h1 margin">
            Данные о фотосессии
          </h1>
          <div className="add_session_left_content_date_wrapper">
            <label
              htmlFor="date"
              className="add_session_left_content_date_label"
            >
              Дата проведения
            </label>
            <input
              placeholder="Выберите дату"
              type="date"
              className="add_session_left_content_date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <SelectInput
            values={
              prosSpecs &&
              prosSpecs.map((item) => {
                return { id: item.id, value: item.name_spec };
              })
            }
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            setValue={setCategory}
            label={"Тип фотосессии"}
            width={"100%"}
          />
        </div>

        <div className="add_session_right_content">
          <div
            style={{ height: "59px" }}
            className="add_session_right_content_window"
          >
            <ul className="add_session_right_content_ul">
              <li className="add_session_right_content_li">
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
                    Загрузить фотографии
                  </label>
                  <input
                    id="file_input"
                    type="file"
                    className="hidden_file_input"
                    onChange={(e) => handlePhotoRead(e)}
                    multiple
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="add_session_buttons">
        <div style={{ marginRight: "15px " }}>
          <GreyButton
            text={"Отменить"}
            width={"180px"}
            height={"38px"}
            callback={() => navigate("/profile/sessions")}
          />
        </div>
        <GreenButton
          margin={"12px 0 0 0"}
          text={"Сохранить"}
          width={"180px"}
          height={"38px"}
          callback={handleCreate}
        />
      </div>
    </div>
  );
};

export default AddSession;
