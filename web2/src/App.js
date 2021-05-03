import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import AppFullNav from './components/AppFullNav';
import AppFooter from './components/AppFooter';
import AboutPage from './components/AboutPage';
import ResumePage from './components/ResumePage';
import ProjectsPage from './components/ProjectsPage';
import BuildsPage from './components/BuildsPage';
import useTheme from './hooks/useTheme';

function App() {
  useTheme();

  return (
    <>
      <Router>
        <AppFullNav />

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
      <AppFooter />
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
