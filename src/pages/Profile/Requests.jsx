import "../../styles/Profile/Messages.scss";
import React from "react";
import { RequestBlock } from "../../components";
import { rootSocketAddress } from "../../http/axios-requests";
import { useNavigate } from "react-router-dom";
import { ScreenLoader } from "../../components";

const Requests = () => {
  const [socketReconnect, setSocketReconnect] = React.useState();
  const [requests, setRequests] = React.useState();
  const [dataLoading, setDataLoading] = React.useState(true);
  const navigate = useNavigate();

  const mainSocket = React.useRef(null);

  React.useEffect(() => {
    if (!localStorage.getItem("access")) navigate("/");
  }, []);

  React.useEffect(() => {
    mainSocket.current = new WebSocket(
      `wss://${rootSocketAddress}/ws/?token=${localStorage.getItem("access")}`
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
      }

      console.log(data);
    };
  }, [socketReconnect]);

  return (
    <div className="messages">
      <div className="messages_header">
        <h1 className="messages_header_h1">ЗАПРОСЫ</h1>
      </div>
      {requests &&
        requests.map((request, idx) => <RequestBlock request={request} />)}{" "}
      {requests && requests.length === 0 && (
        <div className="photos_cards_empty">
          <h1 className="photos_cards_empty_title">
            Тут пока не было запросов.
          </h1>
        </div>
      )}
      {dataLoading && <ScreenLoader height={"30%"} />}
    </div>
  );
};

export default Requests;
