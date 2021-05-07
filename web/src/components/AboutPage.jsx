import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { SRLWrapper, useLightbox } from 'simple-react-lightbox';
import ResumeApi from '../utils/api/resume';
import { MAILTO_HREF, DEFAULT_DOCUMENT_TITLE } from '../utils/constants';
import ToastMessage from './ToastMessage';
import Loading from './Loading';

const AboutPage = () => {
  const [loading, setLoading] = useState(true);
  const [mostRecentJob, setMostRecentJob] = useState(null);
  const [languages, setLanguages] = useState(null);
  const { openLightbox } = useLightbox();

  useEffect(() => {
    let isMounted = true;

    document.title = DEFAULT_DOCUMENT_TITLE;

    const fetchData = async () => {
      try {
        const response = await ResumeApi.summary();
        if (isMounted) {
          setMostRecentJob(response.data.mostRecentJob);
          setLanguages(response.data.languages);
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
      <div className="section-header section-header-size">About</div>

      <div className="content-text">
        {loading ? (
          <Loading lines={10} />
        ) : (
          <>
            <span>
              Hey, my name is Chris Meyers and I am a software engineer and
              technology enthusiast. Here are some things you should know about
              me:
            </span>

            <ul>
              <li>
                I studied computer science at{' '}
                <a className="fancytxt" href="https://www.rowan.edu">
                  Rowan University
                </a>{' '}
                in Glassboro, NJ and earned a Bachelor of Science in Computer
                Science
              </li>
              {mostRecentJob && mostRecentJob.employed && (
                <li data-testid="employment">
                  Currently, I am employed as a {mostRecentJob.title} at{' '}
                  <a href={mostRecentJob.url} className="fancytxt">
                    {mostRecentJob.company}
                  </a>
                </li>
              )}

              <li>
                Some of my hobbies include:
                <ul>
                  <li>
                    <a
                      className="fancytxt"
                      href="https://www.goodreads.com/chrismeyers"
                    >
                      Reading
                    </a>
                  </li>
                  <li>Photography</li>
                  <li>
                    <router-link className="fancytxt" to="/builds">
                      Building custom computers
                    </router-link>
                  </li>
                  <li>Playing video games</li>
                </ul>
              </li>
              <li>
                I am the owner of this{' '}
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a
                  className="fancytxt"
                  title="Clark the Corgi"
                  alt="Clark the Corgi"
                  onClick={() => openLightbox()}
                >
                  majestic beast
                </a>
              </li>
            </ul>
            <SRLWrapper
              elements={[
                {
                  src: '/images/clark/DSC_1564-6.jpg',
                  caption: 'Clark the Corgi',
                },
              ]}
              options={{
                settings: {
                  downloadedFileName: 'clark-the-corgi',
                },
                buttons: {
                  showAutoplayButton: false,
                  showNextButton: false,
                  showPrevButton: false,
                },
                thumbnails: {
                  showThumbnails: false,
                },
              }}
            />

            <p>
              Over the years, I've gained experience with the following
              programming languages and frameworks:
            </p>

            <ul>
              <li>
                Desktop and command-line interface (CLI) applications:
                {languages && languages.desktop && (
                  <ul data-testid="desktop-languages">
                    {languages.desktop.map((item, index) => (
                      <li key={`desktop-${index}`}>{item}</li>
                    ))}
                  </ul>
                )}
              </li>
              <li>
                Websites, web applications, and APIs:
                {languages && languages.web && (
                  <ul data-testid="web-languages">
                    {languages.web.map((item, index) => (
                      <li key={`web-${index}`}>{item}</li>
                    ))}
                  </ul>
                )}
              </li>
            </ul>

            <span>
              As a professional software engineer, I strive to write clean,
              modular, and maintainable code. My primary goal is to create
              innovative and usable applications that solve problems. If you
              have any questions, comments, or would like to work together on a
              project, please{' '}
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a
                href={MAILTO_HREF}
                className="fancytxt"
                target="_blank"
                rel="noopener noreferrer"
              >
                send me a message
              </a>
              .
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default AboutPage;
