import React from "react";
import Back from "../../img/addModules/arrow-back.svg";
import {
  TextInput,
  Checkbox,
  GreyButton,
  GreenButton,
  SelectInput,
  PhotosPreviewCheckbox,
  AutoCompleteInput,
} from "../../components";
import AddImage from "../../img/sessions/add.svg";
import "../../styles/Profile/AddSession.scss";
import Requests from "../../http/axios-requests";
import { useNavigate } from "react-router-dom";
import { openSuccessAlert, openErrorAlert } from "../../redux/actions/userData";
import { useDispatch, useSelector } from "react-redux";
import Resizer from "react-image-file-resizer";

const AddPlace = () => {
  let parsedFiles = [];
  const upsendPhotosArray = [];
  const [sendPhotosArray, setSendPhotosArray] = React.useState([]);

  const { userData, userCoords } = useSelector(({ userData }) => userData);

  //состояния для полей и фото
  const [coords, setCoords] = React.useState();
  const [addressLine, setAddressLine] = React.useState();
  const [title, setTitle] = React.useState();
  const [description, setDescription] = React.useState();
  const [category, setCategory] = React.useState();
  const [categories, setCategories] = React.useState();
  const [camera, setCamera] = React.useState();
  const [cost, setCost] = React.useState();
  const [paymentType, setPaymentType] = React.useState();

  const [mainPhoto, setMainPhoto] = React.useState(0);
  const [selectedPhotos, setSelectedPhotos] = React.useState([]);
  const [key, setKey] = React.useState();
  const [action, setAction] = React.useState("");
  const [allPhotosSelected, setAllPhotosSelected] = React.useState(false);

  const [promiseProgress, setPromiseProgress] = React.useState(false);

  const uploadedPhotos = [];
  let mainPhotoId;

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
          sendPhotosArray.push(uri);
          setSendPhotosArray(sendPhotosArray);
          forceUpdate();
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

  //обработчик добавления фотографий
  const handlePhotoRead = (e) => {
    // Разрешенные форматы изображений
    const allowedTypes = ['image/png', 'image/jpeg', 'image/tiff', 'image/dng', 'image/heif', 'image/webp'];

    if (sendPhotosArray.length + e.target.files.length > 10) {
      dispatch(openErrorAlert("Максимум 10 изображений!"));
      return;
    }

    const parsedFiles = Array.from(e.target.files);
    parsedFiles.forEach((file) => {
      if (!allowedTypes.includes(file.type)) {
        dispatch(openErrorAlert("Неподдерживаемый формат изображения!"));
        return;
      }

      if (file.size >= 4e5) {
        resizeFile(file, file.size);
      }

      if (file.size < 4e5) {
        getBase64(file, function (base64Data) {
          sendPhotosArray.push(base64Data);
          setSendPhotosArray([...sendPhotosArray]); // Обновление состояния с новым массивом
          forceUpdate();
        });
      }
    });
  };

  const handleCreate = () => {
    console.log(promiseProgress);
    if (!sendPhotosArray.length) {
      dispatch(openErrorAlert("Загрузите фото!"));
      return;
    } else if (!title) {
      dispatch(openErrorAlert("Не указано название!"));
      return;
    } else if (!coords) {
      dispatch(openErrorAlert("Не указано местоположение!"));
      return;
    } else if (!camera) {
      dispatch(openErrorAlert("Указание камеры обязательно!"));
      return;
    } else if (!cost) {
      dispatch(openErrorAlert("Указание стоимости обязательно!"));
      return;
    } else if (!paymentType) {
      dispatch(openErrorAlert("Указание порядка оплаты обязательно!"));
      return;
    } else if (!category) {
      dispatch(openErrorAlert("Не указана категория!"));
      return;
    }
    setPromiseProgress(true);
    sendPhotosArray.forEach((photo, idx) => {
      Requests.createImage(photo)
        .then((res) => {
          upsendPhotosArray.push(res.data.id);
          if (idx === mainPhoto) {
            mainPhotoId = res.data.id;
          }
          if (upsendPhotosArray.length === sendPhotosArray.length) {
            Requests.createFilmPlace({
              name_place: title,
              description: description,
              place_location: `SRID=4326;POINT (${coords[0]} ${coords[1]})`,
              string_place_location: addressLine,
              session_сategory: category,
              photo_camera: camera,
              cost: cost,
              payment: paymentType,
              category: category.map((category) => category.id),
              main_photo: mainPhotoId,
              place_image: upsendPhotosArray,
            })
              .then(() => {
                dispatch(
                  openSuccessAlert("Место для съемки успешно добавлено!")
                );
                navigate("/profile/places");
                setPromiseProgress(false);
              })
              .catch((err) => {
                openErrorAlert(err.response.data.error);
                setPromiseProgress(false);
              });
          } else return;
        })
        .catch((err) => {
          dispatch(openErrorAlert(err.response.data.error));
          setPromiseProgress(false);
        });
    });
  };

  React.useEffect(() => {
    Requests.getPlacesCategories().then((res) => setCategories(res.data));
  }, []);

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
    <div className="add_photo">
      <div className="add_photo_header">
        <img src={Back} alt="back" className="add_photo_header_arrow" />
        <p
          onClick={() => navigate("/profile/places")}
          className="add_photo_header_p"
        >
          Все места для съемок
        </p>
      </div>
      {sendPhotosArray &&
        sendPhotosArray.length >= 1 &&
        window.screen.width > 576 && (
          <div className="sessions_options">
            <div className="sessions_options_left">
              <p className="sessions_options_left_p">
                Всего:{" "}
                <span className="sessions_options_left_p_span">
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

            <div className="sessions_options_right">
              <SelectInput
                label={"Выберите действие"}
                labelId="demo-multiple-name-label"
                width={200}
                marginBottom={"10px"}
                values={[
                  {
                    id: 1,
                    value: "Удалить",
                  },
                ]}
                value={action}
                onChange={(e) => setAction(e.target.value)}
              />
            </div>
          </div>
        )}
      <div className="add_photo_content">
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

                        console.log(selectedPhotos);
                      } else {
                        selectedPhotos.push(photo);
                        setSelectedPhotos(selectedPhotos);
                        forceUpdate();
                        console.log(selectedPhotos);
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
            label={"Название"}
            required
          />
          <textarea
            placeholder="Введите описание (+0,001 к рейтингу)"
            className="add_session_left_content_textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <h1 className="add_session_left_content_h1 margin">
            Место съемки <span style={{ color: "red", opacity: "0.8" }}>*</span>{" "}
          </h1>
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
          <h1 className="add_session_left_content_h1 margin">
            Данные о съемке
          </h1>
          <TextInput
            width={"100%"}
            height={"38px"}
            placeholder="Введите данные"
            label={"Фотоаппарат"}
            callback={setCamera}
            value={camera}
            limit={15}
            required
          />

          <TextInput
            width={"100%"}
            height={"38px"}
            placeholder="Введите данные"
            label={"Стоимость"}
            callback={setCost}
            value={cost}
            limit={15}
            required
          />

          <SelectInput
            values={[
              { id: "По предоплате", value: "По предоплате" },
              { id: "По постоплате", value: "По постоплате" },
              { id: "TFP", value: "TFP" },
            ]}
            value={paymentType}
            onChange={(e) => setPaymentType(e.target.value)}
            setValue={setPaymentType}
            label={"Порядок оплаты"}
            width={"100%"}
            required
          />

          {categories && (
            <AutoCompleteInput
              values={
                categories &&
                categories.map((item) => {
                  return {
                    id: item.id,
                    name: item.name_category,
                  };
                })
              }
              value={category}
              onChange={(e, value) => setCategory(value.map((item) => item))}
              placeholder={"Выберите категории"}
              width={"100%"}
              required
              label={"Категория"}
            />
          )}
        </div>

        <div className="add_session_right_content">
          <div
            style={{ height: "59px" }}
            className="add_session_right_content_window"
          >
            <ul className="add_session_right_content_ul">
              <li className="add_session_right_content_li">
                <div className="sessions_options_right_add">
                  <img
                    src={AddImage}
                    alt="add"
                    className="sessions_options_right_add_image"
                  />
                  <label
                    htmlFor="file_input"
                    className="sessions_options_right_add_p"
                  >
                    Загрузить фотографии
                  </label>
                  <input
                    id="file_input"
                    type="file"
                    className="hidden_file_input"
                    onChange={(e) => handlePhotoRead(e)}
                    accept="image/png, image/jpeg, image/tiff, image/dng, image/heif, image/webp"
                    multiple
                  />
                </div>
              </li>
            </ul>
          </div>
          {sendPhotosArray &&
            sendPhotosArray.length >= 1 &&
            window.screen.width <= 576 && (
              <div className="sessions_options">
                <div className="sessions_options_left">
                  <p className="sessions_options_left_p">
                    Всего:{" "}
                    <span className="sessions_options_left_p_span">
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

                <div className="sessions_options_right">
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
          disabled={promiseProgress}
        />
      </div>
    </div>
  );
};

export default AddPlace;
