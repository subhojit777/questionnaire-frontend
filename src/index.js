import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {CookiesProvider} from 'react-cookie';
import {Provider} from "react-redux";
import store from "./redux/store";

require('dotenv').config();

ReactDOM.render(
  <Provider store={store}>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </Provider>,
  document.getElementById('root')
);
