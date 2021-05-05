import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './css/mobile-nav.css';
import logo from '../assets/images/logos/meyers-logo-green.svg';
import Footer from './Footer';

const MobileNav = ({ themeProps }) => {
  const [menuDisplayed, setMenuDisplayed] = useState(null);
  const location = useLocation();

  useEffect(() => {
    menuDisplayed ? setMenuDisplayed(!menuDisplayed) : setMenuDisplayed(false);
  }, [location]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <nav className="mobile">
      <div id="mobile-menu">
        <div className="header">
          <div className="logo">
            <Link className="small-nav-logo" to="/">
              <img
                src={logo}
                alt="Chris Meyers. Developer, Tech enthusiast."
                className="banner-img"
                title="Home"
              />
            </Link>
          </div>
          <div className="menu-icon">
            <div>
              <button
                style={{ outline: 'none' }}
                className={`hamburger hamburger--spin ${
                  menuDisplayed ? 'is-active' : ''
                }`}
                type="button"
                onClick={() => setMenuDisplayed(!menuDisplayed)}
                aria-label="Menu"
                aria-controls="navigation"
              >
                <span className="hamburger-box" style={{ height: 26 }}>
                  <span className="hamburger-inner"></span>
                </span>
              </button>
            </div>
          </div>
        </div>

        {menuDisplayed && (
          <div>
            <div
              onTouchEnd={(e) => e.preventDefault()}
              className="menu-overlay"
            ></div>
            <div className="menu">
              <Link
                className={`nav-link ${
                  location.pathname === '/' ? 'nav-selected' : ''
                }`}
                to="/"
              >
                <div className="menu-item">About</div>
              </Link>
              <Link
                className={`nav-link ${
                  location.pathname === '/resume' ? 'nav-selected' : ''
                }`}
                to="/resume"
              >
                <div className="menu-item">Résumé</div>
              </Link>
              <Link
                className={`nav-link ${
                  location.pathname.startsWith('/projects')
                    ? 'nav-selected'
                    : ''
                }`}
                to="/projects"
              >
                <div className="menu-item">Projects</div>
              </Link>
              <Link
                className={`nav-link ${
                  location.pathname.startsWith('/builds') ? 'nav-selected' : ''
                }`}
                to="/builds"
              >
                <div className="menu-item">Builds</div>
              </Link>

              <Footer themeProps={themeProps} inMenu={true} />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default MobileNav;
