export interface GetMovieListProps {
  language?: string;
  page: number;
  region?: string;
}

export interface GetMovieProps {
  id: number;
  Language?: string;
}

export interface GetMovieListResponse {
  page: number;
  results: Movie[] | [];
  total_pages: number;
  total_results: number;
}

export interface GetDatedMovieListResponse extends GetMovieListResponse {
  dates: {
    maximum: string;
    minimum: string;
  };
}

export interface GetMovieVideosResponse {
  id: number;
  results: MovieVideo[];
}

export interface SearchMovieProps {
  query: string;
  include_adult?: boolean;
  language?: string;
  primary_release_year?: number;
  page?: number;
  region?: string;
  year?: string;
}
export interface MovieVideo {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
}

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
