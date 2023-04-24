import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ApiContextProvider } from "../context/ApiContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApiContextProvider>
      <App />
    </ApiContextProvider>
  </React.StrictMode>
);
