import React from "react";

const SurveyComponent = () => {
  return (
    <div className="main_page_survey_section_content_survey_wrapper">
      <div className="main_page_survey_section_content_survey_table">
        <h2 className="main_page_survey_section_content_survey_table_title">
          Где в Москве лучшее место для съемок?
        </h2>
        <ul className="main_page_survey_section_content_survey_table_ul">
          <li className="main_page_survey_section_content_survey_table_li">
            <input
              type="radio"
              id="survey_1"
              name="survey_choice"
              className="main_page_survey_section_content_survey_table_radio"
            />
            <label
              htmlFor="survey_1"
              className="main_page_survey_section_content_survey_table_label"
            >
              ВДНХ
            </label>
          </li>

          <li className="main_page_survey_section_content_survey_table_li">
            <input
              type="radio"
              id="survey_2"
              name="survey_choice"
              className="main_page_survey_section_content_survey_table_radio"
            />
            <label
              htmlFor="survey_2"
              className="main_page_survey_section_content_survey_table_label"
            >
              Воробьевы горы
            </label>
          </li>

          <li className="main_page_survey_section_content_survey_table_li">
            <input
              type="radio"
              id="survey_3"
              name="survey_choice"
              className="main_page_survey_section_content_survey_table_radio"
            />
            <label
              htmlFor="survey_3"
              className="main_page_survey_section_content_survey_table_label"
            >
              Красная Площадь
            </label>
          </li>

          <li className="main_page_survey_section_content_survey_table_li">
            <input
              type="radio"
              id="survey_4"
              name="survey_choice"
              className="main_page_survey_section_content_survey_table_radio"
            />
            <label
              htmlFor="survey_4"
              className="main_page_survey_section_content_survey_table_label"
            >
              Тверская улица
            </label>
          </li>
        </ul>
        <p className="main_page_survey_section_content_survey_lower_p">
          Голосов: 11 546
        </p>
      </div>
    </div>
  );
};

export default SurveyComponent;
