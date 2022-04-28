import React from "react";
import LastCommentComponent from "./LastCommentComponent";

const LastCommentsBlock = () => {
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
          <LastCommentComponent />
          <LastCommentComponent />
          <LastCommentComponent />
        </div>
      </div>
    </section>
  );
};

export default LastCommentsBlock;
