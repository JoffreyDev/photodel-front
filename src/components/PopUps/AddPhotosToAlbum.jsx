import { MuiModal } from "..";
import React from "react";
import { Checkbox, PhotoCard, GreenButton } from "..";
import Shape from "../../img/addModules/shape.svg";

const AddPhotosToAlbum = ({
  userPhotos,
  setPhotosToDisplay,
  modalActive,
  setModalActive,
  selectedPhotos,
  setSelectedPhotos,
}) => {
  const [allPhotosSelected, setAllPhotosSelected] = React.useState(false);
  const array = [];

  return (
    <MuiModal open={modalActive} setOpen={setModalActive}>
      <div
        className={
          modalActive
            ? "edit_album_popup_wrapper active"
            : "edit_album_popup_wrapper"
        }
        onClick={() => setModalActive(false)}
      >
        <div
          className={
            modalActive
              ? "edit_album_popup_content active"
              : "edit_album_popup_content"
          }
          onClick={(e) => e.stopPropagation()}
        >
          <div className="edit_album_popup_content_header">
            <p className="edit_album_popup_content_header_title">
              Добавить фото в альбом
            </p>
            <img
              src={Shape}
              alt="shape"
              className="edit_album_popup_content_header_shape"
              onClick={() => setModalActive(false)}
            />
          </div>
          <div className="edit_album_popup_content_info">
            <div className="edit_album_popup_content_info_left">
              <p className="edit_album_popup_content_info_left_p">
                Всего:{" "}
                <span className="edit_album_popup_content_info_left_p_span">
                  {userPhotos && userPhotos.length}
                </span>
              </p>
              <p className="edit_album_popup_content_info_left_p">
                Выбрано:{" "}
                <span className="edit_album_popup_content_info_left_p_span">
                  {selectedPhotos ? selectedPhotos.length : 0}
                </span>
              </p>
            </div>
            <Checkbox
              label={"Выбрать все"}
              callback={() => {
                if (allPhotosSelected) {
                  setSelectedPhotos([]);
                  setAllPhotosSelected(false);
                } else {
                  userPhotos.forEach((photo) => array.push(photo.id));
                  setSelectedPhotos(array);
                  setAllPhotosSelected(true);
                }
              }}
              value={allPhotosSelected}
            />
          </div>
          <div className="edit_album_popup_content_cards">
            {userPhotos &&
              userPhotos.map((photo, idx) => (
                <PhotoCard
                  photo={photo}
                  key={idx}
                  disableRedirect
                  disableEdit
                  array={selectedPhotos}
                  callback={setSelectedPhotos}
                />
              ))}
          </div>
          <div className="edit_album_popup_content_button">
            <GreenButton
              text={"Добавить"}
              width={"180px"}
              height={"38px"}
              callback={() => {
                setPhotosToDisplay(selectedPhotos);
                setModalActive(false);
              }}
            />
          </div>
        </div>
      </div>
    </MuiModal>
  );
};

export default AddPhotosToAlbum;
