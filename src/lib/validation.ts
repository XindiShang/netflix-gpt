import { type TFunction } from 'i18next';
import * as yup from 'yup';

export const createLoginSchema = (t: TFunction) => {
  return yup.object().shape({
    email: yup
      .string()
      .email(t('validation.emailInvalid'))
      .required(t('validation.emailRequired')),
    password: yup
      .string()
      .min(8, t('validation.passwordMin'))
      .matches(/[A-Za-z]/, t('validation.passwordLetters'))
      .matches(/[0-9]/, t('validation.passwordNumbers'))
      .matches(/[\W_]/, t('validation.passwordSpecial'))
      .required(t('validation.passwordRequired')),
  });
};

export const createRegisterSchema = (t: TFunction) => {
  return yup.object().shape({
    userName: yup.string().required(t('validation.usernameRequired')),
    email: yup
      .string()
      .email(t('validation.emailInvalid'))
      .required(t('validation.emailRequired')),
    password: yup
      .string()
      .min(8, t('validation.passwordMin'))
      .matches(/[A-Za-z]/, t('validation.passwordLetters'))
      .matches(/[0-9]/, t('validation.passwordNumbers'))
      .matches(/[\W_]/, t('validation.passwordSpecial'))
      .required(t('validation.passwordRequired')),
    confirmPassword: yup
      .string()
      .required(t('validation.confirmPasswordRequired'))
      .oneOf([yup.ref('password')], t('validation.passwordsMustMatch')),
  });
};
