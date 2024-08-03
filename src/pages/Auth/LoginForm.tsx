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
  toggleLogin: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  register,
  errors,
  isLoading,
  toggleLogin,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <h1 className="text-white card-title">{t('auth.loginTitle')}</h1>

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

      <div className="py-8">
        <p className="text-base-300">
          {t('auth.newUser')}{' '}
          <button className="text-primary" onClick={toggleLogin}>
            {t('auth.registerLink')}
          </button>
        </p>

        <p className="mt-6 text-sm text-base-300">
          {t('auth.terms')}
          <button className="text-info">{t('auth.termsLink')}</button>
        </p>
      </div>
    </>
  );
};

export default LoginForm;
