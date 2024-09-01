import { create } from 'zustand';
import { type Movie } from '@/types/movie';

interface GPTState {
  isSearchError: boolean;
  isSearching: boolean;
  recommendedMovieTitles: string[];
  movieSearchResults: Movie[][];
}

interface GPTStore extends GPTState {
  setTitlesAndResults: (payload: {
    titles: string[];
    results: Movie[][];
  }) => void;
  setSearchError: (value: boolean) => void;
  setSearching: (value: boolean) => void;
  reset: () => void;
}

const useGptStore = create<GPTStore>((set) => ({
  isSearchError: false,
  isSearching: false,
  recommendedMovieTitles: [],
  movieSearchResults: [],
  setTitlesAndResults: ({ titles, results }) => {
    set({ recommendedMovieTitles: titles, movieSearchResults: results });
  },
  setSearchError: (value) => {
    set({ isSearchError: value });
  },
  setSearching: (value) => {
    set({ isSearching: value });
  },
  reset: () => {
    set({
      recommendedMovieTitles: [],
      movieSearchResults: [],
      isSearchError: false,
      isSearching: false,
    });
  },
}));

export default useGptStore;
