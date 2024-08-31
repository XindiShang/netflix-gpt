import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import {
  type GetDatedMovieListResponse,
  type GetMovieListProps,
  type GetMovieListResponse,
  type GetMovieProps,
  type GetMovieVideosResponse,
  type MovieDetails,
  type SearchMovieProps,
} from '@/types/movie';
import {
  getMovieDetails,
  getMovieVideos,
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  searchMovies,
} from '../api/movie.service';

export const useNowPlayingMoviesQuery = (
  params: GetMovieListProps,
  options?: UseQueryOptions<GetDatedMovieListResponse>
) =>
  useQuery<GetDatedMovieListResponse>(
    ['getNowPlayingMovies', { params }],
    async () => {
      const res = await getNowPlayingMovies(params);
      return res;
    }
  );

export const usePopularMoviesQuery = (
  params: GetMovieListProps,
  options?: UseQueryOptions<GetMovieListResponse>
) =>
  useQuery<GetMovieListResponse>(
    ['getPopularMovies', { params }],
    async () => {
      const res = await getPopularMovies(params);
      return res;
    },
    options
  );

export const useTopRatedMoviesQuery = (
  params: GetMovieListProps,
  options?: UseQueryOptions<GetMovieListResponse>
) =>
  useQuery<GetMovieListResponse>(
    ['getTopRatedMovies', { params }],
    async () => {
      const res = await getTopRatedMovies(params);
      return res;
    },
    options
  );

export const useUpcomingMoviesQuery = (
  params: GetMovieListProps,
  options?: UseQueryOptions<GetDatedMovieListResponse>
) =>
  useQuery<GetDatedMovieListResponse>(
    ['getUpcomingMovies', { params }],
    async () => {
      const res = await getUpcomingMovies(params);
      return res;
    },
    options
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

export const useMovieDetailsQuery = (
  params: GetMovieProps,
  options?: UseQueryOptions<MovieDetails>
) => {
  return useQuery<MovieDetails>(
    ['getMovieDetails', params],
    async () => await getMovieDetails(params),
    options
  );
};

export const useSearchMovieQuery = (
  params: SearchMovieProps,
  options?: UseQueryOptions<GetMovieListResponse>
) => {
  return useQuery<GetMovieListResponse>(
    ['searchMovies', params],
    async () => await searchMovies(params),
    options
  );
};
