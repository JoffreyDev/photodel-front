import "../../styles/Profile/Messages.scss";
import React from "react";
import { ChatBlock } from "../../components";
import { rootSocketAddress } from "../../http/axios-requests";
import { useNavigate } from "react-router-dom";
import { ScreenLoader } from "../../components";

const Messages = ({}) => {
  const navigate = useNavigate();
  const [socketReconnect, setSocketReconnect] = React.useState();
  const [chats, setChats] = React.useState();
  const [dataLoading, setDataLoading] = React.useState(true);

  const mainSocket = React.useRef(null);

  React.useEffect(() => {
    if (!localStorage.getItem("access")) navigate("/");
  }, []);

  React.useEffect(() => {
    mainSocket.current = new WebSocket(
      `  ws://${rootSocketAddress}/ws/?token=${localStorage.getItem("access")}`
    );

    mainSocket.current.onopen = function () {
      mainSocket.current.send(
        JSON.stringify({
          command: "history_chat",
        })
      );
    };

    mainSocket.current.onmessage = function (e) {
      const data = JSON.parse(e.data);

      if (data.hasOwnProperty("chat_info")) {
        setChats(data.chat_info);
        setDataLoading(false);
      }

      console.log(data);
    };
  }, [socketReconnect]);

  return (
    <div className="messages">
      <div className="messages_header">
        <h1 className="messages_header_h1">СООБЩЕНИЯ</h1>
      </div>
      {chats && chats.map((chat, idx) => <ChatBlock data={chat} key={idx} />)}
      {chats && chats.length === 0 && (
        <div className="photos_cards_empty">
          <h1 className="photos_cards_empty_title">Тут пока нет чатов.</h1>
        </div>
      )}
      {dataLoading && <ScreenLoader height={"30%"} />}
    </div>
  );
};

export default Messages;
