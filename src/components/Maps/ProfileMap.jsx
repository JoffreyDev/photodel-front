import { MuiModal } from "..";
import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const ProfileMap = ({ open, setOpen, setAddressLine, setCoords }) => {
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

  React.useEffect(() => {
    setTimeout(() => handleLoad(), 3000);
  });

  return (
    <MuiModal open={open} setOpen={setOpen}>
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ position: "absolute", zIndex: "1" }}>
          <CircularProgress color="success" />
        </div>
        <div
          id="map"
          style={{ height: "600px", width: "1000px", zIndex: "2" }}
        ></div>
      </div>
    </MuiModal>
  );
};

export default ProfileMap;
