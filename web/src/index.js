import 'delayed-scroll-restoration-polyfill';
import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import { isIE } from 'react-device-detect';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { GITHUB_URL, LINKEDIN_URL, MAILTO_HREF } from './utils/constants';

Axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

let element;
if (isIE) {
  element = (
    <div style={{ marginLeft: 20 }}>
      <h1>Limited Functionality Mode</h1>
      <p>
        Due to the limitations of Internet Explorer, this website is unable to
        fully load. For a better browsing experience, please visit this website
        on a different browser, if possible.
      </p>
      <p>
        If using a different browser is not possible, please use the following
        links for more information about me, or contact me directly via email:
      </p>
      <ul>
        <li>
          <a href={GITHUB_URL}>GitHub</a>
        </li>
        <li>
          <a href={LINKEDIN_URL}>LinkedIn</a>
        </li>
        <li>
          <a href={MAILTO_HREF}>Email</a>
        </li>
      </ul>
    </div>
  );
} else {
  const App = lazy(() => import('./App'));
  const SimpleReactLightbox = lazy(() => import('simple-react-lightbox'));
  import('./assets/vendor/hamburgers/hamburgers.min.css');

  element = (
    <React.StrictMode>
      <Suspense fallback={<></>}>
        <SimpleReactLightbox>
          <App />
        </SimpleReactLightbox>
      </Suspense>
    </React.StrictMode>
  );
}

ReactDOM.render(element, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
