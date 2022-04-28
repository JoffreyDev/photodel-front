import "../../styles/Profile/Messages.scss";
import React from "react";
import { RequestBlock } from "../../components";
import { rootSocketAddress } from "../../http/axios-requests";

const Requests = () => {
  const [socketReconnect, setSocketReconnect] = React.useState();
  const [requests, setRequests] = React.useState();

  const mainSocket = React.useRef(null);

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
        requests.map((request, idx) => <RequestBlock request={request} />)}
    </div>
  );
};

export default Requests;
