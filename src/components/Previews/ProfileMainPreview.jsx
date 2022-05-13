import React from "react";
import "../../styles/Main/ProfileCard.scss";
import Online from "../../img/commonImages/online.svg";
import Offline from "../../img/commonImages/offline.svg";
import Fave from "../../img/commonImages/fave.svg";
import Rate from "../../img/commonImages/rate.svg";
import Like from "../../img/commonImages/like.svg";
import { useNavigate } from "react-router-dom";

function ProfileMainPreview({ profile, width, marginRight, disableBorder }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/public/profile/${profile.id}`)}
      className="profile_card"
      style={
        width
          ? {
              width: width,
              marginRight: marginRight,
              borderBottom: disableBorder ? "none" : "1px solid #d2d9d8",
            }
          : {}
      }
    >
      <div className="profile_card_avatar_wrapper">
        <img
          src={profile && `data:image/png;base64,${profile && profile.avatar}`}
          alt="avatar"
          className="profile_card_avatar"
        />
      </div>
      <div className="profile_card_info">
        <div className="profile_card_info_first">
          <img
            src={profile.user_channel_name ? Online : Offline}
            alt="online"
            className="profile_card_info_first_online"
          />
          <p className="profile_card_info_first_name">
            {`${profile && profile.name}  ${profile && profile.surname}`}
          </p>
        </div>
        <div className="profile_card_info_second">
          <img src={Rate} alt="rate" className="profile_card_info_second_img" />
          <div className="profile_card_info_second_p">
            {profile && profile.rating}
          </div>
          <img src={Fave} alt="rate" className="profile_card_info_second_img" />
          <div className="profile_card_info_second_p">
            {" "}
            {profile && profile.count_favorites}
          </div>
          <img src={Like} alt="rate" className="profile_card_info_second_img" />
          <div className="profile_card_info_second_p">
            {profile && profile.count_likes}
          </div>
        </div>
        <div className="profile_card_info_third">
          <p className="profile_card_info_third_category">
            {profile.type_pro && profile.type_pro.name_category}
          </p>
          <p className="profile_card_info_third_specs">
            {" "}
            {profile.spec_model_or_photographer &&
              profile.spec_model_or_photographer.length >= 1 &&
              profile.spec_model_or_photographer
                .map((spec) => spec.name_spec)
                .join(", ")}
          </p>
        </div>
        <p className="profile_card_info_fourth">
          {profile.string_location && profile.string_location.split(", ")[1]} |{" "}
          ~{profile.diff_distance && profile.diff_distance}
        </p>
      </div>
    </div>
  );
}

export default ProfileMainPreview;
