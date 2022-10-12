import React from 'react';
import SortImage from '../../img/sessions/sort.svg';
import { SelectInput, Checkbox, SessionCard } from '../../components';
import AddImage from '../../img/sessions/add.svg';
import '../../styles/Profile/Training.scss';
import { useNavigate, useParams } from 'react-router-dom';
import Requests from '../../http/axios-requests';
import { useSelector, useDispatch } from 'react-redux';
import { openSuccessAlert } from '../../redux/actions/userData';
import { ScreenLoader } from '../../components';
import TrainingCardMain from '../../components/Previews/TrainingCardMain';

const Trainings = () => {
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
    <div className='training'>
      <div className='training_header'>
        <h1 className='training_header_title'>ОБУЧЕНИЕ</h1>
        <div className='training_header_select'>
          <img src={SortImage} alt='sort' className='training_header_select_image' />
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
      <div className='training_options'>
        <div className='training_options_left'>
          <div className='training_options_right'>
            <p className='training_options_left_p'>
              Всего:{' '}
              <span className='training_options_left_p_span'>{sessions && sessions.length}</span>
            </p>
            <Checkbox marginBottom={1} label={'Выбрать все'} value={'0'} />
          </div>
          <div className='training_options_right'>
            <div className='training_options_right_add'>
              <img src={AddImage} alt='add' className='training_options_right_add_image' />
              <p
                onClick={() => navigate('/profile/add-training')}
                className='training_options_right_add_p'>
                Добавить мероприятие
              </p>
            </div>
            <SelectInput
              width={200}
              marginBottom={'10px'}
              values={[
                {
                  id: 1,
                  value: 'Выберите действие',
                },
              ]}
              value={action}
              placeholder={'Выберите действие'}
              onChange={(e) => setAction(e.target.value)}
              label={'Выберите действие'}
              labelId='demo-multiple-name-label'
            />
          </div>
        </div>
      </div>
      <div className='training_cards'>
        {sessions &&
          sessions.map((session, idx) => (
            <TrainingCardMain
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
            <h1 className='photos_cards_empty_title'>Нам жаль, обучений не найдено :(</h1>
          </div>
        )}
        {dataLoading && <ScreenLoader height={'30%'} />}
      </div>
    </div>
  );
};

export default Trainings;
