import { useEffect, useMemo } from 'react';
import { useMovieVideosQuery } from '@/services/queries/movie.query';
import useMovieStore from '@/store/useMovieStore';
import HeroContent from './HeroContent';
import HeroOverlay from './HeroOverlay';
import HeroVideoBackground from './HeroVideoBackground';

interface HeroProps {
  movieId: number;
  title: string;
  description: string;
  onCtaClick: () => void;
}

const Hero: React.FC<HeroProps> = ({
  movieId,
  title,
  description,
  onCtaClick,
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

  const videoUrl = trailer
    ? `https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1`
    : '';

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <HeroVideoBackground videoUrl={videoUrl} />
      <HeroOverlay />
      <HeroContent
        title={title}
        description={description}
        onCtaClick={onCtaClick}
      />
    </div>
  );
};

export default Hero;
