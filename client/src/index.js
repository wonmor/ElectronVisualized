import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import "./index.css";

import App from "./App";
import store from "./store";

import { Provider } from "react-redux";
import { ProSidebarProvider } from "react-pro-sidebar";
import { AlertProvider } from "./contexts/AuthContext";

/*
█▀▀ █░░ █▀▀ █▀▀ ▀█▀ █▀█ █▀█ █▄░█ █░█ █ █▀ █░█ ▄▀█ █░░ █ ▀█ █▀▀ █▀▄ ▀   █▀▀ █▀█ █▀█ █▄░█ ▀█▀ ▄▄ █▀▀ █▄░█ █▀▄
██▄ █▄▄ ██▄ █▄▄ ░█░ █▀▄ █▄█ █░▀█ ▀▄▀ █ ▄█ █▄█ █▀█ █▄▄ █ █▄ ██▄ █▄▀ ▄   █▀░ █▀▄ █▄█ █░▀█ ░█░ ░░ ██▄ █░▀█ █▄▀

DEVELOPED AND DESIGNED BY JOHN SEONG. DEVELOPED WITH CREATE-REACT-APP.
*/

const root = ReactDOM.createRoot(document.getElementById("root"));
// For React, use yarn command to start...

root.render(
  <React.StrictMode>
    <ProSidebarProvider>
      <BrowserRouter>
        <Provider store={store}>
          <AlertProvider>
            <App />
          </AlertProvider>
        </Provider>
      </BrowserRouter>
    </ProSidebarProvider>
  </React.StrictMode>
);
