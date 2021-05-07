import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './css/builds.css';
import BuildsAPI from '../utils/api/builds';
import ToastMessage from './ToastMessage';
import Loading from './Loading';

const BuildsPage = () => {
  const [loading, setLoading] = useState(true);
  const [builds, setBuilds] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await BuildsAPI.get();
        if (isMounted) {
          setBuilds(response.data.items);
        }
      } catch (error) {
        toast.error(
          <ToastMessage title={error.title} message={error.message} />,
        );
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    fetchData();

    return () => (isMounted = false);
  }, []);

  const cleanCPU = (cpu) => {
    return cpu.split('@')[0].trim();
  };

  return (
    <div className="content">
      <div className="section-header section-header-size">Builds</div>

      <div className="content-text">
        {loading ? (
          <Loading lines={10} header={true} />
        ) : (
          <>
            {builds &&
              builds.map((build, index) => (
                <Fragment key={build.id}>
                  <div className="build" key="build.id">
                    <h2 className={index === 0 ? 'first-header' : ''}>
                      <Link
                        className="fancytxt"
                        title={`Click for details of ${build.displayDate}`}
                        to={`/builds/${build.id}`}
                      >
                        {build.displayDate}
                      </Link>
                    </h2>
                    <div className="build-overview">
                      <p>
                        An{' '}
                        <span className="highlighted">
                          {cleanCPU(build.cpu)}
                        </span>{' '}
                        based system
                      </p>
                      <p className="right">
                        <Link
                          className="subtle fancytxt"
                          title={`Click for details of ${build.displayDate}`}
                          to={`/builds/${build.id}`}
                        >
                          Build Details &gt;
                        </Link>
                      </p>
                    </div>
                  </div>

                  {index < builds.length - 1 && (
                    <>
                      <br />
                      <hr />
                    </>
                  )}
                </Fragment>
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default BuildsPage;
