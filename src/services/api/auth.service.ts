import { FirebaseError } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  type User as FirebaseUser,
} from 'firebase/auth';
import { auth } from '@/lib/firebase.config';
import { type LoginBody, type RegisterBody } from '@/types/auth';

// This is because the current version of Firebase excludes the stsTokenManager property in the User object.
interface User extends FirebaseUser {
  stsTokenManager: {
    accessToken: string;
    expirationTime: number;
    refreshToken: string;
  };
}

// TODO: create a translation dictionary for error messages
export const login = async (body: LoginBody) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      body.email,
      body.password
    );
    return userCredential.user as User;
  } catch (error) {
    if (error instanceof FirebaseError) {
      throw new Error(`Firebase error (${error.code}): ${error.message}`);
    } else {
      throw new Error('An unknown error occurred during login.');
    }
  }
};

export const register = async (body: RegisterBody) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      body.email,
      body.password
    );
    return userCredential.user as User;
  } catch (error) {
    if (error instanceof FirebaseError) {
      throw new Error(`Firebase error (${error.code}): ${error.message}`);
    } else {
      throw new Error('An unknown error occurred during registration.');
    }
  }
};
