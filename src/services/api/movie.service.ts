import { api } from '@/lib/api';
import {
  type GetDatedMovieListResponse,
  type GetMovieListProps,
  type GetMovieListResponse,
  type GetMovieProps,
  type GetMovieVideosResponse,
  type MovieDetails,
  type SearchMovieProps,
} from '@/types/movie';

export const getNowPlayingMovies = async (
  params: GetMovieListProps
): Promise<GetDatedMovieListResponse> => {
  const { language, page } = params;
  const url = `/movie/now_playing?page=${page}${
    language ? `&language=${language}` : ''
  }`;
  const { data } = await api.get<GetDatedMovieListResponse>(url);
  return data;
};

export const getPopularMovies = async (
  params: GetMovieListProps
): Promise<GetMovieListResponse> => {
  const { language, page } = params;
  const url = `/movie/popular?page=${page}${
    language ? `&language=${language}` : ''
  }`;
  const { data } = await api.get<GetMovieListResponse>(url);
  return data;
};

export const getTopRatedMovies = async (
  params: GetMovieListProps
): Promise<GetMovieListResponse> => {
  const { language, page } = params;
  const url = `/movie/top_rated?page=${page}${
    language ? `&language=${language}` : ''
  }`;
  const { data } = await api.get<GetMovieListResponse>(url);
  return data;
};

export const getUpcomingMovies = async (
  params: GetMovieListProps
): Promise<GetDatedMovieListResponse> => {
  const { language, page } = params;
  const url = `/movie/upcoming?page=${page}${
    language ? `&language=${language}` : ''
  }`;
  const { data } = await api.get<GetDatedMovieListResponse>(url);
  return data;
};

export const getMovieVideos = async (
  params: GetMovieProps
): Promise<GetMovieVideosResponse> => {
  const { id } = params;
  const { data } = await api.get<GetMovieVideosResponse>(`/movie/${id}/videos`);
  return data;
};

export const getMovieDetails = async (
  params: GetMovieProps
): Promise<MovieDetails> => {
  const { id, language } = params;
  const url = `/movie/${id}${language ? `?language=${language}` : ''}`;
  const { data } = await api.get<MovieDetails>(url);
  return data;
};

export const searchMovies = async (
  params: SearchMovieProps
): Promise<GetMovieListResponse> => {
  const { query, ...optionalParams } = params;

  const urlParams = new URLSearchParams({ query });

  Object.entries(optionalParams).forEach(([key, value]) => {
    if (value !== undefined) {
      urlParams.append(key, value.toString());
    }
  });

  const url = `/search/movie?${urlParams.toString()}`;

  const { data } = await api.get<GetMovieListResponse>(url);
  return data;
};
