import React from 'react';
import YouTube, { type YouTubeProps } from 'react-youtube';

interface VideoPlayerProps extends YouTubeProps {}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoId,
  className = 'w-full h-full',
  opts,
  ...rest
}) => {
  const defaultOpts: YouTubeProps['opts'] = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      mute: 1,
      loop: 1,
      playlist: videoId,
    },
  };

  const mergedOpts = { ...defaultOpts, ...opts };

  return (
    <YouTube
      className={className}
      videoId={videoId}
      opts={mergedOpts}
      {...rest}
    />
  );
};

export default VideoPlayer;
