import React from 'react';
import SortImage from '../../img/sessions/sort.svg';
import { SelectInput, Checkbox, SessionCard } from '../../components';
import AddImage from '../../img/sessions/add.svg';
import '../../styles/Profile/Sessions.scss';
import { useNavigate, useParams } from 'react-router-dom';
import Requests from '../../http/axios-requests';
import { useSelector, useDispatch } from 'react-redux';
import { openSuccessAlert } from '../../redux/actions/userData';
import { PublicHeader } from '..';
import { ScreenLoader } from '../../components';

const Sessions = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const params = useParams();
  const profileId = params.id;

  const { userData } = useSelector(({ userData }) => userData);

  const [sessions, setSessions] = React.useState();

  const [selectedSessions, setSelectedSessions] = React.useState([]);
  const [allSessionsSelected, setAllSessionsSelected] = React.useState(false);
  const [action, setAction] = React.useState('');

  const [ignored, forceUpdate] = React.useReducer((x) => x + 1, 0);

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
    <div className='sessions'>
      <PublicHeader profile={profileData} />
      <div className='sessions_header'>
        <h1 className='sessions_header_title'>ФОТОСЕССИИ</h1>
        <div className='sessions_header_select'>
          <img src={SortImage} alt='sort' className='sessions_header_select_image' />
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
          />
        </div>
      </div>
      <div className='sessions_options'>
        <div className='sessions_options_left'>
          <p className='sessions_options_left_p'>
            Всего:{' '}
            <span className='sessions_options_left_p_span'>{sessions && sessions.length}</span>
          </p>
        </div>
      </div>
      <div className='sessions_cards'>
        {sessions &&
          sessions.map((session, idx) => (
            <SessionCard
              session={session}
              key={idx}
              callback={setSelectedSessions}
              array={selectedSessions}
              notAuthor
              disableCheck
              disableEdit
            />
          ))}
        {sessions && sessions.length === 0 && (
          <div className='photos_cards_empty'>
            <h1 className='photos_cards_empty_title'>Нам жаль, фотосессий не найдено :(</h1>
          </div>
        )}
        {dataLoading && <ScreenLoader height={'30%'} />}
      </div>
    </div>
  );
};

export default Sessions;
