import './css/footer.css';
import { ReactComponent as GithubLogo } from '../assets/images/icons/github.svg';
import { ReactComponent as LinkedInLogo } from '../assets/images/icons/linkedin.svg';
import { ReactComponent as MailLogo } from '../assets/images/icons/mail.svg';

const AppFooter = () => {
  return (
    <footer>
      <div className="footer-links">
        <div className="footer-social">
          <a href="https://github.com/chrismeyers" className="no-decoration">
            <GithubLogo
              className="link-image large"
              title="GitHub"
              alt="Find me on GitHub"
            />
          </a>
        </div>

        <div className="footer-bullets">&bull;</div>

        <div className="footer-social">
          <a
            href="https://www.linkedin.com/in/chris-meyers"
            className="no-decoration"
          >
            <LinkedInLogo
              className="link-image large"
              title="LinkedIn"
              alt="Connect with me on LinkedIn"
            />
          </a>
        </div>

        <div className="footer-bullets">&bull;</div>

        <div className="footer-social">
          <a
            href="mailto:chris@chrismeyers.info?subject=Message%20from%20chrismeyers.info"
            title="Send Message"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MailLogo className="link-image large" alt="Send Message" />
          </a>
        </div>

        {/* TODO: add theme toggle <div className="footer-bullets">&bull;</div> */}
      </div>

      <span className="footer-years">
        Designed and Developed by Chris Meyers, 2013-{new Date().getFullYear()}
      </span>
    </footer>
  );
};

export default AppFooter;
