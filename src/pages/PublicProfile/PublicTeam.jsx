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
import { useParams } from 'react-router-dom';
import PublicHeader from './PublicHeader';

function Team({ component, setProfileId }) {
  const navigate = useNavigate();
  const { userData } = useSelector(({ userData }) => userData);
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
      <PublicHeader profile={profileData} />
      <div className='team_header'>
        <div className='team_header_wrapper'>
          <h1
            className={
              component === 'team' ? 'team_header_title_first active' : 'team_header_title_first'
            }
            onClick={() => navigate(`/public/team/${profileId}`)}>
            МОЯ КОМАНДА
          </h1>
          <h1
            className={
              component === 'recommend'
                ? 'team_header_title_first active'
                : 'team_header_title_first'
            }
            onClick={() => navigate(`/public/recommend/${profileId}`)}>
            РЕКОМЕНДУЮ
          </h1>
          <h1
            className={
              component === 'recommended'
                ? 'team_header_title_first active'
                : 'team_header_title_first'
            }
            onClick={() => navigate(`/public/recommended/${profileId}`)}>
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
      </div>
    </div>
  );
}

export default Team;
