import React from 'react';
import { type FieldErrors } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Button from '@/components/Button';
import Input from '@/components/Input/Input';
import { type RegisterBody } from '@/types/auth';

interface RegisterFormProps {
  onSubmit: () => void;
  register: any;
  errors: FieldErrors<RegisterBody>;
  isLoading: boolean;
  toggleLogin: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  onSubmit,
  register,
  errors,
  isLoading,
  toggleLogin,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <h1 className="text-white card-title">{t('auth.registerTitle')}</h1>

      <form onSubmit={onSubmit}>
        <div className="gap-4 px-0 card-body">
          <Input
            errors={errors}
            placeholder={t('auth.userName')}
            // label={t('auth.userName')}
            id="userName"
            register={register}
            name="userName"
          />
          <Input
            errors={errors}
            placeholder={t('auth.email')}
            // label={t('auth.email')}
            id="email"
            register={register}
            name="email"
          />
          <Input
            errors={errors}
            placeholder={t('auth.password')}
            // label={t('auth.password')}
            type="password"
            register={register}
            name="password"
          />
          <Input
            errors={errors}
            placeholder={t('auth.confirmPassword')}
            // label={t('auth.confirmPassword')}
            type="password"
            register={register}
            name="confirmPassword"
          />
        </div>
        <div className="justify-center card-actions">
          <Button
            text={t('auth.registerAction')}
            type="submit"
            className="btn btn-block btn-primary"
            isLoading={isLoading}
          />
        </div>
      </form>

      <div className="py-8">
        <p className="text-base-300">
          {t('auth.alreadyHaveAccount')}{' '}
          <button className="text-primary" onClick={toggleLogin}>
            {t('auth.loginLink')}
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

export default RegisterForm;
