import React from "react";
import { useSelector } from "react-redux";
import "../../styles/Profile/Albums.scss";
import Requests from "../../http/axios-requests";
import { useNavigate, useParams } from "react-router-dom";
import { GreenButton, PhotoCard } from "../../components";
import Back from "../../img/addModules/arrow-back.svg";
import { useDispatch } from "react-redux";
import { openErrorAlert } from "../../redux/actions/userData";

const AlbumView = () => {
  const dispatch = useDispatch();

  const [album, setAlbum] = React.useState();

  const [loaded, setLoaded] = React.useState(false);

  const navigate = useNavigate();
  const params = useParams();

  const albumId = params.id;

  React.useEffect(() => {
    if (!localStorage.getItem("access")) navigate("/");
  }, []);

  //данные о юзере
  const { userData } = useSelector(({ userData }) => userData);

  //получаем список фото в альбоме
  React.useEffect(() => {
    userData.id &&
      Requests.getSingleAlbum(albumId).then((res) => {
        setAlbum(res.data);
        setLoaded(true);
      });
  }, [albumId, loaded]);

  return (
    <div className="albums">
      <div className="add_photo_header">
        <img src={Back} alt="back" className="add_photo_header_arrow" />
        <p
          onClick={() => navigate("/profile/albums")}
          className="add_photo_header_p"
        >
          Все альбомы
        </p>
      </div>
      <div className="albums_view_lower_header">
        <div className="albums_view_lower_header_left">
          <p className="albums_view_lower_header_left_title">
            {album && album[0].custom_album.name_album}
          </p>
          <div className="albums_view_lower_header_left_desc">
            {album && album[0].custom_album.description_album}
          </div>
        </div>
        <GreenButton
          height={"38px"}
          width={"180px"}
          text={"Редактировать"}
          callback={() =>
            dispatch(
              openErrorAlert(
                "Редактирование альбома на данный момент недоступно"
              )
            )
          }
        />
      </div>
      <div className="albums_cards">
        {album &&
          album.map((photo, idx) => (
            <PhotoCard disableCheck photo={photo} key={idx} />
          ))}
      </div>
    </div>
  );
};

export default AlbumView;
