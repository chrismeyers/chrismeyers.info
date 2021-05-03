import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import SimpleReactLightbox from 'simple-react-lightbox';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

Axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

document.documentElement.setAttribute(
  'data-theme',
  localStorage.getItem('theme'),
);

ReactDOM.render(
  <React.StrictMode>
    <SimpleReactLightbox>
      <App />
    </SimpleReactLightbox>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
