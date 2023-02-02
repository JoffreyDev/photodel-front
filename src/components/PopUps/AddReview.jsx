import React from "react";
import "../../styles/Profile/Requests.scss";
import {
  ModalWindow,
  GreenButton,
  TextInput,
  GreyButton,
  SingleDateInput,
} from "..";
import Online from "../../img/commonImages/online.svg";
import Offline from "../../img/commonImages/offline.svg";
import Requests from "../../http/axios-requests";
import { useDispatch } from "react-redux";
import { openErrorAlert, openSuccessAlert } from "../../redux/actions/userData";
import { useSelector } from "react-redux";
import Rating from "@mui/material/Rating";
import Resizer from "react-image-file-resizer";
import AddImage from "../../img/sessions/add.svg";

const AddReview = ({
  active,
  setActive,
  user,
  width,
  notAlign,
  setReviewSentModalActive,
}) => {
  const { isLoggedIn } = useSelector(({ userData }) => userData);

  const [mark, setMark] = React.useState(0);
  const [content, setContent] = React.useState();
  const [sendPhotosArray, setSendPhotosArray] = React.useState([]);
  const [ignored, forceUpdate] = React.useReducer((x) => x + 1, 0);

  let parsedFiles = [];
  const upsendPhotosArray = [];
  const uploadedPhotos = [];

  const dispatch = useDispatch();

  const unsetData = () => {
    setMark(0);
    setContent("");
    uploadedPhotos = [];
    upsendPhotosArray = [];
    setSendPhotosArray([]);
  };

  //ресайз
  const resizeFile = (file, weight) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        1200,
        1200,
        "JPEG",
        weight > 2e6 ? 60 : weight > 1e6 ? 80 : weight > 4e5 ? 90 : 100,
        0,
        (uri) => {
          resolve(uri);
          sendPhotosArray.push(uri);
          setSendPhotosArray(sendPhotosArray);
          forceUpdate();
          dispatch(
            openSuccessAlert("Фото было сжато, так как вес превышал 400Кб")
          );
        },
        "base64"
      );
    });

  //получение base64 фото
  function getBase64(file, callback) {
    const reader = new FileReader();

    reader.addEventListener("load", () => callback(reader.result));

    reader.readAsDataURL(file);
  }

  //обработчик добавления фотографий
  const handlePhotoRead = (e) => {
    if (sendPhotosArray.length + e.target.files.length > 4) {
      dispatch(openErrorAlert("Максимум 4 изображения!"));
      return;
    }
    parsedFiles = Array.from(e.target.files);
    parsedFiles.forEach((file) => {
      if (file.size >= 4e5) {
        resizeFile(file, file.size);
      }

      if (file.size < 4e5) {
        getBase64(file, function (base64Data) {
          sendPhotosArray.push(base64Data);
          setSendPhotosArray(sendPhotosArray); // Here you can have your code which uses Base64 for its operation, // file to Base64 by oneshubh
          forceUpdate();
        });
      }
    });
  };

  const sendReviewHandler = () => {
    Requests.addReview({
      senderUser: user.id,
      receiverUser: user.id,
      content: content,
      mark: mark,
    })
      .then((createReviewRes) => {
        sendPhotosArray.forEach((photo, idx) => {
          Requests.createImage(photo)
            .then((res) => {
              upsendPhotosArray.push(res.data.id);
              if (upsendPhotosArray.length === sendPhotosArray.length) {
                Requests.updateReview({
                  photos: upsendPhotosArray,
                  id: createReviewRes.data.id,
                })
                  .then(() => {
                    setActive(false);
                    unsetData();
                    setReviewSentModalActive(true);
                  })
                  .catch((err) => openErrorAlert(err.response.data.error));
              } else return;
            })
            .catch((err) => dispatch(openErrorAlert(err.response.data.error)));
        });
      })
      .catch((err) => dispatch(openErrorAlert(err.response.data.error)));
  };

  return (
    <ModalWindow
      width={width ? width : "40vw"}
      moduleActive={active}
      setModuleActive={setActive}
      notAlign={notAlign}
    >
      <div>
        <div className="reg_auth_header">
          <h1 className="reg_auth_header_title">Оставить отзыв</h1>
          <svg
            style={{
              padding: "5px",
              boxSizing: "content-box",
              cursor: "pointer",
            }}
            onClick={() => setActive(false)}
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.41 6.99994L12.71 2.70994C12.8983 2.52164 13.0041 2.26624 13.0041 1.99994C13.0041 1.73364 12.8983 1.47825 12.71 1.28994C12.5217 1.10164 12.2663 0.99585 12 0.99585C11.7337 0.99585 11.4783 1.10164 11.29 1.28994L7 5.58994L2.71 1.28994C2.5217 1.10164 2.2663 0.99585 2 0.99585C1.7337 0.99585 1.4783 1.10164 1.29 1.28994C1.1017 1.47825 0.995908 1.73364 0.995908 1.99994C0.995908 2.26624 1.1017 2.52164 1.29 2.70994L5.59 6.99994L1.29 11.2899C1.19627 11.3829 1.12188 11.4935 1.07111 11.6154C1.02034 11.7372 0.994202 11.8679 0.994202 11.9999C0.994202 12.132 1.02034 12.2627 1.07111 12.3845C1.12188 12.5064 1.19627 12.617 1.29 12.7099C1.38296 12.8037 1.49356 12.8781 1.61542 12.9288C1.73728 12.9796 1.86799 13.0057 2 13.0057C2.13201 13.0057 2.26272 12.9796 2.38458 12.9288C2.50644 12.8781 2.61704 12.8037 2.71 12.7099L7 8.40994L11.29 12.7099C11.383 12.8037 11.4936 12.8781 11.6154 12.9288C11.7373 12.9796 11.868 13.0057 12 13.0057C12.132 13.0057 12.2627 12.9796 12.3846 12.9288C12.5064 12.8781 12.617 12.8037 12.71 12.7099C12.8037 12.617 12.8781 12.5064 12.9289 12.3845C12.9797 12.2627 13.0058 12.132 13.0058 11.9999C13.0058 11.8679 12.9797 11.7372 12.9289 11.6154C12.8781 11.4935 12.8037 11.3829 12.71 11.2899L8.41 6.99994Z"
              fill="#50A398"
            />
          </svg>
        </div>
        <div className="requests_window_user_data_wrapper">
          <div className="requests_window_user_data">
            <img
              src={`data:image/png;base64,${user && user.avatar}`}
              alt="avatar"
              className="requests_window_user_data_avatar"
            />
            <img
              src={user && user.user_channel_name ? Online : Offline}
              alt="online"
              className="requests_window_user_data_online"
            />
            <p className="requests_window_user_data_name">
              {user && `${user.name} ${user.surname}`}
            </p>
          </div>

          <Rating
            name="simple-controlled"
            value={mark}
            onChange={(event, newValue) => {
              setMark(newValue);
            }}
          />
        </div>

        <div className="requests_window_textarea">
          <label className="common_text_input_label">Отзыв</label>
          <textarea
            style={{ resize: "none", width: "100%", marginTop: "5px" }}
            className="my_profile_about_textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="requests_window_buttons_review">
          <div className="photos_options_right_add">
            <img
              src={AddImage}
              alt="add"
              className="photos_options_right_add_image"
            />
            <label htmlFor="file_input" className="photos_options_right_add_p">
              Добавить фото{" "}
              {sendPhotosArray && (
                <span className="photos_options_right_add review_span">
                  (Загружено: {sendPhotosArray.length} фото)
                </span>
              )}
            </label>
            <input
              id="file_input"
              type="file"
              multiple
              className="hidden_file_input"
              onChange={(e) => handlePhotoRead(e)}
            />
          </div>
          <GreenButton
            text={"Отправить"}
            width={"180px"}
            height={"38px"}
            margin={"0 0 0 0 "}
            callback={sendReviewHandler}
          />
        </div>
      </div>
    </ModalWindow>
  );
};

export default AddReview;
