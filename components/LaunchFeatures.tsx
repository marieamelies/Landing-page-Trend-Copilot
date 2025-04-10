import { useTranslation } from 'next-i18next';
import { FC, useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';

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
  ];

  return (
    <section className="w-full py-20 px-4 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6">
          {t('title')}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          {t('subtitle', 'Everything you get at launch — already live.')}
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg p-6 text-left transition hover:shadow-xl"
            >
              <div className="flex items-start gap-4">
                <CheckCircle className="text-indigo-600 dark:text-indigo-400 mt-1" size={28} />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LaunchFeatures;
