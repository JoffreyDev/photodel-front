import React from "react";
import { rootAddress } from "../../http/axios-requests";
import { useNavigate } from "react-router-dom";

const PhotoViewAlbum = ({ album, isPublic }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() =>
        navigate(
          isPublic ? `/public/album/${album.id}` : `/profile/album/${album.id}`
        )
      }
      className="photo_view_content_right_albums_lower"
    >
      <img
        src={`${rootAddress}${album.main_photo_id.photo}`}
        alt="album"
        className="photo_view_content_right_albums_image"
      />
      <div className="photo_view_content_right_albums_desc">
        <p className="photo_view_content_right_albums_name">
          {album.name_album}
        </p>
        <p className="photo_view_content_right_albums_p">
          {album.count_photos} фото
        </p>
      </div>
    </div>
  );
};

export default PhotoViewAlbum;
