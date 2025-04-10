import { useTranslation } from 'next-i18next';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

const Faq: FC = () => {
  const { t, i18n } = useTranslation('faq');
  const [isReady, setIsReady] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (i18n.language) setIsReady(true);
  }, [i18n.language]);

  if (!isReady) return null;

  const questions = t('items', { returnObjects: true }) as { question: string; answer: string }[];

  return (
    <section className="w-full py-20 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          {t('title')}
        </h2>
        <div className="space-y-6">
          {questions.map((item, idx) => (
            <div
              key={idx}
              className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="flex justify-between items-center w-full px-6 py-4 bg-[#F3EEFF] dark:bg-[#2A2246] text-left text-gray-900 dark:text-white font-medium hover:bg-[#E6DDFF] dark:hover:bg-[#3A2D67] transition-colors"
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={`w-5 h-5 transform transition-transform ${
                    openIndex === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === idx && (
                <div className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
