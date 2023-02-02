import React from "react";
import Requests from "../../http/axios-requests";
import { useNavigate } from "react-router-dom";
import Back from "../../img/addModules/arrow-back.svg";
import {
  SelectInput,
  TextInput,
  GreenButton,
  GreyButton,
  TeamCard,
} from "../../components";
import Pagination from "@mui/material/Pagination";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import CircularProgress from "@mui/material/CircularProgress";

const TeamInviteComponent = () => {
  const navigate = useNavigate();

  const [searchReq, setSearchReq] = React.useState();
  const [category, setCategory] = React.useState("Все");
  const [spec, setSpec] = React.useState("Все");
  const [location, setLocation] = React.useState();

  const [categories, setCategories] = React.useState();
  const [specs, setSpecs] = React.useState();

  const [specAdded, setSpecAdded] = React.useState(false);
  const [categoryAdded, setCategoryAdded] = React.useState(false);

  const [profiles, setProfiles] = React.useState(false);

  const [page, setPage] = React.useState(1);

  const [fetching, setFetching] = React.useState(true);

  const [countItems, setCountItems] = React.useState();

  const theme = createTheme({
    palette: {
      primary: {
        // Purple and green play nicely together.
        main: purple[500],
      },
      secondary: {
        // This is green.A700 as hex.
        main: "#50A398",
        contrastText: "#fff",
      },
    },
  });

  React.useEffect(() => {
    Requests.getProsCategories().then((res) => {
      setCategories(res.data);
    });
    Requests.getProsSpecs().then((res) => {
      setSpecs(res.data);
    });
  }, []);

  React.useEffect(() => {
    if (specs && !specAdded) {
      specs.unshift({ id: 100, name_spec: "Все" });
      setSpecAdded(true);
    }
  }, [specs]);

  React.useEffect(() => {
    if (categories && !categoryAdded) {
      categories.unshift({ id: 100, name_category: "Все" });
      setCategoryAdded(true);
    }
  }, [categories]);

  const handleReset = () => {
    setCategory("Все");
    setSpec("Все");
    setSearchReq("");
    setLocation("");
    setFetching(true);
    Requests.getProfilesForTeamSearch({
      category: "Все",
      spec: "Все",
      location: "",
      name: "",
      page: 1,
    }).then((res) => {
      setFetching(false);
      setProfiles(res.data);
      setCountItems(Number(res.headers["count-filter-items"]));
    });
  };

  const handleSearch = () => {
    setFetching(true);
    Requests.getProfilesForTeamSearch({
      category: category,
      spec: spec,
      location: location,
      name: searchReq,
      page: 1,
    }).then((res) => {
      setFetching(false);
      setProfiles(res.data);
      setCountItems(Number(res.headers["count-filter-items"]));
    });
  };

  React.useEffect(() => {
    setFetching(true);
    Requests.getProfilesForTeamSearch({
      category: category,
      spec: spec,
      location: location,
      name: searchReq,
      page: page,
    }).then((res) => {
      setFetching(false);
      setProfiles(res.data);
      setCountItems(Number(res.headers["count-filter-items"]));
    });
  }, [page]);

  return (
    <div className="team_invite">
      <div className="add_photo_header" style={{ marginBottom: "20px" }}>
        <img src={Back} alt="back" className="add_photo_header_arrow" />
        <p
          onClick={() => navigate("/profile/team")}
          className="add_photo_header_p"
        >
          Моя команда
        </p>
      </div>
      <div className="team_invite_fields_upper">
        <TextInput
          height={"38px"}
          width={"255px"}
          label={"Местоположение"}
          placeholder={"Введите что-нибудь"}
          value={location}
          callback={setLocation}
        />
        {categories && (
          <SelectInput
            height={"38px"}
            width={"255px"}
            label={"Категория"}
            values={
              categories &&
              categories.map((item) => {
                return { id: item.id, value: item.name_category };
              })
            }
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            setValue={setCategory}
            getName
          />
        )}
        {specs && (
          <SelectInput
            height={"38px"}
            width={"255px"}
            label={"Специализация"}
            values={
              specs &&
              specs.map((item) => {
                return { id: item.id, value: item.name_spec };
              })
            }
            value={spec}
            onChange={(e) => setSpec(e.target.value)}
            setValue={setSpec}
            getName
          />
        )}
      </div>
      <div className="team_invite_fields_lower">
        <TextInput
          height={"38px"}
          width={"100%"}
          label={"Искать по имени"}
          placeholder={"Введите имя или фамилию"}
          value={searchReq}
          callback={setSearchReq}
        />
      </div>
      <div className="team_invite_fields_buttons">
        <GreyButton
          height={"38px"}
          width={"180px"}
          text={"Сбросить"}
          callback={handleReset}
        />
        <GreenButton
          height={"38px"}
          width={"180px"}
          text={"Найти"}
          margin={"13px 0 0 10px"}
          callback={handleSearch}
        />
      </div>
      <div className="main_photo_header_sorts">
        <p className="main_photo_header_sorts_p">
          {countItems && countItems} найдено
        </p>
        <div style={{ opacity: "0", pointerEvents: "none" }}>
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
          />
        </div>
      </div>
      <div className="team_invite_cards">
        {!fetching &&
          profiles &&
          profiles.map((profile, idx) => (
            <TeamCard type="search" profile={profile} key={idx} />
          ))}

        {(!profiles || fetching) && (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "582px",
            }}
          >
            <CircularProgress color="success" />
          </div>
        )}

        {!fetching && profiles && profiles.length === 0 && (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "580px",
            }}
          >
            <h1 className="main_photo_header_h1">
              Мы не нашли подходящих профи :(
            </h1>
          </div>
        )}
      </div>
      <div className="team_invite_footer">
        <ThemeProvider theme={theme}>
          <Pagination
            count={countItems}
            page={page}
            color="secondary"
            onChange={(event, value) => setPage(value)}
          />
        </ThemeProvider>
      </div>
    </div>
  );
};

export default TeamInviteComponent;
