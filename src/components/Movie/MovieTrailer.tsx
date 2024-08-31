import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import VideoPlayer from '@/components/Hero/VideoPlayer';
import { useMovieVideosQuery } from '@/services/queries/movie.query';

const MovieTrailer = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useMovieVideosQuery({ id: Number(id) });

  const trailer = useMemo(
    () => data?.results.find((video) => video.type === 'Trailer'),
    [data]
  );

  if (isLoading || isError) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-gradient-to-b from-black to-black/80">
        <div className="loading loading-spinner text-primary"></div>
      </div>
    );
  }

  const videoId = trailer?.key ?? '';

  const opts = {
    playerVars: {
      autoplay: 1,
      mute: 0,
      loop: 1,
      playlist: videoId,
    },
  };

  return (
    <div className="relative w-full h-full">
      {trailer && (
        <div className="">
          <VideoPlayer
            videoId={videoId}
            opts={opts}
            className="absolute top-0 left-0 w-full h-full"
          />
        </div>
      )}
      {!trailer && (
        <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full text-xl text-white">
          No trailer for this video is found
        </div>
      )}
    </div>
  );
};

export default MovieTrailer;
