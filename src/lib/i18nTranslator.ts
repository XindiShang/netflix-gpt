import i18n from 'i18next';

export const translateError = (errorCode: string) => {
  return i18n.t(`errors.${errorCode}`, i18n.t('errors.auth/unknown-error'));
};
