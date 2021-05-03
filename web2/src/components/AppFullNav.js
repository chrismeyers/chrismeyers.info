import { Link, useLocation } from 'react-router-dom';
import './css/full-nav.css';
import logo from '../assets/images/logos/meyers-logo-green.svg';

const AppFullNav = () => {
  const location = useLocation();

  return (
    <nav>
      <div id="full-menu">
        <div className="side-nav-logo">
          <Link className="nav-link banner" to="/">
            <img
              src={logo}
              alt="Chris Meyers. Developer, Tech enthusiast."
              className="banner-img"
              title="Home"
            />
          </Link>
        </div>
        <ul className="side-nav-items">
          <li>
            <Link
              className={`nav-link ${
                location.pathname === '/' ? 'nav-selected' : ''
              }`}
              to="/"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              className={`nav-link ${
                location.pathname === '/resume' ? 'nav-selected' : ''
              }`}
              to="/resume"
            >
              Résumé
            </Link>
          </li>
          <li>
            <Link
              className={`nav-link ${
                location.pathname === '/projects' ? 'nav-selected' : ''
              }`}
              to="/projects"
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              className={`nav-link ${
                location.pathname === '/builds' ? 'nav-selected' : ''
              }`}
              to="/builds"
            >
              Builds
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default AppFullNav;
