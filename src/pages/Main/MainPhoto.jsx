import React from "react";
import {
  SelectInput,
  TextInput,
  GreenButton,
  GalleryPhotoPreview,
  GreyButton,
} from "../../components";
import "../../styles/Main/MainPhoto.scss";
import { useSelector } from "react-redux";
import SortImage from "../../img/sessions/sort.svg";
import SortImageInvert from "../../img/commonImages/sort-.svg";
import Shape from "../../img/commonImages/shape.svg";
import Requests, { rootAddress } from "../../http/axios-requests";
import { useNavigate } from "react-router-dom";
import { YMaps, Placemark, Map } from "react-yandex-maps";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import MapImg from "../../img/commonImages/map.svg";
import Like from "../../img/commonImages/like.svg";
import Loading from "../../img/commonImages/loading.gif";
import Filter from "../../img/commonImages/filter.svg";
import { slide as Menu } from "react-burger-menu";

const MainPhoto = () => {
  const { prosSpecs } = useSelector(({ siteEntities }) => siteEntities);
  const { userCoords } = useSelector(({ userData }) => userData);
  const navigate = useNavigate();
  const [specs, setSpecs] = React.useState();
А
  const [triggerSearch, setTriggerSearch] = React.useState(false);

  const [searchReq, setSearchReq] = React.useState();
  const [searchDist, setSearchDist] = React.useState(10000000000);
  const [category, setCategory] = React.useState("Все");
  const [photos, setPhotos] = React.useState();
  const [sortField, setSortField] = React.useState(1);
  const [sortType, setSortType] = React.useState("-");

  const [mapViewActive, setMapViewActive] = React.useState(
    localStorage.getItem("mapActive") === "true"
  );
  const [photosMarks, setPhotosMarks] = React.useState();

  const [fetching, setFetching] = React.useState(false);
  const [countPositions, setCountPositions] = React.useState(6);
  const [page, setPage] = React.useState(1);
  const [countItems, setCountItems] = React.useState();
  const [menuOpened, setMenuOpened] = React.useState(false);

  const [balloonDataLoading, setBalloonDataLoading] = React.useState(true);

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

  const getPhotoData = (id) => {
    setBalloonDataLoading(true);
    Requests.getSinglePhotoUnauth(id).then((res) => {
      setImage(`${rootAddress}${res.data.gallery_image.photo}`);
      setLikes(res.data.likes);
      setTitle(res.data.name_image);
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
      <a href=${`/public/photo/${id}`} style=text-decorate: none; >
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

  React.useEffect(() => {
    setFetching(true);
    Requests.getAllPhotos({
      userCoords: userCoords,
      name_category: category,
      search_words: searchReq,
      distance: searchDist,
      sortField: sortField === 1 ? "id" : sortField === 2 ? "likes_stat" : "",
      sortType: sortType,
      count_positions: countPositions,
      page: page,
    }).then((res) => {
      setFetching(false);
      setPhotos(res.data);
      setCountItems(Number(res.headers["count-filter-items"]));
    });

    Requests.getAllPhotosMarks({
      userCoords: userCoords,
      name_category: category,
      search_words: searchReq,
      distance: searchDist,
    }).then((res) => setPhotosMarks(res.data));
  }, [sortType, sortField, mapViewActive, page]);

  const handleSearch = () => {
    setFetching(true);
    setMenuOpened(false);
    Requests.getAllPhotos({
      userCoords: userCoords,
      name_category: category,
      search_words: searchReq,
      distance: searchDist,
      sortField: sortField === 1 ? "id" : sortField === 2 ? "likes_stat" : "",
      sortType: sortType,
      count_positions: countPositions,
      page: page,
    }).then((res) => {
      setFetching(false);
      setPhotos(res.data);
      setCountItems(Number(res.headers["count-filter-items"]));
    });

    Requests.getAllPhotosMarks({
      userCoords: userCoords,
      name_category: category,
      search_words: searchReq,
      distance: searchDist,
    }).then((res) => setPhotosMarks(res.data));
  };

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
    if (!specs) {
      setSpecs(prosSpecs);
    }
    if (specs && !selectAdded) {
      setSpecs((prev) => [{ id: 100, name_spec: "Все" }, ...prev]);
      setSelectAdded(true);
    }
  }, [prosSpecs, specs]);

  React.useEffect(() => {
    window.scroll(0, 0);
    document.title = "Фотографии";
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
};

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
              label={"Категория фото"}
              values={
                specs &&
                specs.map((item) => {
                  return { id: item.id, value: item.name_spec };
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
          mapViewActive ? "main_photo_content map_active" : "main_photo_content"
        }
      >
        <div className="main_photo_header">
          <h1 className="main_photo_header_h1">Фотографии</h1>
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
                {photosMarks &&
                  photosMarks.map((photo) => (
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
                      geometry={photo.place_location
                        .split("(")[1]
                        .split(")")[0]
                        .split(" ")
                        .map((elem) => Number(elem))}
                      onBalloonOpen={() => getPhotoData(photo.id)}
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
              onKeyDown={handleKeyDown}
            />
            <SelectInput
              height={"38px"}
              width={"255px"}
              label={"Категория фото"}
              values={
                specs &&
                specs.map((item) => {
                  return { id: item.id, value: item.name_spec };
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
              label={"Радиус нахождения места"}
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
                setCountPositions(6);
                setPage(1);
                localStorage.setItem("mapActive", true);
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
            photos &&
            photos.map((photo, idx) => (
              <GalleryPhotoPreview
                photo={photo}
                width={
                  window.screen.width <= 576
                    ? "48%"
                    : mapViewActive
                    ? "258px"
                    : "264px"
                }
                key={idx}
                wrapperWidth={
                  window.screen.width <= 576
                    ? "48%"
                    : mapViewActive
                    ? "258px"
                    : "264px"
                }
              />
            ))}

          {(!photos || fetching) && (
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

          {!fetching && photos && photos.length === 0 && (
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
                Мы не нашли подходящих фото :(
              </h1>
            </div>
          )}
        </div>
        {photos && !fetching && photos && photos.length !== 0 && (
          <div className="main_photo_body_pagination">
            <ThemeProvider theme={theme}>
              <Pagination
                count={
                  mapViewActive
                    ? Math.ceil(countItems / 6)
                    : Math.ceil(countItems / 16)
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
                setCountPositions(16);
                setMapViewActive(false);
                setPage(1);
                localStorage.setItem("mapActive", false);
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
                {photosMarks &&
                  photosMarks.map((photo) => (
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
                      geometry={photo.place_location
                        .split("(")[1]
                        .split(")")[0]
                        .split(" ")
                        .map((elem) => Number(elem))}
                      onBalloonOpen={() => getPhotoData(photo.id)}
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

export default MainPhoto;
