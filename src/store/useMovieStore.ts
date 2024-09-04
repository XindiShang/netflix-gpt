import { create } from 'zustand';

interface MovieState {
  trailerVideo: any | null;
}

interface MovieStore extends MovieState {
  setTrailerVideo: (video?: any) => void;
  reset: () => void;
}

const useMovieStore = create<MovieStore>((set) => ({
  trailerVideo: null,
  setTrailerVideo: (video) => {
    set({ trailerVideo: video });
  },
  reset: () => {
    set({ trailerVideo: null });
  },
}));

export default useMovieStore;
