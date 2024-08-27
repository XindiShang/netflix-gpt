import { onAuthStateChanged } from 'firebase/auth';
import { create } from 'zustand';
import { auth } from '@/lib/firebase.config';
import storage from '@/lib/localStorage';
import { logger } from './logger';
import useGptStore from './useGptStore';

interface User {
  id: string;
  email: string | null;
  name?: string | null;
  avatar?: string | null;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

interface SetAuthDataPayload {
  user: User;
  token: string | null;
}

export interface AuthStore extends AuthState {
  setIsAuthenticated: (args: AuthState['isAuthenticated']) => void;
  setAuthData: (payload: SetAuthDataPayload) => void;
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
      setAuthData: ({ user, token }) => {
        storage.setItem('user', user);
        storage.setItem('token', token);
        set({ user, token, isAuthenticated: true });
      },
      clearAuthData: () => {
        const { reset } = useGptStore.getState();
        reset();

        storage.removeItem('user');
        storage.removeItem('token');
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    'authStore'
  )
);

// Listen for auth state changes, e.g. when session is expired or user logs in on another device
onAuthStateChanged(auth, (firebaseUser) => {
  const { setAuthData, clearAuthData } = useAuthStore.getState();

  // Use callback to avoid TypeScript's no-misused-promises error
  if (firebaseUser) {
    firebaseUser
      .getIdToken()
      .then((token) => {
        setAuthData({
          user: {
            id: firebaseUser.uid,
            email: firebaseUser.email,
            name: firebaseUser.displayName,
            avatar: firebaseUser.photoURL,
          },
          token,
        });
      })
      .catch((error) => {
        console.error('Failed to get token:', error);
      });
  } else {
    clearAuthData();
  }
});

export default useAuthStore;
