import { Footer, Header } from "../../components";
import { useParams } from "react-router-dom";
import { MainPhoto, MainPlaces, MainProfiles } from "..";
import "../../styles/Main/MainBasis.scss";

const MainBasis = () => {
  const params = useParams();
  const component = params.component;

  return (
    <div className="">
      <Header styled={"themed"} />
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
