import { login } from '../auth.service';

describe('login', () => {
  it('should return true on successfull login', async () => {
    const body = { email: 'user', password: 'user' };
    const res = await login(body);
    expect(res).toBe(true);
  });

  it('should throw error message on failed login', async () => {
    expect.assertions(1);
    try {
      const body = { email: 'user', password: 'wrong' };
      await login(body);
    } catch (err) {
      expect(err).toMatch('Invalid email or password');
    }
  });
});
