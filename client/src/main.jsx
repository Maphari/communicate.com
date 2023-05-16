import React from "react";
import ReactDOM from "react-dom/client";
import App from "./component/App";
import "./sass/main.scss";
import { BrowserRouter } from "react-router-dom";
import DataToSendProvider from "./component/context/DataTosendContext/DataToSendContext";
import { UserRequestProvider } from "./component/context/request/UserRequest";
import { Provider } from "react-redux";
import store from "./component/redux/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <DataToSendProvider>
          <UserRequestProvider>
            <App />
          </UserRequestProvider>
        </DataToSendProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
