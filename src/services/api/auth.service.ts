import { type LoginBody } from '@/types/auth';

// Dummy login request that will resolve in 2 seconds
export const login = async (body: LoginBody) => {
  const res = new Promise<boolean>((resolve, reject) => {
    if (body.userLoginId !== 'user' || body.password !== 'user') {
      // wait for 2 seconds before rejecting
      setTimeout(() => {
        reject(new Error('Invalid email or password'));
      }, 2000);
    }

    setTimeout(() => {
      resolve(true);
    }, 2000);
  });
  return await res;
};
