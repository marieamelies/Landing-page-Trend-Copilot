import { useTranslation } from 'next-i18next';
import type { FC } from 'react';
import { useEffect, useState } from 'react';

const CaseStudy: FC = () => {
  const { t, i18n } = useTranslation('caseStudy');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (i18n.language) setIsReady(true);
  }, [i18n.language]);

  if (!isReady) return null;

  return (
    <section className="w-full py-20 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          {t('title')}
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
          {t('bio')}
        </p>
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
    </section>
  );
};

export default CaseStudy;

