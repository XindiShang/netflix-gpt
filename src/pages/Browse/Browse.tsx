import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Hero from '@/components/Hero';
import MovieSection from '@/components/Movie';
import {
  useNowPlayingMoviesQuery,
  usePopularMoviesQuery,
  useTopRatedMoviesQuery,
  useUpcomingMoviesQuery,
} from '@/services/queries/movie.query';

const Browse = () => {
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language;

  const filters = useMemo(
    () => ({
      language: currentLanguage,
      page: 1,
    }),
    [currentLanguage]
  );

  const nowPlayingQuery = useNowPlayingMoviesQuery(filters);
  const popularMoviesQuery = usePopularMoviesQuery(filters);
  const topRatedMoviesQuery = useTopRatedMoviesQuery(filters);
  const upcomingMoviesQuery = useUpcomingMoviesQuery(filters);

  if (
    nowPlayingQuery.isLoading ||
    popularMoviesQuery.isLoading ||
    topRatedMoviesQuery.isLoading ||
    upcomingMoviesQuery.isLoading
  ) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-gradient-to-b from-black to-black/80">
        <div className="loading loading-spinner text-primary"></div>
      </div>
    );
  }

  if (
    nowPlayingQuery.isError ||
    popularMoviesQuery.isError ||
    topRatedMoviesQuery.isError ||
    upcomingMoviesQuery.isError
  ) {
    return <p>{t('movie.error')}</p>;
  }

  const nowPlayingMoviesData = nowPlayingQuery.data;
  const popularMoviesData = popularMoviesQuery.data;
  const topRatedMoviesData = topRatedMoviesQuery.data;
  const upcomingMoviesData = upcomingMoviesQuery.data;

  if (!nowPlayingMoviesData?.results.length) {
    return <p>{t('movie.noMovies')}</p>;
  }

  const firstMovie = nowPlayingMoviesData.results[0];

  const navigateToMovieDetails = (id: number) => {
    navigate(`/movie/${id}`);
  };

  return (
    <>
      <Hero
        movieId={firstMovie.id}
        title={firstMovie.title}
        description={firstMovie.overview}
        onCtaClick={() => {
          navigateToMovieDetails(firstMovie.id);
        }}
        onInfoClick={() => {
          navigateToMovieDetails(firstMovie.id);
        }}
      />
      <MovieSection
        nowPlaying={nowPlayingMoviesData.results}
        topRated={topRatedMoviesData?.results}
        popular={popularMoviesData?.results}
        upcoming={upcomingMoviesData?.results}
      />
    </>
  );
};

export default Browse;
