import { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './css/mobile-nav.css';
import logo from '../assets/images/logos/meyers-logo-green.svg';
import Footer from './Footer';
import useClickOutside from '../hooks/useClickOutside';
import EventEmitter, { EVENT_MENU_CLOSE } from '../events';

const MobileNav = ({ themeProps }) => {
  const [menuDisplayed, setMenuDisplayed] = useState(null);
  const location = useLocation();
  const menuRef = useRef(null);
  const menuIconRef = useRef(null);

  useClickOutside(menuRef, EVENT_MENU_CLOSE, [menuIconRef]);

  useEffect(() => {
    menuDisplayed
      ? EventEmitter.subscribe(EVENT_MENU_CLOSE, () => setMenuDisplayed(false))
      : EventEmitter.unsubscribe(EVENT_MENU_CLOSE);
  }, [menuDisplayed]);

  useEffect(() => {
    menuDisplayed ? setMenuDisplayed(!menuDisplayed) : setMenuDisplayed(false);
  }, [location]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    return () => EventEmitter.unsubscribe(EVENT_MENU_CLOSE);
  }, []);

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
          <div className="menu-icon" ref={menuIconRef}>
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
            <div className="menu-overlay"></div>
            <div className="menu" ref={menuRef}>
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
