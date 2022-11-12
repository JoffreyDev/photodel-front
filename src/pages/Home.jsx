import React from "react";
import {
  PopularProsBlock,
  BestPlacesBlock,
  FirstSection,
  PopularPhotosBlock,
  SurveyBlock,
  LastCommentsBlock,
  AboutBlock,
  ProposalBlock,
  Footer,
  EmailConfirmedModal,
  ProfileMap,
  ResetPassSubmit,
} from "../components/index";
import Requests from "../http/axios-requests";
import "../styles/mainPage/mainPage.scss";

const Home = () => {
  //открытие модалок
  const [emailConfirmedModalActive, setEmailConfirmedModalActive] =
    React.useState(false);

  const [resetPassSubmitActive, setResetPassSubmitActive] =
    React.useState(false);

  React.useEffect(() => {
    if (window.location.href.includes("email_token")) {
      Requests.checkEmailToken(
        window.location.href.split("email_token=")[1]
      ).then(() => {
        setEmailConfirmedModalActive(true);
      });
    } else if (window.location.href.includes("reset_token")) {
      setResetPassSubmitActive(true);
    }
  }, []);

  React.useEffect(() => {
    document.title = "Фотодел";
  }, []);

  return (
    <div>
      <EmailConfirmedModal
        emailConfirmedModalActive={emailConfirmedModalActive}
        setEmailConfirmedModalActive={setEmailConfirmedModalActive}
      />
      <ResetPassSubmit
        resetPassSubmitActive={resetPassSubmitActive}
        setResetPassSubmitActive={setResetPassSubmitActive}
      />
      <FirstSection />
      <ProfileMap />
      <PopularProsBlock />
      <BestPlacesBlock />
      <PopularPhotosBlock />
      <SurveyBlock />
      <LastCommentsBlock />
      <AboutBlock />
      <ProposalBlock />
      <Footer />
    </div>
  );
};

export default Home;
