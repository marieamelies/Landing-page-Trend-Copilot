import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Terms() {
  const { t } = useTranslation('legal');

  return (
    <div className="min-h-screen py-20 px-4 bg-white dark:bg-black text-center">
      <Head>
        <title>{t('termsTitle')} | Trend Copilot</title>
      </Head>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          {t('termsTitle')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {t('termsText')}
        </p>
      </div>
    </div>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['legal']))
    }
  };
}
