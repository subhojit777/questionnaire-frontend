import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {CookiesProvider} from 'react-cookie';

require('dotenv').config();

ReactDOM.render(<CookiesProvider><App /></CookiesProvider>, document.getElementById('root'));
