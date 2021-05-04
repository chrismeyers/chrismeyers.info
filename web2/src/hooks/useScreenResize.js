import { useEffect, useState } from 'react';
import _throttle from 'lodash/throttle';
import { MOBILE_BREAKPOINT } from '../utils/constants';

const useScreenResize = () => {
  const [isMobile, setIsMobile] = useState(null);

  useEffect(() => {
    const onResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < MOBILE_BREAKPOINT);
    };
    const throttledResizeFn = _throttle(onResize, 50);
    onResize();

    window.addEventListener('resize', throttledResizeFn);

    return () => {
      window.removeEventListener('resize', throttledResizeFn);
    };
  }, []);

  return { isMobile };
};

export default useScreenResize;
