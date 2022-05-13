import React from "react";
import SurveyComponent from "./SurveyComponent";
import Image from "../../img/commonImages/adv.png";

const SurveyBlock = () => {
  return (
    <section className="main_page_survey_section_wrapper">
      <div className="main_page_survey_section_content">
        <div className="main_page_survey_section_adv">
          <img src={Image} className="main_page_survey_section_adv_image" />
          <div className="main_page_survey_section_adv_info">
            <h1 className="main_page_survey_section_adv_title">
              Фотоаппараты Nikon по лучшим ценам!
            </h1>
            <p className="main_page_survey_section_adv_link">www.nikon.ru</p>
          </div>
        </div>
        <div className="main_page_survey_section_content_upper_row">
          <div className="main_page_survey_section_content_upper_row_left">
            <h2 className="main_page_survey_section_content_upper_row_left_h2">
              Опрос
            </h2>
          </div>
          <SurveyComponent />
        </div>
      </div>
    </section>
  );
};

export default SurveyBlock;
