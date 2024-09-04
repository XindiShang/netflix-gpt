import { FirebaseError } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { USER_AVATAR } from '@/lib/constants';
import { auth } from '@/lib/firebase.config';
import { translateError } from '@/lib/i18nTranslator';
import { type LoginBody, type RegisterBody } from '@/types/auth';

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
      const errorMessage = translateError(error.code);
      throw new Error(errorMessage);
    } else {
      throw new Error(translateError('auth/unknown-error'));
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
      const errorMessage = translateError(error.code);
      throw new Error(errorMessage);
    } else {
      throw new Error(translateError('auth/unknown-error'));
    }
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    if (error instanceof FirebaseError) {
      const errorMessage = translateError(error.code);
      throw new Error(errorMessage);
    } else {
      throw new Error(translateError('auth/unknown-error'));
    }
  }
};
