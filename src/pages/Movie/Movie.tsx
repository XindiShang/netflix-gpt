import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import MovieInfo from '@/components/Movie/MovieInfo';
import MovieTrailer from '@/components/Movie/MovieTrailer';
import { useMovieDetailsQuery } from '@/services/queries/movie.query';

const MoviePage = () => {
  const { id } = useParams<{ id: string }>();
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const {
    data,
    isLoading,
    // isError,
  } = useMovieDetailsQuery({ id: Number(id), language: currentLanguage });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-black">
        <div className="loading loading-spinner text-primary"></div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col w-full h-full min-h-screen gap-4 overflow-x-hidden bg-black top-16 md:gap-0 md:flex-row md:top-20">
      <div className="flex-1 h-1/2 md:h-full">
        <MovieTrailer />
      </div>

      <div className="flex-1 h-1/2 md:h-full">
        <MovieInfo movieDetails={data} />
      </div>
    </div>
  );
};

export default MoviePage;
