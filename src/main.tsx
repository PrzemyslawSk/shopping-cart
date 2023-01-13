import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ReduxStore } from "./redux/reduxStore";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={ReduxStore}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
