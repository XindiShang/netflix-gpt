import { create } from 'zustand';
import { type Movie } from '@/types/movie';

interface GPTState {
  isGptEnabled: boolean;
  recommendedMovieTitles: string[];
  movieSearchResults: Movie[][] | Array<[]>;
}

interface GPTStore extends GPTState {
  toggleGpt: () => void;
  setTitlesAndResults: (payload: {
    titles: string[];
    results: Movie[][];
  }) => void;
  reset: () => void;
}

const useGptStore = create<GPTStore>((set) => ({
  isGptEnabled: false,
  recommendedMovieTitles: [],
  movieSearchResults: [],
  toggleGpt: () => {
    set((state) => ({ isGptEnabled: !state.isGptEnabled }));
  },
  setTitlesAndResults: ({ titles, results }) => {
    set({ recommendedMovieTitles: titles, movieSearchResults: results });
  },
  reset: () => {
    set({
      recommendedMovieTitles: [],
      movieSearchResults: [],
      isGptEnabled: false,
    });
  },
}));

export default useGptStore;
