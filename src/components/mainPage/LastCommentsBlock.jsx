import React from "react";
import LastCommentComponent from "./LastCommentComponent";
import Carousel from "react-elastic-carousel";
import Requests from "../../http/axios-requests";

const LastCommentsBlock = () => {
  const [lastComments, setLastComments] = React.useState([]);

  React.useEffect(() => {
    Requests.getLastComments().then((res) => {
      setLastComments(res.data);
    });
  }, []);

  return (
    <section className="main_page_last_comments_section_wrapper">
      <div className="main_page_last_comments_section_content">
        <div className="main_page_last_comments_section_content_upper_row">
          <div className="main_page_last_comments_section_content_upper_row_left">
            <h2 className="main_page_last_comments_section_content_upper_row_left_h2">
              Последние комментарии
            </h2>
          </div>
        </div>
        <div className="main_page_last_comments_section_content_comments_wrapper">
          {lastComments.map((el) => (
            <LastCommentComponent
              subj={
                el.gallery__id
                  ? "photo"
                  : el.photo_session__id
                  ? "session"
                  : el.place__id
                  ? "place"
                  : el.training__id
                  ? "training"
                  : ""
              }
              comment={el}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LastCommentsBlock;
