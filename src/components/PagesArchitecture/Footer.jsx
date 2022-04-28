import React from "react";

const Footer = () => {
  return (
    <section className="main_page_footer_section_wrapper">
      <div className="main_page_footer_section_content">
        <ul className="main_page_footer_section_content_ul">
          <li className="main_page_footer_section_content_li first">Сервис</li>
          <li className="main_page_footer_section_content_li">О сервисе</li>
          <li className="main_page_footer_section_content_li">
            Правила использования
          </li>
          <li className="main_page_footer_section_content_li">
            Политика конфиденциальности
          </li>
          <li className="main_page_footer_section_content_li">
            Вопросы и ответы
          </li>
          <li className="main_page_footer_section_content_li">
            Рекламодателям
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
            © photodel.ru, 2020-2021
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
            <svg
              className="main_page_footer_section_content_contacts_social_img"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.9999 0.440002C5.16774 0.440002 0.439941 5.1678 0.439941 11C0.439941 16.8322 5.16774 21.56 10.9999 21.56C16.8321 21.56 21.5599 16.8322 21.5599 11C21.5599 5.1678 16.8321 0.440002 10.9999 0.440002ZM15.0611 12.3541C15.0611 12.3541 15.995 13.2759 16.2249 13.7038C16.2315 13.7126 16.2348 13.7214 16.237 13.7258C16.3305 13.8831 16.3525 14.0052 16.3063 14.0965C16.2293 14.2483 15.9653 14.3231 15.8751 14.3297H14.2251C14.1107 14.3297 13.8709 14.3 13.5805 14.0998C13.3572 13.9436 13.1372 13.6873 12.9227 13.4376C12.6026 13.0658 12.3254 12.7446 12.046 12.7446C12.0106 12.7445 11.9753 12.7501 11.9415 12.7611C11.7303 12.8293 11.4597 13.1307 11.4597 13.9337C11.4597 14.1845 11.2617 14.3286 11.122 14.3286H10.3663C10.1089 14.3286 8.76804 14.2384 7.58004 12.9855C6.12584 11.451 4.81684 8.3732 4.80584 8.3446C4.72334 8.1455 4.89384 8.0388 5.07974 8.0388H6.74624C6.96844 8.0388 7.04104 8.1741 7.09164 8.294C7.15104 8.4337 7.36884 8.9892 7.72634 9.614C8.30604 10.6326 8.66134 11.0462 8.94624 11.0462C8.99966 11.0456 9.05213 11.032 9.09914 11.0066C9.47094 10.7998 9.40164 9.4743 9.38514 9.1993C9.38514 9.1476 9.38404 8.6064 9.19374 8.3468C9.05734 8.1587 8.82524 8.0872 8.68444 8.0608C8.74143 7.98216 8.81651 7.9184 8.90334 7.8749C9.15854 7.7473 9.61834 7.7286 10.0748 7.7286H10.3289C10.8239 7.7352 10.9515 7.7671 11.1308 7.8122C11.4938 7.8991 11.5015 8.1334 11.4696 8.9353C11.4597 9.163 11.4498 9.4204 11.4498 9.724C11.4498 9.79 11.4465 9.8604 11.4465 9.9352C11.4355 10.3433 11.4223 10.8064 11.7105 10.9967C11.7481 11.0203 11.7916 11.0328 11.8359 11.033C11.936 11.033 12.2374 11.033 13.0536 9.6327C13.3054 9.18199 13.5241 8.71363 13.7081 8.2313C13.7246 8.2027 13.773 8.1147 13.8302 8.0806C13.8725 8.05908 13.9193 8.04813 13.9666 8.0487H15.9257C16.1391 8.0487 16.2854 8.0806 16.3129 8.1631C16.3613 8.294 16.3041 8.6933 15.4098 9.9044L15.0105 10.4313C14.1998 11.4939 14.1998 11.5478 15.0611 12.3541Z"
                fill="#ADFAF2"
              />
            </svg>
            <svg
              className="main_page_footer_section_content_contacts_social_img"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.0008 1.83514C5.939 1.83514 1.83508 5.93906 1.83508 11.0009C1.83508 15.5751 5.18642 19.3664 9.569 20.0566V13.651H7.24067V11.0009H9.569V8.98148C9.569 6.68248 10.9376 5.41473 13.0303 5.41473C14.0332 5.41473 15.0837 5.59348 15.0837 5.59348V7.84756H13.925C12.7883 7.84756 12.4327 8.55523 12.4327 9.28031V10.9991H14.9727L14.5667 13.6491H12.4327V20.0548C16.8153 19.3682 20.1666 15.576 20.1666 11.0009C20.1666 5.93906 16.0627 1.83514 11.0008 1.83514Z"
                fill="#ADFAF2"
              />
            </svg>
            <svg
              className="main_page_footer_section_content_contacts_social_img"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.2999 11C14.2999 11.8752 13.9523 12.7146 13.3334 13.3335C12.7145 13.9523 11.8752 14.3 10.9999 14.3C10.1247 14.3 9.28536 13.9523 8.66649 13.3335C8.04762 12.7146 7.69994 11.8752 7.69994 11C7.69994 10.8119 7.71974 10.6282 7.75384 10.45H6.59994V14.8467C6.59994 15.1525 6.84744 15.4 7.15324 15.4H14.8477C14.9943 15.3997 15.1347 15.3413 15.2383 15.2376C15.3418 15.1338 15.3999 14.9933 15.3999 14.8467V10.45H14.246C14.2801 10.6282 14.2999 10.8119 14.2999 11ZM10.9999 13.2C11.2889 13.1999 11.5751 13.1429 11.842 13.0323C12.109 12.9216 12.3515 12.7595 12.5558 12.5551C12.7601 12.3507 12.9221 12.1081 13.0326 11.8411C13.1432 11.574 13.2 11.2879 13.1999 10.9989C13.1999 10.7099 13.1429 10.4238 13.0322 10.1568C12.9216 9.88988 12.7594 9.64733 12.555 9.44304C12.3506 9.23875 12.108 9.07672 11.841 8.9662C11.574 8.85568 11.2878 8.79883 10.9988 8.7989C10.4152 8.79905 9.85556 9.03103 9.44298 9.44382C9.0304 9.8566 8.7987 10.4164 8.79884 11C8.79899 11.5836 9.03097 12.1433 9.44376 12.5559C9.85654 12.9684 10.4163 13.2001 10.9999 13.2ZM13.6399 8.69H14.9588C15.0465 8.69 15.1305 8.65527 15.1926 8.59341C15.2546 8.53156 15.2897 8.44763 15.2899 8.36V7.0411C15.2899 6.95329 15.2551 6.86907 15.193 6.80698C15.1309 6.74489 15.0467 6.71 14.9588 6.71H13.6399C13.5521 6.71 13.4679 6.74489 13.4058 6.80698C13.3437 6.86907 13.3088 6.95329 13.3088 7.0411V8.36C13.3099 8.5415 13.4584 8.69 13.6399 8.69ZM10.9999 0.440002C8.19926 0.440002 5.51328 1.55257 3.53289 3.53295C1.55251 5.51334 0.439941 8.19932 0.439941 11C0.439941 13.8007 1.55251 16.4867 3.53289 18.4671C5.51328 20.4474 8.19926 21.56 10.9999 21.56C12.3867 21.56 13.7599 21.2869 15.0411 20.7562C16.3223 20.2255 17.4864 19.4476 18.467 18.4671C19.4476 17.4865 20.2254 16.3223 20.7561 15.0411C21.2868 13.7599 21.5599 12.3868 21.5599 11C21.5599 9.61324 21.2868 8.24006 20.7561 6.95887C20.2254 5.67767 19.4476 4.51354 18.467 3.53295C17.4864 2.55237 16.3223 1.77452 15.0411 1.24383C13.7599 0.713145 12.3867 0.440002 10.9999 0.440002ZM16.4999 15.2779C16.4999 15.95 15.9499 16.5 15.2778 16.5H6.72204C6.04994 16.5 5.49994 15.95 5.49994 15.2779V6.7221C5.49994 6.05 6.04994 5.5 6.72204 5.5H15.2778C15.9499 5.5 16.4999 6.05 16.4999 6.7221V15.2779Z"
                fill="#ADFAF2"
              />
            </svg>
            <svg
              className="main_page_footer_section_content_contacts_social_img"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.9999 0.440002C5.16774 0.440002 0.439941 5.1678 0.439941 11C0.439941 16.8322 5.16774 21.56 10.9999 21.56C16.8321 21.56 21.5599 16.8322 21.5599 11C21.5599 5.1678 16.8321 0.440002 10.9999 0.440002ZM15.2954 9.0904C15.2998 9.1806 15.3009 9.2708 15.3009 9.3588C15.3009 12.1088 13.2098 15.2779 9.38404 15.2779C8.25357 15.2798 7.1466 14.9551 6.19624 14.3429C6.35794 14.3627 6.52404 14.3704 6.69234 14.3704C7.66694 14.3704 8.56344 14.0393 9.27514 13.4805C8.84143 13.472 8.42118 13.3284 8.07296 13.0697C7.72475 12.811 7.46592 12.4501 7.33254 12.0373C7.64401 12.0965 7.96488 12.0841 8.27084 12.001C7.8001 11.9058 7.37676 11.6507 7.07262 11.279C6.76848 10.9073 6.60226 10.4419 6.60214 9.9616V9.9363C6.88264 10.0914 7.20384 10.186 7.54484 10.197C7.10352 9.90322 6.79111 9.45194 6.67149 8.93545C6.55188 8.41896 6.6341 7.87628 6.90134 7.4184C7.42379 8.0608 8.07533 8.58632 8.81377 8.96094C9.55221 9.33556 10.3611 9.55093 11.188 9.5931C11.0829 9.14684 11.1282 8.67835 11.3168 8.26046C11.5053 7.84257 11.8267 7.49869 12.2309 7.28229C12.6351 7.06589 13.0995 6.9891 13.5518 7.06384C14.0042 7.13859 14.4191 7.36068 14.7322 7.6956C15.1977 7.60351 15.6441 7.43276 16.0522 7.1907C15.8971 7.67265 15.5723 8.0819 15.1381 8.3424C15.5505 8.29274 15.9531 8.18189 16.3327 8.0135C16.0539 8.43139 15.7026 8.79608 15.2954 9.0904Z"
                fill="#ADFAF2"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
