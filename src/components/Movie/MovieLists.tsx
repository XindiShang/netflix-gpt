import { useTranslation } from 'react-i18next';
import { type Movie } from '@/types/movie';
import MovieList from './MovieList';

interface MovieListsProps {
  nowPlaying: Movie[];
  topRated: Movie[];
  popular: Movie[];
  upcoming: Movie[];
}

const MovieLists: React.FC<MovieListsProps> = ({
  nowPlaying,
  topRated,
  popular,
  upcoming,
}) => {
  const { t } = useTranslation();

  const movieCategories = [
    { title: t('movie.nowPlaying'), movies: nowPlaying },
    { title: t('movie.topRated'), movies: topRated },
    { title: t('movie.popular'), movies: popular },
    { title: t('movie.upcoming'), movies: upcoming },
  ];

  return (
    <div className="bg-black">
      <div className="h-2 bg-[#232323]"></div>
      <div className="relative md:-mt-48 md:pl-12">
        {movieCategories.map(
          ({ title, movies }) =>
            movies.length > 0 && (
              <MovieList key={title} title={title} movies={movies} />
            )
        )}
      </div>
    </div>
  );
};

export default MovieLists;
