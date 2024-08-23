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
  const { setTrailerVideo, trailerVideo } = useMovieStore((state) => ({
    setTrailerVideo: state.setTrailerVideo,
    trailerVideo: state.trailerVideo,
  }));

  const {
    data: videoData,
    isLoading,
    isError,
  } = useMovieVideosQuery({ id: movieId });

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
