import React from "react";
import SortImage from "../../img/sessions/sort.svg";
import {
  SelectInput,
  Checkbox,
  PhotoCard,
  GalleryPhotoPreview,
  PublicRequestBlock,
} from "../../components";
import AddImage from "../../img/sessions/add.svg";
import "../../styles/Profile/Photos.scss";
import Requests from "../../http/axios-requests";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { PublicHeader } from "..";
import { ScreenLoader } from "../../components";

const PublicRequests = ({ component, setProfileId }) => {
  const { userData } = useSelector(({ userData }) => userData);
  const params = useParams();
  const profileId = params.id;

  const [requests, setRequests] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const [profileData, setProfileData] = React.useState();

  const [dataLoading, setDataLoading] = React.useState(true);

  const navigate = useNavigate();

  React.useEffect(() => {
    profileId &&
      Requests.getPublicRequests(profileId).then((res) => {
        setLoaded(true);
        setRequests(res.data);
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
      <div className="places_header">
        <h1 style={{ marginTop: "10px" }} className="places_header_title">
          ЗАПРОСЫ НА СЪЕМКУ
        </h1>
        <div className="places_header_select"></div>
      </div>
      <div className="photos_options">
        <div className="photos_options_left">
          <p className="photos_options_left_p">
            Всего:{" "}
            <span className="photos_options_left_p_span">
              {requests && requests.length}
              {/*  {photos && photos.length} */}
            </span>
          </p>
        </div>
      </div>

      <div className="requests_public_body">
        {requests &&
          requests.map((request, idx) => (
            <PublicRequestBlock request={request} key={idx} />
          ))}
        {requests && requests.length === 0 && (
          <div className="photos_cards_empty">
            <h1 className="photos_cards_empty_title">
              Тут пока не было запросов.
            </h1>
          </div>
        )}
        {dataLoading && <ScreenLoader height={"30%"} />}
      </div>
    </div>
  );
};

export default PublicRequests;
