import React from 'react';
import SortImage from '../../img/sessions/sort.svg';
import {
  Checkbox,
  PhotoCard,
  PlaceCard,
  SessionCard,
  TextInput,
  SelectInput,
} from '../../components';
import '../../styles/Profile/Team.scss';
import Requests from '../../http/axios-requests';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ScreenLoader } from '../../components';
import AddImage from '../../img/sessions/add.svg';
import TeamCard from '../../components/Previews/TeamCard';
import GreyButton from '../../components/common/GreyButton';
import GreenButton from '../../components/common/GreenButton';
import Back from '../../img/addModules/arrow-back.svg';

function Team() {
  const navigate = useNavigate();
  const { userData } = useSelector(({ userData }) => userData);
  const [profiles, setProfiles] = React.useState();
  const [photos, setPhotos] = React.useState();
  const [places, setPlaces] = React.useState();
  const [sessions, setSessions] = React.useState();
  const [component, setComponent] = React.useState('profiles');
  const [sortType, setSortType] = React.useState(1);
  const [action, setAction] = React.useState(1);
  const [selectedPositions, setSelectedPositions] = React.useState([]);

  const [dataLoading, setDataLoading] = React.useState(true);

  React.useEffect(() => {
    if (userData) {
      setDataLoading(true);
      if (component === 'profiles') {
        Requests.getFavoriteProfiles(userData.id).then((res) => {
          setProfiles(res.data);
          setDataLoading(false);
        });
        // } else if (component === 'photos') {
        //   setDataLoading(true);
        //   Requests.getFavoritePhotos(userData.id).then((res) => {
        //     setPhotos(res.data);
        //     setDataLoading(false);
        //   });
      } else if (component === 'places') {
        setDataLoading(true);
        Requests.getFavoritePlaces(userData.id).then((res) => {
          setPlaces(res.data);
          setDataLoading(false);
        });
      } else if (component === 'sessions') {
        setDataLoading(true);
        Requests.getFavoriteSessions(userData.id).then((res) => {
          setSessions(res.data);
          setDataLoading(false);
        });
      }
    }
  }, [component, userData]);

  React.useEffect(() => {
    if (!localStorage.getItem('access')) navigate('/');
  }, []);

  return (
    <div className='team'>
      <div className='team_header'>
        <div className='team_header_wrapper'>
          <h1
            className={
              component === 'profiles'
                ? 'team_header_title_first active'
                : 'team_header_title_first'
            }
            onClick={() => setComponent('profiles')}>
            МОЯ КОМАНДА
          </h1>
          <h1
            className={
              component === 'photos' ? 'team_header_title_first active' : 'team_header_title_first'
            }
            onClick={() => setComponent('photos')}>
            РЕКОМЕНДУЮ
          </h1>
          <h1
            className={
              component === 'places' ? 'team_header_title_first active' : 'team_header_title_first'
            }
            onClick={() => setComponent('places')}>
            МЕНЯ РЕКОМЕНДУЮТ
          </h1>
        </div>
        <div className='team_header_select'>
          <img src={SortImage} alt='sort' className='team_header_select_image' />
          <SelectInput
            values={[
              {
                id: 1,
                value: 'По дате добавления',
              },
              {
                id: 2,
                value: 'По популярности',
              },
            ]}
            width={190}
            nonBorder={true}
            fontSize={'13px'}
            marginBottom={'0px'}
            value={sortType}
          />
        </div>
      </div>
      <div className='photos_options'>
        <div className='photos_options_left favorites'>
          <p className='photos_options_left_p'>
            Всего: <span className='photos_options_left_p_span'>0</span>
          </p>
          <Checkbox marginBottom={'0px'} label={'Выбрать все'} />
        </div>

        <div className='photos_options_right'>
          <div className='training_options_right_add'>
            <img src={AddImage} alt='add' className='training_options_right_add_image' />
            <p
              onClick={() => navigate('/profile/add-training')}
              className='training_options_right_add_p'>
              Добавить в команду
            </p>
          </div>
          <SelectInput
            width={window.screen.width <= 576 ? 170 : 200}
            marginBottom={'10px'}
            values={[
              {
                id: 1,
                value: 'Удалить',
              },
            ]}
            onChange={(e) => setAction(e.target.value)}
            label={'Выберите действие'}
            labelId='demo-multiple-name-label'
          />
          <div className='photos_options_left mobile'>
            <p className='photos_options_left_p'>
              Всего: <span className='photos_options_left_p_span'>0</span>
            </p>
            <Checkbox marginBottom={'0px'} label={'Выбрать все'} />
          </div>
        </div>
      </div>
      {/* ДОБАВИТЬ В КОМАНДУ */
      /* <div className='team_add_header'>
        <img src={Back} alt='back' className='team_add_header_arrow' />
        <p onClick={() => navigate('/profile/team')} className='team_add_header_p'>
          Моя команда
        </p>
      </div>
      <div className='team_add_header_search'>
        <TextInput
          height={'38px'}
          width={'255px'}
          label={'Местоположение'}
          placeholder={'Введите что-нибудь'}
          // value={searchReq}
          // callback={setSearchReq}
        />
        <SelectInput
          height={'38px'}
          width={'255px'}
          label={'Категория'}
          values={[
            { id: '10000000000', value: 'Без ограничения' },
            { id: '5000', value: 'В переделах 5км' },
            { id: '10000', value: 'В переделах 10км' },
            { id: '25000', value: 'В переделах 25км' },
            { id: '50000', value: 'В переделах 50км' },
            { id: '100000', value: 'В переделах 100км' },
          ]}
          // value={searchDist}
          // onChange={(e) => setSearchDist(e.target.value)}
          // setValue={setSearchDist}
        />
        <SelectInput
          height={'38px'}
          width={'255px'}
          label={'Специализация'}
          values={[
            { id: '10000000000', value: 'Без ограничения' },
            { id: '5000', value: 'В переделах 5км' },
            { id: '10000', value: 'В переделах 10км' },
            { id: '25000', value: 'В переделах 25км' },
            { id: '50000', value: 'В переделах 50км' },
            { id: '100000', value: 'В переделах 100км' },
          ]}
          // values={
          //   prosSpecs &&
          //   prosSpecs.map((item) => {
          //     return { id: item.id, value: item.name_spec };
          //   })
          // }
          // value={category}
          // onChange={(e) => setCategory(e.target.value)}
          getName
        />
        <TextInput
          height={'38px'}
          width={'100%'}
          label={'Искать по имени'}
          placeholder={'Введите что-нибудь'}
          // value={searchReq}
          // callback={setSearchReq}
        />
      </div>
      <div className='add_training_buttons'>
        <div style={{ marginRight: '15px ' }}>
          <GreyButton
            text={'Сбросить'}
            width={'180px'}
            height={'38px'}
            callback={() => navigate('/profile/team')}
          />
        </div>
        <GreenButton
          text={'Найти'}
          width={'180px'}
          height={'38px'}
          // callback={handlePhotoUpdate}
          margin={'13px 0 0 0'}
        />
      </div> */}
      <div className='team_header_add'></div>
      <div className='team_body'>
        {profiles &&
          component === 'profiles' &&
          !dataLoading &&
          profiles.map((profile, idx) => (
            <TeamCard
              array={selectedPositions}
              callback={setSelectedPositions}
              profile={profile}
              key={idx}
            />
          ))}
        {profiles && component === 'profiles' && profiles.length === 0 && !dataLoading && (
          <div className='photos_cards_empty'>
            <h1 className='photos_cards_empty_title'>Нет избранных профилей.</h1>
          </div>
        )}

        {dataLoading && <ScreenLoader height={'30%'} />}

        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {photos &&
            component === 'photos' &&
            !dataLoading &&
            photos.map((photo, idx) => (
              <PhotoCard
                array={selectedPositions}
                callback={setSelectedPositions}
                photo={photo.gallery}
                key={idx}
              />
            ))}
          {photos && component === 'photos' && photos.length === 0 && !dataLoading && (
            <div className='photos_cards_empty'>
              <h1 className='photos_cards_empty_title'>Нет избранных фотографий.</h1>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {places &&
            component === 'places' &&
            !dataLoading &&
            places.map((place, idx) => (
              <PlaceCard
                array={selectedPositions}
                callback={setSelectedPositions}
                place={place.place}
                key={idx}
              />
            ))}
          {places && component === 'places' && places.length === 0 && !dataLoading && (
            <div className='photos_cards_empty'>
              <h1 className='photos_cards_empty_title'>Нет избранных мест.</h1>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {sessions &&
            component === 'sessions' &&
            !dataLoading &&
            sessions.map((session, idx) => (
              <SessionCard
                array={selectedPositions}
                callback={setSelectedPositions}
                session={session.photo_session}
                key={idx}
              />
            ))}
          {sessions && component === 'sessions' && sessions.length === 0 && !dataLoading && (
            <div className='photos_cards_empty'>
              <h1 className='photos_cards_empty_title'>Нет избранных фотосессий.</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Team;
