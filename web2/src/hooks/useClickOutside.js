import { useEffect } from 'react';
import EventEmitter from '../events';

// Adapted from https://stackoverflow.com/a/42234988
const useClickOutside = (ref, eventType, ignoreRefs = []) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        let ignore = false;
        ignoreRefs.forEach((item) => {
          if (item.current.contains(event.target)) {
            ignore = true;
          }
        });

        if (!ignore) EventEmitter.dispatch(eventType, true);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [eventType, ignoreRefs, ref]);
};

export default useClickOutside;
