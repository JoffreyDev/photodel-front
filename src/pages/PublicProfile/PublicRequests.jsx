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

const PublicRequests = ({ component, setProfileId }) => {
  const { userData } = useSelector(({ userData }) => userData);
  const params = useParams();
  const profileId = params.id;

  const [requests, setRequests] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const [profileData, setProfileData] = React.useState();

  const navigate = useNavigate();

  React.useEffect(() => {
    profileId &&
      Requests.getPublicRequests(profileId).then((res) => {
        setLoaded(true);
        setRequests(res.data);
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
        <h1 className="places_header_title">ЗАПРОСЫ НА СЪЕМКУ</h1>
        <div className="places_header_select">
          <img
            src={SortImage}
            alt="sort"
            className="places_header_select_image"
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
              22
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
      </div>
    </div>
  );
};

export default PublicRequests;
