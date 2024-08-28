import React from 'react';
import { useTranslation } from 'react-i18next';
import { type Movie } from '@/types/movie';
import MovieCard from './MovieCard';

interface MovieListProps {
  title: string;
  movies: Movie[];
}

const MovieList: React.FC<MovieListProps> = ({ title, movies }) => {
  const { t } = useTranslation();

  if (!title && movies.length === 0) return null;
  else if (movies.length === 0)
    return (
      <div className="px-4">
        <h1 className="py-6 text-xl font-semibold text-white md:text-3xl">
          {title}
        </h1>
        <p className="text-gray-500">{t('movie.noMovies')}</p>
      </div>
    );

  return (
    <div className="px-4">
      <h1 className="py-6 text-xl font-semibold text-white md:text-3xl">
        {title}
      </h1>
      <div className="flex overflow-x-scroll scrollbar-none md:scrollbar-thumb-rounded-full md:scrollbar-track-rounded-full md:scrollbar md:scrollbar-thumb-neutral md:scrollbar-track-black ">
        <div className="flex gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
