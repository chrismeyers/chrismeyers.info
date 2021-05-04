import { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';

const Loading = () => {
  const [waiting, setWaiting] = useState(true);
  const loadingColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--faded-text-color')
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
        <ReactLoading
          type="bars"
          color={loadingColor}
          height={'10%'}
          width={'10%'}
          className="loading"
        />
      )}
    </>
  );
};

export default Loading;
