import React from "react";
import SortImage from "../../img/sessions/sort.svg";
import { SelectInput, AlbumCard } from "../../components";
import "../../styles/Profile/Albums.scss";
import Requests from "../../http/axios-requests";
import { useNavigate, useParams } from "react-router-dom";
import { PublicHeader } from "..";
import { ScreenLoader } from "../../components";
import SortImageInvert from "../../img/commonImages/sort-.svg";

const PublicAlbums = ({ component, setProfileId }) => {
  const [albums, setAlbums] = React.useState(null);

  const [loaded, setLoaded] = React.useState(false);
  const [profileData, setProfileData] = React.useState();
  const [dataLoading, setDataLoading] = React.useState(true);

  const [sortField, setSortField] = React.useState(1);
  const [sortType, setSortType] = React.useState("+");

  const navigate = useNavigate();

  const params = useParams();
  const profileId = params.id;

  //получаем список альбомов
  React.useEffect(() => {
    profileId &&
      Requests.getAlbumsList(profileId).then((res) => {
        setAlbums(res.data);
        setLoaded(true);
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
    <div className="albums">
      <PublicHeader profile={profileData} />
      <div className="albums_header">
        <div className="albums_header_wrapper">
          <h1
            onClick={() => navigate(`/public/photos/${profileId}`)}
            className={
              component === "photos"
                ? "albums_header_title_first active"
                : "albums_header_title_first"
            }
          >
            ФОТОГРАФИИ
          </h1>
          <h1
            onClick={() => navigate(`/public/albums/${profileId}`)}
            className={
              component === "albums"
                ? "albums_header_title_first active"
                : "albums_header_title_first"
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
      <div className="albums_options">
        <div className="albums_options_left">
          <p className="albums_options_left_p">
            Всего:{" "}
            <span className="albums_options_left_p_span">
              {albums && albums.length}
            </span>
          </p>
        </div>
      </div>
      <div className="albums_cards">
        {albums &&
          albums.map((album) => (
            <AlbumCard album={album} disableCheck disableEdit notAuthor />
          ))}
        {albums && albums.length === 0 && (
          <div className="photos_cards_empty">
            <h1 className="photos_cards_empty_title">
              Нам жаль, альбомов не найдено :(
            </h1>
          </div>
        )}
        {dataLoading && <ScreenLoader height={"30%"} />}
      </div>
    </div>
  );
};

export default PublicAlbums;
