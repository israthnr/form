import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import $ from 'jquery';
import 'jquery';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/popper.js/dist/popper.min';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import '../node_modules/jquery-ui-dist/jquery-ui.min';
import '../node_modules/jquery-ui-dist/jquery-ui.min.css';
import '../node_modules/jquery-ui-timepicker-addon/dist/jquery-ui-timepicker-addon';
import '../node_modules/jquery-ui-timepicker-addon/dist/jquery-ui-timepicker-addon.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
window.$ = window.jQuery = window.jquery = $;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
