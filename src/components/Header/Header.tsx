import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  HomeIcon,
  LanguageIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { LOGO, supportedLanguages, USER_AVATAR } from '@/lib/constants';
import { useLogoutQuery } from '@/services/queries/auth.query';
import useAuthStore from '@/store/useAuthStore';
import type { Language } from '@/types/i18n';

const Header = () => {
  const { i18n, t } = useTranslation();
  const { pathname } = useLocation();

  const { isAuthenticated, clearAuthData, user } = useAuthStore();

  const {
    isLoading: isLogoutLoading,
    mutateAsync: logout,
    isError: isLogoutError,
    error: logoutError,
  } = useLogoutQuery();

  const currentLanguage = i18n.language as Language;

  const changeLanguage = async (language: string) => {
    await i18n.changeLanguage(language);
  };

  const handleLogout = async () => {
    try {
      await logout();
      clearAuthData();
    } catch (error) {
      const { message } = error as Error;
      toast.error(message, { theme: 'colored' });
    }
  };

  useEffect(() => {
    if (isLogoutError) {
      toast.error(logoutError as string, { theme: 'colored' });
    }
  }, [isLogoutError]);

  return (
    <nav className="absolute z-20 w-full">
      <div className="navbar md:px-24">
        <div className="navbar-start">
          <a href="/">
            <img
              src={LOGO}
              alt="logo"
              className="w-28 sm:w-36 md:w-40 xl:w-44 max-w-44"
            />
          </a>
        </div>

        <div className="items-center space-x-3 navbar-end lg:flex">
          {/* GPT Search */}
          {isAuthenticated && (
            <Link to={pathname === '/search' ? '/' : '/search'}>
              <button className="text-white btn btn-circle btn-ghost">
                {pathname === '/search' ? (
                  <HomeIcon className="w-6 h-6" />
                ) : (
                  <MagnifyingGlassIcon className="w-6 h-6" />
                )}
              </button>
            </Link>
          )}

          {/* Language Switcher */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="font-medium !text-white btn btn-sm bg-secondary btn-outline rounded-btn flex-nowrap"
            >
              <LanguageIcon className="w-6 h-6" />
              <span className="w-10 overflow-hidden md:w-auto whitespace-nowrap text-ellipsis">
                {
                  supportedLanguages.find(
                    (lang) => lang.identifier === currentLanguage
                  )?.name
                }
              </span>
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content text-white bg-secondary border-white border rounded-box z-[1] mt-4 w-52 p-2 shadow"
            >
              {supportedLanguages.map(({ identifier, name }) => (
                <li key={identifier}>
                  <button
                    className="bg-secondary hover:bg-slate-500/30 hover:text-primary focus:!text-primary"
                    onClick={async () => {
                      await changeLanguage(identifier);
                    }}
                  >
                    <span className="w-4 text-center">
                      {currentLanguage === identifier ? '✔' : ''}
                    </span>
                    {name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* User Avatar */}
          {isAuthenticated && (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={(user?.avatar as string) || USER_AVATAR} />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-secondary text-white rounded-box w-52"
              >
                <li>
                  <a className="bg-secondary hover:bg-slate-500/30 hover:text-primary focus:!text-primary">
                    {t('user.profile')}
                    <span className="badge badge-ghost">{t('badges.dev')}</span>
                  </a>
                </li>
                <li>
                  <a
                    className="bg-secondary hover:bg-slate-500/30 hover:text-primary focus:!text-primary"
                    onClick={handleLogout}
                  >
                    {t('user.logOut')}
                    {isLogoutLoading && (
                      <span className="self-end loading loading-spinner"></span>
                    )}
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
