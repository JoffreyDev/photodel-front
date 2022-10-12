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
import '../../styles/Profile/Reviews.scss';
import Requests from '../../http/axios-requests';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ScreenLoader } from '../../components';
import AddImage from '../../img/sessions/add.svg';
import TeamCard from '../../components/Previews/TeamCard';
import GreyButton from '../../components/common/GreyButton';
import GreenButton from '../../components/common/GreenButton';
import Back from '../../img/addModules/arrow-back.svg';
import ReviewCard from '../../components/Previews/ReviewCard';

function Reviews() {
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
    <div className='reviews'>
      <div className='reviews_header'>
        <div className='reviews_header_wrapper'>
          <h1 className='reviews_header_title_first'>ОТЗЫВЫ</h1>
        </div>
        <div className='reviews_header_select'>
          <img src={SortImage} alt='sort' className='reviews_header_select_image' />
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
      <div className='reviews_options'>
        <div className='reviews_options_left favorites'>
          <p className='reviews_options_left_p'>
            Всего: <span className='reviews_options_left_p_span'>0</span>
          </p>
          <Checkbox marginBottom={'0px'} label={'Выбрать все'} />
        </div>
        <div className='reviews_options_right'>
          <GreenButton width={'180px'} height={'38px'} text={'Оставить отзыв'} />
        </div>
      </div>
      <div className='reviews_body'>
        <div className='reviews_cards'>
          <ReviewCard />
          <ReviewCard />
        </div>
        {/* {profiles && component === 'profiles' && profiles.length === 0 && !dataLoading && (
          <div className='photos_cards_empty'>
            <h1 className='photos_cards_empty_title'>Нет избранных профилей.</h1>
          </div>
        )} */}
        {dataLoading && <ScreenLoader height={'30%'} />}
      </div>
    </div>
  );
}

export default Reviews;
