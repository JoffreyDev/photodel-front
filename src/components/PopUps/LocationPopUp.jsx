import React from "react";
import GreenLocation from "../../img/mainPage/green_location.svg";
import BottomArrow from "../../img/mainPage/black_bottom_arrow.svg";
import Checkmark from "../../img/commonImages/checkmark.svg";
import Location from "../../img/commonImages/location.svg";
import TextField from "@mui/material/TextField";
import { SelectInput, TextInput } from "..";
import Requests from "../../http/axios-requests";
import { ClickAwayListener } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

function LocationPopUp({ styled }) {
  const [popUpActive, setPopUpActive] = React.useState(false);
  const [country, setCountry] = React.useState(1);
  const [cityName, setCityName] = React.useState("");
  const [fetchedCities, setFetchedCities] = React.useState();
  const [selectedCity, setSelectedCity] = React.useState({});

  const { userCoords } = useSelector(({ userData }) => userData);

  React.useEffect(() => {
    Requests.getCities().then((res) => setFetchedCities(res.data));

    userCoords &&
      Requests.getNearestCity(userCoords).then((res) =>
        setSelectedCity(res.data)
      );
  }, [userCoords]);

  return (
    <div className="main_page_header_loc_select">
      <div
        onClick={() => setPopUpActive(!popUpActive)}
        className="main_page_header_loc_select_header"
      >
        {styled === "main" && (
          <svg
            alt="location"
            width="16"
            height="20"
            viewBox="0 0 16 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="main_page_header_loc_vector"
          >
            <path
              d="M7.77102 3.24369C7.04021 3.24369 6.32581 3.4604 5.71817 3.86641C5.11052 4.27243 4.63692 4.84952 4.35725 5.5247C4.07758 6.19988 4.0044 6.94283 4.14698 7.6596C4.28955 8.37637 4.64147 9.03476 5.15823 9.55152C5.67499 10.0683 6.33339 10.4202 7.05016 10.5628C7.76692 10.7053 8.50987 10.6322 9.18505 10.3525C9.86024 10.0728 10.4373 9.59923 10.8433 8.99159C11.2494 8.38394 11.4661 7.66954 11.4661 6.93873C11.4661 5.95874 11.0768 5.01889 10.3838 4.32594C9.69086 3.63298 8.75101 3.24369 7.77102 3.24369ZM7.77102 9.34406C7.29529 9.34406 6.83025 9.20299 6.4347 8.93869C6.03914 8.67439 5.73085 8.29872 5.54879 7.85921C5.36674 7.41969 5.31911 6.93606 5.41192 6.46947C5.50473 6.00289 5.73381 5.5743 6.0702 5.23791C6.40659 4.90152 6.83518 4.67243 7.30177 4.57962C7.76835 4.48681 8.25199 4.53445 8.6915 4.7165C9.13102 4.89855 9.50668 5.20685 9.77098 5.6024C10.0353 5.99796 10.1763 6.463 10.1763 6.93873C10.1746 7.57554 9.92047 8.18569 9.46957 8.63538C9.01867 9.08508 8.40784 9.33761 7.77102 9.33761V9.34406Z"
              fill="white"
            />
            <path
              d="M7.99703 0.199951C6.14691 0.201496 4.37258 0.935106 3.06157 2.24055C1.75057 3.546 1.00941 5.31719 1 7.16728C1 9.94115 2.55622 12.2636 3.69665 13.9564L3.90454 14.2653C5.0392 15.9098 6.25643 17.4958 7.55155 19.0171L8.00297 19.5457L8.45439 19.0171C9.74935 17.4956 10.9666 15.9097 12.1014 14.2653L12.3093 13.9505C13.4438 12.2577 15 9.94115 15 7.16728C14.9906 5.31616 14.2486 3.54407 12.9363 2.23846C11.624 0.932844 9.84818 0.199927 7.99703 0.199951ZM11.3174 13.2674L11.1035 13.5822C10.0819 15.1147 8.72762 16.8313 7.99703 17.6806C7.29614 16.8313 5.91218 15.1147 4.89054 13.5822L4.68265 13.2674C3.63131 11.6993 2.18795 9.55506 2.18795 7.14352C2.18795 6.38066 2.33821 5.62527 2.63014 4.92048C2.92207 4.21569 3.34997 3.57531 3.88939 3.03588C4.42881 2.49646 5.0692 2.06857 5.77399 1.77663C6.47878 1.4847 7.23417 1.33444 7.99703 1.33444C8.75989 1.33444 9.51528 1.4847 10.2201 1.77663C10.9249 2.06857 11.5652 2.49646 12.1047 3.03588C12.6441 3.57531 13.072 4.21569 13.3639 4.92048C13.6559 5.62527 13.8061 6.38066 13.8061 7.14352C13.8061 9.57882 12.3687 11.7231 11.3174 13.2674Z"
              fill="white"
            />
            <path
              d="M7.77102 3.24369C7.04021 3.24369 6.32581 3.4604 5.71817 3.86641C5.11052 4.27243 4.63692 4.84952 4.35725 5.5247C4.07758 6.19988 4.0044 6.94283 4.14698 7.6596C4.28955 8.37637 4.64147 9.03476 5.15823 9.55152C5.67499 10.0683 6.33339 10.4202 7.05016 10.5628C7.76692 10.7053 8.50987 10.6322 9.18505 10.3525C9.86024 10.0728 10.4373 9.59923 10.8433 8.99159C11.2494 8.38394 11.4661 7.66954 11.4661 6.93873C11.4661 5.95874 11.0768 5.01889 10.3838 4.32594C9.69086 3.63298 8.75101 3.24369 7.77102 3.24369ZM7.77102 9.34406C7.29529 9.34406 6.83025 9.20299 6.4347 8.93869C6.03914 8.67439 5.73085 8.29872 5.54879 7.85921C5.36674 7.41969 5.31911 6.93606 5.41192 6.46947C5.50473 6.00289 5.73381 5.5743 6.0702 5.23791C6.40659 4.90152 6.83518 4.67243 7.30177 4.57962C7.76835 4.48681 8.25199 4.53445 8.6915 4.7165C9.13102 4.89855 9.50668 5.20685 9.77098 5.6024C10.0353 5.99796 10.1763 6.463 10.1763 6.93873C10.1746 7.57554 9.92047 8.18569 9.46957 8.63538C9.01867 9.08508 8.40784 9.33761 7.77102 9.33761V9.34406Z"
              stroke="white"
              stroke-width="0.2"
            />
            <path
              d="M7.99703 0.199951C6.14691 0.201496 4.37258 0.935106 3.06157 2.24055C1.75057 3.546 1.00941 5.31719 1 7.16728C1 9.94115 2.55622 12.2636 3.69665 13.9564L3.90454 14.2653C5.0392 15.9098 6.25643 17.4958 7.55155 19.0171L8.00297 19.5457L8.45439 19.0171C9.74935 17.4956 10.9666 15.9097 12.1014 14.2653L12.3093 13.9505C13.4438 12.2577 15 9.94115 15 7.16728C14.9906 5.31616 14.2486 3.54407 12.9363 2.23846C11.624 0.932844 9.84818 0.199927 7.99703 0.199951ZM11.3174 13.2674L11.1035 13.5822C10.0819 15.1147 8.72762 16.8313 7.99703 17.6806C7.29614 16.8313 5.91218 15.1147 4.89054 13.5822L4.68265 13.2674C3.63131 11.6993 2.18795 9.55506 2.18795 7.14352C2.18795 6.38066 2.33821 5.62527 2.63014 4.92048C2.92207 4.21569 3.34997 3.57531 3.88939 3.03588C4.42881 2.49646 5.0692 2.06857 5.77399 1.77663C6.47878 1.4847 7.23417 1.33444 7.99703 1.33444C8.75989 1.33444 9.51528 1.4847 10.2201 1.77663C10.9249 2.06857 11.5652 2.49646 12.1047 3.03588C12.6441 3.57531 13.072 4.21569 13.3639 4.92048C13.6559 5.62527 13.8061 6.38066 13.8061 7.14352C13.8061 9.57882 12.3687 11.7231 11.3174 13.2674Z"
              stroke="white"
              stroke-width="0.2"
            />
          </svg>
        )}
        {styled === "themed" && (
          <img
            src={GreenLocation}
            alt="location"
            className="main_page_header_loc_vector"
          />
        )}
        <p
          style={styled === "themed" ? { color: "black" } : {}}
          className="main_page_header_loc_p"
        >
          {selectedCity.city_name}
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
            <path d="M11 1.5L6 6.5L1 1.5" stroke="white" stroke-width="1.5" />
          </svg>
        )}
        {styled === "themed" && <img src={BottomArrow} alt="arrow" />}
      </div>
      {popUpActive && (
        <div className="main_page_header_loc_select_popup">
          <div className="main_page_header_loc_select_popup_content">
            <div onClick={(e) => e.stopPropagation()}>
              <SelectInput
                values={[
                  { id: 1, value: "Россия" },
                  { id: 2, value: "Беларусь" },
                ]}
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                label={"Страна"}
                width={"100%"}
              />
            </div>
            <TextInput
              width={"100%"}
              label={"Название города"}
              value={cityName}
              callback={setCityName}
            />
            <div className="main_page_header_loc_select_popup_content_cities">
              {fetchedCities &&
                fetchedCities
                  .filter((city) =>
                    city.city_name
                      .toLowerCase()
                      .includes(cityName.toLowerCase())
                  )
                  .map((city) => {
                    if (country === 1 && city.country.id === 140) {
                      return (
                        <div className="main_page_header_loc_select_popup_content_cities_p_wrapper">
                          {selectedCity.city_name === city.city_name && (
                            <img
                              src={Location}
                              alt="selected"
                              className="main_page_header_loc_select_popup_content_cities_img"
                            />
                          )}
                          <p
                            className={
                              selectedCity.city_name === city.city_name
                                ? "main_page_header_loc_select_popup_content_cities_p active"
                                : "main_page_header_loc_select_popup_content_cities_p"
                            }
                            onClick={() => {
                              setSelectedCity(city);
                              setPopUpActive(false);
                            }}
                          >
                            {city.city_name}
                          </p>
                        </div>
                      );
                    } else if (country === 2 && city.country.id === 15) {
                      return (
                        <div className="main_page_header_loc_select_popup_content_cities_p_wrapper">
                          {selectedCity.city_name === city.city_name && (
                            <img
                              src={Location}
                              alt="selected"
                              className="main_page_header_loc_select_popup_content_cities_img"
                            />
                          )}
                          <p
                            className={
                              selectedCity.city_name === city.city_name
                                ? "main_page_header_loc_select_popup_content_cities_p active"
                                : "main_page_header_loc_select_popup_content_cities_p"
                            }
                            onClick={() => {
                              setSelectedCity(city);
                              setPopUpActive(false);
                            }}
                          >
                            {city.city_name}
                          </p>
                        </div>
                      );
                    }
                  })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LocationPopUp;
