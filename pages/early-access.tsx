import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const EarlyAccess = () => {
  const { t, i18n } = useTranslation('early');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (i18n.language) setIsReady(true);
  }, [i18n.language]);

  if (!isReady) return null;

  return (
    <>
      <Head>
        <title>{t('meta.title')}</title>
        <meta name="description" content={t('meta.description')} />
      </Head>
      <section className="w-full py-20 px-4 bg-white dark:bg-black min-h-screen snap-start">
        <div className="max-w-2xl mx-auto text-center animate-fadeInUp">
          <p className="text-sm font-semibold text-indigo-600 uppercase mb-2 tracking-wider">
            {t('beta')}
          </p>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            {t('title')}
          </h1>
          <p className="text-gray-700 dark:text-gray-300 mb-8">
            {t('subtitle')}
          </p>
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-xl">
            <p className="text-gray-800 dark:text-gray-100 font-medium mb-4">
              {t('content')}
            </p>
            <a
              href="mailto:hello@trendcopilot.ai"
              className="inline-block mt-4 bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 px-6 rounded-lg transition shadow-lg hover:-translate-y-0.5"
            >
              {t('cta')}
            </a>
          </div>
          <div className="mt-10 text-sm text-gray-600 dark:text-gray-400">
            <Link href="#top" scroll={false} className="underline text-indigo-600 hover:text-indigo-400">
              {t('backToTop', 'Retour en haut de page')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default EarlyAccess;
