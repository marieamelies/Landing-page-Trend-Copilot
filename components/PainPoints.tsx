import { useTranslation } from 'next-i18next';
import type { FC } from 'react';
import { useEffect, useState } from 'react';

const PainPoints: FC = () => {
  const { t, i18n } = useTranslation('pain');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (i18n.language) setIsReady(true);
  }, [i18n.language]);

  if (!isReady) return null;

  const pains = [
    { title: t('item1.title'), desc: t('item1.desc') },
    { title: t('item2.title'), desc: t('item2.desc') },
    { title: t('item3.title'), desc: t('item3.desc') },
    { title: t('item4.title'), desc: t('item4.desc') },
    { title: t('item5.title'), desc: t('item5.desc') },
    { title: t('item6.title'), desc: t('item6.desc') },
    { title: t('item7.title'), desc: t('item7.desc') }
  ];

  return (
    <section className="w-full px-4 py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {t('title')}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-12">
          {t('subtitle')}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {pains.map((pain, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                <span className="mr-2 text-xl opacity-70" aria-hidden="true">{pain.emoji}</span>
                {pain.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mt-2">{pain.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PainPoints;
