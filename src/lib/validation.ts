import * as yup from 'yup';

export const createLoginSchema = (t: (key: string) => string) => {
  return yup.object().shape({
    email: yup.string().required(t('validation.emailRequired')),
    password: yup.string().required(t('validation.passwordRequired')),
  });
};

export const createRegisterSchema = (t: (key: string) => string) => {
  return yup.object().shape({
    userName: yup.string().required(t('validation.usernameRequired')),
    email: yup.string().required(t('validation.emailRequired')),
    password: yup.string().required(t('validation.passwordRequired')),
    confirmPassword: yup
      .string()
      .required(t('validation.confirmPasswordRequired'))
      .oneOf([yup.ref('password')], t('validation.passwordsMustMatch')),
  });
};
