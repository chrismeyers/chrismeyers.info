import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { SRLWrapper } from 'simple-react-lightbox';
import './css/project.css';
import { ReactComponent as ExternalLinkIcon } from '../assets/images/icons/link-external.svg';
import { ReactComponent as GithubIcon } from '../assets/images/icons/github.svg';
import { ReactComponent as PlayIcon } from '../assets/images/icons/play.svg';
import ProjectsAPI from '../utils/api/projects';
import ToastMessage from './ToastMessage';
import Loading from './Loading';

const ProjectPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [project, setProject] = useState({});

  const { id } = useParams();

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await ProjectsAPI.getById(id);
        if (isMounted) {
          setError(false);
          setProject(response.data);
        }
      } catch (error) {
        setError(true);
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
  }, [id]);

  const buildDownloadFileName = () =>
    project.title.toLowerCase().replaceAll(' ', '-');

  const restartGIF = () => {
    // Restart the GIF each time it's opened
    setTimeout(() => {
      const gif = document.getElementsByClassName('SRLImage')[0];

      if (gif) {
        document.getElementsByClassName('SRLImage')[0].src = gif.src;
      }
    }, 100);
  };

  return (
    <div className="content">
      <div className="section-header section-header-size">Project Details</div>

      <div className="content-text project">
        {loading ? (
          <Loading lines={10} header={true} />
        ) : (
          <>
            {error ? (
              <p className="center">
                Project <span className="pre highlighted">{id}</span> does not
                exist
              </p>
            ) : (
              <div className="project" key={project.id}>
                <h2>{project.title}</h2>
                <h3>{project.displayDate}</h3>
                <div className="project-wrapper">
                  <div className="project-description">
                    <dl>
                      <dt className="dt-mod">
                        <b>Language(s)</b>
                      </dt>
                      <dd
                        dangerouslySetInnerHTML={{ __html: project.lang }}
                      ></dd>

                      <dt className="dt-mod">
                        <b>Description</b>
                      </dt>
                      <dd
                        dangerouslySetInnerHTML={{ __html: project.info }}
                      ></dd>

                      <dt className="dt-mod">
                        <b>My Role</b>
                      </dt>
                      <dd>{project.role}</dd>

                      <dt className="dt-mod">
                        <b>Status</b>
                      </dt>
                      <dd>{project.stat}</dd>

                      <dt className="dt-mod dt-links">
                        <b>Links</b>
                      </dt>
                      {project.webUrl !== null && (
                        <dd className="project-link-image">
                          <ExternalLinkIcon
                            className="link-image small"
                            title="External website"
                            alt="Link to external website"
                          />{' '}
                          <a href={project.webUrl} className="fancytxt">
                            Website
                          </a>
                        </dd>
                      )}
                      <dd className="project-link-image">
                        <GithubIcon
                          className="link-image small"
                          title="GitHub repository"
                          alt="Link to GitHub repository"
                        />{' '}
                        <a href={project.codeUrl} className="fancytxt">
                          Code
                        </a>
                      </dd>
                    </dl>
                  </div>

                  {project.images && project.images.length > 0 && (
                    <div className="project-images">
                      {project.images[0].path.toLowerCase().endsWith('.gif') ? (
                        <SRLWrapper
                          callbacks={{
                            onLightboxOpened: () => restartGIF(),
                          }}
                          options={{
                            settings: {
                              downloadedFileName: buildDownloadFileName(),
                            },
                            thumbnails: {
                              showThumbnails: false,
                            },
                          }}
                        >
                          {project.images.map((image, index) => (
                            <Fragment key={image.id}>
                              <div className="gif-overlay" title="Play GIF">
                                <a href={image.path}>
                                  <img
                                    src={image.thumbnail}
                                    className={`project-images-full-img-${image.orient}`}
                                    alt={image.title}
                                    title="Click to enlarge"
                                  />
                                </a>
                                <PlayIcon
                                  name="play"
                                  className="link-image xlarge play-overlay"
                                  alt="Plays the associated GIF"
                                  title="Play GIF"
                                />
                              </div>
                            </Fragment>
                          ))}
                        </SRLWrapper>
                      ) : (
                        <SRLWrapper
                          options={{
                            settings: {
                              downloadedFileName: buildDownloadFileName(),
                            },
                          }}
                        >
                          {project.images.map((image, index) => (
                            <Fragment key={image.id}>
                              {index === 0 ? (
                                <a href={image.path}>
                                  <img
                                    src={image.path}
                                    className={`project-images-full-img-${image.orient}`}
                                    alt={image.title}
                                    title="Click to enlarge"
                                  />
                                </a>
                              ) : (
                                <div className="project-images-small">
                                  <a href={image.path}>
                                    <img
                                      src={image.path}
                                      className={`project-images-small-img-${image.orient}`}
                                      alt={image.title}
                                      title="Click to enlarge"
                                    />
                                  </a>
                                </div>
                              )}
                            </Fragment>
                          ))}
                        </SRLWrapper>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectPage;
