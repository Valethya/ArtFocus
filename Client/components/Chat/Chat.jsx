import { useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import IconChat from "./IconChat";
import { ApiContext } from "../../context/ApiContext";
import Overlay from "../Overlay/Overlay";

export default function Chat() {
  const socket = io();
  const [message, setMessage] = useState("");
  const [allMessage, setAllMessage] = useState([]);
  const [style, setStyle] = useState("");
  const [display, setDisplay] = useState("none");
  const { current } = useContext(ApiContext);

  const url = "http://localhost:8080/api/message";

  const dataMessage = {
    userEmail: "hola",
    userMessage: message,
  };

  /*--SEND MESSAGE--*/
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (message === undefined) {
      event.preventDefault();
    }
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataMessage),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    socket.emit("message", message);
    setMessage("");
  };

  const handleChange = (event) => {
    event.preventDefault();
    setMessage(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key == "Enter" && message === undefined) {
      event.preventDefault();
    }
    if (event.key == "Enter" && message !== undefined) {
      handleSubmit(event);
    }
  };

  socket.on("allMessages", async (data) => {
    setAllMessage(data);
  });

  const handleDisplay = () => {
    if (display === "flex") {
      setDisplay("none");
    } else {
      setDisplay("flex");
    }
  };

  return (
    <>
      <Overlay style={display} key="chat" onClick={handleDisplay}></Overlay>
      <div className="chatBox shadow" style={{ display: display }}>
        <div className="messageBox">
          {allMessage.map((message) => {
            const verify = message.user == current.email ? "own" : "other";
            setStyle(verify);
            return `<div class="message  ${style}">
                           <p>${message.message}</p>
                      </div>`;
          })}
        </div>
        <div>
          <form id="formMessage" onSubmit={handleSubmit}>
            <div className="formMessage">
              <textarea
                type="text"
                id="userMessage"
                placeholder="Escribe tu mensaje..."
                name="userMessage"
                value={message}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              ></textarea>
              <button type="submit" id="sendMessage">
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>

      <IconChat onClick={handleDisplay} />
    </>
  );
}
