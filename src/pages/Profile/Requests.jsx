import "../../styles/Profile/Messages.scss";
import React from "react";
import { RequestBlock, TeamCard, TrainingRequest } from "../../components";
import { rootSocketAddress } from "../../http/axios-requests";
import { useNavigate } from "react-router-dom";
import { ScreenLoader } from "../../components";
import SortImage from "../../img/sessions/sort.svg";
import { SelectInput } from "../../components";

import { useSelector } from "react-redux";

import Requests from "../../http/axios-requests";

const RequestsPage = () => {
  const [socketReconnect, setSocketReconnect] = React.useState();
  const [requests, setRequests] = React.useState();
  const [dataLoading, setDataLoading] = React.useState(true);
  const [sortType, setSortType] = React.useState(1);
  const navigate = useNavigate();

  const [teamRequests, setTeamRequests] = React.useState();
  const [trainingRequests, setTrainingRequests] = React.useState();

  const [component, setComponent] = React.useState("filming");

  const [reload, toggleReload] = React.useState(false);

  const [posCount, setPosCount] = React.useState("-");

  const mainSocket = React.useRef(null);

  const { userData, userCoords } = useSelector(({ userData }) => userData);

  let incomingRequests;
  let outgoingRequests;
  let resultArray;

  let incomingTrainRequests;
  let outgoingTrainRequests;
  let reusltTrainArray;

  React.useEffect(() => {
    if (!localStorage.getItem("access")) navigate("/");
  }, []);

  React.useEffect(() => {
    mainSocket.current = new WebSocket(
      `ws://${rootSocketAddress}/ws/?token=${localStorage.getItem("access")}`
    );

    mainSocket.current.onopen = function () {
      mainSocket.current.send(
        JSON.stringify({
          command: "history_request_chat",
        })
      );
    };

    mainSocket.current.onmessage = function (e) {
      const data = JSON.parse(e.data);

      if (data.hasOwnProperty("request_chat_info")) {
        setRequests(data.request_chat_info);
        setDataLoading(false);
      }
    };
  }, [socketReconnect]);

  React.useEffect(() => {
    if (userData) {
      setDataLoading(true);
      if (component === "team") {
        Requests.getIncomingTeamRequests(userData.id).then((res) => {
          incomingRequests = res.data;
          Requests.getOutgoingTeamRequests(userData.id).then((res) => {
            outgoingRequests = res.data;
            resultArray = outgoingRequests.concat(incomingRequests);
            resultArray.sort((a, b) => a.id > b.id).reverse();
            setPosCount(resultArray.length);
            setTeamRequests(resultArray);
            setDataLoading(false);
          });
        });
      } else if (component === "training") {
        Requests.getIncomingTrainingRequests(userData.id).then((res) => {
          incomingTrainRequests = res.data;
          Requests.getOutgoingTrainingRequests(userData.id).then((res) => {
            outgoingTrainRequests = res.data;
            reusltTrainArray = outgoingTrainRequests.concat(
              incomingTrainRequests
            );
            reusltTrainArray.sort((a, b) => a.id > b.id).reverse();
            setPosCount(reusltTrainArray.length);
            setTrainingRequests(reusltTrainArray);
            setDataLoading(false);
          });
        });
      }
    }
  }, [component, userData, reload]);

  return (
    <div className="messages">
      <div className="favorites_header">
        <div className="favorites_header_wrapper">
          <h1
            className={
              component === "filming"
                ? "favorites_header_title_first active"
                : "favorites_header_title_first"
            }
            onClick={() => setComponent("filming")}
          >
            НА СЪЕМКУ
          </h1>
          <h1
            className={
              component === "training"
                ? "favorites_header_title_first active"
                : "favorites_header_title_first"
            }
            onClick={() => setComponent("training")}
          >
            НА ОБУЧЕНИЕ
          </h1>
          <h1
            className={
              component === "team"
                ? "favorites_header_title_first active"
                : "favorites_header_title_first"
            }
            onClick={() => setComponent("team")}
          >
            В КОМАНДУ
          </h1>
        </div>

        <div className="favorites_header_select">
          <img
            src={SortImage}
            alt="sort"
            className="favorites_header_select_image"
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
      {requests &&
        component === "filming" &&
        requests.map((request, idx) => <RequestBlock request={request} />)}{" "}
      {requests && requests.length === 0 && component === "filming" && (
        <div className="photos_cards_empty">
          <h1 className="photos_cards_empty_title">
            Тут пока не было запросов.
          </h1>
        </div>
      )}
      {dataLoading && <ScreenLoader height={"30%"} />}
      {teamRequests &&
        component === "team" &&
        !dataLoading &&
        teamRequests.map((request, idx) => {
          return (
            <TeamCard
              type={"request"}
              key={idx}
              profile={request.invite_receiver}
              status={request.status}
              toMe={request.invite_receiver.id === userData.id}
              request_id={request.id}
              reload={toggleReload}
            />
          );
        })}
      {teamRequests &&
        component === "team" &&
        teamRequests.length === 0 &&
        !dataLoading && (
          <div className="photos_cards_empty">
            <h1 className="photos_cards_empty_title">
              Нет приглашений в команду.
            </h1>
          </div>
        )}
      {trainingRequests &&
        component === "training" &&
        !dataLoading &&
        trainingRequests.map((request, idx) => {
          return (
            <TrainingRequest
              type={"request"}
              key={idx}
              profile={request.request_user}
              status={request.status}
              toMe={request.request_user.id !== userData.id}
              request_id={request.id}
              reload={toggleReload}
              request={request}
            />
          );
        })}
      {trainingRequests &&
        component === "training" &&
        trainingRequests.length === 0 &&
        !dataLoading && (
          <div className="photos_cards_empty">
            <h1 className="photos_cards_empty_title">
              Нет запросов на обучение.
            </h1>
          </div>
        )}
    </div>
  );
};

export default RequestsPage;
