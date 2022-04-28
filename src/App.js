import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, ProfileBasis, PublicProfileBasis } from "./pages/index";
import "./styles/reset.css";
import "./styles/base.css";
import React from "react";
import { useDispatch } from "react-redux";
import {
  setUserData,
  toggleIsLoggenIn,
  setUserCoords,
} from "./redux/actions/userData";
import {
  setProsSpecs,
  setProsCategories,
  setCountries,
  setLanguages,
} from "./redux/actions/siteEntities";
import Requests, {
  rootAddress,
  rootSocketAddress,
} from "./http/axios-requests";
import Alert from "./components/PagesArchitecture/Alert";
import MainBasis from "./pages/Main/MainBasis";

function App() {
  const dispatch = useDispatch();

  const acessToken = localStorage.getItem("access");

  const [socketReconnect, setSocketReconnect] = React.useState();

  const mainSocket = React.useRef(null);

  React.useEffect(() => {
    mainSocket.current = new WebSocket(
      `wss://${rootSocketAddress}/ws/?token=${localStorage.getItem("access")}`
    );
  }, [socketReconnect]);

  //проверка на авторизацию
  React.useEffect(() => {
    if (acessToken) {
      Requests.getOwnProfile().then((res) => {
        dispatch(setUserData(res.data));
        dispatch(toggleIsLoggenIn(true));
      });
    } else dispatch(toggleIsLoggenIn(false));
  }, [acessToken, dispatch]);

  //получение списка специализаций, категорий, городов, языков
  React.useEffect(() => {
    Requests.getProsCategories().then((res) => {
      dispatch(setProsCategories(res.data));
    });

    Requests.getProsSpecs().then((res) => {
      dispatch(setProsSpecs(res.data));
    });

    Requests.getCountriesList().then((res) => {
      dispatch(setCountries(res.data));
    });

    Requests.getLanguages().then((res) => {
      dispatch(setLanguages(res.data));
    });
  });

  React.useEffect(() => {
    if (!localStorage.getItem("location")) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          dispatch(setUserCoords([pos.coords.latitude, pos.coords.longitude]));
        },
        () => {},
        { maximumAge: 6000000, enableHighAccuracy: true }
      );
    }
  }, []);

  return (
    <div>
      <Alert />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/profile/:component"
            element={<ProfileBasis mainSocket={mainSocket} />}
          />
          <Route
            path="/profile/:component/:id"
            element={<ProfileBasis mainSocket={mainSocket} />}
          />
          <Route path="/:component" element={<MainBasis />} />
          <Route
            path="/public/:component/:id"
            element={<PublicProfileBasis />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
