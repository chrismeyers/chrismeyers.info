import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './css/projects.css';
import ProjectsAPI from '../utils/api/projects';
import { DEFAULT_DOCUMENT_TITLE } from '../utils/constants';
import ToastMessage from './ToastMessage';
import Loading from './Loading';

const ProjectsPage = () => {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    let isMounted = true;

    document.title = `Projects | ${DEFAULT_DOCUMENT_TITLE}`;

    const fetchData = async () => {
      try {
        const response = await ProjectsAPI.get();
        if (isMounted) {
          setProjects(response.data.items);
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

  return (
    <div className="content">
      <div className="section-header section-header-size">
        <div className={loading ? 'section-header-loading' : ''}>
          {loading ? <Loading lines={0} header={true} /> : 'Projects'}
        </div>
      </div>

      <div className="content-text">
        {loading ? (
          <Loading lines={10} header={true} />
        ) : (
          <>
            {projects &&
              projects.map((project, index) => (
                <Fragment key={project.id}>
                  <div className="project">
                    <h2 className={index === 0 ? 'first-header' : ''}>
                      <Link
                        className="fancytxt"
                        title={`Click for details of ${project.title}`}
                        to={`/projects/${project.id}`}
                      >
                        {project.title}
                      </Link>
                    </h2>
                    <h3>{project.displayDate}</h3>
                    <div className="project-overview">
                      <p dangerouslySetInnerHTML={{ __html: project.info }}></p>
                      <p className="right">
                        <Link
                          className="subtle fancytxt"
                          title={`Click for details of ${project.title}`}
                          to={`/projects/${project.id}`}
                        >
                          Project Details &gt;
                        </Link>
                      </p>
                    </div>
                  </div>

                  {index < projects.length - 1 && (
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

export default ProjectsPage;
