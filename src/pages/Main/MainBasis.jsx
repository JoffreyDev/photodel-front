import { Footer, Header } from "../../components";
import { useParams } from "react-router-dom";
import { MainPhoto, MainPlaces, MainProfiles } from "..";
import "../../styles/Main/MainBasis.scss";
import { ThemeContext, themes } from "../../components/Theme/ThemeContext";

const MainBasis = () => {
  const params = useParams();
  const component = params.component;

  return (
    <div className="">
      <ThemeContext.Consumer>
        {({ theme, setTheme }) => (
          <Header styled={theme === "dark" ? "main" : "themed"} border={true} />
        )}
      </ThemeContext.Consumer>
      <div className="main_basis">
        <div className="main_basis_body">
          {component === "photos" && <MainPhoto />}
          {component === "places" && <MainPlaces />}
          {component === "profies" && <MainProfiles />}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainBasis;
