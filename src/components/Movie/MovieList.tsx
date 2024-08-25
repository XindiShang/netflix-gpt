import React from 'react';
import { type Movie } from '@/types/movie';
import MovieCard from './MovieCard';

interface MovieListProps {
  title: string;
  movies: Movie[];
}

const MovieList: React.FC<MovieListProps> = ({ title, movies }) => {
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
