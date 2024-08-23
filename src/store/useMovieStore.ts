import { create } from 'zustand';
import type { Movie } from '@/types/movie';

interface MovieState {
  nowPlayingMovies: Movie[];
  popularMovies: Movie[];
  topRatedMovies: Movie[];
  upcomingMovies: Movie[];
  trailerVideo: any | null;
  movieDetails: Movie | null;
}

interface MovieStore extends MovieState {
  setNowPlayingMovies: (movies: Movie[]) => void;
  setPopularMovies: (movies: Movie[]) => void;
  setTopRatedMovies: (movies: Movie[]) => void;
  setUpcomingMovies: (movies: Movie[]) => void;
  setTrailerVideo: (video?: any) => void;
  clearTrailerVideo: () => void;
  setMovieDetails: (details: Movie) => void;
}

const useMovieStore = create<MovieStore>((set) => ({
  nowPlayingMovies: [],
  popularMovies: [],
  topRatedMovies: [],
  upcomingMovies: [],
  trailerVideo: null,
  movieDetails: null,
  setNowPlayingMovies: (movies) => {
    set({ nowPlayingMovies: movies });
  },
  setPopularMovies: (movies) => {
    set({ popularMovies: movies });
  },
  setTopRatedMovies: (movies) => {
    set({ topRatedMovies: movies });
  },
  setUpcomingMovies: (movies) => {
    set({ upcomingMovies: movies });
  },
  setTrailerVideo: (video) => {
    set({ trailerVideo: video });
  },
  clearTrailerVideo: () => {
    set({ trailerVideo: null });
  },
  setMovieDetails: (details) => {
    set({ movieDetails: details });
  },
}));

export default useMovieStore;
