import React from "react";
import Online from "../../img/commonImages/online.svg";
import Offline from "../../img/commonImages/offline.svg";
import Avatar from "../../img/profile/avatar.png";
import Pro from "../../img/trainings/pro.svg";
import Trash from "../../img/trainings/trash.svg";
import { useNavigate } from "react-router-dom";

const AddToTrainingCard = ({ profile, callback, view }) => {
  const navigate = useNavigate()
  return (
    <div onClick={() => navigate(`/public/profile/${profile.id}`)} className="training_view_content_right_team_block">
      <div className="training_view_content_right_team_block_avatar_wrapper">
        <img
          src={`data:image/png;base64,${profile.avatar}`}
          alt="avatar"
          className="training_view_content_right_team_block_avatar"
        />
        <div className="training_view_content_right_team_block_left">
          <div className="training_view_content_right_team_block_left_upper">
            <img
              src={profile.user_channel_name ? Online : Offline}
              alt="online"
              className="training_view_content_right_team_block_online"
            />
            <p className="training_view_content_right_team_block_name">
              {`${profile.name} ${profile.surname}`}
            </p>
            {profile.pro_account > 0 && (
              <img
                src={Pro}
                alt="pro"
                className="training_view_content_right_team_block_pro"
              />
            )}
          </div>
          <div className="training_view_content_right_team_block_left_lower">
            <p className="training_view_content_right_team_block_left_lower_cat">
              {profile.type_pro?.name_category}
            </p>
          </div>
        </div>
      </div>
      <div className="training_view_content_right_team_block_right">
        {!view && (
          <img
            src={Trash}
            alt="delete"
            className="training_view_content_right_team_block_delete"
            onClick={callback}
          />
        )}
      </div>
    </div>
  );
};

export default AddToTrainingCard;
