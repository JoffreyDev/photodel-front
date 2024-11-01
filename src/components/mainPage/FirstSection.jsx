import React from "react";
import { Header } from "..";
import searchIcon from "../../img/mainPage/search-vector.png";
import { useNavigate } from "react-router-dom";

const FirstSection = () => {
  const navigate = useNavigate();

  const [req, setReq] = React.useState();

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    if (req) {
      navigate(`/profies?req=${req}`);
    }
  };

  return (
    <div>
      <section className="main_page_first_section">
        <Header styled={"main"} />
        <div className="main_page_middle_block">
          <h1 className="main_page_middle_block__title">
            Поиск фотопрофессионалов рядом с Вами
          </h1>
          <h2 className="main_page_middle_block__subtitle">
            Найдите фотографа, модель или студию для съемок
          </h2>
          <div className="main_page_middle_block__search-input_wrapper">
            <img
              src={searchIcon}
              alt="search icon"
              className="main_page_middle_block__search-input__icon"
              aria-hidden="true"
              onClick={handleSearch}
            ></img>
            <input
              type="text"
              placeholder="Начать поиск"
              className="main_page_middle_block__search-input"
              value={req}
              onChange={(e) => setReq(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
        </div>
        <div className="main_page_lower_block">
          <p className="main_page_lower_block_upper_p">Фото дня</p>
          <p className="main_page_lower_block_middle_p">У горного хребта</p>
          <div className="main_page_lower_block_lower_row">
            <svg
              className="main_page_lower_block_lower_row__image"
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.5 3.75C7.03645 3.75 6.58331 3.88746 6.19788 4.14499C5.81246 4.40253 5.51205 4.76857 5.33466 5.19684C5.15727 5.6251 5.11085 6.09635 5.20129 6.55099C5.29172 7.00564 5.51494 7.42325 5.84272 7.75103C6.1705 8.07881 6.58812 8.30203 7.04276 8.39247C7.4974 8.4829 7.96865 8.43649 8.39692 8.25909C8.82518 8.0817 9.19122 7.7813 9.44876 7.39587C9.70629 7.01044 9.84375 6.5573 9.84375 6.09375C9.84375 5.47215 9.59682 4.87601 9.15728 4.43647C8.71774 3.99693 8.1216 3.75 7.5 3.75ZM7.5 7.5C7.22187 7.5 6.94999 7.41752 6.71873 7.263C6.48747 7.10848 6.30723 6.88886 6.2008 6.6319C6.09436 6.37494 6.06651 6.09219 6.12077 5.8194C6.17503 5.54662 6.30896 5.29605 6.50563 5.09938C6.7023 4.90271 6.95287 4.76878 7.22566 4.71452C7.49844 4.66026 7.78119 4.68811 8.03815 4.79454C8.29511 4.90098 8.51473 5.08122 8.66926 5.31248C8.82378 5.54374 8.90625 5.81562 8.90625 6.09375C8.90588 6.4666 8.7576 6.82407 8.49396 7.08771C8.23032 7.35135 7.87285 7.49963 7.5 7.5Z"
                fill="white"
              />
              <path
                d="M7.5 0.9375C6.20206 0.9375 4.93327 1.32238 3.85407 2.04348C2.77488 2.76458 1.93374 3.7895 1.43704 4.98864C0.940343 6.18778 0.810384 7.50728 1.0636 8.78028C1.31682 10.0533 1.94183 11.2226 2.85961 12.1404C3.7774 13.0582 4.94672 13.6832 6.21972 13.9364C7.49272 14.1896 8.81222 14.0597 10.0114 13.563C11.2105 13.0663 12.2354 12.2251 12.9565 11.1459C13.6776 10.0667 14.0625 8.79794 14.0625 7.5C14.0605 5.76013 13.3685 4.09208 12.1382 2.8618C10.9079 1.63153 9.23988 0.939485 7.5 0.9375ZM4.6875 12.3642V11.7188C4.68788 11.3459 4.83615 10.9884 5.09979 10.7248C5.36344 10.4612 5.72091 10.3129 6.09375 10.3125H8.90625C9.2791 10.3129 9.63657 10.4612 9.90021 10.7248C10.1639 10.9884 10.3121 11.3459 10.3125 11.7188V12.3642C9.45899 12.8626 8.48837 13.1252 7.5 13.1252C6.51164 13.1252 5.54102 12.8626 4.6875 12.3642ZM11.2463 11.6841C11.2369 11.0692 10.9864 10.4827 10.5487 10.0507C10.111 9.61884 9.52117 9.37616 8.90625 9.375H6.09375C5.47884 9.37616 4.88899 9.61884 4.45129 10.0507C4.0136 10.4827 3.76309 11.0692 3.75375 11.6841C2.9037 10.925 2.30425 9.92572 2.03477 8.81844C1.76529 7.71115 1.83849 6.54813 2.24468 5.48337C2.65087 4.41861 3.37089 3.50234 4.3094 2.85589C5.2479 2.20944 6.36063 1.86329 7.50024 1.86329C8.63984 1.86329 9.75257 2.20944 10.6911 2.85589C11.6296 3.50234 12.3496 4.41861 12.7558 5.48337C13.162 6.54813 13.2352 7.71115 12.9657 8.81844C12.6962 9.92572 12.0968 10.925 11.2467 11.6841H11.2463Z"
                fill="white"
              />
            </svg>
            <p className="main_page_lower_block_lower_row__p">
              Смольникова Алена
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FirstSection;
