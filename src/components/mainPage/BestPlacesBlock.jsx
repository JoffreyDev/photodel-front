import React from "react";
import { BestPlaceCard } from "..";
import { useNavigate } from "react-router-dom";
import Carousel from "react-elastic-carousel";
import Requests from "../../http/axios-requests";

const BestPlacesBlock = () => {
  const [places, setPlaces] = React.useState();

  React.useEffect(() => {
    Requests.getPopularPlaces().then((res) => setPlaces(res.data));
  }, []);

  const navigate = useNavigate();

  return (
    <section className="main_page_third_section_wrapper">
      <div className="main_page_third_section_content">
        <div className="main_page_third_section_content_upper_row">
          <div className="main_page_third_section_content_upper_row_left">
            <h2 className="main_page_third_section_content_upper_row_left_h2">
              Лучшие места для съемок
            </h2>
            {false && (
              <div className="main_page_third_section_content_upper_row_left_checkbox_wrapper">
                <input
                  type="checkbox"
                  className="main_page_third_section_content_upper_row_left_checkbox"
                  id="places_near_check"
                />
                <label
                  htmlFor="places_near_check"
                  className="main_page_third_section_content_upper_row_left_label"
                >
                  Рядом с Вами
                </label>
              </div>
            )}
          </div>
          <ul className="main_page_third_section_content_upper_row_rigth">
            <li className="main_page_third_section_content_upper_row_rigth_li active">
              Все
            </li>
            <li className="main_page_third_section_content_upper_row_rigth_li">
               Город
            </li>
            <li className="main_page_third_section_content_upper_row_rigth_li">
              Пляжи
            </li>
            <li className="main_page_third_section_content_upper_row_rigth_li">
              Достопримечательности
            </li>
            <li className="main_page_third_section_content_upper_row_rigth_li">
              Музеи
            </li>
            <li className="main_page_third_section_content_upper_row_rigth_li">
              Прочие
            </li>
          </ul>
        </div>
        <div className="main_page_third_section_content_slider_wrapper">
          <Carousel itemsToShow={6} pagination={false}>
            {places &&
              places.map((place, idx) => (
                <BestPlaceCard place={place} key={idx} />
              ))}
          </Carousel>
        </div>
        <div className="main_page_third_section_content_lower_table">
          <svg
            className="main_page_third_section_content_lower_table_image"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_49_4)">
              <path
                d="M23.3559 17.1817L17.9885 11.813C18.9956 9.52665 18.5647 6.75438 16.695 4.88422C14.259 2.44764 10.3159 2.44731 7.87961 4.88422C5.44931 7.31508 5.44931 11.2704 7.87961 13.7012C9.81085 15.6329 12.6411 16.0007 14.9005 14.9562L20.2405 20.2974C21.1014 21.1585 22.4951 21.1586 23.3561 20.2972C24.2147 19.4383 24.2146 18.0407 23.3559 17.1817ZM8.87411 12.7069C6.99194 10.8243 6.99194 7.76116 8.87411 5.87853C10.7604 3.99173 13.8138 3.9914 15.7004 5.87853C17.5826 7.76116 17.5826 10.8243 15.7004 12.7069C13.8141 14.5938 10.7607 14.5941 8.87411 12.7069ZM22.3614 19.3031C22.0502 19.6145 21.5463 19.6146 21.235 19.3031L16.1332 14.2001C16.5525 13.87 16.9263 13.4909 17.2508 13.0642L22.3614 18.176C22.672 18.4867 22.6721 18.9923 22.3614 19.3031Z"
                fill="#50A398"
              />
              <path
                d="M0.703157 11.4824H3.70151C4.08984 11.4824 4.40467 11.1676 4.40467 10.7793C4.40467 10.3909 4.08984 10.0761 3.70151 10.0761H0.703157C0.314827 10.0761 0 10.3909 0 10.7793C0 11.1676 0.314827 11.4824 0.703157 11.4824Z"
                fill="#50A398"
              />
              <path
                d="M0.703157 14.4826H4.8259C5.21423 14.4826 5.52906 14.1677 5.52906 13.7794C5.52906 13.3911 5.21423 13.0762 4.8259 13.0762H0.703157C0.314827 13.0762 0 13.3911 0 13.7794C0 14.1677 0.314827 14.4826 0.703157 14.4826Z"
                fill="#50A398"
              />
              <path
                d="M0.703157 17.4827H7.8243C8.21263 17.4827 8.52746 17.1679 8.52746 16.7795C8.52746 16.3912 8.21263 16.0764 7.8243 16.0764H0.703157C0.314827 16.0764 0 16.3912 0 16.7795C0 17.1679 0.314827 17.4827 0.703157 17.4827Z"
                fill="#50A398"
              />
              <path
                d="M16.0699 19.0765H0.703157C0.314827 19.0765 0 19.3913 0 19.7797C0 20.168 0.314827 20.4828 0.703157 20.4828H16.0699C16.4582 20.4828 16.7731 20.168 16.7731 19.7797C16.7731 19.3913 16.4582 19.0765 16.0699 19.0765Z"
                fill="#50A398"
              />
            </g>
            <defs>
              <clipPath id="clip0_49_4">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <p
            onClick={() => navigate("/places")}
            className="main_page_third_section_content_lower_table_p"
          >
            Расширенный поиск Мест для съемки
          </p>
        </div>
      </div>
    </section>
  );
};

export default BestPlacesBlock;
