import React from "react";
import ModalWindow from "../RegAuth/ModalWindow";
import { GreenButton, GreyButton } from "..";

const NuPhotoSubmit = ({ nuModalActive, setNuModalActive, callback }) => {
  return (
    <ModalWindow
      moduleActive={nuModalActive}
      setModuleActive={setNuModalActive}
    >
      <div className="reg_auth_header">
        <h1 className="reg_auth_header_title">Категория "Ню"</h1>
        <svg
          style={{
            padding: "5px",
            boxSizing: "content-box",
            cursor: "pointer",
          }}
          onClick={() => setNuModalActive(false)}
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.41 6.99994L12.71 2.70994C12.8983 2.52164 13.0041 2.26624 13.0041 1.99994C13.0041 1.73364 12.8983 1.47825 12.71 1.28994C12.5217 1.10164 12.2663 0.99585 12 0.99585C11.7337 0.99585 11.4783 1.10164 11.29 1.28994L7 5.58994L2.71 1.28994C2.5217 1.10164 2.2663 0.99585 2 0.99585C1.7337 0.99585 1.4783 1.10164 1.29 1.28994C1.1017 1.47825 0.995908 1.73364 0.995908 1.99994C0.995908 2.26624 1.1017 2.52164 1.29 2.70994L5.59 6.99994L1.29 11.2899C1.19627 11.3829 1.12188 11.4935 1.07111 11.6154C1.02034 11.7372 0.994202 11.8679 0.994202 11.9999C0.994202 12.132 1.02034 12.2627 1.07111 12.3845C1.12188 12.5064 1.19627 12.617 1.29 12.7099C1.38296 12.8037 1.49356 12.8781 1.61542 12.9288C1.73728 12.9796 1.86799 13.0057 2 13.0057C2.13201 13.0057 2.26272 12.9796 2.38458 12.9288C2.50644 12.8781 2.61704 12.8037 2.71 12.7099L7 8.40994L11.29 12.7099C11.383 12.8037 11.4936 12.8781 11.6154 12.9288C11.7373 12.9796 11.868 13.0057 12 13.0057C12.132 13.0057 12.2627 12.9796 12.3846 12.9288C12.5064 12.8781 12.617 12.8037 12.71 12.7099C12.8037 12.617 12.8781 12.5064 12.9289 12.3845C12.9797 12.2627 13.0058 12.132 13.0058 11.9999C13.0058 11.8679 12.9797 11.7372 12.9289 11.6154C12.8781 11.4935 12.8037 11.3829 12.71 11.2899L8.41 6.99994Z"
            fill="#50A398"
          />
        </svg>
      </div>
      <div className="reg_auth_content_fields">
        <p className="reg_auth_content_lower_p" style={{ textAlign: "center" }}>
          Выбранная публикация относится к категории "Ню" и, возможно, содержит
          материалы для взрослых. Переходя, вы подтверждаете, что вам
          исполнилось 18 лет.
        </p>
        <GreyButton
          callback={() => setNuModalActive(false)}
          text="Закрыть"
          width={"100%"}
          height={"38px"}
          margin={"20px 0 0 0"}
        />
        <GreenButton
          callback={() => {
            localStorage.setItem("nu", true);
            callback();
          }}
          text="Перейти"
          width={"100%"}
          height={"38px"}
          margin={"20px 0 0 0"}
        />
      </div>
    </ModalWindow>
  );
};
export default NuPhotoSubmit;
