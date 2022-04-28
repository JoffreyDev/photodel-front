import React from "react";
import SortImage from "../../img/sessions/sort.svg";
import { SelectInput, Checkbox, AlbumCard } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import AddImage from "../../img/sessions/add.svg";
import "../../styles/Profile/Albums.scss";
import Requests from "../../http/axios-requests";
import { useNavigate } from "react-router-dom";
import { openErrorAlert, openSuccessAlert } from "../../redux/actions/userData";
import SortImageInvert from "../../img/commonImages/sort-.svg";

const Albums = ({ component }) => {
  const [albums, setAlbums] = React.useState(null);

  const dispatch = useDispatch();

  const [loaded, setLoaded] = React.useState(false);

  const navigate = useNavigate();

  const [sortField, setSortField] = React.useState(1);
  const [sortType, setSortType] = React.useState("+");

  const [selectedAlbums, setSelectedAlbums] = React.useState([]);

  const [action, setAction] = React.useState("");
  const [allAlbumsSelected, setAllAlbumsSelected] = React.useState(false);

  const [ignored, forceUpdate] = React.useReducer((x) => x + 1, 0);

  //данные о юзере
  const { userData } = useSelector(({ userData }) => userData);

  //получаем список альбомов
  React.useEffect(() => {
    userData.id &&
      Requests.getAlbumsList(
        userData.id,
        sortField === 1 ? "id" : sortField === 2 ? "views" : "",
        sortType
      ).then((res) => {
        setAlbums(res.data);
        setLoaded(true);
      });
  }, [userData.id, loaded, sortType, sortField]);

  React.useEffect(() => {
    if (action === 1) {
      Requests.deleteAlbums(selectedAlbums)
        .then(() => {
          setSelectedAlbums([]);
          setAction("");
          Requests.getAlbumsList(userData.id).then((res) =>
            setAlbums(res.data)
          );
          dispatch(openSuccessAlert("Альбомы успешно удалены!"));
        })
        .catch(() => dispatch(openErrorAlert("Произошла ошибка. ")));
    }
  }, [action]);

  return (
    <div className="albums">
      <div className="albums_header">
        <div className="albums_header_wrapper">
          <h1
            onClick={() => navigate("/profile/photos")}
            className={
              component === "photos"
                ? "albums_header_title_first active"
                : "albums_header_title_first"
            }
          >
            ФОТОГРАФИИ
          </h1>
          <h1
            onClick={() => navigate("/profile/albums")}
            className={
              component === "albums"
                ? "albums_header_title_first active"
                : "albums_header_title_first"
            }
          >
            АЛЬБОМЫ
          </h1>
        </div>

        <div className="albums_header_select">
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
            alt="sort"
            className="albums_header_select_image"
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
      <div className="albums_options">
        <div className="albums_options_left">
          <p className="albums_options_left_p">
            Всего:{" "}
            <span className="albums_options_left_p_span">
              {albums && albums.length}
            </span>
          </p>
          <Checkbox
            marginBottom={"0px"}
            label={"Выбрать все"}
            value={allAlbumsSelected}
            callback={() => {
              if (allAlbumsSelected) {
                setSelectedAlbums([]);
                setAllAlbumsSelected(false);
                forceUpdate();
              } else {
                albums.forEach((album) => selectedAlbums.push(album.id));
                setSelectedAlbums(selectedAlbums);
                setAllAlbumsSelected(true);
                forceUpdate();
              }
            }}
          />
        </div>

        <div className="albums_options_right">
          <div className="albums_options_right_add">
            <img
              src={AddImage}
              alt="add"
              className="albums_options_right_add_image"
            />
            <p
              onClick={() => navigate("/profile/add-album")}
              className="albums_options_right_add_p"
            >
              Добавить альбом
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
      <div className="albums_cards">
        {albums &&
          albums.map((album, index) => (
            <AlbumCard
              album={album}
              key={index}
              callback={setSelectedAlbums}
              array={selectedAlbums}
            />
          ))}
      </div>
    </div>
  );
};

export default Albums;
