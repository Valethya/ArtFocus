import { useState, useEffect, useCallback } from "react";
import { io } from "socket.io-client";

export default function Chat() {
  const socket = io();
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    console.log("hola aqui submit");
    event.preventDefault();
    console.log(message);
    socket.emit("message", message);
    setMessage("");
  };
  const handleChange = useCallback((event) => {
    console.log("hola por aqui change");
    event.preventDefault();
    setMessage(event.target.value);
  }, []);
  const handleKeyDown = (event) => {
    console.log("hola");
    if (event.keyCode === 13 && !event.shiftKey) {
      event.preventDefault();
    }
    handleSubmit(event);
  };

  return (
    <div className="chatBox shadow">
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
              //   value={message}
            ></textarea>
            <button type="submit" id="sendMessage">
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
