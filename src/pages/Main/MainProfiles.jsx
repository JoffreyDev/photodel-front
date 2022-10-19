import React from "react";
import {
  SelectInput,
  TextInput,
  GreenButton,
  ProfileMainPreview,
} from "../../components";
import "../../styles/Main/MainPhoto.scss";
import { useSelector } from "react-redux";
import SortImage from "../../img/sessions/sort.svg";
import Requests from "../../http/axios-requests";
import { useNavigate } from "react-router-dom";
import { YMaps, Placemark, Map } from "react-yandex-maps";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import MapImg from "../../img/commonImages/map.svg";
import SortImageInvert from "../../img/commonImages/sort-.svg";
import Shape from "../../img/commonImages/shape.svg";
import Online from "../../img/commonImages/online.svg";
import Rate from "../../img/commonImages/rate.svg";
import Filter from "../../img/commonImages/filter.svg";
import Loading from "../../img/commonImages/loading.gif";
import { slide as Menu } from "react-burger-menu";

const MainProfiles = () => {
  const { prosCategories } = useSelector(({ siteEntities }) => siteEntities);
  const { userCoords } = useSelector(({ userData }) => userData);

  const [profiles, setProfiles] = React.useState();

  const navigate = useNavigate();

  const [searchReq, setSearchReq] = React.useState();
  const [searchDist, setSearchDist] = React.useState(10000000000);
  const [category, setCategory] = React.useState("Все");
  const [places, setPlaces] = React.useState();
  const [sortField, setSortField] = React.useState(2);
  const [sortType, setSortType] = React.useState("-");

  const [mapViewActive, setMapViewActive] = React.useState(true);
  const [profilesMarks, setProfilesMarks] = React.useState();

  const [fetching, setFetching] = React.useState(false);
  const [countPositions, setCountPositions] = React.useState(5);
  const [page, setPage] = React.useState(1);
  const [countItems, setCountItems] = React.useState();

  const [balloonDataLoading, setBalloonDataLoading] = React.useState(true);

  const [name, setName] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [id, setId] = React.useState("");
  const [avatar, setAvatar] = React.useState("");
  const [rating, setRating] = React.useState("");
  const [menuOpened, setMenuOpened] = React.useState(false);

  const [selectAdded, setSelectAdded] = React.useState(false);

  const [ignored, forceUpdate] = React.useReducer((x) => x + 1, 0);

  function closeCurrentBalloon() {
    let close = document.querySelector(
      'ymaps[class$="-balloon__close-button"]'
    );
    if (close != null) {
      close.click();
    }
  }

  const getProfileData = (id) => {
    setBalloonDataLoading(true);
    Requests.getPublicProfile(id).then((res) => {
      setName(res.data.name);
      setSurname(res.data.surname);
      setAvatar(res.data.avatar);
      setId(id);
      setRating(res.data.rating);
      forceUpdate();
      setBalloonDataLoading(false);
    });
  };

  let pointData = {
    balloonContentBody: [
      balloonDataLoading
        ? `<div style=display:flex;justify-content:center;align-items:center>
        <img src=${Loading} style=height:50px;width:50px;object-fit:cover;border-radius:8px; />
        </div>
        `
        : `
      <a href=${`/public/profile/${id}`} style=text-decorate: none; >
        <div style=display:flex;flex-direction:column;align-items:center class="recent-block-wrapper">
        <img src=${`data:image/png;base64,${avatar}`} style=height:100px;width:100px;object-fit:cover;border-radius:8px;  />
        <div style=display:flex;justify-content:center;align-items:center;margin-top:8px;flex-direction:column; >
         <div style=display:flex;justify-content:center;align-items:center;margin-top:5px; >
          <img src=${Online} style=width:6px;height:6px;margin-right:4px; />
          <p style=font-family:Montserrat;font-style:normal;font-weight:600;font-size:12px;color:#9CA3A1;>${surname}</p>
          </div>
          <p style=font-family:Montserrat;font-style:normal;font-weight:600;font-size:12px;color:#9CA3A1;>${name}</p>
        </div>
        <div style=display:flex;justify-content:center;align-items:center;margin-top:6px; >
       
          <img src=${Rate} style=width:14px;height:14px;margin-right:4px; />
          <p style=font-family:Montserrat;font-style:normal;font-weight:500;font-size:12px;color:black;>${rating}</p>
          </div>
      </div>
      </a>
          `,
    ].join(""),
  };

  React.useEffect(() => {
    if (window.location.href.includes("?req=")) {
      setSearchReq(decodeURI(window.location.href.split("?req=")[1]));
    }

    setFetching(true);
    Requests.getAllProfiles({
      userCoords: userCoords,
      name_category: category,
      search_words: window.location.href.includes("?req=")
        ? decodeURI(window.location.href.split("?req=")[1])
        : searchReq,
      distance: searchDist,
      sortField: sortField === 1 ? "id" : sortField === 2 ? "likes" : "",
      sortType: sortType,
      count_positions: countPositions,
      page: page,
    }).then((res) => {
      setFetching(false);
      setProfiles(res.data);
      setCountItems(Number(res.headers["count-filter-items"]));
    });

    Requests.getAllProfilesMarks({
      userCoords: userCoords,
      name_category: category,
      search_words: searchReq,
      distance: searchDist,
    }).then((res) => setProfilesMarks(res.data));

    navigate("/profies");
  }, [sortType, sortField, mapViewActive, page]);

  const handleSearch = () => {
    setFetching(true);
    setMenuOpened(false);
    Requests.getAllProfiles({
      userCoords: userCoords,
      name_category: category,
      search_words: searchReq,
      distance: searchDist,
      sortField: sortField === 1 ? "id" : sortField === 2 ? "likes" : "",
      sortType: sortType,
      count_positions: countPositions,
      page: page,
    }).then((res) => {
      setFetching(false);
      setProfiles(res.data);
      setCountItems(Number(res.headers["count-filter-items"]));
    });

    Requests.getAllProfilesMarks({
      userCoords: userCoords,
      name_category: category,
      search_words: searchReq,
      distance: searchDist,
    }).then((res) => setProfilesMarks(res.data));
  };

  const theme = createTheme({
    palette: {
      primary: {
        // Purple and green play nicely together.
        main: purple[500],
      },
      secondary: {
        // This is green.A700 as hex.
        main: "#50A398",
        contrastText: "#fff",
      },
    },
  });

  React.useEffect(() => {
    if (prosCategories && !selectAdded) {
      prosCategories.unshift({ id: 100, name_category: "Все" });
      setSelectAdded(true);
    }
  }, [prosCategories]);

  React.useEffect(() => {
    window.scroll(0, 0);
    document.title = "Профи рядом";
  }, []);

  return (
    <div className="main_photo">
      <div className="main_photo_menu">
        <Menu isOpen={menuOpened} onClose={() => setMenuOpened(false)}>
          <div className="main_photo_header_fields mobile">
            <TextInput
              height={"38px"}
              width={"255px"}
              label={"Простой поиск"}
              placeholder={"Введите что-нибудь"}
              value={searchReq}
              callback={setSearchReq}
            />
            <SelectInput
              height={"38px"}
              width={"255px"}
              label={"Категория"}
              values={
                prosCategories &&
                prosCategories.map((item) => {
                  return { id: item.id, value: item.name_category };
                })
              }
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              setValue={setCategory}
              getName
            />
            <SelectInput
              height={"38px"}
              width={"255px"}
              label={"Радиус нахождения автора"}
              values={[
                { id: "10000000000", value: "Без ограничения" },
                { id: "5000", value: "В переделах 5км" },
                { id: "10000", value: "В переделах 10км" },
                { id: "25000", value: "В переделах 25км" },
                { id: "50000", value: "В переделах 50км" },
                { id: "100000", value: "В переделах 100км" },
              ]}
              value={searchDist}
              onChange={(e) => setSearchDist(e.target.value)}
              setValue={setSearchDist}
            />
            <div className="main_photo_header_sorts mobile">
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={
                    sortType === "+"
                      ? SortImage
                      : sortType === "-"
                      ? SortImageInvert
                      : ""
                  }
                  alt="sort"
                  className="places_header_select_image"
                  onClick={() =>
                    setSortType(
                      sortType === "+" ? "-" : sortType === "-" ? "+" : ""
                    )
                  }
                />
                <SelectInput
                  values={[
                    {
                      id: 1,
                      value: "По дате добавления",
                    },
                    {
                      id: 2,
                      value: "По популярности",
                    },
                  ]}
                  width={190}
                  nonBorder={true}
                  fontSize={"13px"}
                  marginBottom={"0px"}
                  value={sortField}
                  onChange={(e) => setSortField(e.target.value)}
                />
              </div>
            </div>
            <div style={{ alignSelf: "center" }}>
              <GreenButton
                height={"38px"}
                width={"180px"}
                text={"Найти"}
                callback={handleSearch}
                margin={"15px 0 0 0"}
              />
            </div>
          </div>
        </Menu>
      </div>
      <div
        className={
          mapViewActive ? "main_photo_content map_active" : "main_photo_content"
        }
      >
        <div className="main_photo_header">
          <h1 className="main_photo_header_h1">Профи рядом с Вами</h1>
          <div className="main_photo_header_middle">
            <div
              onClick={() => setMenuOpened(true)}
              className="main_photo_header_middle_filters"
            >
              <img
                src={Filter}
                alt={"filter"}
                className="main_photo_header_middle_filters_img"
              />
              <p className="main_photo_header_middle_filters_">Все фильтры</p>
            </div>
            <p className="main_photo_header_sorts_p">
              {countItems && countItems} найдено
            </p>
          </div>
          <div className="main_photo_map mobile">
            <YMaps>
              <Map
                onClick={closeCurrentBalloon}
                defaultState={{
                  center: userCoords ? userCoords : [55.751574, 37.573856],
                  zoom: 5,
                  controls: ["fullscreenControl", "geolocationControl"],
                  panelMaxMapArea: 0,
                }}
                options={{
                  geolocationControlFloat: "right",
                }}
                width="100%"
                height={"100%"}
                modules={["package.full"]}
              >
                {profilesMarks &&
                  profilesMarks.map((profile) => (
                    <Placemark
                      options={{
                        iconLayout: "default#image",
                        // Своё изображение иконки метки.
                        iconImageHref: "./media/marker.svg",
                        // Размеры метки.
                        iconImageSize: [30, 42],
                        balloonPanelMaxMapArea: 0,
                      }}
                      properties={pointData}
                      modules={[
                        "geoObject.addon.balloon",
                        "geoObject.addon.hint",
                      ]}
                      geometry={
                        profile.location
                          ? profile.location
                              .split("(")[1]
                              .split(")")[0]
                              .split(" ")
                              .map((elem) => Number(elem))
                          : [55.751574, 37.573856]
                      }
                      onBalloonOpen={() => getProfileData(profile.id)}
                    />
                  ))}
              </Map>
            </YMaps>
          </div>
          <div className="main_photo_header_fields">
            <TextInput
              height={"38px"}
              width={"255px"}
              label={"Простой поиск"}
              placeholder={"Введите что-нибудь"}
              value={searchReq}
              callback={setSearchReq}
            />
            <SelectInput
              height={"38px"}
              width={"255px"}
              label={"Категория"}
              values={
                prosCategories &&
                prosCategories.map((item) => {
                  return { id: item.id, value: item.name_category };
                })
              }
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              setValue={setCategory}
              getName
            />
            <SelectInput
              height={"38px"}
              width={"255px"}
              label={"Радиус нахождения автора"}
              values={[
                { id: "10000000000", value: "Без ограничения" },
                { id: "5000", value: "В переделах 5км" },
                { id: "10000", value: "В переделах 10км" },
                { id: "25000", value: "В переделах 25км" },
                { id: "50000", value: "В переделах 50км" },
                { id: "100000", value: "В переделах 100км" },
              ]}
              value={searchDist}
              onChange={(e) => setSearchDist(e.target.value)}
              setValue={setSearchDist}
            />
            <GreenButton
              height={"38px"}
              width={"180px"}
              text={"Найти"}
              callback={handleSearch}
            />
          </div>
          {!mapViewActive && (
            <div
              onClick={() => {
                setMapViewActive(true);
                setCountPositions(5);
                setPage(1);
              }}
              className="main_photo_header_fields_map"
            >
              <img
                src={MapImg}
                alt="map"
                className="main_photo_header_fields_map_img"
              />
              <p className="main_photo_header_fields_map_p">Показать карту</p>
            </div>
          )}
        </div>
        <div className="main_photo_header_sorts">
          <p className="main_photo_header_sorts_p">
            {countItems && countItems} найдено
          </p>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={
                sortType === "+"
                  ? SortImage
                  : sortType === "-"
                  ? SortImageInvert
                  : ""
              }
              alt="sort"
              className="places_header_select_image"
              onClick={() =>
                setSortType(
                  sortType === "+" ? "-" : sortType === "-" ? "+" : ""
                )
              }
            />
            <SelectInput
              values={[
                {
                  id: 1,
                  value: "По дате добавления",
                },
                {
                  id: 2,
                  value: "По популярности",
                },
              ]}
              width={190}
              nonBorder={true}
              fontSize={"13px"}
              marginBottom={"0px"}
              value={sortField}
              onChange={(e) => setSortField(e.target.value)}
            />
          </div>
        </div>
        <div
          className={
            mapViewActive ? "main_photo_body" : "main_photo_body map_disabled"
          }
        >
          {!fetching &&
            profiles &&
            profiles.map((profile, idx) => (
              <ProfileMainPreview
                profile={profile}
                key={idx}
                width={mapViewActive ? "100%" : "48%"}
                marginRight={!mapViewActive ? "2%" : ""}
                disableBorder={!mapViewActive}
              />
            ))}

          {(!profiles || fetching) && (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "582px",
              }}
            >
              <CircularProgress color="success" />
            </div>
          )}

          {!fetching && profiles && profiles.length === 0 && (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "580px",
              }}
            >
              <h1 className="main_photo_header_h1">
                Мы не нашли подходящих профи :(
              </h1>
            </div>
          )}
        </div>
        {profiles && !fetching && profiles && profiles.length !== 0 && (
          <div className="main_photo_body_pagination">
            <ThemeProvider theme={theme}>
              <Pagination
                count={
                  mapViewActive
                    ? Math.ceil(countItems / 5)
                    : Math.ceil(countItems / 10)
                }
                page={page}
                color="secondary"
                onChange={(event, value) => setPage(value)}
              />
            </ThemeProvider>
          </div>
        )}
      </div>
      {mapViewActive && (
        <div className="main_photo_map">
          <div
            style={{
              height: "100%",
              width: "100%",
              position: "relative",
            }}
          >
            <div
              onClick={() => {
                setCountPositions(10);
                setMapViewActive(false);
                setPage(1);
              }}
              className="main_photo_map_hide"
            >
              <img
                src={Shape}
                alt="close"
                className="main_photo_map_hide_img"
              />
              <p className="main_photo_map_hide_p">Скрыть карту</p>
            </div>
            <YMaps>
              <Map
                onClick={closeCurrentBalloon}
                defaultState={{
                  center: userCoords ? userCoords : [55.751574, 37.573856],
                  zoom: 5,
                  controls: ["fullscreenControl", "geolocationControl"],
                }}
                options={{ geolocationControlFloat: "right" }}
                width="100%"
                height={"100%"}
                modules={["package.full"]}
              >
                {profilesMarks &&
                  profilesMarks.map((profile) => (
                    <Placemark
                      options={{
                        iconLayout: "default#image",
                        // Своё изображение иконки метки.
                        iconImageHref: "./media/marker.svg",
                        // Размеры метки.
                        iconImageSize: [30, 42],
                      }}
                      properties={pointData}
                      modules={[
                        "geoObject.addon.balloon",
                        "geoObject.addon.hint",
                      ]}
                      geometry={
                        profile.location
                          ? profile.location
                              .split("(")[1]
                              .split(")")[0]
                              .split(" ")
                              .map((elem) => Number(elem))
                          : [55.751574, 37.573856]
                      }
                      onBalloonOpen={() => getProfileData(profile.id)}
                    />
                  ))}
              </Map>
            </YMaps>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainProfiles;
