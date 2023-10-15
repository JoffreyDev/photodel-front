import React from "react";
import { GreenButton } from "..";
import { useDispatch } from "react-redux";
import { toggleRegModule } from "../../redux/actions/siteEntities";
import { useSelector } from "react-redux";

const ProposalBlock = ({ setRegModuleActive }) => {
  const { isLoggedIn } = useSelector(({ userData }) => userData);
  const dispatch = useDispatch();
  return (
    <section className="main_page_proposal_section_wrapper">
      <div className="main_page_proposal_section_content">
        <h1 className="main_page_proposal_section_content_title">
          Вы отличный фотограф или профессиональная модель?
        </h1>
        <p className="main_page_proposal_section_content_p">
          Зарегистрируйтесь на Фотодел  и начните получать заказы прямо сейчас!
        </p>
        {!isLoggedIn && (
          <GreenButton
            callback={() => dispatch(toggleRegModule(true))}
            text="Зарегистрироваться"
            margin={"20px 0 0 0"}
            width={"276px"}
            height={"56px"}
            disabled={isLoggedIn}
          />
        )}
      </div>
    </section>
  );
};

export default ProposalBlock;
