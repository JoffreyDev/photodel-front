import React from "react";
import { useSelector } from "react-redux";
import "../../styles/Profile/Albums.scss";
import Requests from "../../http/axios-requests";
import { useNavigate, useParams } from "react-router-dom";
import { GreenButton, PhotoCard } from "../../components";
import Back from "../../img/addModules/arrow-back.svg";
import { PublicHeader } from "..";

const PublicAlbumView = ({ setProfileId }) => {
  const [album, setAlbum] = React.useState();

  const [loaded, setLoaded] = React.useState(false);

  const navigate = useNavigate();
  const params = useParams();

  const albumId = params.id;

  //получаем список фото в альбоме
  React.useEffect(() => {
    albumId &&
      Requests.getSingleAlbum(albumId).then((res) => {
        setAlbum(res.data);
        setLoaded(true);
      });
  }, [albumId, loaded]);

  React.useEffect(() => {
    album && setProfileId(album[0].profile.id);
  }, [album]);

  return (
    <div className="albums">
      <PublicHeader profile={album && album[0].profile} />
      <div className="add_photo_header">
        <img src={Back} alt="back" className="add_photo_header_arrow" />
        <p
          onClick={() =>
            navigate(`/public/albums/${album && album[0].profile.id}`)
          }
          className="add_photo_header_p"
        >
          Все альбомы автора
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
      </div>
      <div className="albums_cards">
        {album &&
          album.map((photo, idx) => (
            <PhotoCard
              disableCheck
              photo={photo}
              key={idx}
              disableEdit
              disableCheck
              notAuthor
            />
          ))}
      </div>
    </div>
  );
};

export default PublicAlbumView;
