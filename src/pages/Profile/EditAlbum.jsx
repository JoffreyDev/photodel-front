import React from "react";
import Back from "../../img/addModules/arrow-back.svg";
import {
  TextInput,
  SelectInput,
  Checkbox,
  GreyButton,
  GreenButton,
  PhotoCard,
} from "../../components";
import AddImage from "../../img/sessions/add.svg";
import "../../styles/Profile/AddAlbum.scss";
import Requests from "../../http/axios-requests";
import { useSelector, useDispatch } from "react-redux";
import { AddPhotosToAlbum } from "../../components";
import { useNavigate, useParams } from "react-router-dom";
import { openSuccessAlert, openErrorAlert } from "../../redux/actions/userData";

const AddAlbum = ({ setActiveModule }) => {
  const params = useParams();

  const albumId = params.id;

  const { userData } = useSelector(({ userData }) => userData);

  const [photosToDisplay, setPhotosToDisplay] = React.useState();

  const [selectedPhotos, setSelectedPhotos] = React.useState([]);

  const [userPhotos, setUserPhotos] = React.useState(false);
  const [modalActive, setModalActive] = React.useState();

  const [name, setName] = React.useState();
  const [description, setDescription] = React.useState();
  const [mainPhoto, setMainPhoto] = React.useState();

  const [imageId, setImageId] = React.useState();
  const [deleteArray, setDeleteArray] = React.useState([]);
  const [action, setAction] = React.useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeMainPhoto = (photo, image) => {
    setMainPhoto(photo);
    setImageId(image);
  };

  React.useEffect(() => {
    Requests.getSingleAlbum(albumId).then((res) => {
      setName(res.data[0].custom_album.name_album);
      setDescription(res.data[0].custom_album.description_album);
    });

    Requests.getPhotosList(userData.id).then((res) => {
      setUserPhotos(res.data);
    });

    Requests.getAlbumPhotos(albumId).then((res) => {
      setPhotosToDisplay(res.data.map((photo) => photo.id));
    });
  }, [userData]);

  const updateAlbum = () => {
    if (!name) {
      dispatch(openErrorAlert("Укажите название альбома!"));
      return;
    } else if (!description) {
      dispatch(openErrorAlert("Укажите описание альбома!"));
      return;
    }
    Requests.updateAlbum({
      id: albumId,
      description_album: description,
      name_album: name,
    }).then(() => {
      dispatch(openSuccessAlert("Альбом обновлен!"));
    });
  };

  React.useEffect(() => {
    if (!localStorage.getItem("access")) navigate("/");
  }, []);

  React.useEffect(() => {
    if (action === 1) {
    }
  }, [action]);

  return (
    <div className="edit_album">
      <div className="edit_album_header">
        <img src={Back} alt="back" className="edit_album_header_arrow" />
        <p
          onClick={() => navigate("/profile/albums")}
          className="edit_album_header_p"
        >
          Все альбомы
        </p>
      </div>
      <div className="edit_album_content">
        <div className="edit_album_left_content">
          <h1 className="edit_album_left_content_h1">Название и описание</h1>
          <TextInput
            value={name}
            callback={setName}
            width={"100%"}
            height={"38px"}
            placeholder="Название"
          />
          <textarea
            placeholder="Описание"
            className="edit_album_left_content_textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
      <div className="photos_options">
        <div className="photos_options_left">
          <p className="photos_options_left_p">
            Всего:{" "}
            <span className="photos_options_left_p_span">
              {photosToDisplay ? photosToDisplay.length : 0}
            </span>
          </p>
        </div>

        {/*         <div className="photos_options_right">
          <div
            onClick={() => setModalActive(true)}
            className="photos_options_right_add"
          >
            <img
              src={AddImage}
              alt="add"
              className="photos_options_right_add_image"
            />
            <p className="photos_options_right_add_p">
              Добавить/изменить фотографии
            </p>
          </div>
        </div> */}
      </div>
      <div className="edit_album_photos">
        {userPhotos &&
          userPhotos.map((photo, idx) => {
            if (photosToDisplay && photosToDisplay.includes(photo.id)) {
              return (
                <PhotoCard
                  disableCheck
                  disableEdit
                  disableRedirect
                  photo={photo}
                  idx={idx}
                  mainPhoto={mainPhoto}
                  changeMainPhoto={changeMainPhoto}
                  array={deleteArray}
                  callback={setDeleteArray}
                />
              );
            }
          })}
      </div>
      <div className="edit_album_buttons">
        <div style={{ marginRight: "15px " }}>
          <GreyButton
            text={"Отменить"}
            width={"180px"}
            height={"38px"}
            callback={() => navigate("/profile/albums")}
          />
        </div>
        <GreenButton
          text={"Сохранить"}
          width={"180px"}
          height={"38px"}
          margin={"13px 0 0 0"}
          callback={updateAlbum}
        />
      </div>
      <AddPhotosToAlbum
        modalActive={modalActive}
        setModalActive={setModalActive}
        userPhotos={userPhotos}
        setPhotosToDisplay={setPhotosToDisplay}
        selectedPhotos={selectedPhotos}
        setSelectedPhotos={setSelectedPhotos}
      />
    </div>
  );
};

export default AddAlbum;
