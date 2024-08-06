import { useTranslation } from 'react-i18next';
import I18nIcon from '@/assets/icons/i18n.svg?react';
import Button from '@/components/Button';
import useAuthStore from '@/store/useAuthStore';
import type { Language } from '@/types/i18n';
import { languageNames, LOGO } from '@/utils/constants';

const Header = () => {
  const { i18n } = useTranslation();
  const { isAuthenticated, clearAuthData } = useAuthStore((state) => state);

  const currentLanguage = i18n.language as Language;

  const changeLanguage = async (language: string) => {
    await i18n.changeLanguage(language);
  };

  return (
    <nav>
      <div className="px-8 py-2">
        <div className="flex justify-between">
          <div>
            <a href="/">
              <img
                src={LOGO}
                alt="logo"
                className="w-28 sm:w-36 md:w-40 xl:w-44 max-w-44"
              />
            </a>
          </div>
          <div className="items-center hidden space-x-3 md:flex">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="font-medium text-white btn btn-sm btn-secondary rounded-btn"
              >
                <I18nIcon className="w-6 h-6" />
                <span>{`${languageNames[currentLanguage]}`}</span>
              </div>
              <ul
                tabIndex={0}
                className="menu dropdown-content text-white bg-secondary rounded-box z-[1] mt-4 w-52 p-2 shadow"
              >
                {Object.keys(languageNames).map((lng) => (
                  <li key={lng}>
                    <button
                      className="bg-secondary hover:bg-slate-500/30 focus:text-white"
                      onClick={async () => {
                        await changeLanguage(lng);
                      }}
                    >
                      {languageNames[lng as Language]}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <a
              href="https://github.com/akhil-neoito/react-query-zustand-ts-vite-boilerplate"
              className="px-2 py-2 font-medium text-white transition duration-300 bg-blue-500 rounded hover:bg-blue-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#fff"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            {isAuthenticated && (
              <Button
                text="Logout"
                className="px-3 py-3 text-xs font-medium text-white transition duration-300 bg-blue-500 rounded hover:bg-blue-400"
                onClick={clearAuthData}
              />
            )}
          </div>
          {/* TODO: mobile menu, add menu items */}
          <div className="flex items-center md:hidden">
            <button className="outline-none mobile-menu-button">
              <svg
                className="w-6 h-6 text-gray-500 hover:text-blue-500"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
