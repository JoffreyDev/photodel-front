import React from "react";
import {
  UseSwitchesCustom,
  ProfilePopupUnauth,
  RegModule,
  LoginModule,
  EmailMessageSent,
  LoggedUserPopup,
  LocationPopUp,
  ResetPass,
} from "..";
import BottomArrow from "../../img/mainPage/black_bottom_arrow.svg";
import LanguageThemed from "../../img/mainPage/language.svg";
import UserSet from "../../img/mainPage/user_set.svg";
import Logo from "../../img/mainPage/logo.svg";
import Bell from "../../img/mainPage/bell.svg";
import BellWhite from "../../img/mainPage/bellWhite.svg";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleRegModule,
  toggleLogModule,
} from "../../redux/actions/siteEntities";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MenuImg from "../../img/commonImages/menu.svg";
import MenuGreenImg from "../../img/commonImages/menuGreen.svg";
import { slide as Menu } from "react-burger-menu";
import "../../styles/mainPage/burger.css";
import { ThemeContext, themes } from "../Theme/ThemeContext";

const Header = ({ styled, border }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const setRegModuleActive = (bool) => dispatch(toggleRegModule(bool));
  const setLogModuleActive = (bool) => dispatch(toggleLogModule(bool));
  const [menuOpened, setMenuOpened] = React.useState(false);

  const { logModuleActive, regModuleActive } = useSelector(
    ({ siteEntities }) => siteEntities
  );
  const { isLoggedIn, userData } = useSelector(({ userData }) => userData);

  //открытие модалок и попапов для неавторизованного
  const [unAuthPopupOpened, setUnAuthPopupOpened] = React.useState(false);
  const [emailSentModalActive, setEmailSentModalActive] = React.useState(false);
  const [loggedUserPopupActive, setLoggedUserPopupActive] =
    React.useState(false);
  const [resetPassActive, setResetPassActive] = React.useState(false);

  const switchModals = () => {
    dispatch(toggleRegModule(!regModuleActive));
    dispatch(toggleLogModule(!logModuleActive));
  };

  return (
    <header className="main_page_header">
      <div className="main_page_header_menu">
        <Menu isOpen={menuOpened} onClose={() => setMenuOpened(false)}>
          <a
            id="home"
            className="menu-item"
            onClick={() => {
              setMenuOpened(false);
              navigate("/");
            }}
          >
            Главная
          </a>
          <a
            className="menu-item"
            onClick={() => {
              setMenuOpened(false);
              navigate("/profies");
            }}
          >
            Профи рядом
          </a>
          <a
            className="menu-item"
            onClick={() => {
              setMenuOpened(false);
              navigate("/places");
            }}
          >
            Места для съемки
          </a>
          <a
            className="menu-item"
            onClick={() => {
              setMenuOpened(false);
              navigate("/photos");
            }}
          >
            Фотографии
          </a>
          <div className="main_page_header_theme_select mobile">
            <ThemeContext.Consumer>
              {({ theme, setTheme }) => (
                <p className="main_page_header_theme_p__left disabled">
                  Темная
                </p>
              )}
            </ThemeContext.Consumer>

            <ThemeContext.Consumer>
              {({ theme, setTheme }) =>
                UseSwitchesCustom(() => {
                  if (theme === themes.light) setTheme(themes.dark);
                  if (theme === themes.dark) setTheme(themes.light);
                }, theme === themes.dark)
              }
            </ThemeContext.Consumer>

            <ThemeContext.Consumer>
              {({ theme, setTheme }) => (
                <p className="main_page_header_theme_p__left disabled">
                  Светлая
                </p>
              )}
            </ThemeContext.Consumer>
          </div>
        </Menu>
      </div>
      <div className="main_page_header_container">
        <div className="main_page_header_rows">
          <div className="main_page_header_top_row">
            <div className="main_page_header_top_row_left">
              <LocationPopUp styled={styled} />

              <div className="main_page_header_theme_select">
                <ThemeContext.Consumer>
                  {({ theme, setTheme }) => (
                    <p className="main_page_header_theme_p__left disabled">
                      Темная
                    </p>
                  )}
                </ThemeContext.Consumer>

                <ThemeContext.Consumer>
                  {({ theme, setTheme }) =>
                    UseSwitchesCustom(() => {
                      if (theme === themes.light) setTheme(themes.dark);
                      if (theme === themes.dark) setTheme(themes.light);
                    }, theme === themes.dark)
                  }
                </ThemeContext.Consumer>

                <ThemeContext.Consumer>
                  {({ theme, setTheme }) => (
                    <p className="main_page_header_theme_p__left disabled">
                      Светлая
                    </p>
                  )}
                </ThemeContext.Consumer>
              </div>
            </div>
            <div className="main_page_header_top_row_right">
              {false && (
                <div className="main_page_header_lang_select">
                  {styled === "main" && (
                    <svg
                      alt="language"
                      className="main_page_header_lang_select__planet"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 0C4.48595 0 0 4.48595 0 10.0001C0 15.5142 4.48595 20.0001 10 20.0001C15.514 20.0001 20 15.5142 20 10.0001C20 4.48595 15.514 0 10 0ZM10 18.5665C9.61917 18.5665 9.00516 17.8773 8.49188 16.3376C8.2522 15.6186 8.05896 14.795 7.91581 13.9006C8.58974 13.8471 9.2887 13.8188 10 13.8188C10.7113 13.8188 11.4103 13.8471 12.0842 13.9007C11.941 14.7951 11.7478 15.6186 11.5081 16.3376C10.9948 17.8773 10.3808 18.5665 10 18.5665ZM10 12.3853C9.22477 12.3853 8.46665 12.4165 7.73662 12.476C7.66179 11.682 7.62232 10.851 7.62232 10C7.62232 9.14899 7.66179 8.31805 7.73662 7.5239C8.46655 7.58343 9.22468 7.61459 9.99971 7.61459C10.775 7.61459 11.5333 7.58343 12.2634 7.5239C12.3382 8.31805 12.3777 9.14899 12.3777 10C12.3777 10.851 12.3382 11.682 12.2634 12.476C11.5334 12.4166 10.7751 12.3853 10 12.3853ZM1.43349 10.0001C1.43349 8.67269 1.737 7.41495 2.2781 6.29243C3.33687 6.77628 4.72869 7.14393 6.31298 7.36717C6.2305 8.22764 6.18874 9.11478 6.18874 10.0001C6.18874 10.8854 6.2305 11.7726 6.31298 12.633C4.72859 12.8562 3.33687 13.2239 2.2781 13.7079C1.737 12.5852 1.43349 11.3274 1.43349 10.0001ZM10 1.43349C10.3808 1.43349 10.9948 2.12271 11.5081 3.66237C11.7478 4.38141 11.941 5.2049 12.0842 6.0993C11.4102 6.15291 10.7112 6.1812 9.99971 6.1812C9.28851 6.1812 8.58964 6.15291 7.91581 6.09939C8.05896 5.20499 8.2522 4.38141 8.49188 3.66246C9.00516 2.12271 9.61917 1.43349 10 1.43349ZM13.6869 7.36698C15.2713 7.14373 16.663 6.776 17.7217 6.29205C18.263 7.41466 18.5665 8.6726 18.5665 10C18.5665 11.3273 18.263 12.5852 17.7219 13.7077C16.6631 13.2238 15.2713 12.8562 13.687 12.6329C13.7695 11.7726 13.8113 10.8853 13.8113 10C13.8112 9.11468 13.7694 8.22745 13.6869 7.36698ZM16.9882 5.05046C16.081 5.44305 14.8767 5.74876 13.5088 5.94276C13.2494 4.28374 12.8246 2.80075 12.2398 1.73108C14.1818 2.25774 15.8524 3.45136 16.9882 5.05046ZM7.76032 1.73117C7.17546 2.80084 6.75067 4.28383 6.4913 5.94295C5.12338 5.74895 3.91896 5.44324 3.01166 5.05075C4.14755 3.45145 5.81814 2.25774 7.76032 1.73117ZM3.01175 14.9495C3.91896 14.5569 5.12338 14.2512 6.4913 14.0572C6.75067 15.7162 7.17546 17.1992 7.76032 18.2688C5.81814 17.7423 4.14755 16.5487 3.01175 14.9495ZM12.2398 18.2688C12.8246 17.1992 13.2494 15.7162 13.5087 14.0572C14.8766 14.2512 16.081 14.5569 16.9883 14.9495C15.8524 16.5487 14.1819 17.7423 12.2398 18.2688Z"
                        fill="white"
                      />
                    </svg>
                  )}

                  {styled === "themed" && (
                    <img
                      src={LanguageThemed}
                      alt="language"
                      className="main_page_header_lang_select__planet"
                    />
                  )}
                  <p
                    style={styled === "themed" ? { color: "black" } : {}}
                    className="main_page_header_lang_select__p"
                  >
                    Русский
                  </p>
                  {styled === "main" && (
                    <svg
                      alt="arrow"
                      width="12"
                      height="8"
                      viewBox="0 0 12 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11 1.5L6 6.5L1 1.5"
                        stroke="white"
                        stroke-width="1.5"
                      />
                    </svg>
                  )}
                  {styled === "themed" && <img src={BottomArrow} alt="arrow" />}
                </div>
              )}

              {!isLoggedIn && (
                <ProfilePopupUnauth
                  styled={styled}
                  UserSet={UserSet}
                  unAuthPopupOpened={unAuthPopupOpened}
                  setUnAuthPopupOpened={setUnAuthPopupOpened}
                  setRegModuleActive={setRegModuleActive}
                  setLogModuleActive={setLogModuleActive}
                />
              )}

              {isLoggedIn && (
                <div className="main_page_header_top_row_user_group">
                  {false && (
                    <img
                      src={styled === "themed" ? Bell : BellWhite}
                      alt="bell"
                      className="main_page_header_top_row_user_group_bell"
                    />
                  )}

                  <img
                    onClick={() => setLoggedUserPopupActive(true)}
                    src={`data:image/png;base64,${userData.avatar}`}
                    alt="avatar"
                    className="main_page_header_top_row_user_group_avatar"
                  />

                  {loggedUserPopupActive && (
                    <LoggedUserPopup
                      setLoggedUserPopupActive={setLoggedUserPopupActive}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
          <hr
            style={
              styled === "themed" && border
                ? { opacity: 100 }
                : styled === "main" && border
                ? { opacity: 100, backgroundColor: "#5D6565" }
                : { opacity: 0 }
            }
            className="main_page_header_top_row_hr"
          ></hr>

          <div className="main_page_header_bottom_row">
            <img
              src={styled === "themed" ? MenuGreenImg : MenuImg}
              alt="menu"
              className="main_page_header_bottom_row_left mobile"
              onClick={() => setMenuOpened(true)}
            />
            <div className="main_page_header_bottom_row_left">
              {styled === "main" && (
                <svg
                  alt="logo"
                  className="main_page_header_bottom_row_left__logo"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M29.9487 7.79495H24.135L22.896 4.49099C22.7159 4.01058 22.2567 3.69238 21.7436 3.69238H10.2564C9.74334 3.69238 9.2841 4.01058 9.104 4.49099L7.86503 7.79495H2.05128C0.9184 7.79495 0 8.71335 0 9.84623V26.2565C0 27.3894 0.9184 28.3078 2.05128 28.3078H29.9487C31.0816 28.3078 32 27.3894 32 26.2565V9.84623C32 8.71335 31.0816 7.79495 29.9487 7.79495ZM29.5385 25.8462H2.46154V10.2565H9.57095L11.1093 6.15392H20.8907L22.4291 10.2565H29.5385V25.8462Z"
                    fill="#ADFAF2"
                  />
                  <path
                    d="M16 11.4872C12.7198 11.4872 10.0513 14.1557 10.0513 17.4359C10.0513 20.7161 12.7198 23.3846 16 23.3846C19.2802 23.3846 21.9487 20.7161 21.9487 17.4359C21.9487 14.1557 19.2802 11.4872 16 11.4872ZM16 20.6391C14.2338 20.6391 12.7969 19.2021 12.7969 17.4359C12.7969 15.6697 14.2338 14.2327 16 14.2327C17.7661 14.2327 19.2031 15.6697 19.2031 17.4359C19.2031 19.2021 17.7661 20.6391 16 20.6391Z"
                    fill="#ADFAF2"
                  />
                </svg>
              )}
              {styled === "themed" && (
                <Link to="/">
                  <img
                    alt="logo"
                    className="main_page_header_bottom_row_left__logo"
                    src={Logo}
                  />
                </Link>
              )}
              <Link to="/">
                <p
                  style={styled === "themed" ? { color: "#000000" } : {}}
                  className="main_page_header_bottom_row_left__p"
                >
                  Фотодел
                </p>
              </Link>
            </div>
            {!isLoggedIn && window.screen.width <= 576 && (
              <ProfilePopupUnauth
                styled={styled}
                UserSet={UserSet}
                unAuthPopupOpened={unAuthPopupOpened}
                setUnAuthPopupOpened={setUnAuthPopupOpened}
                setRegModuleActive={setRegModuleActive}
                setLogModuleActive={setLogModuleActive}
              />
            )}

            {isLoggedIn && window.screen.width <= 576 && (
              <div className="main_page_header_top_row_user_group">
                {false && (
                  <img
                    src={styled === "themed" ? Bell : BellWhite}
                    alt="bell"
                    className="main_page_header_top_row_user_group_bell"
                  />
                )}

                <img
                  onClick={() => setLoggedUserPopupActive(true)}
                  src={`data:image/png;base64,${userData.avatar}`}
                  alt="avatar"
                  className="main_page_header_top_row_user_group_avatar"
                />

                {loggedUserPopupActive && (
                  <LoggedUserPopup
                    setLoggedUserPopupActive={setLoggedUserPopupActive}
                  />
                )}
              </div>
            )}

            <div className="main_page_header_bottom_row_right">
              <ul className="main_page_header_bottom_row_right__ul">
                <li
                  onClick={() => navigate("/profies")}
                  className={
                    styled === "main"
                      ? "main_page_header_bottom_row_right__li"
                      : "main_page_header_bottom_row_right__li themed"
                  }
                >
                  ПРОФИ РЯДОМ
                </li>
                <li
                  onClick={() => navigate("/places")}
                  className={
                    styled === "main"
                      ? "main_page_header_bottom_row_right__li"
                      : "main_page_header_bottom_row_right__li themed"
                  }
                >
                  МЕСТА ДЛЯ СЪЕМОК
                </li>
                <li
                  onClick={() => navigate("/photos")}
                  className={
                    styled === "main"
                      ? "main_page_header_bottom_row_right__li"
                      : "main_page_header_bottom_row_right__li themed"
                  }
                >
                  ФОТОГРАФИИ
                </li>
              </ul>
            </div>
          </div>
          <hr
            style={
              styled === "themed" && border
                ? { opacity: 100 }
                : styled === "main" && border
                ? { opacity: 100, backgroundColor: "#5D6565" }
                : { opacity: 0 }
            }
            className="main_page_header_bottom_row_hr"
          ></hr>
        </div>
      </div>
      <RegModule
        regModuleActive={regModuleActive}
        setRegModuleActive={setRegModuleActive}
        switchModals={switchModals}
        setEmailSentModalActive={setEmailSentModalActive}
        setResetPassActive={setResetPassActive}
      />
      <LoginModule
        logModuleActive={logModuleActive}
        setLogModuleActive={setLogModuleActive}
        switchModals={switchModals}
        setResetPassActive={setResetPassActive}
      />
      <EmailMessageSent
        emailSentModalActive={emailSentModalActive}
        setEmailSentModalActive={setEmailSentModalActive}
      />
      <ResetPass
        resetPassActive={resetPassActive}
        setResetPassActive={setResetPassActive}
      />
    </header>
  );
};

export default Header;
