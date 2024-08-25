import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import {
  type GetDatedMovieListResponse,
  type GetMovieListProps,
  type GetMovieListResponse,
  type GetMovieProps,
  type GetMovieVideosResponse,
} from '@/types/movie';
import {
  getMovieVideos,
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from '../api/movie.service';

export const useNowPlayingMoviesQuery = (params: GetMovieListProps) =>
  useQuery<GetDatedMovieListResponse>(
    ['getNowPlayingMovies', { params }],
    async () => {
      const res = await getNowPlayingMovies(params);
      return res;
    }
  );

export const usePopularMoviesQuery = (params: GetMovieListProps) =>
  useQuery<GetMovieListResponse>(['getPopularMovies', { params }], async () => {
    const res = await getPopularMovies(params);
    return res;
  });

export const useTopRatedMoviesQuery = (params: GetMovieListProps) =>
  useQuery<GetMovieListResponse>(
    ['getTopRatedMovies', { params }],
    async () => {
      const res = await getTopRatedMovies(params);
      return res;
    }
  );

export const useUpcomingMoviesQuery = (params: GetMovieListProps) =>
  useQuery<GetDatedMovieListResponse>(
    ['getUpcomingMovies', { params }],
    async () => {
      const res = await getUpcomingMovies(params);
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
