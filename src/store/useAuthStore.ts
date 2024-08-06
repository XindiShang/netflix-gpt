import { create } from 'zustand';
import storage from '@/lib/localStorage';
import { logger } from './logger';

interface User {
  id: string;
  email: string | null;
  name?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

export interface AuthStore extends AuthState {
  setIsAuthenticated: (args: AuthState['isAuthenticated']) => void;
  setAuthData: (user: User, token: string) => void;
  clearAuthData: () => void;
}

const initialState: Pick<AuthStore, keyof AuthState> = {
  isAuthenticated: storage.getItem<string>('token') !== null,
  user: storage.getItem<User>('user'),
  token: storage.getItem<string>('token'),
};

const useAuthStore = create<AuthStore>()(
  logger<AuthStore>(
    (set) => ({
      ...initialState,
      setIsAuthenticated: (isAuthenticated) => {
        set(() => ({ isAuthenticated }));
      },
      setAuthData: (user, token) => {
        storage.setItem('user', user);
        storage.setItem('token', token);
        set(() => ({ user, token, isAuthenticated: true }));
      },
      clearAuthData: () => {
        storage.removeItem('user');
        storage.removeItem('token');
        set(() => ({ user: null, token: null, isAuthenticated: false }));
      },
    }),
    'authStore'
  )
);

export default useAuthStore;
