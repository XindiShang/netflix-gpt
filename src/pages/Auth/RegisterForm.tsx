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
}

const RegisterForm: React.FC<RegisterFormProps> = ({
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
          placeholder={t('auth.userName')}
          label={t('auth.userName')}
          id="userName"
          register={register}
          name="userName"
        />
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
        <Input
          errors={errors}
          placeholder={t('auth.confirmPassword')}
          label={t('auth.confirmPassword')}
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
  );
};

export default RegisterForm;
