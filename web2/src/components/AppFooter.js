import Switch from 'react-switch';
import './css/footer.css';
import { ReactComponent as GithubIcon } from '../assets/images/icons/github.svg';
import { ReactComponent as LinkedInIcon } from '../assets/images/icons/linkedin.svg';
import { ReactComponent as MailIcon } from '../assets/images/icons/mail.svg';
import { ReactComponent as SunIcon } from '../assets/images/icons/sun.svg';
import { ReactComponent as MoonIcon } from '../assets/images/icons/moon.svg';
import {
  GITHUB_URL,
  LINKEDIN_URL,
  MAILTO_HREF,
  THEMES,
} from '../utils/constants';

const AppFooter = ({ themeProps, inMenu = false }) => {
  return (
    <footer className={inMenu ? 'in-menu' : ''}>
      <div className="footer-links">
        <div className="footer-social">
          <a href={GITHUB_URL} className="no-decoration">
            <GithubIcon
              className="link-image large"
              title="GitHub"
              alt="Find me on GitHub"
            />
          </a>
        </div>

        <div className="footer-bullets">&bull;</div>

        <div className="footer-social">
          <a href={LINKEDIN_URL} className="no-decoration">
            <LinkedInIcon
              className="link-image large"
              title="LinkedIn"
              alt="Connect with me on LinkedIn"
            />
          </a>
        </div>

        <div className="footer-bullets">&bull;</div>

        <div className="footer-social">
          <a
            href={MAILTO_HREF}
            title="Send Message"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MailIcon className="link-image large" alt="Send Message" />
          </a>
        </div>

        <div className="footer-bullets">&bull;</div>

        <div className="footer-theme">
          <Switch
            onChange={themeProps.toggleTheme}
            checked={themeProps.theme === THEMES.DARK}
            onColor={themeProps.mainThemeColor}
            offColor={themeProps.lightModeToggleColor}
            aria-label="Toggle site theme"
            height={20}
            width={48}
            checkedIcon={<MoonIcon className="link-image small theme on" />}
            uncheckedIcon={<SunIcon className="link-image small theme off" />}
          />
        </div>
      </div>

      <span className="footer-years">
        Designed and Developed by Chris Meyers, 2013-{new Date().getFullYear()}
      </span>
    </footer>
  );
};

export default AppFooter;
