import React, { useEffect } from "react";
import SortImage from "../../img/sessions/sort.svg";
import SortImageInvert from "../../img/commonImages/sort-.svg";
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
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ScreenLoader } from "../../components";
import AddImage from "../../img/sessions/add.svg";
import TeamCard from "../../components/Previews/TeamCard";
import GreyButton from "../../components/common/GreyButton";
import GreenButton from "../../components/common/GreenButton";
import Back from "../../img/addModules/arrow-back.svg";
import ReviewCard from "../../components/Previews/ReviewCard";
import { setNotifications } from "../../redux/actions/userData";

function Reviews() {
  const navigate = useNavigate();
  const { userData } = useSelector(({ userData }) => userData);
  const [component, setComponent] = React.useState("profiles");
  const [sortType, setSortType] = React.useState("+");
  const [sortField, setSortField] = React.useState(1);
  const [reviews, setReviews] = React.useState([]);
  const [myReviews, setMyReviews] = React.useState([]);

  const [activeComponent, setActiveComponent] = React.useState("me");

  const [addReviewModalActive, setAddReviewModalActive] = React.useState(false);
  const [sentReviewModalActive, setSentReviewModalActive] =
    React.useState(false);

  const [dataLoading, setDataLoading] = React.useState(true);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!localStorage.getItem("access")) navigate("/");
  }, []);

  React.useEffect(() => {
    setDataLoading(true);
    Requests.getReviewsList(userData.id, sortType, sortField).then((res) => {
      setReviews(res.data);
      setDataLoading(false);
    });

    Requests.getMyReviewsList(sortType, sortField).then((res) => {
      setMyReviews(res.data);
      setDataLoading(false);
    });
  }, [userData, sortType, sortField]);

  useEffect(() => {
    Requests.readReviewsNotifications().then(() => {
      Requests.getNotifications().then((res) =>
        dispatch(setNotifications(res.data))
      );
    });
  }, []);

  return (
    <div className="reviews">
      <div className="reviews_header">
        <div className="photos_header_wrapper" style={{ width: "49%" }}>
          <h1
            onClick={() => setActiveComponent("my")}
            className={
              activeComponent === "my"
                ? "photos_header_title_first active"
                : "photos_header_title_first"
            }
          >
            МОИ ОТЗЫВЫ
          </h1>
          <h1
            onClick={() => setActiveComponent("me")}
            className={
              activeComponent === "me"
                ? "photos_header_title_first active"
                : "photos_header_title_first"
            }
          >
            ОТЗЫВЫ ОБО МНЕ
          </h1>
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
            className="reviews_header_select_image"
            style={{ cursor: "pointer" }}
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
                value: "По оценке",
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
            Всего:{" "}
            <span className="reviews_options_left_p_span">
              {reviews ? reviews.length : "-"}
            </span>
          </p>
          {false && <Checkbox marginBottom={"0px"} label={"Только с фото"} />}
        </div>
      </div>
      <div className="reviews_body">
        <div className="reviews_cards">
          {activeComponent === "me" &&
            reviews &&
            reviews.map((review, idx) => {
              return <ReviewCard review={review} key={idx} />;
            })}

          {activeComponent === "my" &&
            myReviews &&
            myReviews.map((review, idx) => {
              return (
                <>
                  <div
                    onClick={() =>
                      navigate(
                        `/public/profile/${review?.receiver_profile?.id}`
                      )
                    }
                  >
                    <ReviewCard review={review} key={idx} />
                  </div>
                </>
              );
            })}
        </div>
        {reviews &&
          reviews.length === 0 &&
          activeComponent === "me" &&
          !dataLoading && (
            <div className="photos_cards_empty">
              <h1 className="photos_cards_empty_title">Нет отзывов.</h1>
            </div>
          )}
        {myReviews &&
          myReviews.length === 0 &&
          activeComponent === "my" &&
          !dataLoading && (
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
