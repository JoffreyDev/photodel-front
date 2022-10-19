import React from "react";
import "../../styles/Main/ProfileCard.scss";
import Avatar from "../../img/profile/avatar.png";
import Online from "../../img/commonImages/online.svg";
import Fave from "../../img/commonImages/fave.svg";
import Rate from "../../img/commonImages/rate.svg";
import Like from "../../img/commonImages/like.svg";
import { Checkbox } from "../../components/index";
import { useNavigate } from "react-router-dom";

function ProfileCard({ profile, callback, array, disableCheck }) {
  const [key, setKey] = React.useState(Math.random);
  const navigate = useNavigate();
  return (
    <div
      onClick={() =>
        navigate(`/public/profile/${profile.receiver_favorite.id}`)
      }
      className="profile_card"
    >
      <div className="profile_card_avatar_wrapper">
        <img
          src={
            profile &&
            `data:image/png;base64,${
              profile && profile.receiver_favorite.avatar
            }`
          }
          alt="avatar"
          className="profile_card_avatar"
        />
        <div className="profile_card_avatar_checkbox">
          {!disableCheck && (
            <Checkbox
              value={array.includes(profile.id)}
              callback={() => {
                if (array.includes(profile.id)) {
                  array.splice(array.indexOf(profile.id), 1);
                  callback(array);
                  setKey(Math.random);
                  console.log(array);
                } else {
                  array.push(profile.id);
                  callback(array);
                  setKey(Math.random);
                  console.log(array);
                }
              }}
              key={key}
            />
          )}
        </div>
      </div>
      <div className="profile_card_info">
        <div className="profile_card_info_first">
          <img
            src={Online}
            alt="online"
            className="profile_card_info_first_online"
          />
          <p className="profile_card_info_first_name">
            {`${profile && profile.receiver_favorite.name}  ${
              profile && profile.receiver_favorite.surname
            }`}
          </p>
        </div>
        <div className="profile_card_info_second">
          <img src={Rate} alt="rate" className="profile_card_info_second_img" />
          <div className="profile_card_info_second_p">
            {profile && profile.receiver_favorite.rating}
          </div>
          <img src={Fave} alt="rate" className="profile_card_info_second_img" />
          <div className="profile_card_info_second_p">
            {" "}
            {profile && profile.receiver_favorite.count_favorites}
          </div>
          <img src={Like} alt="rate" className="profile_card_info_second_img" />
          <div className="profile_card_info_second_p">
            {profile && profile.receiver_favorite.count_likes}
          </div>
        </div>
        <div className="profile_card_info_third">
          <p className="profile_card_info_third_category">
            {profile && profile.receiver_favorite.type_pro?.name_category}
          </p>
          <p className="profile_card_info_third_specs">
            {" "}
            {profile &&
              profile.receiver_favorite.spec_model_or_photographer
                ?.map((spec) => spec.name_spec)
                .join(", ")}
          </p>
        </div>
        {profile.receiver_favorite.string_location && (
          <p className="profile_card_info_fourth">
            {profile &&
              profile.receiver_favorite.string_location?.split(", ")[1]}{" "}
            | 5км
          </p>
        )}
      </div>
    </div>
  );
}

export default ProfileCard;
