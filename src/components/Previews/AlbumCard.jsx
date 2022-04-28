import React from "react";
import Edit from "../../img/sessions/edit.svg";
import { rootAddress } from "../../http/axios-requests";
import { useNavigate } from "react-router-dom";

import { Checkbox } from "..";

const AlbumCard = ({
  album,
  disableEdit,
  disableCheck,
  notAuthor,
  callback,
  array,
}) => {
  const navigate = useNavigate();

  const [key, setKey] = React.useState(Math.random);

  return (
    <div className="albums_card">
      <div className="albums_card_photo_wrapper">
        <img
          src={`${rootAddress}${album.main_photo_id.photo}`}
          alt="card"
          className="albums_card_photo"
          onClick={() =>
            navigate(
              !notAuthor
                ? `/profile/album/${album.id}`
                : `/public/album/${album.id}`
            )
          }
        />

        {!disableCheck && (
          <div className="photos_card_photo_checkbox">
            <Checkbox
              value={array.includes(album.id)}
              callback={() => {
                if (array.includes(album.id)) {
                  array.splice(array.indexOf(album.id), 1);
                  callback(array);
                  setKey(Math.random);
                } else {
                  array.push(album.id);
                  callback(array);
                  setKey(Math.random);
                }
              }}
              key={key}
            />
          </div>
        )}
      </div>
      <div className="albums_card_info">
        <div className="albums_card_info_title_wrapper">
          <p className="albums_card_info_title">{album.name_album}</p>
          {!disableEdit && (
            <img src={Edit} alt="edit" className="albums_card_info_title_img" />
          )}
        </div>
        <div className="albums_card_info_comm">
          <p className="albums_card_info_comm_count">
            {album.count_photos} фото
          </p>
        </div>
      </div>
    </div>
  );
};

export default AlbumCard;
