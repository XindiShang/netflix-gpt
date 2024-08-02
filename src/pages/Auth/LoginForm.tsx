import React from 'react';
import { type FieldErrors } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Button from '@/components/Button';
import Input from '@/components/Input/Input';
import { type LoginBody } from '@/types/auth';

interface LoginFormProps {
  onSubmit: () => void;
  register: any;
  errors: FieldErrors<LoginBody>;
  isLoading: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  register,
  errors,
  isLoading,
}) => {
  const { t } = useTranslation();

  return (
    <form onSubmit={onSubmit}>
      <div className="gap-4 px-0 card-body">
        <Input
          errors={errors}
          placeholder={t('auth.email')}
          label={t('auth.email')}
          id="email"
          register={register}
          name="email"
        />
        <Input
          errors={errors}
          placeholder={t('auth.password')}
          label={t('auth.password')}
          type="password"
          register={register}
          name="password"
        />
      </div>
      <div className="justify-center card-actions">
        <Button
          text={t('auth.loginAction')}
          type="submit"
          className="btn btn-block btn-primary"
          isLoading={isLoading}
        />
      </div>
    </form>
  );
};

export default LoginForm;
