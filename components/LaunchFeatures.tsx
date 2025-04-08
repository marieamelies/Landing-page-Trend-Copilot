import { useTranslation } from 'next-i18next';
import { FC, useEffect, useState } from 'react';

const LaunchFeatures: FC = () => {
  const { t, i18n } = useTranslation('launchFeatures');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (i18n.language) setIsReady(true);
  }, [i18n.language]);

  if (!isReady) return null;

  const features = [
    { title: t('item1.title'), description: t('item1.desc') },
    { title: t('item2.title'), description: t('item2.desc') },
    { title: t('item3.title'), description: t('item3.desc') },
    { title: t('item4.title'), description: t('item4.desc') },
    { title: t('item5.title'), description: t('item5.desc') },
    { title: t('item6.title'), description: t('item6.desc') },
    { title: t('item7.title'), description: t('item7.desc') }

  ];

  return (
    <section className="w-full py-20 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">
          {t('title')}
        </h2>
        <div className="grid gap-8 md:grid-cols-2 text-left">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mt-2">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LaunchFeatures;
