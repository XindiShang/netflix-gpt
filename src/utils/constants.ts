import type { Language } from '@/types/i18n';

export const LOGO =
  'https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png';

export const HERO_BACKGROUND =
  'https://assets.nflxext.com/ffe/siteui/vlv3/655a9668-b002-4262-8afb-cf71e45d1956/1461adb6-5183-4a48-8346-d14d7250302c/US-en-20240715-POP_SIGNUP_TWO_WEEKS-perspective_WEB_8b32f466-39f1-47d0-ade1-7bbf83666948_large.jpg';

export const USER_AVATAR =
  'https://occ-0-6247-2164.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABdpkabKqQAxyWzo6QW_ZnPz1IZLqlmNfK-t4L1VIeV1DY00JhLo_LMVFp936keDxj-V5UELAVJrU--iUUY2MaDxQSSO-0qw.png?r=e6e';

export const IMG_CDN_URL = 'https://image.tmdb.org/t/p/w500';

export const BG_URL =
  'https://assets.nflxext.com/ffe/siteui/vlv3/20bf1f4d-1c73-48fd-8689-310d6dd80efc/304b7563-abfe-41bf-95d0-8bb58c03bea6/US-en-20240812-POP_SIGNUP_TWO_WEEKS-perspective_WEB_633da30f-4247-4a0f-b146-0501cbf91542_large.jpg';

export const BRAND_NAME = 'Netflix';

interface SupportedLanguage {
  identifier: Language;
  name: string;
}
export const supportedLanguages: SupportedLanguage[] = [
  {
    identifier: 'en-US',
    name: 'English',
  },
  {
    identifier: 'zh-CN',
    name: '简体中文',
  },
];

export const SENSITIVE_CONTENT_KEYWORDS = ['explicit content', 'I cannot'];
