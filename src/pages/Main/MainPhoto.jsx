import React from "react";
import {
  SelectInput,
  TextInput,
  GreenButton,
  GalleryPhotoPreview,
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

const MainPhoto = () => {
  const { prosSpecs } = useSelector(({ siteEntities }) => siteEntities);
  const { userCoords } = useSelector(({ userData }) => userData);
  const navigate = useNavigate();

  const [searchReq, setSearchReq] = React.useState();
  const [searchDist, setSearchDist] = React.useState(10000000000);
  const [category, setCategory] = React.useState("Все");
  const [photos, setPhotos] = React.useState();
  const [sortField, setSortField] = React.useState(1);
  const [sortType, setSortType] = React.useState("-");

  const [mapViewActive, setMapViewActive] = React.useState(true);
  const [photosMarks, setPhotosMarks] = React.useState();

  const [fetching, setFetching] = React.useState(false);
  const [countPositions, setCountPositions] = React.useState(6);
  const [page, setPage] = React.useState(1);
  const [countItems, setCountItems] = React.useState();

  React.useEffect(() => {
    setFetching(true);
    Requests.getAllPhotos({
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
    Requests.getAllPhotos({
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
    prosSpecs && prosSpecs.unshift({ id: 100, name_spec: "Все" });
  }, [prosSpecs]);

  return (
    <div className="main_photo">
      <div
        className={
          mapViewActive ? "main_photo_content map_active" : "main_photo_content"
        }
      >
        <div className="main_photo_header">
          <h1 className="main_photo_header_h1">Фотографии</h1>

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
              label={"Категория фото"}
              values={
                prosSpecs &&
                prosSpecs.map((item) => {
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
                setCountPositions(6);
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
            photos &&
            photos.map((photo, idx) => (
              <GalleryPhotoPreview
                photo={photo}
                width={mapViewActive ? 258 : 264}
                key={idx}
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
                Мы не нашли подходящих мест :(
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
                defaultState={{
                  center: [55.751574, 37.573856],
                  zoom: 5,
                }}
                width="100%"
                height={"100%"}
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
                      properties={{
                        hintContent: "Хинт метки",
                      }}
                      modules={[
                        "geoObject.addon.balloon",
                        "geoObject.addon.hint",
                      ]}
                      geometry={photo.place_location
                        .split("(")[1]
                        .split(")")[0]
                        .split(" ")
                        .map((elem) => Number(elem))}
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
