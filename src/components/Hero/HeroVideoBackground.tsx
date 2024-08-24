import React from 'react';
import YouTube from 'react-youtube';

interface HeroVideoBackgroundProps {
  videoId: string;
}

const HeroVideoBackground: React.FC<HeroVideoBackgroundProps> = ({
  videoId,
}) => {
  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      mute: 1,
      loop: 1,
      playlist: videoId,
    },
  };

  return <YouTube className="w-full h-full" videoId={videoId} opts={opts} />;
};

export default HeroVideoBackground;
