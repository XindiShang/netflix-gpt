import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import { usePopularMoviesQuery } from '@/services/queries/movie.query';
import { type Movie } from '@/types/movie';

const Browse = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const filters = {
    language: currentLanguage,
    page: 1,
  };

  const {
    isLoading: isLoadingMovies,
    data: popularMoviesData,
    isError: isMoviesError,
  } = usePopularMoviesQuery(filters);

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

  if (!popularMoviesData?.results.length) {
    return <p>No movies found</p>;
  }

  const firstMovie = popularMoviesData.results[0];

  return (
    <div>
      <Header />
      <Hero
        movieId={firstMovie.id}
        title={firstMovie.title}
        description={firstMovie.overview}
        onCtaClick={() => {}}
      />
      <div>
        {popularMoviesData.results.map((movie: Movie) => (
          <div key={movie.id}>
            <h2>{movie.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Browse;
