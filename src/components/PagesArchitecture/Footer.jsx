import React from "react";
import { useNavigate } from "react-router-dom";
import VK from "../../img/mainPage/vk.svg";
import Tg from "../../img/mainPage/telegram.svg";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <section className="main_page_footer_section_wrapper">
      <div className="main_page_footer_section_content">
        <ul className="main_page_footer_section_content_ul">
          <li className="main_page_footer_section_content_li first">Сервис</li>
          <li className="main_page_footer_section_content_li">О сервисе</li>
          <li
            onClick={() => navigate("/rules")}
            className="main_page_footer_section_content_li"
          >
            Правила использования
          </li>
          <li className="main_page_footer_section_content_li">
            Политика конфиденциальности
          </li>
          <li className="main_page_footer_section_content_li">
            Вопросы и ответы
          </li>
          <li
            onClick={() => navigate("/agreement")}
            className="main_page_footer_section_content_li"
          >
            Пользовательское соглашение
          </li>
        </ul>
        <ul className="main_page_footer_section_content_ul">
          <li className="main_page_footer_section_content_li first">
            Клиентам
          </li>
          <li className="main_page_footer_section_content_li">
            Как это работает?
          </li>
          <li className="main_page_footer_section_content_li">Все услуги</li>
          <li className="main_page_footer_section_content_li">Безопасность</li>
        </ul>
        <ul className="main_page_footer_section_content_ul">
          <li className="main_page_footer_section_content_li first">Профи</li>
          <li className="main_page_footer_section_content_li">
            Как это работает?
          </li>
          <li className="main_page_footer_section_content_li">
            Защита личных данных
          </li>
          <li className="main_page_footer_section_content_li">Регистрация</li>
          <li className="main_page_footer_section_content_li">
            Авторские права
          </li>
        </ul>
        <div className="main_page_footer_section_content_contacts">
          <p className="main_page_footer_section_content_contacts_p">
            © photodel.ru, 2020-2022
          </p>
          <div className="main_page_footer_section_content_contacts_back_wrapper">
            <svg
              className="main_page_footer_section_content_contacts_back_icon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 9.057V16.5C3 17.2956 3.31607 18.0587 3.87868 18.6213C4.44129 19.1839 5.20435 19.5 6 19.5H18C18.7956 19.5 19.5587 19.1839 20.1213 18.6213C20.6839 18.0587 21 17.2956 21 16.5V7.5C21 6.70435 20.6839 5.94129 20.1213 5.37868C19.5587 4.81607 18.7956 4.5 18 4.5H6C5.20435 4.5 4.44129 4.81607 3.87868 5.37868C3.31607 5.94129 3 6.70435 3 7.5V9.057ZM6 6H18C18.3978 6 18.7794 6.15804 19.0607 6.43934C19.342 6.72064 19.5 7.10218 19.5 7.5V8.61L12 12.648L4.5 8.61V7.5C4.5 7.10218 4.65804 6.72064 4.93934 6.43934C5.22064 6.15804 5.60218 6 6 6ZM4.5 10.314L11.6445 14.16C11.7538 14.2188 11.8759 14.2496 12 14.2496C12.1241 14.2496 12.2462 14.2188 12.3555 14.16L19.5 10.314V16.5C19.5 16.8978 19.342 17.2794 19.0607 17.5607C18.7794 17.842 18.3978 18 18 18H6C5.60218 18 5.22064 17.842 4.93934 17.5607C4.65804 17.2794 4.5 16.8978 4.5 16.5V10.314Z"
                fill="#ADFAF2"
              />
            </svg>
            <p className="main_page_footer_section_content_contacts_back_p">
              Обратная связь
            </p>
          </div>
          <div className="main_page_footer_section_content_contacts_social_wrapper">
            <img
              src={VK}
              alt="vk"
              className="main_page_footer_section_content_contacts_social_img"
            />
            <img
              src={Tg}
              alt="vk"
              className="main_page_footer_section_content_contacts_social_img"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
