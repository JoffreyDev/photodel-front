import React from "react";
import Back from "../../img/addModules/arrow-back.svg";
import {
  TextInput,
  Checkbox,
  GreyButton,
  GreenButton,
  AutoCompleteInput,
  SelectInput,
  PhotosPreviewCheckbox,
  AddToTrainingCard,
  AddTeamMembers,
  AddOrgsToTraining,
} from "../../components";
import { useSelector } from "react-redux";
import "../../styles/Profile/AddTraining.scss";
import Requests, { rootAddress } from "../../http/axios-requests";
import { useNavigate, useParams } from "react-router-dom";
import { openErrorAlert, openSuccessAlert } from "../../redux/actions/userData";
import { useDispatch } from "react-redux";
import Delete from "../../img/photoView/delete.svg";
import Lock from "../../img/photoView/lock.svg";
import Add from "../../img/trainings/add.svg";
import Resizer from "react-image-file-resizer";

const AddTraining = () => {
  let parsedFiles = [];

  const upsendPhotosArray = [];
  let mainPhotoId;

  const [sendPhotosArray, setSendPhotosArray] = React.useState([]);
  //состояния для полей и фото
  const [coords, setCoords] = React.useState();
  const [addressLine, setAddressLine] = React.useState();
  const [title, setTitle] = React.useState();
  const [description, setDescription] = React.useState();
  const [place, setPlace] = React.useState("Online");
  const [cost, setCost] = React.useState();
  const [firstPayment, setFirstPayment] = React.useState();
  const [mainPhoto, setMainPhoto] = React.useState(0);
  const [selectedPhotos, setSelectedPhotos] = React.useState([]);
  const [key, setKey] = React.useState();
  const [action, setAction] = React.useState("");
  const [allPhotosSelected, setAllPhotosSelected] = React.useState(false);
  const [ignored, forceUpdate] = React.useReducer((x) => x + 1, 0);

  const { userData } = useSelector(({ userData }) => userData);

  const [loaded, setLoaded] = React.useState(false);
  const [mapLoaded, setMapLoaded] = React.useState(false);
  const [categories, setCategories] = React.useState(false);
  const [category, setCategory] = React.useState(1);

  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [placesCount, setPlacesCount] = React.useState(null);

  const [membersToDisplay, setMembersToDisplay] = React.useState([]);

  const [selectedMembers, setSelectedMembers] = React.useState([]);

  const [userTeamMembers, setUserTeamMembers] = React.useState();
  const [modalActive, setModalActive] = React.useState();

  const [modalOrgsActive, setModalOrgsActive] = React.useState(false);
  const [orgsToDisplay, setOrgsToDisplay] = React.useState([]);
  const [selectedOrgs, setSelectedOrgs] = React.useState([]);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const params = useParams();
  const trainingId = params.id;

  const deleteTeamMember = (id) => {
    let array;
    array = membersToDisplay;
    array.splice(array.indexOf(id), 1);
    setMembersToDisplay(array);
    setKey(Math.random);
  };

  const deleteOrgMember = (id) => {
    let array;
    array = orgsToDisplay;
    array.splice(array.indexOf(id), 1);
    setOrgsToDisplay(array);
    setKey(Math.random);
  };

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

  React.useEffect(() => {
    Requests.getTrainingsCategories().then((res) => setCategories(res.data));
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
    if (sendPhotosArray.length + e.target.files.length > 10) {
      dispatch(openErrorAlert("Максимум 10 изображений!"));
      return;
    }
    parsedFiles = Array.from(e.target.files);
    parsedFiles.forEach((file) => {
      if (file.size >= 4e5) {
        resizeFile(file, file.size);
      }

      if (file.size < 4e5) {
        getBase64(file, function (base64Data) {
          sendPhotosArray.push(base64Data);
          setSendPhotosArray(sendPhotosArray); // Here you can have your code which uses Base64 for its operation, // file to Base64 by oneshubh
          forceUpdate();
        });
      }
    });
  };

  const handlePlacesChange = (e) => {
    if (Number(e) > 1000) {
      setPlacesCount(1000);
    } else {
      setPlacesCount(e);
    }
  };

  const handleCreate = () => {
    if (!upsendPhotosArray) {
      dispatch(openErrorAlert("Загрузите фото!"));
      return;
    } else if (!title) {
      dispatch(openErrorAlert("Не указано название!"));
      return;
    } else if (!coords) {
      dispatch(openErrorAlert("Не указано местоположение!"));
      return;
    } else if (!category) {
      dispatch(openErrorAlert("Не указан тип мероприятия!"));
      return;
    } else if (!startDate) {
      dispatch(openErrorAlert("Не указана дата начала мероприятия!"));
      return;
    } else if (!endDate) {
      dispatch(openErrorAlert("Не указана дата конца мероприятия!"));
      return;
    } else if (!place) {
      dispatch(openErrorAlert("Не указано место проведения мероприятия!"));
      return;
    } else if (!cost) {
      dispatch(openErrorAlert("Не указана информация о стоимости участия!"));
      return;
    } else if (!firstPayment) {
      dispatch(
        openErrorAlert("Не указана информация о предоплате за участие!")
      );
      return;
    }
    sendPhotosArray.forEach((photo, idx) => {
      Requests.createImage(photo).then((res) => {
        upsendPhotosArray.push(res.data.id);
        if (idx === mainPhoto) {
          mainPhotoId = res.data.id;
        }
        if (upsendPhotosArray.length === sendPhotosArray.length) {
          Requests.createTraining({
            title: title,
            description: description,
            placeLocation: `SRID=4326;POINT (${coords[0]} ${coords[1]})`,
            addressLine: addressLine,
            category: category,
            upsendPhotosArray: upsendPhotosArray,
            main_photo: mainPhotoId,
            place: place,
            cost: cost,
            firstPayment: firstPayment,
            startDate: startDate,
            endDate: endDate,
            countPlaces: placesCount,
            training_orgs: selectedOrgs,
            training_team: selectedMembers,
          })
            .then(() => {
              dispatch(openSuccessAlert("Мероприятие успешно запланировано!"));
              navigate("/profile/trainings");
            })
            .catch((err) => dispatch(openErrorAlert(err.response.data)));
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

  const { userCoords } = useSelector(({ userData }) => userData);

  React.useEffect(() => {
    Requests.getTeamList(userData.id, userCoords).then((res) => {
      setUserTeamMembers(res.data);
    });
  }, [userData]);

  return (
    <div className="add_training">
      <div className="add_training_header">
        <img src={Back} alt="back" className="add_training_header_arrow" />
        <p
          onClick={() => navigate("/profile/photos")}
          className="add_training_header_p"
        >
          Все мероприятия
        </p>
      </div>
      <div className="add_training_content">
        <div className="add_training_left_content">
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
          <h1 className="add_training_left_content_h1">Название и описание</h1>
          <TextInput
            width={"100%"}
            height={"38px"}
            placeholder="Введите название"
            callback={setTitle}
            value={title}
          />
          <textarea
            placeholder="Введите описание (+0,001 к рейтингу)"
            className="add_training_left_content_textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <h1 className="add_training_left_content_h1 margin">
            Место проведения
          </h1>
          <TextInput
            width={"100%"}
            height={"38px"}
            placeholder="Местоположение"
            label={"Укажите местоположение на карте, после чего закройте карту"}
            callback={setAddressLine}
            value={addressLine}
          />

          <div id="map" style={{ height: "135px", width: "100%" }}></div>

          <h1 className="add_training_left_content_h1 margin">
            Данные о мероприятии
          </h1>
          <SelectInput
            label={"Локация"}
            width={"100%"}
            height={"38px"}
            placeholder="Введите данные"
            values={[
              { id: "Online", value: "Онлайн" },
              { id: "Offline", value: "Оффлайн" },
            ]}
            value={place}
            onChange={(e) => {
              setPlace(e.target.value);
            }}
            setValue={setPlace}
          />
          {categories && (
            <SelectInput
              label={"Тип мероприятия"}
              width={"100%"}
              height={"38px"}
              placeholder="Введите данные"
              values={
                categories &&
                categories.map((item) => {
                  return { id: item.id, value: item.name_category };
                })
              }
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                console.log(e);
              }}
              setValue={setCategory}
            />
          )}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div
              style={{ width: "48%" }}
              className="add_session_left_content_date_wrapper"
            >
              <label
                htmlFor="date"
                className="add_session_left_content_date_label"
              >
                Дата начала
              </label>
              <input
                placeholder="Выберите дату"
                type="date"
                className="add_session_left_content_date"
                id="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div
              style={{ width: "48%" }}
              className="add_session_left_content_date_wrapper"
            >
              <label
                htmlFor="date"
                className="add_session_left_content_date_label"
              >
                Дата конца
              </label>
              <input
                placeholder="Выберите дату"
                type="date"
                className="add_session_left_content_date"
                id="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <TextInput
            width={"100%"}
            height={"38px"}
            placeholder="Введите данные"
            label={"Количество мест"}
            callback={handlePlacesChange}
            value={placesCount}
            limit={10}
          />

          <TextInput
            width={"100%"}
            height={"38px"}
            placeholder="Введите данные"
            label={"Стоимость"}
            callback={setCost}
            value={cost}
            limit={10}
          />

          <TextInput
            width={"100%"}
            height={"38px"}
            placeholder="Введите данные"
            label={"Предоплата"}
            callback={setFirstPayment}
            value={firstPayment}
            limit={10}
          />

          <div>
            <div className="training_view_content_right_team_single">
              <p className="training_view_content_right_team_single_title">
                Организаторы
              </p>
            </div>
            <div
              onClick={() => setModalOrgsActive(true)}
              className="training_options_right_add teamAdd"
            >
              <img
                src={Add}
                alt="add"
                className="training_options_right_add_image"
              />
              <p className="training_options_right_add_p">
                Добавить в организаторы
              </p>
            </div>
            {userTeamMembers &&
              userTeamMembers.map((member, idx) => {
                if (orgsToDisplay.includes(member.id)) {
                  return (
                    <AddToTrainingCard
                      profile={member}
                      key={idx}
                      callback={() => deleteOrgMember(member.id)}
                    />
                  );
                }
              })}
            <div className="training_view_content_right_team_single">
              <p className="training_view_content_right_team_single_title">
                Команда
              </p>
            </div>
            <div className="training_options_right_add teamAdd">
              <img
                src={Add}
                alt="add"
                className="training_options_right_add_image"
              />
              <p
                onClick={() => setModalActive(true)}
                className="training_options_right_add_p"
              >
                Добавить в команду
              </p>
            </div>
            {userTeamMembers &&
              userTeamMembers.map((member, idx) => {
                if (membersToDisplay.includes(member.id)) {
                  return (
                    <AddToTrainingCard
                      profile={member}
                      key={idx}
                      callback={() => deleteTeamMember(member.id)}
                    />
                  );
                }
              })}
          </div>
        </div>
        <div className="add_training_right_content">
          <div className="add_training_right_content_window only">
            <ul className="add_training_right_content_ul">
              <li className="add_training_right_content_li">
                <div className="photos_options_right_add">
                  <img
                    src={Add}
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

      <div className="add_training_buttons">
        <div style={{ marginRight: "15px " }}>
          <GreyButton
            text={"Отменить"}
            width={"180px"}
            height={"38px"}
            callback={() => navigate("/profile/trainings")}
          />
        </div>
        <GreenButton
          text={"Сохранить"}
          width={"180px"}
          height={"38px"}
          margin={"13px 0 0 0"}
          callback={handleCreate}
        />
      </div>
      <AddTeamMembers
        modalActive={modalActive}
        setModalActive={setModalActive}
        userTeamMembers={userTeamMembers}
        setMembersToDisplay={setMembersToDisplay}
        selectedMembers={selectedMembers}
        setSelectedMembers={setSelectedMembers}
      />
      <AddOrgsToTraining
        modalActive={modalOrgsActive}
        setModalActive={setModalOrgsActive}
        userTeamMembers={userTeamMembers}
        setOrgsToDisplay={setOrgsToDisplay}
        selectedOrgs={selectedOrgs}
        setSelectedOrgs={setSelectedOrgs}
      />
    </div>
  );
};

export default AddTraining;
