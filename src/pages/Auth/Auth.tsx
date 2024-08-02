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
  const { setIsAuthenticated } = useAuthStore((state) => state);

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
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<LoginBody>({ resolver: yupResolver(loginSchema) });

  const {
    register: registerRegister,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors },
  } = useForm<RegisterBody>({ resolver: yupResolver(registerSchema) });

  useEffect(() => {
    if (isLoginError) {
      toast.error(loginError as string, { theme: 'colored' });
    }
    if (isRegisterError) {
      toast.error(registerError as string, { theme: 'colored' });
    }
  }, [isLoginError, isRegisterError]);

  const handleLogin: SubmitHandler<LoginBody> = async (data) => {
    try {
      await login(data);
      setIsAuthenticated(true);
    } catch (error) {
      const { message } = error as Error;
      toast.error(message, { theme: 'colored' });
    }
  };

  const handleRegister: SubmitHandler<RegisterBody> = async (data) => {
    try {
      await register(data);
      setIsAuthenticated(true);
    } catch (error) {
      const { message } = error as Error;
      toast.error(message, { theme: 'colored' });
    }
  };

  return (
    <div className="sm:px-[68px] sm:max-w-[450px] sm:w-[450px] w-full sm:py-12 card sm:bg-black/70 min-h-[707px] rounded">
      <h1 className="text-white card-title">
        {isLogin ? t('auth.loginTitle') : t('auth.registerTitle')}
      </h1>

      {isLogin ? (
        <LoginForm
          onSubmit={handleLoginSubmit(handleLogin)}
          register={loginRegister}
          errors={loginErrors}
          isLoading={isLoginLoading}
        />
      ) : (
        <RegisterForm
          onSubmit={handleRegisterSubmit(handleRegister)}
          register={registerRegister}
          errors={registerErrors}
          isLoading={isRegisterLoading}
        />
      )}

      <div className="py-8">
        <p className="text-base-300">
          {isLogin ? t('auth.newUser') : t('auth.alreadyHaveAccount')}{' '}
          <button
            className="text-primary"
            onClick={() => {
              toggleLogin(!isLogin);
            }}
          >
            {isLogin ? t('auth.registerLink') : t('auth.loginLink')}
          </button>
        </p>

        <p className="mt-6 text-sm text-base-300">
          {t('auth.terms')}
          <button className="text-info">{t('auth.termsLink')}</button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
