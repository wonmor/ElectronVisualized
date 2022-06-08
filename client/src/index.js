import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";

import './index.css';

import App from './App';

import store from './store'
import { Provider } from 'react-redux'

/*
█▀▀ █░░ █▀▀ █▀▀ ▀█▀ █▀█ █▀█ █▄░█ █░█ █ █▀ █░█ ▄▀█ █░░ █ ▀█ █▀▀ █▀▄ ▀   █▀▀ █▀█ █▀█ █▄░█ ▀█▀ ▄▄ █▀▀ █▄░█ █▀▄
██▄ █▄▄ ██▄ █▄▄ ░█░ █▀▄ █▄█ █░▀█ ▀▄▀ █ ▄█ █▄█ █▀█ █▄▄ █ █▄ ██▄ █▄▀ ▄   █▀░ █▀▄ █▄█ █░▀█ ░█░ ░░ ██▄ █░▀█ █▄▀

DEVELOPED AND DESIGNED BY JOHN SEONG. DEVELOPED WITH CREATE-REACT-APP.
*/

const root = ReactDOM.createRoot(document.getElementById('root'));
// For React, use yarn command to start...

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);