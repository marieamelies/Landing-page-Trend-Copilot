import { useTranslation } from 'next-i18next';
import type { FC } from 'react';
import { useEffect, useState } from 'react';

const PainPoints: FC = () => {
  const { t, i18n } = useTranslation('pain'); // Utilisation du namespace 'pain'
  const [isReady, setIsReady] = useState(false);

  // 👇 Hydration fix : attendre que la langue soit détectée
  useEffect(() => {
    if (i18n.language) {
      setIsReady(true);
    }
  }, [i18n.language]);

  if (!isReady) return null; // Ne pas afficher le contenu avant que la langue soit prête

  return (
    <section className="w-full px-4 py-16 bg-gray-50 dark:bg-gray-800 text-left">
      <div className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
          {t('title', 'What Trend Copilot solves')}
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 text-lg">
          <li>{t('item1', 'Spending too much time creating content')}</li>
          <li>{t('item2', 'Lack of inspiration or clarity')}</li>
          <li>{t('item3', 'Low engagement on social media')}</li>
          <li>{t('item4', 'Publishing inconsistently')}</li>
          <li>{t('item5', 'Struggling with what to post, when, and where')}</li>
        </ul>
      </div>
    </section>
  );
};

export default PainPoints;

