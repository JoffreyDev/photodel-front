import React from "react";
import Requests from "../../http/axios-requests";
import { useDispatch } from "react-redux";
import { openSuccessAlert, openErrorAlert } from "../../redux/actions/userData";

const SurveyComponent = () => {
  const [poll, setPoll] = React.useState(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    Requests.getPollsList().then((res) => setPoll(res.data));
  }, []);

  const addVote = (choice) => {
    Requests.addPollVote(choice)
      .then(() => {
        dispatch(openSuccessAlert("Ваш голос учтен!"));
        Requests.getPollsList().then((res) => setPoll(res.data));
      })
      .catch((err) => dispatch(openErrorAlert(err.response.data.message)));
  };

  return (
    <div className="main_page_survey_section_content_survey_wrapper">
      <div className="main_page_survey_section_content_survey_table">
        <h2 className="main_page_survey_section_content_survey_table_title">
          {poll[0]?.title}
        </h2>
        <ul className="main_page_survey_section_content_survey_table_ul">
          <li className="main_page_survey_section_content_survey_table_li">
            <input
              type="radio"
              id="survey_1"
              name="survey_choice"
              className="main_page_survey_section_content_survey_table_radio"
              onChange={() => addVote(poll[0]?.choices?.[0].choice__id)}
            />
            <label
              htmlFor="survey_1"
              className="main_page_survey_section_content_survey_table_label"
            >
              {`${poll[0]?.choices?.[0].choice__title}`}

              <span
                style={{ opacity: "0.4", fontSize: "12px", marginLeft: "10px" }}
              >
                {" "}
                {poll[0]?.choices?.[0].total}
              </span>
            </label>
          </li>

          <li className="main_page_survey_section_content_survey_table_li">
            <input
              type="radio"
              id="survey_2"
              name="survey_choice"
              className="main_page_survey_section_content_survey_table_radio"
              onChange={() => addVote(poll[0]?.choices?.[1].choice__id)}
            />
            <label
              htmlFor="survey_2"
              className="main_page_survey_section_content_survey_table_label"
            >
              {" "}
              {poll[0]?.choices?.[1].choice__title}
              <span
                style={{ opacity: "0.4", fontSize: "12px", marginLeft: "10px" }}
              >
                {" "}
                {poll[0]?.choices?.[1].total}
              </span>
            </label>
          </li>

          {poll[0]?.choices?.[2] && (
            <li className="main_page_survey_section_content_survey_table_li">
              <input
                type="radio"
                id="survey_3"
                name="survey_choice"
                className="main_page_survey_section_content_survey_table_radio"
                onChange={() => addVote(poll[0]?.choices?.[2].choice__id)}
              />
              <label
                htmlFor="survey_3"
                className="main_page_survey_section_content_survey_table_label"
              >
                {poll[0]?.choices?.[2].choice__title}

                <span
                  style={{
                    opacity: "0.4",
                    fontSize: "12px",
                    marginLeft: "10px",
                  }}
                >
                  {" "}
                  {poll[0]?.choices?.[2].total}
                </span>
              </label>
            </li>
          )}

          {poll[0]?.choices?.[2] && (
            <li className="main_page_survey_section_content_survey_table_li">
              <input
                type="radio"
                id="survey_4"
                name="survey_choice"
                className="main_page_survey_section_content_survey_table_radio"
                onChange={() => addVote(poll[0]?.choices?.[3].choice__id)}
              />
              <label
                htmlFor="survey_4"
                className="main_page_survey_section_content_survey_table_label"
              >
                {poll[0]?.choices?.[3].choice__title}

                <span
                  style={{
                    opacity: "0.4",
                    fontSize: "12px",
                    marginLeft: "10px",
                  }}
                >
                  {" "}
                  {poll[0]?.choices?.[3].total}
                </span>
              </label>
            </li>
          )}
        </ul>
        <p className="main_page_survey_section_content_survey_lower_p">
          Голосов: {poll[0]?.count_answer}
        </p>
      </div>
    </div>
  );
};

export default SurveyComponent;
