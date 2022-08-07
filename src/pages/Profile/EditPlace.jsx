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
import { useParams } from "react-router-dom";

const AddPlace = () => {
  let parsedFiles = [];
  const [sendPhotosArray, setSendPhotosArray] = React.useState([]);

  const params = useParams();
  const placeId = params.id;

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
            center: [55.753994, 37.622093],
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

  //получение base64 фото
  function getBase64(file, callback) {
    const reader = new FileReader();

    reader.addEventListener("load", () => callback(reader.result));

    reader.readAsDataURL(file);
  }

  React.useEffect(() => {
    Requests.getSinglePlace(placeId).then((res) => {
      setTitle(res.data.name_place);
      setDescription(res.data.description);
      setAddressLine(res.data.string_place_location);
      setCoords(res.data.place_location);
      setCamera(res.data.photo_camera);
      setPaymentType(res.data.payment);
      setCategory(
        res.data.category.map((category) => {
          return {
            id: category.id,
            name: category.name_category,
          };
        })
      );
      setCost(res.data.cost);
    });
  }, []);

  const handleCreate = () => {
    if (!title) {
      dispatch(openErrorAlert("Не указано название!"));
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
    } else if (!cost) {
      dispatch(openErrorAlert("Указание стоимости обязательно!"));
    } else if (!camera) {
      dispatch(openErrorAlert("Указание камеры обязательно!"));
    }
    Requests.updateFilmPlace({
      name_place: title,
      description: description,
      place_location: `SRID=4326;POINT (${coords[0]} ${coords[1]})`,
      string_place_location: addressLine,
      photo_camera: camera,
      cost: cost,
      payment: paymentType,
      category: category.map((category) => category.id),
      main_photo: mainPhotoId,
      id: placeId,
    })
      .then(() => {
        dispatch(openSuccessAlert("Место для съемки успешно обновлено!"));
        navigate("/profile/places");
      })
      .catch((err) => dispatch(openErrorAlert(err.response.data.error)));
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
    <div className="add_session">
      <div className="add_session_header">
        <img src={Back} alt="back" className="add_session_header_arrow" />
        <p
          onClick={() => navigate("/profile/places")}
          className="add_session_header_p"
        >
          Все места для съемок
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
            label={"Укажите местоположение на карте, после чего закройте карту"}
            callback={setAddressLine}
            value={addressLine}
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
          />

          <TextInput
            width={"100%"}
            height={"38px"}
            placeholder="Введите данные"
            label={"Стоимость"}
            callback={setCost}
            value={cost}
          />

          {paymentType !== undefined && (
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
            />
          )}

          {categories && category !== undefined && (
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
              onChange={(e, value) => {
                setCategory(value.map((item) => item));
                console.log(value.map((item) => item));
              }}
              placeholder={"Выберите категории"}
              width={"100%"}
            />
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
        />
      </div>
    </div>
  );
};

export default AddPlace;
