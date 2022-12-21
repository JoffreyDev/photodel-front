import React from 'react';
import LikeImage from '../../img/trainings/like.svg';
import CommentImage from '../../img/trainings/comment.svg';
import FavoriteImage from '../../img/trainings/fave.svg';
import Edit from '../../img/trainings/edit.svg';
import { Checkbox } from '..';
import { rootAddress } from '../../http/axios-requests';
import { useNavigate } from 'react-router-dom';
import money from '../../img/trainings/money.svg';
import types from '../../img/trainings/type.svg';
import users from '../../img/trainings/users.svg';
import calendar from '../../img/trainings/calendar.svg';
import '../../styles/Profile/Training.scss';

const TrainingCardMain = ({
  place,
  disableRedirect,
  callback,
  array,
  disableCheck,
  disableEdit,
  notAuthor,
  halfContent,
}) => {
  const navigate = useNavigate();

  const [key, setKey] = React.useState(Math.random);

  return (
    <div
      onClick={() => navigate('/public/training/11')}
      className={halfContent ? 'training_card map_active' : 'training_card map_disabled'}>
      <div className='training_card_photo_wrapper'>
        <img
          // src={`${rootAddress}${place.main_photo.photo}`}
          src={money}
          alt='card'
          className='training_card_photo'
          onClick={() =>
            !disableRedirect &&
            navigate(!notAuthor ? `/profile/photo/${place.id}` : `/public/place/${place.id}`)
          }
        />
        <div className='training_card_photo_checkbox'>
          {!disableCheck && (
            <Checkbox
              value={array.includes(place.id)}
              callback={() => {
                if (array.includes(place.id)) {
                  array.splice(array.indexOf(place.id), 1);
                  callback(array);
                  setKey(Math.random);
                  console.log(array);
                } else {
                  array.push(place.id);
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
      <div className='training_card_info'>
        <p className='training_card_info_country'>
          ~300
          {/* {place.string_place_location.split(',')[1] + ' | ~' + place.diff_distance} */}
        </p>
        <div className='training_card_info_title_wrapper'>
          <p className='training_card_info_title'>
            Горы
            {/* {place.name_place} */}
          </p>
          {!disableEdit && <img src={Edit} alt='edit' className='training_card_info_title_img' />}
        </div>
        <div className='training_card_properties'>
          <div className='training_card_properties_column'>
            <div className='training_card_properties_column_left'>
              <img
                src={calendar}
                alt='date'
                className='training_card_properties_column_left_date'
              />
              <p className='training_card_properties_column_left_text'>20 мар - 23 мар</p>
            </div>
            <div className='training_card_properties_column_left'>
              <img src={types} alt='type' className='training_card_properties_column_left_type' />
              <p className='training_card_properties_column_left_text'>Оффлайн</p>
            </div>
          </div>
          <div className='training_card_properties_column'>
            <div className='training_card_properties_column_right'>
              <img
                src={money}
                alt='price'
                className='training_card_properties_column_right_price'
              />
              <p className='training_card_properties_column_right_text'>10 000 руб.</p>
            </div>

            <div className='training_card_properties_column_right'>
              <img
                src={users}
                alt='members'
                className='training_card_properties_column_right_members'
              />
              <p className='training_card_properties_column_right_text'>10 свободно</p>
            </div>
          </div>
        </div>
        <div className='training_card_manager'>
          <p className='training_card_manager_title'>Организатор</p>
          <div className='training_card_manager_account'>
            <img
              // src={`data:image/png;base64,${place.profile.avatar}`}
              src={Edit}
              alt='avatar'
              className='training_card_manager_account_avatar'
            />
            <p className='training_card_manager_account_name'>
              Пашок Кошап
              {/* {place.profile.name + ' ' + place.profile.surname} */}
            </p>
          </div>
        </div>
        <div className='training_card_profile'>
          <p className='training_card_profile_title'>Автор</p>
          <div className='training_card_profile_prof'>
            <img
              src={Edit}
              // src={`data:image/png;base64,${place.profile.avatar}`}
              alt='avatar'
              className='training_card_profile_prof_avatar'
            />
            <p className='training_card_profile_prof_name'>
              Pablo Chapo
              {/* {place.profile.name + ' ' + place.profile.surname} */}
            </p>
          </div>
        </div>
        <div className='training_card_info_comm'>
          <div className='training_card_info_comm_likes'>
            <img src={LikeImage} alt='like' className='training_card_info_comm_likes_image' />
            <p className='training_card_info_comm_likes_p'>3{/* {place.likes} */}</p>
          </div>
          <div className='training_card_info_comm_comments'>
            <img src={CommentImage} alt='like' className='training_card_info_comm_comments_image' />
            <p className='training_card_info_comm_comments_p'>5{/* {place.comments} */}</p>
          </div>
          <div className='training_card_info_comm_fave'>
            <img src={FavoriteImage} alt='like' className='training_card_info_comm_fave_image' />
            <p className='training_card_info_comm_fave_p'>5{/* {place.favorites} */}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingCardMain;
