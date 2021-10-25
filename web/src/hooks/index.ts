import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export const useScript = (url: string) => {
  useEffect(() => {
    console.log('script called');
    const script = document.createElement('script');

    script.type = 'text/javascript';
    script.src = url;
    script.defer = true;
    // if (async) {
    //   script.async = true;
    // }

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [url]);
};
