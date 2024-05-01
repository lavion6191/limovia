import React from 'react';
import MediaQueries from 'ui/mediaQueries';

export default function TestPage() {
    const media = MediaQueries();

    let backgroundColor = '';

  if (media.smallMediumScreen) {
    backgroundColor = 'blue';
  } else if (media.mediumScreen || media.smallScreen) {
    backgroundColor = 'red';
  }

  return (
    <div style={{ backgroundColor }}>
      {media.largeScreen && <p>This is a large screen.</p>}
      {media.mediumLargeScreen && <p>This is a medium-large screen.</p>}
      {media.mediumScreen && <p>This is a medium screen.</p>}
      {media.smallMediumScreen && <p>This is a small-medium screen.</p>}
      {media.smallScreen && <p>This is a small screen.</p>}
      {media.extraSmallScreen && <p>This is an extra-small screen.</p>}
      {media.mobileScreen && <p>This is a mobile screen.</p>}
    </div>
  );
};