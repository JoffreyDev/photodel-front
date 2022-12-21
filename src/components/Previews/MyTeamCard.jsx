import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Requests from '../../http/axios-requests';
import Online from '../../img/commonImages/online.svg';

const MyTeamCard = (component) => {
  const navigate = useNavigate();
  const { userData } = useSelector(({ userData }) => userData);

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
    <div className='team_card_info'>
      <div className='team_card_info_first'>
        <img src={Online} alt='online' className='team_card_info_first_online' />
        <p className='team_card_info_first_name'>
          {`${component.profile && component.profile.receiver_favorite.name}  ${
            component.profile && component.profile.receiver_favorite.surname
          }`}
        </p>
      </div>
      <div className='team_card_info_third'>
        <p className='team_card_info_third_category'>
          {component.profile && component.profile.receiver_favorite.type_pro.name_category}
        </p>
        <p className='team_card_info_third_specs'>
          {component.profile && component.profile.receiver_favorite.string_location.split(', ')[1]}
        </p>
      </div>
      <p className='team_card_info_fourth'>Запрос мне</p>
      <p className='team_card_info_status accepted'>ОДОБРЕН</p>
      <p className='team_card_info_status pending'>НА РАССМОТРЕНИИ</p>
    </div>
  );
};

export default MyTeamCard;
