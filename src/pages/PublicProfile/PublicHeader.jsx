import React from "react";
import Avatar from "../../img/photoView/avatar.png";
import Rate from "../../img/profile/rating.svg";
import Online from "../../img/commonImages/online.svg";
import Offline from "../../img/commonImages/offline.svg";
import { useNavigate } from "react-router-dom";

function PublicHeader({ profile }) {
  const navigate = useNavigate();
  return (
    <div className="public_view_profile_header">
      <div className="public_view_profile_header_left">
        <img
          src={profile && `data:image/png;base64,${profile.avatar}`}
          alt="avatar"
          className="public_view_profile_header_left_avatar"
          onClick={() => navigate(`/public/profile/${profile.id}`)}
        />
        <img
          src={profile && profile.user_channel_name ? Online : Offline}
          alt="online"
          className="public_view_profile_header_left_online"
        />
        <p className="public_view_profile_header_left_name">
          {profile && `${profile.name} ${profile.surname}`}
        </p>
      </div>
      <div className="public_view_profile_header_right">
        <img
          src={Rate}
          alt="rate"
          className="public_view_profile_header_right_img"
        />
        <p className="public_view_profile_header_right_p">
          {profile && profile.rating}
        </p>
      </div>
    </div>
  );
}

export default PublicHeader;
