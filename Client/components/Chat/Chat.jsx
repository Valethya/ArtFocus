import { useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import IconChat from "./IconChat";
import { ApiContext } from "../../context/ApiContext";
import Overlay from "../Overlay/Overlay";
import { Icon } from "@mui/material";
import { useForm } from "react-hook-form";

export default function Chat() {
  const { register, handleSubmit, reset } = useForm();
  const socket = io("http://localhost:8080");
  const [allMessage, setAllMessage] = useState([]);
  const { user } = useContext(ApiContext);
  const [display, setDisplay] = useState("none");

  /*--SEND MESSAGE--*/
  const onSubmit = async (data) => {
    if (data.userMessage === undefined) {
      return;
    }
    try {
      const url = "http://localhost:8080/api/message";
      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: user.email,
          userMessage: data.userMessage,
        }),
      });
      const responseData = await response.json();
      console.log(responseData);
      reset();
    } catch (error) {
      console.log(error);
    }
    socket.emit("message", data.userMessage);
    reset();
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
            if (user.email) {
              return (
                <div
                  className={`message ${
                    message.user === user.email ? "own" : "other"
                  }`}
                  key={message._id}
                >
                  <p>{message.message}</p>
                </div>
              );
            }
          })}
        </div>
        <div>
          <form id="formMessage" onSubmit={handleSubmit(onSubmit)}>
            <div className="formMessage">
              <textarea
                type="text"
                id="userMessage"
                placeholder="Escribe tu mensaje..."
                name="userMessage"
                {...register("userMessage")}
              ></textarea>
              <button type="submit" id="sendMessage">
                <Icon>send</Icon>
              </button>
            </div>
          </form>
        </div>
      </div>

      <IconChat onClick={handleDisplay} />
    </>
  );
}
