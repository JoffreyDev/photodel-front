import "../../styles/Profile/Messages.scss";
import React from "react";
import { ChatBlock } from "../../components";
import { rootSocketAddress } from "../../http/axios-requests";

const Messages = ({}) => {
  const [socketReconnect, setSocketReconnect] = React.useState();
  const [chats, setChats] = React.useState();

  const mainSocket = React.useRef(null);

  React.useEffect(() => {
    mainSocket.current = new WebSocket(
      `wss://${rootSocketAddress}/ws/?token=${localStorage.getItem("access")}`
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
    </div>
  );
};

export default Messages;
