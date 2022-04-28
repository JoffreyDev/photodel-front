import React from "react";
import Back from "../../img/addModules/arrow-back.svg";
import Avatar from "../../img/photoView/avatar.png";
import Online from "../../img/sessions/online.svg";
import Offline from "../../img/commonImages/offline.svg";
import Menu from "../../img/commonImages/dopmenu.svg";
import "../../styles/Profile/Chat.scss";
import { TextInputNoMargin, MessageBlock } from "../../components/index";
import { useParams } from "react-router-dom";
import { rootAddress, rootSocketAddress } from "../../http/axios-requests";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Chat = () => {
  const params = useParams();
  const chatId = params.id;
  const navigate = useNavigate();

  const { userData } = useSelector(({ userData }) => userData);

  const [socketReconnect, setSocketReconnect] = React.useState();
  const [data, setData] = React.useState();
  const [message, setMessage] = React.useState();
  const [messages, setMessages] = React.useState();

  const mainSocket = React.useRef(null);

  React.useEffect(() => {
    mainSocket.current = new WebSocket(
      `wss://${rootSocketAddress}/ws/chat/${chatId}/?token=${localStorage.getItem(
        "access"
      )}`
    );

    mainSocket.current.onopen = function () {
      mainSocket.current.send(
        JSON.stringify({
          command: "fetch_messages",
        })
      );
    };

    mainSocket.current.onmessage = function (e) {
      const data = JSON.parse(e.data);

      if (data.hasOwnProperty("messages")) {
        setData(data);
        setMessages(data.messages);
      }
      if (data.command === "new_message") {
        setMessages((prev) => [...prev, data.message]);
      }

      console.log(data);
    };
  }, [socketReconnect]);

  const keyDownHandler = (event) => {
    if (!message) {
      return;
    }
    if (event.keyCode === 13) {
      mainSocket.current.send(
        JSON.stringify({
          message: message.trim(),
          command: "new_message",
          author_id: userData.id,
        })
      );
      setMessage("");
    }
  };

  const sendMessageHandle = (event) => {
    if (!message) {
      return;
    }
    mainSocket.current.send(
      JSON.stringify({
        message: message.trim(),
        command: "new_message",
        author_id: userData.id,
      })
    );
    setMessage("");
  };

  return (
    <div onKeyDown={(e) => keyDownHandler(e)} className="chat">
      <div className="chat_header">
        <div className="chat_header_left">
          <img src={Back} alt="back" className="chat_header_left_arrow" />
          <p
            onClick={() => navigate("/profile/messages")}
            className="chat_header_left_p"
          >
            Все сообщения
          </p>
        </div>
        <div
          onClick={() => navigate(`/public/profile/${data.receiver_id}`)}
          className="chat_header_center"
        >
          <img
            src={data && `${rootAddress}${data.avatar}`}
            alt="avatar"
            className="chat_header_center_avatar"
          />
          <img
            src={data && data.online ? Online : Offline}
            alt="online"
            className="chat_header_center_online"
          />
          <p className="chat_header_center_p">
            {data && `${data.name} ${data.surname}`}
          </p>
        </div>
        <div className="chat_header_right">
          <img src={Menu} alt="menu" className="chat_header_right_menu" />
        </div>
      </div>
      <div className="chat_body">
        {messages &&
          messages

            .map((message, idx) => <MessageBlock message={message} key={idx} />)
            .reverse()}
      </div>

      <div className="chat_lower_table">
        <TextInputNoMargin
          width={"732px"}
          height={"38px"}
          placeholder={"Напишите сообщение"}
          callback={setMessage}
          value={message}
        />
        <div onClick={sendMessageHandle} className="chat_lower_table_button" />
      </div>
    </div>
  );
};

export default Chat;
