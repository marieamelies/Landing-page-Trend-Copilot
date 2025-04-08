import { useTranslation } from 'next-i18next';
import type { FC } from 'react';
import { useEffect, useState } from 'react';

const Roadmap: FC = () => {
  const { t, i18n } = useTranslation('roadmap');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (i18n.language) setIsReady(true);
  }, [i18n.language]);

  if (!isReady) return null;

  const items = [
    { title: t('item1.title'), description: t('item1.desc') },
    { title: t('item2.title'), description: t('item2.desc') },
    { title: t('item3.title'), description: t('item3.desc') },
    { title: t('item4.title'), description: t('item4.desc') }
  ];

  return (
    <section className="w-full py-20 px-4 bg-white dark:bg-black">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">
          {t('title')}
        </h2>
        <div className="space-y-8 text-left">
          {items.map((item, idx) => (
            <div key={idx} className="border-l-4 border-indigo-500 pl-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {item.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mt-2">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Roadmap;

