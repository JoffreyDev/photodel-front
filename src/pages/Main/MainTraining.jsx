import React from "react";
import {
  SelectInput,
  TextInput,
  GreenButton,
  PlaceCardMain,
  GreyButton,
} from "../../components";
import "../../styles/Main/MainTraining.scss";
import { useSelector } from "react-redux";
import SortImage from "../../img/sessions/sort.svg";
import SortImageInvert from "../../img/commonImages/sort-.svg";
import Requests, { rootAddress } from "../../http/axios-requests";
import { createRoutesFromChildren, useNavigate } from "react-router-dom";
import { YMaps, Placemark, Map } from "react-yandex-maps";
import Shape from "../../img/commonImages/shape.svg";
import MapImg from "../../img/commonImages/map.svg";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import Like from "../../img/commonImages/like.svg";
import Loading from "../../img/commonImages/loading.gif";
import Filter from "../../img/commonImages/filter.svg";

import { slide as Menu } from "react-burger-menu";
import TrainingCardMain from "../../components/Previews/TrainingCardMain";

const MainTraining = () => {
  const { userCoords } = useSelector(({ userData }) => userData);
  const navigate = useNavigate();

  const [searchReq, setSearchReq] = React.useState();
  const [searchDist, setSearchDist] = React.useState(10000000000);
  const [category, setCategory] = React.useState("Все");
  const [trainings, setTrainings] = React.useState();
  const [trainingsMarks, setTrainingsMarks] = React.useState();
  const [sortField, setSortField] = React.useState(1);
  const [sortType, setSortType] = React.useState("-");

  const [fetching, setFetching] = React.useState(false);
  const [countPositions, setCountPositions] = React.useState(4);
  const [page, setPage] = React.useState(1);
  const [countItems, setCountItems] = React.useState();
  const [menuOpened, setMenuOpened] = React.useState(false);
  const [categories, setCategories] = React.useState([]);

  const [mapViewActive, setMapViewActive] = React.useState(
    localStorage.getItem("mapActive") === "true"
  );

  const [balloonDataLoading, setBalloonDataLoading] = React.useState(true);

  const [triggerSearch, setTriggerSearch] = React.useState(false);

  const [title, setTitle] = React.useState("");
  const [id, setId] = React.useState("");
  const [image, setImage] = React.useState("");
  const [likes, setLikes] = React.useState("");

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

  const getPlaceData = (id) => {
    setBalloonDataLoading(true);
    Requests.getSingleTrainingUnauth(id).then((res) => {
      setImage(`${rootAddress}${res.data.training_images[0].photo}`);
      setLikes(res.data.likes);
      setTitle(res.data.training_title);
      setId(id);
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
      <a href=${`/public/training/${id}`} style=text-decorate: none; >
        <div style=display:flex;flex-direction:column;align-items:center class="recent-block-wrapper">
        <img src=${image} style=height:100px;width:100px;object-fit:cover;border-radius:8px;  />
         <div style=display:flex;justify-content:center;align-items:center;margin-top:5px; >

          <p style=font-family:Montserrat;font-style:normal;font-weight:600;font-size:12px;color:#3C8278;>${title}</p>
        </div>
        <div style=display:flex;justify-content:center;align-items:center;margin-top:6px; >
       
          <img src=${Like} style=width:14px;height:14px;margin-right:4px; />
          <p style=font-family:Montserrat;font-style:normal;font-weight:500;font-size:12px;color:black;>${likes}</p>
          </div>
      </div>
      </a>
          `,
    ].join(""),
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
    Requests.getTrainingsCategories().then((res) => setCategories(res.data));
    setFetching(true);
    Requests.getAllTrainingsList({
      userCoords: userCoords,
      search_words: searchReq,
      name_category: category,
      distance: searchDist,
      sortField: sortField,
      sortType: sortType,
      count_positions: countPositions,
      page: page,
    }).then((res) => {
      setFetching(false);
      setTrainings(res.data);
      setCountItems(Number(res.headers["count-filter-items"]));
    });

    Requests.getAllTrainingsListMap({
      userCoords: userCoords,
      name_category: category,
      search_words: searchReq,
      distance: searchDist,
    }).then((res) => setTrainingsMarks(res.data));
  }, [sortType, sortField, mapViewActive, page]);

  let MyBalloonLayout;
  const initBallonTemplate = () => {
    // Создаем элемент кластера
    MyBalloonLayout = window.ymaps.templateLayoutFactory.createClass(
      '<div class="popover top">' +
        '<a class="close" href="#">&times;</a>' +
        '<div class="arrow"></div>' +
        '<div class="popover-inner">' +
        "$[[options.contentLayout observeSize minWidth=235 maxWidth=235 maxHeight=350]]" +
        "</div>" +
        "</div>"
    );
  };

  React.useEffect(() => {
    setTimeout(() => {
      initBallonTemplate();
    }, 3000);
  }, []);

  const handleSearch = () => {
    setFetching(true);
    setMenuOpened(false);
    Requests.getAllTrainingsList({
      userCoords: userCoords,
      name_category: category,
      search_words: searchReq,
      distance: searchDist,
      sortField: sortField === 1 ? "id" : sortField === 2 ? "views" : "",
      sortType: sortType,
      count_positions: countPositions,
      page: page,
    }).then((res) => {
      setFetching(false);
      setTrainings(res.data);
      setCountItems(Number(res.headers["count-filter-items"]));
    });

    Requests.getAllTrainingsListMap({
      userCoords: userCoords,
      name_category: category,
      search_words: searchReq,
      distance: searchDist,
    }).then((res) => setTrainingsMarks(res.data));
  };

  React.useEffect(() => {
    if (categories.length !== 0 && !selectAdded) {
      categories.unshift({ id: 100, name_category: "Все" });
      setSelectAdded(true);
    }
  }, [categories]);

  const resetFilters = () => {
    setCategory("Все");
    setSearchReq("");
    setSearchDist(10000000000);
    setSortType("-");
    setSortField(1);
    setTriggerSearch((prev) => !prev);
  };

  React.useEffect(() => {
    handleSearch();
  }, [triggerSearch]);

  React.useEffect(() => {
    window.scroll(0, 0);
    document.title = "Обучение";
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
};
  return (
    <div className="main_training">
      <div className="main_training_menu">
        <Menu isOpen={menuOpened} onClose={() => setMenuOpened(false)}>
          <div className="main_training_header_fields mobile">
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
                categories &&
                categories.map((item) => {
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
            <div className="main_training_header_sorts mobile">
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

              <GreyButton
                height={"38px"}
                width={"180px"}
                text={"Сброс"}
                callback={resetFilters}
              />
            </div>
          </div>
        </Menu>
      </div>
      <div
        className={
          mapViewActive
            ? "main_training_content map_active"
            : "main_training_content"
        }
      >
        <div className="main_training_header">
          <h1 className="main_training_header_h1">Обучение</h1>
          <div className="main_training_map mobile">
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
                {trainingsMarks &&
                  trainingsMarks.map((place) => (
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
                      geometry={place.place_location
                        .split("(")[1]
                        .split(")")[0]
                        .split(" ")
                        .map((elem) => Number(elem))}
                      onBalloonOpen={() => getPlaceData(place.id)}
                    />
                  ))}
              </Map>
            </YMaps>
          </div>
          <div className="main_training_header_fields">
            <TextInput
              height={"38px"}
              width={"255px"}
              label={"Простой поиск"}
              placeholder={"Введите что-нибудь"}
              value={searchReq}
              callback={setSearchReq}
              onKeyDown={handleKeyDown}
            />
            <SelectInput
              height={"38px"}
              width={"255px"}
              label={"Радиус"}
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
            <SelectInput
              height={"38px"}
              width={"255px"}
              label={"Категория"}
              values={
                categories &&
                categories.map((item) => {
                  return { id: item.id, value: item.name_category };
                })
              }
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              getName
            />

            <div style={{ display: "flex" }}>
              <GreenButton
                height={"38px"}
                width={"180px"}
                text={"Найти"}
                callback={handleSearch}
                margin={"15px 0 0"}
              />
              <GreyButton
                height={"38px"}
                width={"180px"}
                text={"Сброс"}
                callback={resetFilters}
                margin={"15px 0 0 20px"}
              />
            </div>
          </div>
          {!mapViewActive && (
            <div
              onClick={() => {
                setMapViewActive(true);
                setCountPositions(4);
                setPage(1);
                localStorage.setItem("mapActive", true);
              }}
              className="main_training_header_fields_map"
            >
              <img
                src={MapImg}
                alt="map"
                className="main_training_header_fields_map_img"
              />
              <p className="main_training_header_fields_map_p">
                Показать карту
              </p>
            </div>
          )}
        </div>
        <div className="main_training_header_sorts">
          <p className="main_training_header_sorts_p">
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
            mapViewActive
              ? "main_training_body"
              : "main_training_body map_disabled"
          }
        >
          {trainings &&
            !fetching &&
            trainings.map((training, idx) => (
              <TrainingCardMain
                disableCheck
                disableEdit
                notAuthor
                key={idx}
                training={training}
                halfContent={mapViewActive}
                showDistance
              />
            ))}

          {(!trainings || fetching) && (
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

          {!fetching && trainings && trainings.length === 0 && (
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
              <h1 className="main_training_header_h1">
                Мы не нашли подходящих обучений :(
              </h1>
            </div>
          )}
        </div>
        {trainings && !fetching && trainings && trainings.length !== 0 && (
          <div className="main_training_body_pagination">
            <ThemeProvider theme={theme}>
              <Pagination
                count={
                  mapViewActive
                    ? Math.ceil(countItems / 4)
                    : Math.ceil(countItems / 8)
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
        <div className="main_training_map">
          <div
            style={{
              height: "100%",
              width: "100%",
              position: "relative",
            }}
          >
            <div
              onClick={() => {
                setCountPositions(8);
                setMapViewActive(false);
                setPage(1);
                localStorage.setItem("mapActive", false);
              }}
              className="main_training_map_hide"
            >
              <img
                src={Shape}
                alt="close"
                className="main_training_map_hide_img"
              />
              <p className="main_training_map_hide_p">Скрыть карту</p>
            </div>
            <YMaps>
              <Map
                onClick={closeCurrentBalloon}
                defaultState={{
                  center: userCoords ? userCoords : [55.751574, 37.573856],
                  zoom: 5,
                  controls: ["fullscreenControl", "geolocationControl"],
                }}
                modules={["package.full"]}
                width="100%"
                options={{ geolocationControlFloat: "right" }}
                height={"100%"}
              >
                {trainingsMarks &&
                  trainingsMarks.map((place) => (
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
                      geometry={place.place_location
                        .split("(")[1]
                        .split(")")[0]
                        .split(" ")
                        .map((elem) => Number(elem))}
                      onBalloonOpen={() => getPlaceData(place.id)}
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

export default MainTraining;
