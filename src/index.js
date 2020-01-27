import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {CookiesProvider} from 'react-cookie';
import store from "./redux/store";

require('dotenv').config();

ReactDOM.render(
  <CookiesProvider>
    <App store={store} />
  </CookiesProvider>,
  document.getElementById('root')
);
