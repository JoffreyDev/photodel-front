import React from "react";
import Requests from "../../http/axios-requests";
import { useDispatch, useSelector } from "react-redux";
import { openSuccessAlert, openErrorAlert } from "../../redux/actions/userData";
import GreenButton from "../common/GreenButton";

const SurveyComponent = () => {
  const [poll, setPoll] = React.useState(false);
  const dispatch = useDispatch();

  const { userData } = useSelector(({ userData }) => userData);
  const [choice, setChoice] = React.useState();

  React.useEffect(() => {
    Requests.getPollsList().then((res) => setPoll(res.data));
  }, []);

  const addVote = () => {
    if (!userData?.id) {
      dispatch(openErrorAlert("Доступно только авторизованным пользователям"));
      return;
    }
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
        {poll && (
          <ul className="main_page_survey_section_content_survey_table_ul">
            <li className="main_page_survey_section_content_survey_table_li">
              <input
                type="radio"
                id="survey_1"
                name="survey_choice"
                className="main_page_survey_section_content_survey_table_radio"
                onChange={() => setChoice(poll[0]?.choices?.[0].id)}
              />
              <label
                htmlFor="survey_1"
                className="main_page_survey_section_content_survey_table_label"
              >
                {`${poll[0]?.choices?.[0].title}`}

                <span
                  style={{
                    opacity: "0.4",
                    fontSize: "12px",
                    marginLeft: "10px",
                  }}
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
                onChange={() => setChoice(poll[0]?.choices?.[1].id)}
              />
              <label
                htmlFor="survey_2"
                className="main_page_survey_section_content_survey_table_label"
              >
                {" "}
                {poll[0]?.choices?.[1].title}
                <span
                  style={{
                    opacity: "0.4",
                    fontSize: "12px",
                    marginLeft: "10px",
                  }}
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
                  onChange={() => setChoice(poll[0]?.choices?.[2].id)}
                />
                <label
                  htmlFor="survey_3"
                  className="main_page_survey_section_content_survey_table_label"
                >
                  {poll[0]?.choices?.[2].title}

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

            {poll[0]?.choices?.[3] && (
              <li className="main_page_survey_section_content_survey_table_li">
                <input
                  type="radio"
                  id="survey_4"
                  name="survey_choice"
                  className="main_page_survey_section_content_survey_table_radio"
                  onChange={() => setChoice(poll[0]?.choices?.[3].id)}
                />
                <label
                  htmlFor="survey_4"
                  className="main_page_survey_section_content_survey_table_label"
                >
                  {poll[0]?.choices?.[3].title}

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
        )}
        <p className="main_page_survey_section_content_survey_lower_p">
          Голосов: {poll[0]?.count_answer}
        </p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <GreenButton
            text={"Голосовать"}
            width={"200px"}
            height={"30px"}
            callback={addVote}
          />
        </div>
      </div>
    </div>
  );
};

export default SurveyComponent;
