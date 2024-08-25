import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import MovieLists from '@/components/Movie';
import {
  useNowPlayingMoviesQuery,
  usePopularMoviesQuery,
  useTopRatedMoviesQuery,
  useUpcomingMoviesQuery,
} from '@/services/queries/movie.query';

// TODO: organize query calls, separate into individual components or call them in the parent component
const Browse = () => {
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language;

  const filters = useMemo(
    () => ({
      language: currentLanguage,
      page: 1,
    }),
    [currentLanguage]
  );

  const queries = [
    useNowPlayingMoviesQuery(filters),
    usePopularMoviesQuery(filters),
    useTopRatedMoviesQuery(filters),
    useUpcomingMoviesQuery(filters),
  ];

  const isLoading = queries.some((query) => query.isLoading);
  const isError = queries.some((query) => query.isError);

  if (isError) {
    return <p>{t('movie.error')}</p>;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-gradient-to-b from-black to-black/80">
        <div className="loading loading-spinner text-primary"></div>
      </div>
    );
  }

  const [
    nowPlayingMoviesData,
    popularMoviesData,
    topRatedMoviesData,
    upcomingMoviesData,
  ] = queries.map((query) => query.data);

  if (!nowPlayingMoviesData?.results.length) {
    return <p>{t('movie.noMovies')}</p>;
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
      <MovieLists
        nowPlaying={nowPlayingMoviesData.results}
        topRated={topRatedMoviesData?.results}
        popular={popularMoviesData?.results}
        upcoming={upcomingMoviesData?.results}
      />
    </>
  );
};

export default Browse;
