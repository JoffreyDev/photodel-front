import React from "react";
import SurveyComponent from "./SurveyComponent";

const SurveyBlock = () => {
  return (
    <section className="main_page_survey_section_wrapper">
      <div className="main_page_survey_section_content">
        <div className="main_page_survey_section_content_upper_row">
          <div className="main_page_survey_section_content_upper_row_left">
            <h2 className="main_page_survey_section_content_upper_row_left_h2">
              Опрос
            </h2>
          </div>
        </div>
        <SurveyComponent />
      </div>
    </section>
  );
};

export default SurveyBlock;
