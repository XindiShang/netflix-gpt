import { api } from '@/lib/api';
import {
  type GetMovieListProps,
  type GetMovieProps,
  type GetMovieVideosResponse,
  type GetNowPlayingMoviesResponse,
  type GetPopularMoviesResponse,
} from '@/types/movie';

export const getNowPlayingMovies = async (
  params: GetMovieListProps
): Promise<GetNowPlayingMoviesResponse> => {
  const { language, page } = params;
  const url = `/movie/now_playing?page=${page}${
    language ? `&language=${language}` : ''
  }`;
  const { data } = await api.get<GetNowPlayingMoviesResponse>(url);
  return data;
};

export const getPopularMovies = async (
  params: GetMovieListProps
): Promise<GetPopularMoviesResponse> => {
  const { language, page } = params;
  const url = `/movie/popular?page=${page}${
    language ? `&language=${language}` : ''
  }`;
  const { data } = await api.get<GetPopularMoviesResponse>(url);
  return data;
};

export const getTopRatedMovies = async (
  params: GetMovieListProps
): Promise<GetPopularMoviesResponse> => {
  const { language, page } = params;
  const url = `/movie/top_rated?page=${page}${
    language ? `&language=${language}` : ''
  }`;
  const { data } = await api.get<GetPopularMoviesResponse>(url);
  return data;
};

export const getMovieVideos = async (
  params: GetMovieProps
): Promise<GetMovieVideosResponse> => {
  const { id } = params;
  const { data } = await api.get<GetMovieVideosResponse>(`/movie/${id}/videos`);
  return data;
};
