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
import { useParams } from 'react-router-dom';

function Team({ component, setProfileId }) {
  const navigate = useNavigate();
  const { userData } = useSelector(({ userData }) => userData);
  const [profiles, setProfiles] = React.useState();
  const [photos, setPhotos] = React.useState();
  const [places, setPlaces] = React.useState();
  const [sortType, setSortType] = React.useState(1);
  const [action, setAction] = React.useState(1);
  const [selectedPositions, setSelectedPositions] = React.useState([]);

  const params = useParams();
  const profileId = params.id;
  const [sessions, setSessions] = React.useState();
  const [dataLoading, setDataLoading] = React.useState(true);
  const [profileData, setPorfileData] = React.useState();
  React.useEffect(() => {
    profileId &&
      Requests.getSessions(profileId).then((res) => {
        setDataLoading(false);
        setSessions(res.data);
      });

    Requests.getPublicProfile(profileId).then((res) => setPorfileData(res.data));
  }, [profileId]);

  return (
    <div className='team'>
      <div className='team_header'>
        <div className='team_header_wrapper'>
          <h1
            className={
              component === 'team' ? 'team_header_title_first active' : 'team_header_title_first'
            }
            onClick={() => navigate(`/team/${profileId}`)}>
            МОЯ КОМАНДА
          </h1>
          <h1
            className={
              component === 'photos' ? 'team_header_title_first active' : 'team_header_title_first'
            }
            onClick={() => navigate(`/reccomend/${profileId}`)}>
            РЕКОМЕНДУЮ
          </h1>
          <h1
            className={
              component === 'places' ? 'team_header_title_first active' : 'team_header_title_first'
            }
            onClick={() => navigate(`/i-reccomended/${profileId}`)}>
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
      <div className='team_header_add'></div>
      <div className='team_body'>
        {/* {profiles &&
          component === 'profiles' &&
          !dataLoading &&
          profiles.map((profile, idx) => ( */}
        <TeamCard
          array={selectedPositions}
          callback={setSelectedPositions}
          // profile={profile}
          // key={idx}
        />
        {/* // ))} */}
        {profiles && component === 'team' && profiles.length === 0 && !dataLoading && (
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
          {photos && component === 'reccomend' && photos.length === 0 && !dataLoading && (
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
          {places && component === 'i-reccomended' && places.length === 0 && !dataLoading && (
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
