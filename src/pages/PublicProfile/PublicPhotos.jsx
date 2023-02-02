import React from "react";
import SortImage from "../../img/sessions/sort.svg";
import { SelectInput, GalleryPhotoPreview } from "../../components";
import "../../styles/Profile/Photos.scss";
import Requests from "../../http/axios-requests";
import { useNavigate, useParams } from "react-router-dom";
import { PublicHeader } from "..";
import { ScreenLoader } from "../../components";
import SortImageInvert from "../../img/commonImages/sort-.svg";

const PublicPhotos = ({ component, setProfileId }) => {
  const params = useParams();
  const profileId = params.id;

  const [photos, setPhotos] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const [profileData, setProfileData] = React.useState();
  const [dataLoading, setDataLoading] = React.useState(true);
  const [sortField, setSortField] = React.useState(1);
  const [sortType, setSortType] = React.useState("+");

  const navigate = useNavigate();

  React.useEffect(() => {
    profileId &&
      Requests.getPhotosList(profileId).then((res) => {
        setLoaded(true);
        setPhotos(res.data);
        setDataLoading(false);
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

        <div className="reviews_header_select">
          <img
            src={
              sortType === "+"
                ? SortImage
                : sortType === "-"
                ? SortImageInvert
                : ""
            }
            alt="sort"
            className="places_header_select_image"
            onClick={() =>
              setSortType(sortType === "+" ? "-" : sortType === "-" ? "+" : "")
            }
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
          !dataLoading &&
          photos.map((item, index) => (
            <GalleryPhotoPreview
              photo={item}
              key={index}
              isAuthor
              wrapperWidth={window.screen.width <= 576 ? "49%" : ""}
              width={window.screen.width <= 576 ? "49%" : ""}
            />
          ))}
        {photos && photos.length === 0 && (
          <div className="photos_cards_empty">
            <h1 className="photos_cards_empty_title">
              Нам жаль, фотографий не найдено :(
            </h1>
          </div>
        )}
        {dataLoading && <ScreenLoader height={"30%"} />}
      </div>
    </div>
  );
};

export default PublicPhotos;
