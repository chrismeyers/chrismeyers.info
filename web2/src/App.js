import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isMobile as isMobileDevice } from 'react-device-detect';
import './App.css';
import FullNav from './components/FullNav';
import MobileNav from './components/MobileNav';
import Prompt from './components/Prompt';
import Footer from './components/Footer';
import AboutPage from './components/AboutPage';
import ResumePage from './components/ResumePage';
import ProjectsPage from './components/ProjectsPage';
import ProjectPage from './components/ProjectPage';
import BuildsPage from './components/BuildsPage';
import NotFoundPage from './components/NotFoundPage';
import useTheme from './hooks/useTheme';
import useScreenResize from './hooks/useScreenResize';

function App() {
  const themeProps = useTheme();
  const { isMobileWidth } = useScreenResize();
  const isMobile = (isMobileDevice || isMobileWidth) ?? true;

  return (
    <>
      <Router>
        {isMobile ? <MobileNav themeProps={themeProps} /> : <FullNav />}
        <Switch>
          <Route exact path="/">
            <AboutPage />
          </Route>
          <Route exact path="/resume">
            <ResumePage />
          </Route>
          <Route exact path="/projects">
            <ProjectsPage />
          </Route>
          <Route exact path="/projects/:id">
            <ProjectPage />
          </Route>
          <Route exact path="/builds">
            <BuildsPage />
          </Route>
          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
        {isMobile === true ? <></> : <Prompt themeProps={themeProps} />}
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
