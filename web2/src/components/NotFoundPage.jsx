import { Link, useLocation } from 'react-router-dom';

const NotFoundPage = () => {
  const location = useLocation();

  return (
    <div className="content">
      <div className="section-header section-header-size">Page Not Found</div>

      <div className="content-text">
        <p className="center">
          The path{' '}
          <span>
            {' '}
            <pre className="highlighted">{location.pathname}</pre>{' '}
          </span>{' '}
          does not exist
        </p>
        <p className="center">
          Go back{' '}
          <Link className="fancytxt" to="/">
            home
          </Link>
          !
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
