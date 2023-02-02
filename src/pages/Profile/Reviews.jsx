import React from "react";
import SortImage from "../../img/sessions/sort.svg";
import {
  Checkbox,
  PhotoCard,
  PlaceCard,
  SessionCard,
  TextInput,
  SelectInput,
  AddReview,
  ReviewSent,
  Prof,
} from "../../components";
import "../../styles/Profile/Reviews.scss";
import Requests from "../../http/axios-requests";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ScreenLoader } from "../../components";
import AddImage from "../../img/sessions/add.svg";
import TeamCard from "../../components/Previews/TeamCard";
import GreyButton from "../../components/common/GreyButton";
import GreenButton from "../../components/common/GreenButton";
import Back from "../../img/addModules/arrow-back.svg";
import ReviewCard from "../../components/Previews/ReviewCard";

function Reviews() {
  const navigate = useNavigate();
  const { userData } = useSelector(({ userData }) => userData);
  const [component, setComponent] = React.useState("profiles");
  const [sortType, setSortType] = React.useState(1);
  const [reviews, setReviews] = React.useState();

  const [addReviewModalActive, setAddReviewModalActive] = React.useState(false);
  const [sentReviewModalActive, setSentReviewModalActive] =
    React.useState(false);

  const [dataLoading, setDataLoading] = React.useState(true);

  React.useEffect(() => {
    if (!localStorage.getItem("access")) navigate("/");
  }, []);

  React.useEffect(() => {
    setDataLoading(true);
    Requests.getReviewsList(userData.id).then((res) => {
      setReviews(res.data);
      setDataLoading(false);
    });
  }, [userData]);

  return (
    <div className="reviews">
      <div className="reviews_header">
        <div className="reviews_header_wrapper">
          <h1 className="reviews_header_title_first">ОТЗЫВЫ</h1>
        </div>
        <div className="reviews_header_select">
          <img
            src={SortImage}
            alt="sort"
            className="reviews_header_select_image"
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
            value={sortType}
          />
        </div>
      </div>
      <div className="reviews_options">
        <div className="reviews_options_left favorites">
          <p className="reviews_options_left_p">
            Всего:{" "}
            <span className="reviews_options_left_p_span">
              {reviews ? reviews.length : "-"}
            </span>
          </p>
          <Checkbox marginBottom={"0px"} label={"Только с фото"} />
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
        user={userData}
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
