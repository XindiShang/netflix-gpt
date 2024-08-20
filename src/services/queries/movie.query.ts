import { useQuery } from '@tanstack/react-query';
import {
  type GetPopularMoviesProps,
  type GetPopularMoviesResponse,
} from '@/types/movie';
import { getPopularMovies } from '../api/movie.service';

export const usePopularMoviesQuery = (params: GetPopularMoviesProps) =>
  useQuery<GetPopularMoviesResponse>(
    ['getPopularMovies', { params }],
    async () => {
      const res = await getPopularMovies(params);
      return res;
    }
  );
