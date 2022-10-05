import React from "react";
import LastCommentComponent from "./LastCommentComponent";
import Carousel from "react-elastic-carousel";
import Requests from "../../http/axios-requests";

const LastCommentsBlock = () => {
  const [lastPlaceComment, setLastPlaceComment] = React.useState();
  const [lastPhotoComment, setLastPhotoComment] = React.useState();
  const [lastSessionComment, setLastSessionComment] = React.useState();

  React.useEffect(() => {
    Requests.getLastComments().then((res) => {
      setLastPhotoComment(res.data.photo_comment);
      setLastPlaceComment(res.data.place_comment);
      setLastSessionComment(res.data.photo_session_comment);
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
          <LastCommentComponent subj={"photo"} comment={lastPhotoComment} />
          <LastCommentComponent subj={"place"} comment={lastPlaceComment} />
          <LastCommentComponent subj={"session"} comment={lastSessionComment} />
        </div>
      </div>
    </section>
  );
};

export default LastCommentsBlock;
