import React from 'react';
import '../../styles/Profile/Team.scss';
import Avatar from '../../img/profile/avatar.png';
import Online from '../../img/commonImages/online.svg';
import { useNavigate } from 'react-router-dom';

function RecommendCard({ profile, callback, array, disableCheck }) {
  const [key, setKey] = React.useState(Math.random);
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/public/profile/${profile.receiver_favorite.id}`)}
      className='team_card'>
      <div className='team_card_avatar_wrapper'>
        <img
          // src={profile && `data:image/png;base64,${profile && profile.receiver_favorite.avatar}`}
          src={Avatar}
          alt='avatar'
          className='team_card_avatar'
        />
      </div>
      <div className='team_card_info'>
        <div className='team_card_info_first'>
          <img src={Online} alt='online' className='team_card_info_first_online' />
          <p className='team_card_info_first_name'>
            {`${profile && profile.receiver_favorite.name}  ${
              profile && profile.receiver_favorite.surname
            }`}
          </p>
        </div>
        <div className='team_card_info_third'>
          <p className='team_card_info_third_category'>
            {profile && profile.receiver_favorite.type_pro.name_category}
          </p>
          <p className='team_card_info_third_specs'>
            {profile && profile.receiver_favorite.string_location.split(', ')[1]}
          </p>
        </div>
        <p className='team_card_info_fourth delete'>Удалить из списка</p>
      </div>
    </div>
  );
}

export default RecommendCard;
