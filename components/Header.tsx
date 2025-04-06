import { useTranslation } from 'next-i18next';
import { FC } from 'react';

const Header: FC = () => {
  const { t, i18n } = useTranslation('common');

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 bg-gradient-to-br from-[#5C33F6] to-[#7B9AFF] rounded-full shadow-md animate-slowspin"
              style={{
                clipPath: 'polygon(50% 0%, 80% 20%, 100% 50%, 80% 80%, 50% 100%, 20% 80%, 0% 50%, 20% 20%)',
              }}
              aria-hidden="true"
            ></div>
            <span className="font-bold text-lg">Trend Copilot</span>
          </div>
          <div className="flex items-center gap-4">
            <select 
              className="text-sm bg-transparent border border-gray-200 dark:border-gray-700 rounded-md px-2 py-1"
              onChange={(e) => {
                window.location.pathname = e.target.value === 'en' ? '/' : `/${e.target.value}`;
              }}
              defaultValue={i18n.language || 'en'}
              aria-label={t('language.label')}
            >
              <option value="en">{t('language.en')}</option>
              <option value="fr">{t('language.fr')}</option>
            </select>
            <button 
              className="text-white bg-[#5C33F6] hover:bg-[#4826C9] px-4 py-2 rounded-lg text-sm font-medium transition-all transform hover:-translate-y-0.5"
              onClick={() => document.getElementById('signup-form')?.scrollIntoView({ behavior: 'smooth' })}
              aria-label={i18n.language === 'en' ? "Join waitlist" : "Rejoindre la liste d'attente"}
            >
              {t('cta.join', 'Join Waitlist')}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;