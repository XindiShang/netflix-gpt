import { create } from 'zustand';
import { type Movie } from '@/types/movie';

interface GPTState {
  isGptEnabled: boolean;
  isSearchError: boolean;
  isSearching: boolean;
  recommendedMovieTitles: string[];
  movieSearchResults: Movie[][];
}

interface GPTStore extends GPTState {
  toggleGpt: () => void;
  setTitlesAndResults: (payload: {
    titles: string[];
    results: Movie[][];
  }) => void;
  setSearchError: (value: boolean) => void;
  setSearching: (value: boolean) => void;
  reset: () => void;
}

const useGptStore = create<GPTStore>((set) => ({
  isGptEnabled: false,
  isSearchError: false,
  isSearching: false,
  recommendedMovieTitles: [],
  movieSearchResults: [],
  toggleGpt: () => {
    set((state) => ({ isGptEnabled: !state.isGptEnabled }));
  },
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
      isGptEnabled: false,
      isSearchError: false,
      isSearching: false,
    });
  },
}));

export default useGptStore;
