import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import MovieOverview from '@/components/Movie/MovieOverview';
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

  return (
    <div className="relative flex flex-col w-full h-full gap-4 mt-auto overflow-x-hidden bg-black top-16 md:gap-0 md:flex-row md:top-20">
      {isLoading ? (
        <div className="flex items-center justify-center w-full h-full p-4 text-white bg-black rounded-lg bg-opacity-90">
          <div className="loading loading-spinner text-primary"></div>
        </div>
      ) : (
        <>
          <div className="flex-1 h-1/2 md:h-full">
            <MovieTrailer />
          </div>

          <div className="flex-1 h-1/2 md:h-full">
            <MovieOverview movieDetails={data} />
          </div>
        </>
      )}
    </div>
  );
};

export default MoviePage;
