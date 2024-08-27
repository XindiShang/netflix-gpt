import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import GptSection from '@/components/GPT';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import MovieSection from '@/components/Movie';
import {
  useNowPlayingMoviesQuery,
  usePopularMoviesQuery,
  useTopRatedMoviesQuery,
  useUpcomingMoviesQuery,
} from '@/services/queries/movie.query';
import useGptStore from '@/store/useGptStore';

// TODO: organize query calls, separate into individual components or call them in the parent component
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

  const queries = [
    useNowPlayingMoviesQuery(filters, { enabled: !isGptEnabled }),
    usePopularMoviesQuery(filters, { enabled: !isGptEnabled }),
    useTopRatedMoviesQuery(filters, { enabled: !isGptEnabled }),
    useUpcomingMoviesQuery(filters, { enabled: !isGptEnabled }),
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
      {isGptEnabled ? (
        <GptSection />
      ) : (
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
      )}
    </>
  );
};

export default Browse;
