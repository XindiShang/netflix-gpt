import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import {
  type GetMovieListProps,
  type GetMovieProps,
  type GetMovieVideosResponse,
  type GetPopularMoviesResponse,
} from '@/types/movie';
import {
  getMovieVideos,
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
} from '../api/movie.service';

export const useNowPlayingMoviesQuery = (params: GetMovieListProps) =>
  useQuery<GetPopularMoviesResponse>(
    ['getNowPlayingMovies', { params }],
    async () => {
      const res = await getNowPlayingMovies(params);
      return res;
    }
  );

export const usePopularMoviesQuery = (params: GetMovieListProps) =>
  useQuery<GetPopularMoviesResponse>(
    ['getPopularMovies', { params }],
    async () => {
      const res = await getPopularMovies(params);
      return res;
    }
  );

export const useTopRatedMoviesQuery = (params: GetMovieListProps) =>
  useQuery<GetPopularMoviesResponse>(
    ['getTopRatedMovies', { params }],
    async () => {
      const res = await getTopRatedMovies(params);
      return res;
    }
  );

export const useMovieVideosQuery = (
  params: GetMovieProps,
  options?: UseQueryOptions<GetMovieVideosResponse>
) => {
  return useQuery<GetMovieVideosResponse>(
    ['getMovieVideos', params],
    async () => await getMovieVideos(params),
    options
  );
};
