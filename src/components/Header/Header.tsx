import { useTranslation } from 'react-i18next';
import I18nIcon from '@/assets/icons/i18n.svg?react';
import useAuthStore from '@/store/useAuthStore';
import type { Language } from '@/types/i18n';
import { languageNames, LOGO } from '@/utils/constants';

// TODO: 1. Sign out using firebase auth 2. Decide whether to use collapse menu
const Header = () => {
  const { i18n } = useTranslation();
  const { isAuthenticated, clearAuthData, user } = useAuthStore(
    (state) => state
  );

  const currentLanguage = i18n.language as Language;

  const changeLanguage = async (language: string) => {
    await i18n.changeLanguage(language);
  };

  return (
    <nav>
      <div className="navbar">
        <div className="navbar-start">
          <a href="/">
            <img
              src={LOGO}
              alt="logo"
              className="w-28 sm:w-36 md:w-40 xl:w-44 max-w-44"
            />
          </a>
        </div>

        {/* collapse menu */}
        {/* <div className="navbar-end">
          <div className="text-slate-500 dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-secondary text-white rounded-box w-52">
              {
                isAuthenticated && (
                  <>
                    <li>
                      <a
                        className='bg-secondary hover:bg-slate-500/30 hover:text-primary focus:!text-primary'
                      >
                        <div className="avatar">
                          <div className="w-6 rounded-full">
                            <img src={user?.avatar as string} />
                          </div>
                        </div>
                        <span>{user?.name}</span>
                      </a>
                    </li>
                    <li>
                      <a
                        className='bg-secondary hover:bg-slate-500/30 hover:text-primary focus:!text-primary'
                        onClick={clearAuthData}
                      >
                        Logout
                      </a>
                    </li>
                  </>
                )
              }
            </ul>
          </div>
        </div> */}

        {/* Add hidden if use collapse menu */}
        <div className="items-center space-x-3 navbar-end lg:flex">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="font-medium !text-white btn btn-sm bg-secondary btn-outline rounded-btn"
            >
              <I18nIcon className="w-6 h-6" />
              <span>{`${languageNames[currentLanguage]}`}</span>
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content text-white bg-secondary border-white border rounded-box z-[1] mt-4 w-52 p-2 shadow"
            >
              {Object.keys(languageNames).map((lng) => (
                <li key={lng}>
                  <button
                    className="bg-secondary hover:bg-slate-500/30 hover:text-primary focus:!text-primary"
                    onClick={async () => {
                      await changeLanguage(lng);
                    }}
                  >
                    {/* set checked if current language */}
                    <span className="w-4 text-center">
                      {currentLanguage === lng ? '✔' : ''}
                    </span>
                    {languageNames[lng as Language]}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {isAuthenticated && (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={user?.avatar as string} />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-secondary text-white rounded-box w-52"
              >
                <li>
                  <a className="bg-secondary hover:bg-slate-500/30 hover:text-primary focus:!text-primary">
                    Profile
                    <span className="badge badge-primary">New</span>
                  </a>
                </li>
                <li>
                  <a
                    className="bg-secondary hover:bg-slate-500/30 hover:text-primary focus:!text-primary"
                    onClick={clearAuthData}
                  >
                    Logout
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
