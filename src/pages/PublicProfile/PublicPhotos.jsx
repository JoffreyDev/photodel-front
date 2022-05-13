import React from "react";
import SortImage from "../../img/sessions/sort.svg";
import {
  SelectInput,
  Checkbox,
  PhotoCard,
  GalleryPhotoPreview,
} from "../../components";
import AddImage from "../../img/sessions/add.svg";
import "../../styles/Profile/Photos.scss";
import Requests from "../../http/axios-requests";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { PublicHeader } from "..";

const PublicPhotos = ({ component, setProfileId }) => {
  const { userData } = useSelector(({ userData }) => userData);
  const params = useParams();
  const profileId = params.id;

  const [photos, setPhotos] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const [profileData, setProfileData] = React.useState();

  const navigate = useNavigate();

  React.useEffect(() => {
    profileId &&
      Requests.getPhotosList(profileId).then((res) => {
        setLoaded(true);
        setPhotos(res.data);
      });

    Requests.getPublicProfile(profileId).then((res) =>
      setProfileData(res.data)
    );
  }, [profileId, loaded]);

  React.useEffect(() => {
    profileData && setProfileId(profileData.id);
  }, [profileData]);

  return (
    <div className="photos">
      <PublicHeader profile={profileData} />
      <div className="photos_header">
        <div className="photos_header_wrapper">
          <h1
            onClick={() => navigate(`/public/photos/${profileId}`)}
            className={
              component === "photos"
                ? "photos_header_title_first active"
                : "photos_header_title_first"
            }
          >
            ФОТОГРАФИИ
          </h1>
          <h1
            onClick={() => navigate(`/public/albums/${profileId}`)}
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
            src={SortImage}
            alt="sort"
            className="photos_header_select_image"
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
        </div>
      </div>

      <div className="photos_cards">
        {photos &&
          photos.map((item, index) => (
            <GalleryPhotoPreview
              photo={item}
              key={index}
              isAuthor
              wrapperWidth={window.screen.width <= 576 ? "49%" : ""}
              width={window.screen.width <= 576 ? "49%" : ""}
            />
          ))}
      </div>
    </div>
  );
};

export default PublicPhotos;
