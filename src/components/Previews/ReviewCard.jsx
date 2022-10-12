import React from 'react';
import '../../styles/Profile/Reviews.scss';
import Avatar from '../../img/profile/avatar.png';
import Online from '../../img/commonImages/online.svg';
import { Checkbox } from '../../components/index';
import GreenButton from '../../components/common/GreenButton';
import { useNavigate } from 'react-router-dom';
import Pro from '../../img/profile/pro.svg';
import Rate from '../../img/commonImages/rate.svg';
import Photo from '../../img/reviews/photo.png';
import Add from '../../img/reviews/add.svg';

function ReviewCard({ profile, callback, array, disableCheck }) {
  const [key, setKey] = React.useState(Math.random);
  const navigate = useNavigate();
  return (
    <div className='reviews_card'>
      <div className='reviews_card_head'>
        <div className='reviews_card_head_left'>
          <img src={Avatar} alt='avatar' className='reviews_card_head_left_avatar' />
          <img src={Online} alt='online' className='reviews_card_head_left_online' />
          <p className='reviews_card_head_left_name'>Родионова Марианна</p>
          <img src={Pro} alt='pro' className='reviews_card_head_left_pro' />
          <p className='reviews_card_head_left_time'>Сегодня 20:20</p>
        </div>
        <div className='reviews_card_head_right'>
          <div className='reviews_card_head_right_stars'>
            <img src={Rate} alt='rate' className='reviews_card_head_right_stars_star' />
            <img src={Rate} alt='rate' className='reviews_card_head_right_stars_star' />
            <img src={Rate} alt='rate' className='reviews_card_head_right_stars_star' />
            <img src={Rate} alt='rate' className='reviews_card_head_right_stars_star' />
            <img src={Rate} alt='rate' className='reviews_card_head_right_stars_star' />
          </div>
        </div>
      </div>
      <div className='reviews_card_main'>
        <p className='reviews_card_main_review'>
          Если вы в поисках фотографа на свадьбу, то вам к Алексу!! Алекс, спасибо огромное за
          невероятно красивые, яркие фотографии, которые останутся с нами до конца жизни! Спасибо за
          память об этом важном дне! Мы, пока смотрели, всё время улыбались и восхищались качеством,
          яркостью и красотой фотографий! Кирилл тоже очень доволен! Мы счастливы! С тобой было
          нереально комфортно, легко и приятно на протяжении этих 5 часов!
        </p>
        <div className='reviews_card_main_photos'>
          <img className='reviews_card_main_photos_photo' src={Photo} alt='photo' />
          <img className='reviews_card_main_photos_photo' src={Photo} alt='photo' />
          <img className='reviews_card_main_photos_photo' src={Photo} alt='photo' />
          <img className='reviews_card_main_photos_photo' src={Photo} alt='photo' />
        </div>
      </div>
      <div className='reviews_card_addMore'>
        <img src={Add} alt='add' className='reviews_card_addMore_plus' />
        <p className='reviews_card_addMore_p'>Показать еще фото</p>
      </div>
    </div>
  );
}

export default ReviewCard;
