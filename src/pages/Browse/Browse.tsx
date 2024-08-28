import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import GptSection from '@/components/GPT';
import Hero from '@/components/Hero';
import MovieSection from '@/components/Movie';
import {
  useNowPlayingMoviesQuery,
  usePopularMoviesQuery,
  useTopRatedMoviesQuery,
  useUpcomingMoviesQuery,
} from '@/services/queries/movie.query';
import useGptStore from '@/store/useGptStore';

const Browse = () => {
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language;
  const { isGptEnabled } = useGptStore();

  const filters = useMemo(
    () => ({
      language: currentLanguage,
      page: 1,
    }),
    [currentLanguage]
  );

  const nowPlayingQuery = useNowPlayingMoviesQuery(filters, {
    enabled: !isGptEnabled,
  });
  const popularMoviesQuery = usePopularMoviesQuery(filters, {
    enabled: !isGptEnabled,
  });
  const topRatedMoviesQuery = useTopRatedMoviesQuery(filters, {
    enabled: !isGptEnabled,
  });
  const upcomingMoviesQuery = useUpcomingMoviesQuery(filters, {
    enabled: !isGptEnabled,
  });

  if (isGptEnabled) {
    return (
      <>
        <GptSection />
      </>
    );
  }

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

  return (
    <>
      <Hero
        movieId={firstMovie.id}
        title={firstMovie.title}
        description={firstMovie.overview}
        onCtaClick={() => {}}
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
