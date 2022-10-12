import React from 'react';
import '../../styles/Profile/Team.scss';
import Avatar from '../../img/profile/avatar.png';
import Online from '../../img/commonImages/online.svg';
import Fave from '../../img/commonImages/fave.svg';
import Rate from '../../img/commonImages/rate.svg';
import Like from '../../img/commonImages/like.svg';
import { Checkbox } from '../../components/index';
import GreenButton from '../../components/common/GreenButton';
import { useNavigate } from 'react-router-dom';

function TeamCard({ profile, callback, array, disableCheck }) {
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
        <div className='team_card_avatar_checkbox'>
          {/* {!disableCheck && (
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
          )} */}
        </div>
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
        <p className='team_card_info_fourth'>Запрос мне</p>
        {/* <p className='team_card_info_fourth delete'>Удалить из списка</p> */}
        {/* <p className='team_card_info_fourth reccomend'>Рекомендовать</p> */}
        {/* <p className='team_card_info_fourth reccomended'>Рекомендован</p> */}
        <p className='team_card_info_status accepted'>ОДОБРЕН</p>
        {/* <p className='team_card_info_status pending'>НА РАССМОТРЕНИИ</p> */}
        {/* <GreenButton
          text={'Отправить запрос'}
          width={'180px'}
          height={'38px'}
          // callback={handlePhotoUpdate}
          margin={'13px 0 0 0'}
        /> */}
      </div>
    </div>
  );
}

export default TeamCard;
