import React from "react";
import LastCommentComponent from "./LastCommentComponent";
import Carousel from "react-elastic-carousel";
import Requests from "../../http/axios-requests";

const LastCommentsBlock = () => {
  const [lastComments, setLastComments] = React.useState();

  React.useEffect(() => {
    Requests.getLastComments().then((res) =>
      setLastComments([res.data.photo_comment])
    );
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
          <Carousel
            itemsToShow={window.screen.width <= 576 ? 3 : 1.2}
            pagination={false}
            showArrows={false}
          >
            {lastComments &&
              lastComments.map((comment, idx) => (
                <LastCommentComponent comment={comment} key={idx} />
              ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default LastCommentsBlock;
