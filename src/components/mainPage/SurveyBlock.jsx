import React from "react";
import SurveyComponent from "./SurveyComponent";
import Image from "../../img/commonImages/adv.png";
import Requests, { rootAddress } from "../../http/axios-requests";
import { useDispatch } from "react-redux";
import { openErrorAlert, openSuccessAlert } from "../../redux/actions/userData";

const SurveyBlock = () => {
  const dispatch = useDispatch();

  const [advert, setAdvert] = React.useState(false);

  React.useEffect(() => {
    Requests.getAdverts().then((res) => setAdvert(res.data));
  }, []);

  return (
    <section className="main_page_survey_section_wrapper">
      <div className="main_page_survey_section_content">
        {!advert && (
          <div className="main_page_survey_section_adv_link dis">
            <h1 className="main_page_survey_section_adv_title">
              Нет рекламы, либо у вас включен AdBlock :(
            </h1>
          </div>
        )}
        {advert && (
          <div className="main_page_survey_section_adv">
            <a
              onClick={() => Requests.clickAdvert(advert && advert.id)}
              href={advert && advert.ad_link}
              target="_blank"
              rel="noreferrer"
              className="main_page_survey_section_adv_link"
            >
              <img
                src={`${rootAddress}${advert.ad_image}`}
                className="main_page_survey_section_adv_image"
              />
              <div className="main_page_survey_section_adv_info">
                <h1 className="main_page_survey_section_adv_title">
                  {advert && advert.ad_title}
                </h1>
                <a
                  href={advert[0]?.ad_link}
                  target="_blank"
                  rel="noreferrer"
                  className="main_page_survey_section_adv_link"
                >
                  {" "}
                  {advert[0]?.ad_link}
                </a>
              </div>
            </a>
          </div>
        )}
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
