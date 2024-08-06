import { create } from 'zustand';
import storage from '@/lib/localStorage';
import { logger } from './logger';

interface GlobalState {
  isMenuOpen: boolean;
}

export interface GlobalStore extends GlobalState {
  toggleMenu: () => void;
}

const initialState: Pick<GlobalStore, keyof GlobalState> = {
  isMenuOpen: storage.getItem('isMenuOpen') ?? false,
};

const useGlobalStore = create<GlobalStore>()(
  logger<GlobalStore>(
    (set) => ({
      ...initialState,
      toggleMenu: () => {
        set((state) => {
          storage.setItem('isMenuOpen', !state.isMenuOpen);
          return { isMenuOpen: !state.isMenuOpen };
        });
      },
    }),
    'globalStore'
  )
);

export default useGlobalStore;
