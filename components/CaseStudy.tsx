import { useTranslation } from 'next-i18next';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const CaseStudy: FC = () => {
  const { t, i18n } = useTranslation('caseStudy');
  const [isReady, setIsReady] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (i18n.language) setIsReady(true);
  }, [i18n.language]);

  if (!isReady) return null;

  console.log("bio =", t('bio')); // DEBUG ✔️

  return (
    <section className="w-full py-20 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        
        {/* Profil */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          {imageError ? (
            <img
              src="https://via.placeholder.com/120x120.png?text=Sofia"
              alt="Sofia"
              className="w-28 h-28 rounded-full shadow-lg object-cover"
            />
          ) : (
            <Image
              src="/images/avatarsofia.jpeg"
              alt="Sofia - Trend Copilot user"
              width={120}
              height={120}
              className="rounded-full shadow-lg object-cover"
              onError={() => setImageError(true)}
            />
          )}
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-4">
            {t('name')}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {t('role')}
          </p>
          <p className="mt-4 max-w-sm text-gray-700 dark:text-gray-300">
            {t('bio')}
          </p>
        </div>

        {/* Contenu généré */}
        <div className="w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {t('title')}
          </h2>
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-md space-y-4">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              {t('aiGeneratedPost')}
            </p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {t('postTitle')}
            </p>
            <p className="text-gray-700 dark:text-gray-300">{t('postText')}</p>
            <div className="flex flex-wrap gap-2 mt-2 text-sm text-indigo-600 dark:text-indigo-300 font-medium">
              {(t('hashtags') || '')
                .split(',')
                .map((tag, idx) => (
                  <span key={idx}>#{tag.trim()}</span>
                ))}
            </div>
            <div className="text-sm mt-4 text-gray-500 dark:text-gray-400">
              {t('performance')}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudy;
