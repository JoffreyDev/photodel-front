import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import '../../styles/Profile/TrainingView.scss';
import Back from '../../img/addModules/arrow-back.svg';
import Like from '../../img/sessions/like.svg';
import CommentImg from '../../img/sessions/comment.svg';
import Fave from '../../img/sessions/favorite.svg';
import LikeDisabled from '../../img/sessions/likeDisabled.svg';
import FaveDisabled from '../../img/sessions/favoriteDisabled.svg';
import View from '../../img/sessions/view.svg';
import Lock from '../../img/photoView/lock.svg';
import Geo from '../../img/photoView/map.svg';
import Timer from '../../img/photoView/timer.svg';
import { Comment } from '../../components';
import { GreenButton, PhotoFullScreen } from '../../components';
import Requests, { rootAddress } from '../../http/axios-requests';
import { openSuccessAlert } from '../../redux/actions/userData';
import { useDispatch } from 'react-redux';
import Camera from '../../img/placeView/photo.svg';
import Money from '../../img/placeView/money.svg';
import Work from '../../img/placeView/work.svg';
import { RequestWindow } from '../../components';
import LeftArrow from '../../img/commonImages/photo_left_arrow.svg';
import RightArrow from '../../img/commonImages/photo_right_arrow.svg';
import { PublicHeader } from '..';
import Skeleton from '@mui/material/Skeleton';
import Pro from '../../img/profile/pro.svg';

const TrainingView = ({ setProfileId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const params = useParams();
  const placeId = params.id;

  const [loaded, setLoaded] = React.useState();
  const [place, setPlace] = React.useState();
  const [comment, setComment] = React.useState();
  const [commentingId, setCommentingId] = React.useState();
  const [quotingId, setQuotingId] = React.useState();
  const [comments, setComments] = React.useState();
  const [fullScreenActive, setFullScreenActive] = React.useState(false);

  const [photos, setPhotos] = React.useState();
  const [slideNumber, setSlideNumber] = React.useState(0);

  const [reqWindowAcive, setReqWindowActive] = React.useState(false);
  const [dataLoading, setDataLoading] = React.useState(true);

  React.useEffect(() => {
    !loaded &&
      localStorage.getItem('key') &&
      Requests.getSinglePlace(placeId)
        .then((res) => {
          setLoaded(true);
          setPlace(res.data);
          setPhotos(res.data.place_image.map((photo) => `${rootAddress}${photo.photo}`));
          setDataLoading(false);
        })
        .then(() => {
          Requests.getPlaceComments(placeId).then((res) => {
            setComments(res.data);
            setLoaded(true);
          });
        });

    !loaded &&
      !localStorage.getItem('key') &&
      Requests.getSinglePlaceUnauth(placeId)
        .then((res) => {
          setLoaded(true);
          setPlace(res.data);
          setPhotos(res.data.place_image.map((photo) => `${rootAddress}${photo.photo}`));
          setDataLoading(false);
        })
        .then(() => {
          Requests.getPlaceComments(placeId).then((res) => {
            setComments(res.data);
            setLoaded(true);
          });
        });
  }, [loaded, placeId]);

  React.useEffect(() => {
    place && setProfileId(place.profile.id);
  }, [place]);

  const likeHandle = () => {
    if (place.is_liked) {
      Requests.unlikePlace(placeId).then(() => {
        Requests.getSinglePlace(placeId).then((res) => {
          setLoaded(true);
          setPlace(res.data);
        });
      });
    } else
      Requests.likePlace(placeId).then(() => {
        Requests.getSinglePlace(placeId).then((res) => {
          setLoaded(true);
          setPlace(res.data);
        });
      });
  };

  const favoriteHandle = () => {
    if (place.in_favorite) {
      Requests.deleteFavoritePlace(placeId).then(() => {
        Requests.getSinglePlace(placeId).then((res) => {
          setLoaded(true);
          setPlace(res.data);
        });
      });
    } else
      Requests.addPlaceToFavorites(placeId).then(() => {
        Requests.getSinglePlace(placeId).then((res) => {
          setLoaded(true);
          setPlace(res.data);
        });
      });
  };

  const handleComment = () => {
    Requests.createPlaceComment(placeId, comment).then(() => {
      dispatch(openSuccessAlert('Комментарий опубликован!'));
      Requests.getSinglePlace(placeId)
        .then((res) => {
          setPlace(res.data);
          setComment('');
        })
        .then(() => {
          Requests.getPlaceComments(placeId).then((res) => {
            setComments(res.data);
            setLoaded(true);
          });
        });
    });
  };

  const changePhoto = (dir) => {
    if (dir === 'next') {
      if (slideNumber === photos.length - 1) setSlideNumber(0);
      else setSlideNumber(slideNumber + 1);
    }

    if (dir === 'prev') {
      if (slideNumber === 0) setSlideNumber(photos.length - 1);
      else setSlideNumber(slideNumber - 1);
    }
  };

  return (
    <div className='training_view'>
      <PublicHeader profile={place && place.profile} />
      <div className='training_view_header'>
        <img src={Back} alt='back' className='add_photo_header_arrow' />
        <p
          onClick={() => navigate(`/public/places/${place.profile.id}`)}
          className='training_view_header_p'>
          Все мероприятия
        </p>
      </div>
      <div className='training_view_content'>
        <div className='training_view_content_left'>
          {photos && !dataLoading && (
            <div className='training_view_content_left_image_wrapper'>
              {photos.length > 1 && (
                <img
                  src={LeftArrow}
                  alt='prev'
                  className='training_view_content_left_image_arrow left'
                  onClick={() => changePhoto('prev')}
                />
              )}
              <img
                src={photos && photos[slideNumber]}
                alt='image'
                className='training_view_content_left_image'
                onClick={() => setFullScreenActive(true)}
              />
              {photos.length > 1 && (
                <img
                  src={RightArrow}
                  alt='next'
                  className='training_view_content_left_image_arrow right'
                  onClick={() => changePhoto('next')}
                />
              )}
            </div>
          )}
          {dataLoading && (
            <div className='training_view_content_left_image_wrapper'>
              <Skeleton sx={{ borderRadius: 3 }} variant='rectangular' height={300} />
            </div>
          )}
          <div className='training_view_content_left_activities'>
            <div className='training_view_content_left_activities_left'>
              <img src={View} alt='views' className='training_view_content_left_activities_img' />
              <p className='training_view_content_left_activities_p'>{place && place.views}</p>

              <img
                src={place && place.is_liked ? Like : LikeDisabled}
                alt='likes'
                className='training_view_content_left_activities_img'
                onClick={likeHandle}
              />
              <p className='training_view_content_left_activities_p'>{place && place.likes}</p>

              <img
                src={CommentImg}
                alt='comments'
                className='training_view_content_left_activities_img'
              />
              <p className='training_view_content_left_activities_p'>{place && place.comments}</p>

              <img
                src={place && place.in_favorite ? Fave : FaveDisabled}
                alt='favorites'
                className='training_view_content_left_activities_img'
                onClick={favoriteHandle}
              />
              <p className='training_view_content_left_activities_p'>{place && place.favorites}</p>
            </div>
            <p className='training_view_content_left_activities_date'>
              {place &&
                `${place.was_added.split('').splice(8, 2).join('')} ${
                  place.was_added.split('').splice(5, 2).join('') === '01'
                    ? 'января'
                    : place.was_added.split('').splice(5, 2).join('') === '02'
                    ? 'февраля'
                    : place.was_added.split('').splice(5, 2).join('') === '03'
                    ? 'марта'
                    : place.was_added.split('').splice(5, 2).join('') === '04'
                    ? 'апреля'
                    : place.was_added.split('').splice(5, 2).join('') === '05'
                    ? 'мая'
                    : place.was_added.split('').splice(5, 2).join('') === '06'
                    ? 'июня'
                    : place.was_added.split('').splice(5, 2).join('') === '07'
                    ? 'июля'
                    : place.was_added.split('').splice(5, 2).join('') === '08'
                    ? 'августа'
                    : place.was_added.split('').splice(5, 2).join('') === '09'
                    ? 'сентября'
                    : place.was_added.split('').splice(5, 2).join('') === '10'
                    ? 'октября'
                    : place.was_added.split('').splice(5, 2).join('') === '11'
                    ? 'ноября'
                    : place.was_added.split('').splice(5, 2).join('') === '12'
                    ? 'декабря'
                    : ''
                } ${place.was_added.split('').splice(0, 4).join('')}`}
            </p>
          </div>
          {!dataLoading && (
            <h1 className='training_view_content_left_title'>{place && place.name_place}</h1>
          )}
          {dataLoading && <Skeleton sx={{ borderRadius: 3 }} variant='text' width={50} />}
          {!dataLoading && (
            <p className='training_view_content_left_description'>{place && place.description}</p>
          )}
          {dataLoading && <Skeleton sx={{ borderRadius: 3 }} variant='text' width={100} />}
          <div className='training_view_content_right_geo mobile'>
            <img src={Geo} alt='geolocation' className='training_view_content_right_geo_img' />
            <p className='training_view_content_right_geo_p'>
              {place && place.string_place_location}
            </p>
          </div>
          <div className='training_view_content_right_map mobile'>
            {place && place.place_location && !dataLoading && (
              <YMaps>
                <Map
                  width={'100%'}
                  height={'110px'}
                  defaultState={{
                    center: place && place.place_location.split('(')[1].split(')')[0].split(' '),
                    zoom: 12,
                  }}>
                  <Placemark
                    geometry={place && place.place_location.split('(')[1].split(')')[0].split(' ')}
                  />
                </Map>
              </YMaps>
            )}
            {dataLoading && (
              <Skeleton sx={{ borderRadius: 3 }} variant='rectangular' height={100} />
            )}
          </div>
          <div className='training_view_content_right_specs mobile'>
            <div title='Камера' className='training_view_content_right_spec'>
              <img src={Camera} alt='camera' className='training_view_content_right_spec_img' />
              <p className='training_view_content_right_spec_p'>
                {place && place.photo_camera ? place.photo_camera : 'нет'}
              </p>
            </div>

            <div className='training_view_content_right_spec_row'>
              <div title='Стоимость' className='training_view_content_right_spec'>
                <img src={Money} alt='cost' className='training_view_content_right_spec_img' />
                <p className='training_view_content_right_spec_p'>
                  {place && place.cost ? place.cost : 'нет'}
                </p>
              </div>
            </div>

            <div className='training_view_content_right_spec_row'>
              <div title='Оплата' className='training_view_content_right_spec'>
                <img src={Work} alt='payment' className='training_view_content_right_spec_img' />
                <p className='training_view_content_right_spec_p'>
                  {place && place.payment ? place.payment : 'нет'}
                </p>
              </div>
            </div>
          </div>
          {window.screen.width <= 576 && (
            <GreenButton
              width={'180px'}
              height={'38px'}
              text={'Запрос на съемку'}
              callback={() => setReqWindowActive(true)}
              margin={'20px 0 20px 0 '}
            />
          )}
          {localStorage.getItem('access') && (
            <div className='training_view_content_left_textarea'>
              <textarea
                placeholder={'Ваш комментарий'}
                className='training_view_content_left_textarea_field'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <div className='training_view_content_left_textarea_button'>
                <GreenButton
                  text={'Комментировать'}
                  width={'210px'}
                  height={'38px'}
                  callback={handleComment}
                />
              </div>
            </div>
          )}
          <div className='photo_view_content_left_comment'>
            {comments && comments.map((comment, idx) => <Comment comment={comment} key={idx} />)}
          </div>
        </div>
        <div className='training_view_content_right'>
          <div className='training_view_content_right_table mobile'>
            <div className='training_view_content_right_table_row'>
              <img
                src={Lock}
                alt='published'
                className='training_view_content_right_table_row_img'
              />
              <p className='training_view_content_right_table_row_p'>Опубликовано</p>
            </div>

            <GreenButton
              width={'180px'}
              height={'38px'}
              text={'Редактировать'}
              callback={() => navigate('/profile/edit-training/1')}
              margin={'0px 0px 10px 0px'}
            />
          </div>
          <div className='training_view_content_right_geo'>
            <img src={Geo} alt='geolocation' className='training_view_content_right_geo_img' />
            <p className='training_view_content_right_geo_p'>
              {place && place.string_place_location}
            </p>
          </div>
          <div className='training_view_content_right_map'>
            {place && place.place_location && !dataLoading && (
              <YMaps>
                <Map
                  width={'255px'}
                  height={'110px'}
                  defaultState={{
                    center: place && place.place_location.split('(')[1].split(')')[0].split(' '),
                    zoom: 12,
                  }}>
                  <Placemark
                    geometry={place && place.place_location.split('(')[1].split(')')[0].split(' ')}
                  />
                </Map>
              </YMaps>
            )}
            {dataLoading && (
              <Skeleton sx={{ borderRadius: 3 }} variant='rectangular' height={100} />
            )}
          </div>
          <div className='training_view_content_right_specs'>
            <div title='Камера' className='training_view_content_right_spec'>
              <img src={Camera} alt='camera' className='training_view_content_right_spec_img' />
              <p className='training_view_content_right_spec_p'>
                {place && place.photo_camera ? place.photo_camera : 'нет'}
              </p>
            </div>

            <div className='training_view_content_right_spec_row'>
              <div title='Стоимость' className='training_view_content_right_spec'>
                <img src={Money} alt='cost' className='training_view_content_right_spec_img' />
                <p className='training_view_content_right_spec_p'>
                  {place && place.cost ? place.cost : 'нет'}
                </p>
              </div>
            </div>

            <div className='training_view_content_right_spec_row'>
              <div title='Оплата' className='training_view_content_right_spec'>
                <img src={Work} alt='payment' className='training_view_content_right_spec_img' />
                <p className='training_view_content_right_spec_p'>
                  {place && place.payment ? place.payment : 'нет'}
                </p>
              </div>
            </div>
          </div>

          <div className='training_view_content_right_categories'>
            <p className='training_view_content_right_categories_title'>Предоплата:</p>
            <p className='training_view_content_right_categories_p'>
              {place && place.category.map((category) => category.name_category).join(', ')}
            </p>
          </div>
          <div className='training_view_content_right_places'>
            <p className='training_view_content_right_places_p'>6 ИЗ 10 МЕСТ СВОБОДНО</p>
          </div>
          {window.screen.width > 576 && (
            <GreenButton
              width={'180px'}
              height={'38px'}
              text={'Записаться'}
              callback={() => setReqWindowActive(true)}
              margin={'20px 0 20px 0 '}
            />
          )}
          <div className='training_view_content_right_team'>
            <div className='training_view_content_right_team_single'>
              <p className='training_view_content_right_team_single_title'>Организаторы</p>
              <div className='training_view_content_right_team_single_account'>
                <img
                  src={Lock}
                  alt='avatar'
                  className='training_view_content_right_team_single_account_avatar'
                />
                <div className='training_view_content_right_team_single_account_name'>
                  <div className='training_view_content_right_team_single_account_name_online' />
                  <p className='training_view_content_right_team_single_account_name_p'>
                    Вася Пупкин
                  </p>
                </div>
                <img
                  src={Pro}
                  alt='pro'
                  className='training_view_content_right_team_single_account_pro'
                />
              </div>
            </div>
            <div className='training_view_content_right_team_single'>
              <p className='training_view_content_right_team_single_title'>Команда</p>
              <div className='training_view_content_right_team_single_account'>
                <img
                  src={Lock}
                  alt='avatar'
                  className='training_view_content_right_team_single_account_avatar'
                />

                <div className='training_view_content_right_team_single_account_speciality'>
                  <div className='training_view_content_right_team_single_account_speciality_name'>
                    <div className='training_view_content_right_team_single_account_speciality_name_online' />
                    <p className='training_view_content_right_team_single_account_speciality_name_p'>
                      Пупок Васи
                    </p>
                  </div>
                  <p className='training_view_content_right_team_single_account_speciality_name_spec'>
                    фотограф
                  </p>
                </div>
                <img
                  src={Pro}
                  alt='pro'
                  className='training_view_content_right_team_single_account_pro'
                />
              </div>
              <div className='training_view_content_right_team_single_account'>
                <img
                  src={Lock}
                  alt='avatar'
                  className='training_view_content_right_team_single_account_avatar'
                />

                <div className='training_view_content_right_team_single_account_speciality'>
                  <div className='training_view_content_right_team_single_account_speciality_name'>
                    <div className='training_view_content_right_team_single_account_speciality_name_online' />
                    <p className='training_view_content_right_team_single_account_speciality_name_p'>
                      Пупок Васи
                    </p>
                  </div>
                  <p className='training_view_content_right_team_single_account_speciality_name_spec'>
                    фотограф
                  </p>
                </div>
                <img
                  src={Pro}
                  alt='pro'
                  className='training_view_content_right_team_single_account_pro'
                />
              </div>
            </div>
            <div className='training_view_content_right_team_single'>
              <p className='training_view_content_right_team_single_title'>Участники</p>
              <div className='training_view_content_right_team_single_account'>
                <img
                  src={Lock}
                  alt='avatar'
                  className='training_view_content_right_team_single_account_avatar'
                />
                <div className='training_view_content_right_team_single_account_speciality_name'>
                  <div className='training_view_content_right_team_single_account_speciality_name_online' />
                  <p className='training_view_content_right_team_single_account_speciality_name_p'>
                    Пупок Васи
                  </p>
                </div>
                <img
                  src={Pro}
                  alt='pro'
                  className='training_view_content_right_team_single_account_pro'
                />
              </div>
              <div className='training_view_content_right_team_single_account'>
                <img
                  src={Lock}
                  alt='avatar'
                  className='training_view_content_right_team_single_account_avatar'
                />
                <div className='training_view_content_right_team_single_account_speciality_name'>
                  <div className='training_view_content_right_team_single_account_speciality_name_online' />
                  <p className='training_view_content_right_team_single_account_speciality_name_p'>
                    Пупок Васи
                  </p>
                </div>
                <img
                  src={Pro}
                  alt='pro'
                  className='training_view_content_right_team_single_account_pro'
                />
              </div>
              <div className='training_view_content_right_team_single_account'>
                <img
                  src={Lock}
                  alt='avatar'
                  className='training_view_content_right_team_single_account_avatar'
                />
                <div className='training_view_content_right_team_single_account_speciality_name'>
                  <div className='training_view_content_right_team_single_account_speciality_name_online' />
                  <p className='training_view_content_right_team_single_account_speciality_name_p'>
                    Пупок Васи
                  </p>
                </div>
                <img
                  src={Pro}
                  alt='pro'
                  className='training_view_content_right_team_single_account_pro'
                />
              </div>
              <div className='training_view_content_right_team_single_account'>
                <img
                  src={Lock}
                  alt='avatar'
                  className='training_view_content_right_team_single_account_avatar'
                />
                <div className='training_view_content_right_team_single_account_speciality_name'>
                  <div className='training_view_content_right_team_single_account_speciality_name_online' />
                  <p className='training_view_content_right_team_single_account_speciality_name_p'>
                    Пупок Васи
                  </p>
                </div>
                <img
                  src={Pro}
                  alt='pro'
                  className='training_view_content_right_team_single_account_pro'
                />
              </div>
              <div className='training_view_content_right_team_single_account'>
                <img
                  src={Lock}
                  alt='avatar'
                  className='training_view_content_right_team_single_account_avatar'
                />
                <div className='training_view_content_right_team_single_account_speciality_name'>
                  <div className='training_view_content_right_team_single_account_speciality_name_online' />
                  <p className='training_view_content_right_team_single_account_speciality_name_p'>
                    Пупок Васи
                  </p>
                </div>
                <img
                  src={Pro}
                  alt='pro'
                  className='training_view_content_right_team_single_account_pro'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <RequestWindow
        user={place && place.profile}
        active={reqWindowAcive}
        setActive={setReqWindowActive}
        width={window.screen.width <= 576 ? '90vw' : '40vw'}
        notAlign={window.screen.width <= 576}
      />
      <PhotoFullScreen
        photo={photos && photos[slideNumber]}
        changePhoto={changePhoto}
        modalActive={fullScreenActive}
        setModalActive={setFullScreenActive}
        slider={photos && photos.length > 1}
      />
    </div>
  );
};

export default TrainingView;
