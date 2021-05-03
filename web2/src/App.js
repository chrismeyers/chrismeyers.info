import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import AppFullNav from './components/AppFullNav';
import AboutPage from './components/AboutPage';
import ResumePage from './components/ResumePage';
import ProjectsPage from './components/ProjectsPage';
import BuildsPage from './components/BuildsPage';

function App() {
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
    </>
  );
}

export default App;