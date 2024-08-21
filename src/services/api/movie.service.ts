import { api } from '@/lib/api';
import {
  type GetPopularMoviesProps,
  type GetPopularMoviesResponse,
} from '@/types/movie';

export const getPopularMovies = async (
  params: GetPopularMoviesProps
): Promise<GetPopularMoviesResponse> => {
  const { language, page } = params;
  const { data } = await api.get<GetPopularMoviesResponse>(
    `/movie/popular?language=${language}&page=${page}`
  );
  return data;
};
