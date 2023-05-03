import Camera from "../../img/profile/camera.svg";
import "../../styles/Profile/MyProfile.scss";
import {
  TextInput,
  SelectInput,
  AutoCompleteInput,
  GreenButton,
  GreyButton,
  LocationInput,
} from "../../components";
import Requests from "../../http/axios-requests";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { openErrorAlert, setUserData } from "../../redux/actions/userData";
import { useNavigate } from "react-router-dom";
import { openSuccessAlert } from "../../redux/actions/userData";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Resizer from "react-image-file-resizer";

const ProfileEdit = ({ setActiveModule }) => {
  const handleEditCancel = () => {
    navigate("/profile/data");
  };

  const navigate = useNavigate();

  //проверка заполнения данных в полях профиля
  function isJson(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  const dispatch = useDispatch();

  const { userData, userCoords } = useSelector(({ userData }) => userData);

  const [categories, setCategories] = React.useState();
  const [specs, setSpecs] = React.useState();
  const [countries, setCountries] = React.useState();
  const [languages, setLanguages] = React.useState();

  const [status, setStatus] = React.useState();
  const [category, setCategory] = React.useState(
    userData.status === 2 ? "" : 12
  );
  const [spec, setSpec] = React.useState();
  const [cost, setCost] = React.useState();
  const [conditions, setConditions] = React.useState();
  const [technic, setTechnic] = React.useState();
  const [languageSkills, setLanguageSkills] = React.useState();
  const [country, setCountry] = React.useState();

  const [about, setAbout] = React.useState();
  const [location, setLocation] = React.useState();
  const [locationString, setLocationString] = React.useState();
  const [number, setNumber] = React.useState();
  const [site, setSite] = React.useState();
  const [instagram, setInstagram] = React.useState();
  const [facebook, setFacebook] = React.useState();
  const [vk, setVk] = React.useState();
  const [mail, setMail] = React.useState();

  const [tempLocation, setTempLocation] = React.useState();
  const [tempLocationString, setTempLocationString] = React.useState();
  const [tempLocationEndDate, setTempLocationEndDate] = React.useState();
  const [tempLocationStartDate, setTempLocationStartDate] = React.useState();
  const [tempLocationMessage, setTempLocationMessage] = React.useState();

  const [tempDate, setTempDate] = React.useState();

  const [loadedPhoto, setLoadedPhoto] = React.useState();
  const [loadedPhotoBase64, setLoadedPhotoBase64] = React.useState();

  React.useEffect(() => {
    Requests.getProsCategories().then((res) => {
      setCategories(res.data);
    });

    Requests.getProsSpecs().then((res) => {
      setSpecs(res.data);
    });

    Requests.getCountriesList().then((res) => {
      setCountries(res.data);
    });

    Requests.getLanguages().then((res) => {
      setLanguages(res.data);
    });
  }, []);

  React.useEffect(() => {
    if (userData.type_pro) {
      setCategory(
        isJson(userData.type_pro) &&
          Number(Object.keys(JSON.parse(userData.type_pro)[0])[0])
      );

      setSpec(
        isJson(userData.spec_model_or_photographer) &&
          JSON.parse(userData.spec_model_or_photographer).map((item) => {
            return {
              id: Number(Object.keys(item)[0]),
              name: Object.values(item)[0],
            };
          })
      );

      setCountry(
        isJson(userData.filming_geo) &&
          JSON.parse(userData.filming_geo).map((item) => {
            return {
              id: Number(Object.keys(item)[0]),
              name: Object.values(item)[0],
            };
          })
      );

      setLanguageSkills(
        isJson(userData.languages) &&
          JSON.parse(userData.languages).map((item) => {
            return {
              id: Number(Object.keys(item)[0]),
              name: Object.values(item)[0],
            };
          })
      );

      setStatus(userData.ready_status);
      setCost(userData.cost_services);
      setConditions(userData.work_condition);
      setTechnic(userData.photo_technics);
      setAbout(userData.about);
      setLocationString(userData.string_location);
      setLocation(
        userData.location &&
          userData.location.split("(")[1].split(")")[0].split(" ")
      );

      setNumber(userData.phone);
      setMail(userData.email);
      setSite(userData.site);
      setInstagram(userData.instagram);
      setFacebook(userData.facebook);
      setVk(userData.vk);
      setTempLocationString(userData.string_location_now);
      setTempLocation(
        userData.location_now &&
          userData.location_now.split("(")[1].split(")")[0].split(" ")
      );

      setTempLocationMessage(userData.message);
      setTempDate([
        new Date(userData.date_stay_start),
        new Date(userData.date_stay_end),
      ]);
    }
    setStatus(userData.ready_status);
  }, [userData]);

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

  //получить фото в base64
  function getBase64(file, callback) {
    const reader = new FileReader();

    reader.addEventListener("load", () => callback(reader.result));

    reader.readAsDataURL(file);
  }

  React.useEffect(() => {
    if (!localStorage.getItem("access")) navigate("/");
  }, []);

  const photoHandler = (e) => {
    if (e.target.files[0].size > 4e5) {
      resizeFile(e.target.files[0], e.target.files[0].size);
      return;
    }
    setLoadedPhoto(URL.createObjectURL(e.target.files[0]));

    if (e.target.files[0].size <= 4e5) {
      getBase64(e.target.files[0], function (base64Data) {
        setLoadedPhotoBase64(base64Data); // Here you can have your code which uses Base64 for its operation, // file to Base64 by oneshubh
      });
    }
  };

  const handleUpdate = () => {
    if (!category) {
      dispatch(openErrorAlert("Вы не указали категорию!"));
      return;
    } else if (!location) {
      dispatch(openErrorAlert("Вы не указали ваше местоположение!"));
      return;
    }

    Requests.updateOwnProfile({
      ready_status: status,
      filming_geo: country.map((item) => item.id),
      work_condition: conditions,
      cost_services: cost,
      photo_technics: technic,
      languages: languageSkills.map((item) => item.id),
      about: about,
      status: status,
      type_pro: category,
      location: location
        ? `SRID=4326;POINT (${location[0]} ${location[1]})`
        : null,
      phone: number,
      site: site,
      spec_model_or_photographer: spec.map((item) => item.id),
      string_location: locationString,
      avatar: loadedPhotoBase64,
      is_change: true,
      location_now: tempLocation
        ? `SRID=4326;POINT (${tempLocation[0]} ${tempLocation[1]})`
        : null,
      string_location_now: tempLocationString,
      message: tempLocationMessage,
      date_stay_start: tempDate ? convertDate(tempDate[0]) : null,
      date_stay_end: tempDate ? convertDate(tempDate[1]) : null,
    })
      .then(() => {
        Requests.getOwnProfile().then((res) => {
          dispatch(setUserData(res.data));
          navigate("/profile/data");
          dispatch(openSuccessAlert("Профиль изменен!"));
        });
      })
      .catch((e) => dispatch(openErrorAlert(e.response.data.error)));
  };

  const convertDate = (str) => {
    str = str.toString();
    let parts = str.split(" ");
    let months = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12",
    };
    return parts[3] + "-" + months[parts[1]] + "-" + parts[2] + "T" + parts[4];
  };

  const resetTempLocation = () => {
    setTempDate(null);
    setTempLocationMessage("");
    setTempLocationString("");
    setTempLocation(null);
  };

  return (
    <div className="my_profile_wrapper">
      <div className="my_profile_header">
        <div className="content_block2_image">
          <input
            style={{ display: "none" }}
            type="file"
            accept="image/*,image/jpeg"
            id="photo_input"
            onChange={(e) => photoHandler(e)}
          />
          <label className="profile-photo-wrapper" htmlFor="photo_input">
            <div className="my_profile_avatar_wrapper">
              <img
                src={Camera}
                alt="layout"
                className="my_profile_avatar_overlay"
              />
              <img
                src={
                  loadedPhoto
                    ? loadedPhoto
                    : `data:image/png;base64,${userData.avatar}`
                }
                alt="Avatar"
                className="my_profile_avatar"
              />
            </div>
          </label>
        </div>

        <div className="my_profile_header_data">
          <div className="my_profile_header_upper_row">
            <div className="my_profile_header_upper_row_left">
              <p className="my_profile_header_upper_row_name">
                {userData.name + " " + userData.surname}
              </p>
            </div>
          </div>
          <div className="my_profile_header_middle_row">
            {userData.status === 2 && (
              <div className="my_profile_header_middle_row_status">
                <div className="reg_auth_content_input_wrapper">
                  {status !== undefined && (
                    <SelectInput
                      values={[
                        {
                          id: "BUSY",
                          value: "Занят",
                        },
                        {
                          id: "FREE",
                          value: "Свободен",
                        },
                      ]}
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      label={"Статус"}
                      setValue={setStatus}
                      width={"50%"}
                      lock={userData?.pro_account === 0}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="my_profile_common_data">
        <p className="my_profile_common_data_title">Общие данные</p>
        <div className="my_profile_common_data_content edit">
          <div className="my_profile_common_data_content_left_inputs">
            {category !== undefined && (
              <SelectInput
                values={
                  userData.status === 2
                    ? categories &&
                      categories.map((item) => {
                        return { id: item.id, value: item.name_category };
                      })
                    : [{ id: 12, value: "Пользователь" }]
                }
                value={userData.status === 2 ? category : 12}
                onChange={(e) => setCategory(e.target.value)}
                label={
                  <span>
                    Категория{" "}
                    <span style={{ color: "red", opacity: "0.8" }}>*</span>
                  </span>
                }
                setValue={setCategory}
              />
            )}

            {countries && userData.status === 2 && (
              <AutoCompleteInput
                values={
                  countries &&
                  countries.map((item) => {
                    return {
                      id: item.id,
                      name: item.name_country,
                    };
                  })
                }
                value={country ? country : []}
                label={"География съемок"}
                onChange={(e, value) => {
                  if (value.length > 1 && userData?.pro_account === 0) {
                    dispatch(
                      openErrorAlert(
                        "Чтобы указать географию съемок больше, обновитесь до пакета Стандарт"
                      )
                    );
                    return;
                  } else if (value.length > 2 && userData?.pro_account === 1) {
                    dispatch(
                      openErrorAlert(
                        "Чтобы указать географию съемок больше, обновитесь до пакета Максимум"
                      )
                    );
                    return;
                  } else setCountry(value.map((item) => item));
                }}
              />
            )}

            {userData.status === 2 && (
              <TextInput
                width={"350px"}
                height={"38px"}
                label={"Условия работы"}
                value={conditions}
                callback={setConditions}
              />
            )}
            {languages && languageSkills && (
              <AutoCompleteInput
                values={
                  languages &&
                  languages.map((item) => {
                    return {
                      id: item.id,
                      name: item.name_language,
                    };
                  })
                }
                onChange={(e, value) =>
                  setLanguageSkills(value.map((item) => item))
                }
                value={languageSkills}
                label={"Владение языками"}
              />
            )}
          </div>
          <div className="my_profile_common_data_content_right_inputs">
            {specs && spec && userData.status === 2 && (
              <AutoCompleteInput
                values={
                  specs &&
                  specs.map((item) => {
                    return {
                      id: item.id,
                      name: item.name_spec,
                    };
                  })
                }
                value={spec}
                onChange={(e, value) => {
                  if (value.length > 1 && userData?.pro_account === 0) {
                    dispatch(
                      openErrorAlert(
                        "Чтобы указать больше специализаций, обновитесь до пакета Стандарт"
                      )
                    );
                    return;
                  } else if (value.length > 3 && userData?.pro_account === 1) {
                    dispatch(
                      openErrorAlert(
                        "Чтобы указать больше специализаций, обновитесь до пакета Максимум"
                      )
                    );
                    return;
                  } else setSpec(value.map((item) => item));
                }}
                label={"Специализация"}
              />
            )}
            {userData.status === 2 && (
              <TextInput
                width={"350px"}
                height={"38px"}
                label={"Стоимость услуг"}
                value={cost}
                callback={setCost}
              />
            )}
            {userData.status === 2 && (
              <TextInput
                width={"350px"}
                height={"38px"}
                label={"Фототехника"}
                value={technic}
                callback={setTechnic}
              />
            )}
          </div>
        </div>
      </div>

      <div className="my_profile_about">
        <p className="my_profile_about_title">
          Обо мне <span style={{ color: "red", opacity: "0.8" }}>*</span>
        </p>
        <div className="my_profile_about_content">
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="my_profile_about_textarea"
          />
        </div>
      </div>

      <div className="my_profile_contacts">
        <p className="my_profile_contacts_title">Контакты</p>
        <div className="my_profile_contacts_content">
          <div className="my_profile_contacts_content_left_inputs">
            <LocationInput
              width={"350px"}
              height={"38px"}
              label={
                <span>
                  Местонахождение{" "}
                  <span style={{ color: "red", opacity: "0.8" }}>*</span>
                </span>
              }
              addressLine={locationString}
              setAddressLine={setLocationString}
              coords={location}
              setCoords={setLocation}
            />
            {userData.status === 2 && (
              <TextInput
                width={"350px"}
                height={"38px"}
                label={"Телефон"}
                value={number}
                callback={setNumber}
              />
            )}
            {userData.status === 2 && (
              <TextInput
                width={"350px"}
                height={"38px"}
                label={"Сайт"}
                value={site}
                callback={setSite}
                lock
              />
            )}
            {false && (
              <TextInput
                width={"350px"}
                height={"38px"}
                label={"Instagram"}
                value={instagram}
                callback={setInstagram}
              />
            )}
            {false && (
              <TextInput
                width={"350px"}
                height={"38px"}
                label={"ВКонтакте"}
                value={vk}
                callback={setVk}
              />
            )}
          </div>
          <div className="my_profile_contacts_content_right_inputs">
            {false && (
              <TextInput
                width={"350px"}
                height={"38px"}
                label={"Почта"}
                value={mail}
                callback={setMail}
              />
            )}
            {false && (
              <TextInput
                width={"350px"}
                height={"38px"}
                label={"Facebook"}
                value={facebook}
                callback={setFacebook}
              />
            )}
          </div>
        </div>

        {userData.status === 2 && (
          <div
            className={
              userData?.pro_account === 0
                ? "my_profile_temp_location lock"
                : "my_profile_temp_location"
            }
          >
            <div className="my_profile_temp_location_lock">
              <h1 className="my_profile_temp_location_lock_h1">
                Доступно только для Pro
              </h1>
            </div>
            <p className="my_profile_temp_location_title">
              Временная геолокация
            </p>
            <div className="my_profile_temp_location_content">
              <div className="my_profile_temp_location_content_upper_inputs">
                <div style={{ marginRight: "30px" }}>
                  <LocationInput
                    width={"350px"}
                    height={"38px"}
                    label={"Нахожусь сейчас"}
                    addressLine={tempLocationString}
                    setAddressLine={setTempLocationString}
                    coords={tempLocation}
                    setCoords={setTempLocation}
                  />
                </div>
                <div>
                  <label className="common_text_input_label">
                    Даты пребывания
                  </label>
                  <div style={{ marginTop: "3px" }}>
                    <Calendar
                      onChange={(value) => setTempDate(value)}
                      returnValue={"range"}
                      selectRange={true}
                      value={tempDate}
                      activeStartDate={new Date()}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="common_text_input_wrapper">
              <label className="common_text_input_label">Сообщение</label>
              <textarea
                style={{ height: "79px" }}
                className="my_profile_about_textarea"
                value={tempLocationMessage}
                onChange={(e) => setTempLocationMessage(e.target.value)}
              />
            </div>
            <p
              onClick={() => resetTempLocation()}
              className="my_profile_temp_location_content_reset"
            >
              Сбросить данные о временной геолокации
            </p>
          </div>
        )}
        <div className="my_profile_lower_buttons_wrapper">
          <div style={{ marginRight: "15px" }}>
            <GreyButton
              width={"165px"}
              height={"38px"}
              text={"Отменить"}
              callback={handleEditCancel}
            />
          </div>
          <GreenButton
            width={"165px"}
            height={"38px"}
            text={"Сохранить"}
            callback={handleUpdate}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
