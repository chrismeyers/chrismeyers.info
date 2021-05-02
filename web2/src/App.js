import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import AboutPage from './components/AboutPage';
import ResumePage from './components/ResumePage';
import ProjectsPage from './components/ProjectsPage';
import BuildsPage from './components/BuildsPage';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">About</Link>
            </li>
            <li>
              <Link to="/resume">Résumé</Link>
            </li>
            <li>
              <Link to="/projects">Projects</Link>
            </li>
            <li>
              <Link to="/builds">Builds</Link>
            </li>
          </ul>
        </nav>

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
      </div>
    </Router>
  );
}

export default App;
