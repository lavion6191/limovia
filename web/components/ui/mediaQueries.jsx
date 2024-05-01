import { useEffect, useState } from 'react';

const MediaQueries = () => {
  const [media, setMedia] = useState({
    largeScreen: false,
    mediumLargeScreen: false,
    mediumScreen: false,
    smallMediumScreen: false,
    smallScreen: false,
    extraSmallScreen: false,
    mobileScreen: false
  });

  useEffect(() => {
    const handleResize = () => {
      setMedia({
        largeScreen:        window.matchMedia('(min-width: 1025px)').matches,
        mediumLargeScreen:  window.matchMedia('(max-width: 1024px) and (min-width: 914px)').matches,
        mediumScreen:       window.matchMedia('(max-width: 913px) and (min-width: 822px)').matches,
        smallMediumScreen:  window.matchMedia('(max-width: 821px) and (min-width: 770px)').matches,
        smallScreen:        window.matchMedia('(max-width: 769px) and (min-width: 542px)').matches,
        extraSmallScreen:   window.matchMedia('(max-width: 541px) and (min-width: 427px)').matches,
        mobileScreen:       window.matchMedia('(max-width: 426px)').matches
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return media;
};

export default MediaQueries;
