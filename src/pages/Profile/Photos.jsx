import React from "react";
import SortImage from "../../img/sessions/sort.svg";
import SortImageInvert from "../../img/commonImages/sort-.svg";
import { SelectInput, Checkbox, PhotoCard } from "../../components";
import AddImage from "../../img/sessions/add.svg";
import "../../styles/Profile/Photos.scss";
import Requests from "../../http/axios-requests";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { openSuccessAlert } from "../../redux/actions/userData";

const Photos = ({ component }) => {
  const { userData } = useSelector(({ userData }) => userData);

  const dispatch = useDispatch();

  const [photos, setPhotos] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);

  const navigate = useNavigate();

  const [sortField, setSortField] = React.useState(1);
  const [sortType, setSortType] = React.useState("+");

  const [selectedPhotos, setSelectedPhotos] = React.useState([]);

  const [action, setAction] = React.useState("");
  const [allPhotosSelected, setAllPhotosSelected] = React.useState(false);

  const [ignored, forceUpdate] = React.useReducer((x) => x + 1, 0);

  React.useEffect(() => {
    userData.id &&
      Requests.getPhotosList(
        userData.id,
        sortField === 1 ? "id" : sortField === 2 ? "views" : "",
        sortType
      ).then((res) => {
        setLoaded(true);
        setPhotos(res.data);
      });
  }, [userData.id, loaded, sortType, sortField]);

  React.useEffect(() => {
    if (action === 1) {
      Requests.deletePhoto(selectedPhotos).then(() => {
        setSelectedPhotos([]);
        setAction("");
        Requests.getPhotosList(userData.id).then((res) => setPhotos(res.data));
        dispatch(openSuccessAlert("Фото успешно удалены!"));
      });
    }
  }, [action]);

  return (
    <div className="photos">
      <div className="photos_header">
        <div className="photos_header_wrapper">
          <h1
            onClick={() => navigate("/profile/photos")}
            className={
              component === "photos"
                ? "photos_header_title_first active"
                : "photos_header_title_first"
            }
          >
            ФОТОГРАФИИ
          </h1>
          <h1
            onClick={() => navigate("/profile/albums")}
            className={
              component === "albums"
                ? "photos_header_title_first active"
                : "photos_header_title_first"
            }
          >
            АЛЬБОМЫ
          </h1>
        </div>

        <div className="photos_header_select">
          <img
            src={
              sortType === "+"
                ? SortImage
                : sortType === "-"
                ? SortImageInvert
                : ""
            }
            alt="sort"
            className="photos_header_select_image"
            onClick={() =>
              setSortType(sortType === "+" ? "-" : sortType === "-" ? "+" : "")
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
      <div className="photos_options">
        <div className="photos_options_left">
          <p className="photos_options_left_p">
            Всего:{" "}
            <span className="photos_options_left_p_span">
              {photos && photos.length}
            </span>
          </p>
          <Checkbox
            marginBottom={"0px"}
            label={"Выбрать все"}
            value={allPhotosSelected}
            callback={() => {
              if (allPhotosSelected) {
                setSelectedPhotos([]);
                setAllPhotosSelected(false);
                forceUpdate();
              } else {
                photos.forEach((photo) => selectedPhotos.push(photo.id));
                setSelectedPhotos(selectedPhotos);
                setAllPhotosSelected(true);
                forceUpdate();
              }
            }}
          />
        </div>

        <div className="photos_options_right">
          <div className="photos_options_right_add">
            <img
              src={AddImage}
              alt="add"
              className="photos_options_right_add_image"
            />
            <p
              onClick={() => navigate("/profile/add-photo")}
              className="photos_options_right_add_p"
            >
              Добавить  фотографию
            </p>
          </div>
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
      <div className="photos_cards">
        {photos &&
          photos.map((item, index) => (
            <PhotoCard
              photo={item}
              key={index}
              callback={setSelectedPhotos}
              array={selectedPhotos}
            />
          ))}
      </div>
    </div>
  );
};

export default Photos;
