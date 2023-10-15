import React from "react";
import SortImage from "../../img/sessions/sort.svg";
import { Checkbox, SelectInput, AddReview, ReviewSent } from "../../components";
import "../../styles/Profile/Reviews.scss";
import Requests from "../../http/axios-requests";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ScreenLoader } from "../../components";
import GreenButton from "../../components/common/GreenButton";
import ReviewCard from "../../components/Previews/ReviewCard";
import { PublicHeader } from "..";
import SortImageInvert from "../../img/commonImages/sort-.svg";

function Reviews() {
  const navigate = useNavigate();
  const { userData } = useSelector(({ userData }) => userData);
  const [sortType, setSortType] = React.useState("-");
  const [reviews, setReviews] = React.useState();

  const [sortField, setSortField] = React.useState(1);

  const [addReviewModalActive, setAddReviewModalActive] = React.useState(false);
  const [sentReviewModalActive, setSentReviewModalActive] =
    React.useState(false);

  const [dataLoading, setDataLoading] = React.useState(true);

  const [profileData, setPorfileData] = React.useState();

  const params = useParams();
  const profileId = params.id;

  React.useEffect(() => {
    setDataLoading(true);
    Requests.getReviewsList(profileId).then((res) => {
      setReviews(res.data);
      setDataLoading(false);
    });

    Requests.getPublicProfile(profileId).then((res) =>
      setPorfileData(res.data)
    );
  }, [profileId]);

  return (
    <div className="reviews">
      <PublicHeader profile={profileData} />
      <div className="reviews_header">
        <div className="reviews_header_wrapper">
          <h1 className="reviews_header_title_first">ОТЗЫВЫ</h1>
        </div>
        <div className="reviews_header_select">
          <img
            src={
              sortType === "+"
                ? SortImage
                : sortType === "-"
                ? SortImageInvert
                : ""
            }
            alt="sort"
            className="places_header_select_image"
            onClick={() =>
              setSortType(sortType === "+" ? "-" : sortType === "-" ? "+" : "")
            }
          />
          <SelectInput
            values={[
              {
                id: 1,
                value: "По дате добавления",
              },
              {
                id: 2,
                value: "По популярности",
              },
            ]}
            width={190}
            nonBorder={true}
            fontSize={"13px"}
            marginBottom={"0px"}
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
          />
        </div>
      </div>
      <div className="reviews_options">
        <div className="reviews_options_left favorites">
          <p className="reviews_options_left_p">
            Всего:
            <span className="reviews_options_left_p_span">
              {"  "}
              {reviews ? reviews.length : "-"}
            </span>
          </p>
          <Checkbox marginBottom={"0px"} label={"Только с фото"} />
        </div>{" "}
        <div className="reviews_options_right">
          {userData?.id != profileId && (
            <GreenButton
              width={"180px"}
              height={"38px"}
              text={"Оставить отзыв"}
              callback={() => setAddReviewModalActive(true)}
            />
          )}
        </div>
      </div>
      <div className="reviews_body">
        <div className="reviews_cards">
          {reviews &&
            reviews.map((review, idx) => {
              return <ReviewCard review={review} key={idx} />;
            })}
        </div>
        {reviews && reviews.length === 0 && !dataLoading && (
          <div className="photos_cards_empty">
            <h1 className="photos_cards_empty_title">Нет отзывов.</h1>
          </div>
        )}
        {dataLoading && <ScreenLoader height={"30%"} />}
      </div>
      <AddReview
        active={addReviewModalActive}
        width={window.screen.width <= 576 ? "90vw" : "40vw"}
        notAlign={window.screen.width <= 576}
        user={profileData}
        setActive={setAddReviewModalActive}
        setReviewSentModalActive={setSentReviewModalActive}
      />

      <ReviewSent
        reviewSentModalActive={sentReviewModalActive}
        setReviewSentModalActive={setSentReviewModalActive}
      />
    </div>
  );
}

export default Reviews;
