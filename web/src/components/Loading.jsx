import { useEffect, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const Loading = ({ lines = 5, header = false }) => {
  const [waiting, setWaiting] = useState(true);
  const loadingColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--skeleton-color')
    .trim();
  const loadingHighlightColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--skelton-highlight-color')
    .trim();

  useEffect(() => {
    const timeout = setTimeout(() => setWaiting(false), 500);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      {waiting ? (
        <></>
      ) : (
        <SkeletonTheme
          color={loadingColor}
          highlightColor={loadingHighlightColor}
        >
          {header ? <Skeleton count={1} height={50} /> : <></>}
          <p>
            <Skeleton count={lines} />
          </p>
        </SkeletonTheme>
      )}
    </>
  );
};

export default Loading;
