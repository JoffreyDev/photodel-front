import React from "react";
import Back from "../../img/addModules/arrow-back.svg";
import Delete from "../../img/addModules/delete.svg";
import Lock from "../../img/addModules/lock.svg";
import {
  TextInput,
  SelectInput,
  Checkbox,
  PhotoCard,
  GreyButton,
  GreenButton,
} from "../../components";
import AddImage from "../../img/sessions/add.svg";
import "../../styles/Profile/AddAlbum.scss";
import Requests from "../../http/axios-requests";
import { useParams } from "react-router-dom";
import { AddPhotosToAlbum } from "../../components";

const EditAlbum = ({ setActiveModule }) => {
  const params = useParams();
  const albumId = params.id;

  const [modalActive, setModalActive] = React.useState();
  const [photos, setPhotos] = React.useState([]);
  const [selectedPhotos, setSelectedPhotos] = React.useState();

  React.useEffect(() => {
    Requests.getSingleAlbum(albumId).then((res) => setPhotos(res.data));
  }, []);
  return (
    <div className="edit_album">
      <div className="edit_album_header">
        <img src={Back} alt="back" className="edit_album_header_arrow" />
        <p
          onClick={() => setActiveModule("albums")}
          className="edit_album_header_p"
        >
          Все альбомы
        </p>
      </div>
      <div className="edit_album_content">
        <div className="edit_album_left_content">
          <h1 className="edit_album_left_content_h1">Название и описание</h1>
          <TextInput width={"100%"} height={"38px"} placeholder="Название" />
          <textarea
            placeholder="Описание"
            className="edit_album_left_content_textarea"
          />
        </div>

        <div className="edit_album_right_content">
          <div className="edit_album_right_content_window">
            <ul className="edit_album_right_content_ul">
              <li className="edit_album_right_content_li">
                <img
                  src={Lock}
                  alt="hide"
                  className="edit_album_right_content_li_img"
                />
                <p className="edit_album_right_content_li_p">Скрыть альбом</p>
              </li>
              <li className="edit_album_right_content_li">
                <img
                  src={Delete}
                  alt="hide"
                  className="edit_album_right_content_li_img"
                />
                <p className="edit_album_right_content_li_p">Удалить альбом</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="photos_options">
        <div className="photos_options_left">
          <p className="photos_options_left_p">
            Всего: <span className="photos_options_left_p_span">256</span>
          </p>
          <Checkbox marginBottom={"0px"} label={"Выбрать все"} />
        </div>

        <div className="photos_options_right">
          <div
            onClick={() => setModalActive(true)}
            className="photos_options_right_add"
          >
            <img
              src={AddImage}
              alt="add"
              className="photos_options_right_add_image"
            />
            <p className="photos_options_right_add_p">Добавить фото</p>
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
          />
        </div>
      </div>
      <div className="edit_album_photos">
        {photos &&
          photos.map((photo, idx) => (
            <PhotoCard
              photo={photo}
              key={idx}
              disableEdit
              array={selectedPhotos}
              callback={setSelectedPhotos}
              disableRedirect
            />
          ))}
      </div>
      <div className="edit_album_buttons">
        <div style={{ marginRight: "15px " }}>
          <GreyButton text={"Отменить"} width={"180px"} height={"38px"} />
        </div>
        <GreenButton text={"Сохранить"} width={"180px"} height={"38px"} />
      </div>
    </div>
  );
};

export default EditAlbum;
