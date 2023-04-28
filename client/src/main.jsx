import React from "react";
import ReactDOM from "react-dom/client";
import App from "./component/App";
import "./sass/main.scss";
import { BrowserRouter } from "react-router-dom";
import DataToSendProvider from "./component/context/DataToSendContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <DataToSendProvider>
        <App />
      </DataToSendProvider>
    </BrowserRouter>
  </React.StrictMode>
);
