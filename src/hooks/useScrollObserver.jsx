// IMPORT PACKAGES
import { useEffect, useRef } from 'react';

// USE SCROLL OBSERVER HOOK
function useScrollObserver(callback) {
  // HOOKS
  const observer = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    // HANDLER INTERSECT
    function handleIntersect(entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback();
        }
      });
    }

    // DISABLE PREVIOUS OBSERVER
    if (observer.current) {
      observer.current.disconnect();
    }

    // CREATE OBSERVER
    observer.current = new IntersectionObserver(handleIntersect, options);

    return () => {
      observer.current.disconnect();
    };
  }, [callback]);

  return observer;
}

export default useScrollObserver;
