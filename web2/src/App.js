import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isMobile as isMobileDevice } from 'react-device-detect';
import './App.css';
import FullNav from './components/FullNav';
import MobileNav from './components/MobileNav';
import Footer from './components/Footer';
import AboutPage from './components/AboutPage';
import ResumePage from './components/ResumePage';
import ProjectsPage from './components/ProjectsPage';
import BuildsPage from './components/BuildsPage';
import useTheme from './hooks/useTheme';
import useScreenResize from './hooks/useScreenResize';

function App() {
  const themeProps = useTheme();
  const { isMobileWidth } = useScreenResize();

  return (
    <>
      <Router>
        {isMobileDevice || isMobileWidth ? (
          <MobileNav themeProps={themeProps} />
        ) : (
          <FullNav />
        )}
        <Switch>
          <Route path="/resume">
            <ResumePage />
          </Route>
          <Route path="/projects">
            <ProjectsPage />
          </Route>
          <Route path="/builds">
            <BuildsPage />
          </Route>
          <Route path="/">
            <AboutPage />
          </Route>
        </Switch>
      </Router>
      <Footer themeProps={themeProps} />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
