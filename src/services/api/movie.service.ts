import { api } from '@/lib/api';
import {
  type GetDatedMovieListResponse,
  type GetMovieListProps,
  type GetMovieListResponse,
  type GetMovieProps,
  type GetMovieVideosResponse,
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
