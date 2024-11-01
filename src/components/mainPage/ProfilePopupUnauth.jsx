import React from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';

const ProfilePopupUnauth = ({
  unAuthPopupOpened,
  setUnAuthPopupOpened,
  setRegModuleActive,
  setLogModuleActive,
  styled,
  UserSet,
}) => {
  const handleClick = () => {
    setUnAuthPopupOpened((prev) => !prev);
  };

  const handleClickAway = () => {
    setUnAuthPopupOpened(false);
  };

  const handleModalOpen = (callback) => {
    setUnAuthPopupOpened(false);
    callback();
  };

  return (
    <ClickAwayListener
      onClickAway={
        window.screen.width <= 576
          ? () => {
              return;
            }
          : handleClickAway
      }>
      <div className='main_page_header_user_group'>
        {styled === 'main' && (
          <svg
            onClick={handleClick}
            alt='user'
            width='44'
            height='20'
            viewBox='0 0 44 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <rect
              x='-0.75'
              y='0.75'
              width='42.5'
              height='18.5'
              rx='9.25'
              transform='matrix(-1 0 0 1 42.5 0)'
              stroke='white'
              strokeWidth='1.5'
            />
            <g clipPath='url(#clip0_1628_1396)'>
              <path
                d='M10 4.28571C9.29364 4.28571 8.60314 4.49517 8.01582 4.88761C7.4285 5.28004 6.97074 5.83782 6.70043 6.49042C6.43012 7.14301 6.35939 7.8611 6.4972 8.55389C6.635 9.24668 6.97515 9.88305 7.47462 10.3825C7.97409 10.882 8.61046 11.2221 9.30325 11.3599C9.99604 11.4977 10.7141 11.427 11.3667 11.1567C12.0193 10.8864 12.5771 10.4286 12.9695 9.84132C13.362 9.254 13.5714 8.5635 13.5714 7.85714C13.5714 6.90994 13.1952 6.00153 12.5254 5.33176C11.8556 4.66199 10.9472 4.28571 10 4.28571ZM10 10C9.57618 10 9.16188 9.87432 8.80949 9.63886C8.4571 9.4034 8.18245 9.06873 8.02026 8.67718C7.85807 8.28562 7.81564 7.85476 7.89832 7.43909C7.981 7.02342 8.18509 6.6416 8.48477 6.34191C8.78446 6.04223 9.16628 5.83814 9.58195 5.75546C9.99762 5.67278 10.4285 5.71521 10.82 5.8774C11.2116 6.03959 11.5463 6.31424 11.7817 6.66663C12.0172 7.01902 12.1429 7.43332 12.1429 7.85714C12.1423 8.42529 11.9163 8.97 11.5146 9.37174C11.1129 9.77348 10.5681 9.99943 10 10Z'
                fill='white'
              />
              <path
                d='M10 0C8.02219 0 6.08879 0.58649 4.4443 1.6853C2.79981 2.78412 1.51809 4.3459 0.761209 6.17316C0.00433288 8.00043 -0.1937 10.0111 0.192152 11.9509C0.578004 13.8907 1.53041 15.6725 2.92894 17.0711C4.32746 18.4696 6.10929 19.422 8.0491 19.8078C9.98891 20.1937 11.9996 19.9957 13.8268 19.2388C15.6541 18.4819 17.2159 17.2002 18.3147 15.5557C19.4135 13.9112 20 11.9778 20 10C19.997 7.34876 18.9424 4.80698 17.0677 2.93227C15.193 1.05756 12.6512 0.0030248 10 0ZM5.71429 17.4121V16.4286C5.71486 15.8604 5.9408 15.3157 6.34254 14.914C6.74429 14.5122 7.289 14.2863 7.85715 14.2857H12.1429C12.711 14.2863 13.2557 14.5122 13.6575 14.914C14.0592 15.3157 14.2851 15.8604 14.2857 16.4286V17.4121C12.9851 18.1716 11.5061 18.5718 10 18.5718C8.49392 18.5718 7.01488 18.1716 5.71429 17.4121ZM15.7086 16.3757C15.6943 15.4388 15.3126 14.545 14.6457 13.8868C13.9787 13.2287 13.0799 12.8589 12.1429 12.8571H7.85715C6.92013 12.8589 6.02132 13.2287 5.35435 13.8868C4.68739 14.545 4.30567 15.4388 4.29143 16.3757C2.99612 15.2191 2.08267 13.6963 1.67203 12.009C1.26139 10.3218 1.37293 8.54953 1.99189 6.92704C2.61085 5.30455 3.70802 3.90833 5.13813 2.92326C6.56823 1.93819 8.26382 1.41073 10.0004 1.41073C11.7369 1.41073 13.4325 1.93819 14.8626 2.92326C16.2927 3.90833 17.3899 5.30455 18.0088 6.92704C18.6278 8.54953 18.7393 10.3218 18.3287 12.009C17.9181 13.6963 17.0039 15.2191 15.7086 16.3757Z'
                fill='white'
              />
            </g>
            <line x1='24' y1='5.75' x2='35' y2='5.75' stroke='#D2D9D8' strokeWidth='1.5' />
            <line x1='24' y1='9.75' x2='35' y2='9.75' stroke='#D2D9D8' strokeWidth='1.5' />
            <line x1='24' y1='13.75' x2='35' y2='13.75' stroke='#D2D9D8' strokeWidth='1.5' />
            <defs>
              <clipPath id='clip0_1628_1396'>
                <rect width='20' height='20' fill='white' />
              </clipPath>
            </defs>
          </svg>
        )}

        {styled === 'themed' && <img src={UserSet} onClick={handleClick} alt='user' />}

        <div
          className={
            unAuthPopupOpened
              ? `main_page_profile_popup_wrapper active`
              : `main_page_profile_popup_wrapper`
          }>
          <div className='main_page_profile_popup_content'>
            <ul className='main_page_profile_popup_ul'>
              <li
                className='main_page_profile_popup_li'
                onClick={() => handleModalOpen(() => setRegModuleActive(true))}>
                Зарегистрироваться
              </li>
              <li
                className='main_page_profile_popup_li'
                onClick={() => handleModalOpen(() => setLogModuleActive(true))}>
                Войти
              </li>
             {false && <li className='main_page_profile_popup_li'>Помощь</li>}
            </ul>
          </div>
        </div>
      </div>
    </ClickAwayListener>
  );
};

export default ProfilePopupUnauth;
