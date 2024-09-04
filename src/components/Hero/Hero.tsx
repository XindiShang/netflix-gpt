import { useEffect, useMemo } from 'react';
import { useMovieVideosQuery } from '@/services/queries/movie.query';
import useMovieStore from '@/store/useMovieStore';
import HeroContent from './HeroContent';
import HeroOverlay from './HeroOverlay';
import VideoPlayer from './VideoPlayer';

interface HeroProps {
  movieId: number;
  title: string;
  description: string;
  onCtaClick: () => void;
  onInfoClick: () => void;
}

const Hero: React.FC<HeroProps> = ({
  movieId,
  title,
  description,
  onCtaClick,
  onInfoClick,
}) => {
  const { setTrailerVideo, trailerVideo } = useMovieStore();

  // Only call the query if there's no trailer or the stored trailer key doesn't match the movieId.
  const shouldFetchVideos =
    !trailerVideo || trailerVideo.key !== movieId.toString();

  const {
    data: videoData,
    isLoading,
    isError,
  } = useMovieVideosQuery({ id: movieId }, { enabled: shouldFetchVideos });

  const trailer = useMemo(
    () => videoData?.results.find((video) => video.type === 'Trailer'),
    [videoData]
  );

  useEffect(() => {
    if (trailer && trailer.key !== trailerVideo?.key) {
      setTrailerVideo(trailer);
    }
  }, [trailer, trailerVideo, setTrailerVideo]);

  if (isLoading || isError) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-gradient-to-b from-black to-black/80">
        <div className="loading loading-spinner text-primary"></div>
      </div>
    );
  }

  const videoId = trailer?.key ?? '';

  return (
    <div className="relative w-full aspect-square md:aspect-video">
      <VideoPlayer videoId={videoId} />
      <HeroOverlay />
      <HeroContent
        title={title}
        description={description}
        onCtaClick={onCtaClick}
        onInfoClick={onInfoClick}
      />
    </div>
  );
};

export default Hero;
