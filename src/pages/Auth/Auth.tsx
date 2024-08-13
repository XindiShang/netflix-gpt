import { useEffect } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import { useToggle } from '@uidotdev/usehooks';
import { createLoginSchema, createRegisterSchema } from '@/lib/validation';
import { useLoginQuery, useRegisterQuery } from '@/services/queries/auth.query';
import useAuthStore from '@/store/useAuthStore';
import { type LoginBody, type RegisterBody } from '@/types/auth';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const Auth = () => {
  const { t } = useTranslation();
  const [isLogin, toggleLogin] = useToggle(true);
  const { setAuthData } = useAuthStore((state) => state);

  const {
    isLoading: isLoginLoading,
    mutateAsync: login,
    isError: isLoginError,
    error: loginError,
  } = useLoginQuery();
  const {
    isLoading: isRegisterLoading,
    mutateAsync: register,
    isError: isRegisterError,
    error: registerError,
  } = useRegisterQuery();

  const loginSchema = createLoginSchema(t);
  const registerSchema = createRegisterSchema(t);

  const {
    register: loginFormRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
    reset: resetLogin,
  } = useForm<LoginBody>({ resolver: yupResolver(loginSchema) });

  const {
    register: registerFormRegister,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors },
    reset: resetRegister,
  } = useForm<RegisterBody>({ resolver: yupResolver(registerSchema) });

  useEffect(() => {
    if (isLoginError) {
      toast.error(loginError as string, { theme: 'colored' });
    }
    if (isRegisterError) {
      toast.error(registerError as string, { theme: 'colored' });
    }
  }, [isLoginError, isRegisterError]);

  useEffect(() => {
    // Clear form fields when switching between login and register forms
    isLogin ? resetRegister() : resetLogin();
  }, [isLogin]);

  const handleLogin: SubmitHandler<LoginBody> = async (data) => {
    try {
      const { uid, email, displayName, token, photoURL } = await login(data);
      const user = {
        id: uid,
        email,
        name: displayName,
        photoURL,
      };
      setAuthData({ user, token });
    } catch (error) {
      const { message } = error as Error;
      toast.error(message, { theme: 'colored' });
    }
  };

  const handleRegister: SubmitHandler<RegisterBody> = async (data) => {
    try {
      const { uid, email, displayName, token, photoURL } = await register(data);
      const user = {
        id: uid,
        email,
        name: displayName,
        photoURL,
      };
      setAuthData({ user, token });
    } catch (error) {
      const { message } = error as Error;
      toast.error(message, { theme: 'colored' });
    }
  };

  return (
    <div className="sm:px-[68px] sm:max-w-[450px] sm:w-[450px] w-full sm:py-12 card sm:bg-black/70 min-h-[707px] rounded">
      {isLogin ? (
        <LoginForm
          onSubmit={handleLoginSubmit(handleLogin)}
          register={loginFormRegister}
          errors={loginErrors}
          isLoading={isLoginLoading}
          toggleLogin={toggleLogin}
        />
      ) : (
        <RegisterForm
          onSubmit={handleRegisterSubmit(handleRegister)}
          register={registerFormRegister}
          errors={registerErrors}
          isLoading={isRegisterLoading}
          toggleLogin={toggleLogin}
        />
      )}
    </div>
  );
};

export default Auth;
