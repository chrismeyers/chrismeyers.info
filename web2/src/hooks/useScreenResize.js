import { useEffect, useState } from 'react';
import _throttle from 'lodash/throttle';
import { MOBILE_BREAKPOINT } from '../utils/constants';

const useScreenResize = () => {
  const [isMobileWidth, setIsMobileWidth] = useState(null);

  useEffect(() => {
    const onResize = () => {
      const width = window.innerWidth;
      setIsMobileWidth(width < MOBILE_BREAKPOINT);
    };
    const throttledResizeFn = _throttle(onResize, 50);
    onResize();

    window.addEventListener('resize', throttledResizeFn);

    return () => {
      window.removeEventListener('resize', throttledResizeFn);
    };
  }, []);

  return { isMobileWidth };
};

export default useScreenResize;
