import { useEffect } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@/components/Button';
import Input from '@/components/Input/Input';
import { loginSchema } from '@/lib/validation';
import { useLoginQuery } from '@/services/queries/auth.query';
import useAuthStore from '@/store/useAuthStore';
import { type LoginBody } from '@/types/auth';
import { BRAND_NAME } from '@/utils/constants';

const Login = () => {
  const { setIsAuthenticated } = useAuthStore((state) => state);
  const { isLoading, mutateAsync: login, isError, error } = useLoginQuery();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginBody>({ resolver: yupResolver(loginSchema) });

  useEffect(() => {
    if (isError) {
      toast.error(error as string, { theme: 'colored' });
    }
  }, [isError]);

  const onSubmit: SubmitHandler<LoginBody> = async (data) => {
    try {
      await login(data);
      setIsAuthenticated(true);
    } catch (error) {
      const { message } = error as Error;
      toast.error(message, { theme: 'colored' });
    }
  };

  return (
    <div className="sm:px-[68px] sm:max-w-[450px] sm:w-[450px] w-full sm:py-12 card sm:bg-black/70 min-h-[707px] rounded">
      <h1 className="text-white card-title">Sign In</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="gap-4 px-0 card-body">
          <Input
            errors={errors}
            placeholder="Email"
            label="Email"
            id="userLoginId"
            register={register}
            name="userLoginId"
          />
          <Input
            errors={errors}
            placeholder="Password"
            label="Password"
            type="password"
            register={register}
            name="password"
          />
        </div>

        <div className="justify-center card-actions">
          <Button
            text="Sign In"
            type="submit"
            className="btn btn-block btn-primary"
            isLoading={isLoading}
          ></Button>
        </div>
      </form>

      <div className="py-8">
        <p className="text-base-300">
          New to {BRAND_NAME}?{' '}
          <a href="/signup" className="text-primary">
            Sign up now.
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
