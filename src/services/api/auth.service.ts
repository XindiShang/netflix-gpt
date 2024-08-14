import { FirebaseError } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth } from '@/lib/firebase.config';
import { type LoginBody, type RegisterBody } from '@/types/auth';
import { USER_AVATAR } from '@/utils/constants';

// TODO: create a translation dictionary for error messages
export const login = async (body: LoginBody) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      body.email,
      body.password
    );

    const user = userCredential.user;

    const token = await user.getIdToken(true);

    return {
      ...user,
      token,
    };
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

    const user = userCredential.user;

    await updateProfile(user, {
      displayName: body.userName,
      photoURL: USER_AVATAR,
    });

    const token = await user.getIdToken(true);

    return {
      ...user,
      displayName: body.userName,
      token,
    };
  } catch (error) {
    if (error instanceof FirebaseError) {
      throw new Error(`Firebase error (${error.code}): ${error.message}`);
    } else {
      throw new Error('An unknown error occurred during registration.');
    }
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    if (error instanceof FirebaseError) {
      throw new Error(`Firebase error (${error.code}): ${error.message}`);
    } else {
      throw new Error('An unknown error occurred during logout.');
    }
  }
};
