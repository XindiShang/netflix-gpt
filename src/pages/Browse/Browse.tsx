import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import MovieStack from '@/components/Movie';
import { useNowPlayingMoviesQuery } from '@/services/queries/movie.query';

// TODO: organize query calls, separate into individual components or call them in the parent component
const Browse = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const filters = {
    language: currentLanguage,
    page: 1,
  };

  const {
    isLoading: isLoadingMovies,
    data: nowPlayingMoviesData,
    isError: isMoviesError,
  } = useNowPlayingMoviesQuery(filters);

  // TODO: i18n
  if (isMoviesError) {
    return <p>Something went wrong. Please try again later.</p>;
  }

  if (isLoadingMovies) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-gradient-to-b from-black to-black/80">
        <div className="loading loading-spinner text-primary"></div>
      </div>
    );
  }

  if (!nowPlayingMoviesData?.results.length) {
    return <p>No movies found</p>;
  }

  const firstMovie = nowPlayingMoviesData.results[0];

  return (
    <>
      <Header />
      <Hero
        movieId={firstMovie.id}
        title={firstMovie.title}
        description={firstMovie.overview}
        onCtaClick={() => {}}
      />
      <MovieStack />
    </>
  );
};

export default Browse;
