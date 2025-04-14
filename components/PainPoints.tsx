import { useTranslation } from 'next-i18next';
import { FC, useEffect, useState } from 'react';
import { Clock, MessageSquareDashed, TrendingDown, CalendarDays, HelpCircle, Puzzle } from 'lucide-react';

const PainPoints: FC = () => {
  const { t, i18n } = useTranslation('pain');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (i18n.language) setIsReady(true);
  }, [i18n.language]);

  if (!isReady) return null;

  const points = [
    {
      icon: <Clock className="text-[#5C33F6] w-6 h-6" />, 
      title: t('point1Title'),
      desc: t('point1Desc')
    },
    {
      icon: <MessageSquareDashed className="text-[#5C33F6] w-6 h-6" />, 
      title: t('point2Title'),
      desc: t('point2Desc')
    },
    {
      icon: <TrendingDown className="text-[#5C33F6] w-6 h-6" />, 
      title: t('point3Title'),
      desc: t('point3Desc')
    },
    {
      icon: <CalendarDays className="text-[#5C33F6] w-6 h-6" />, 
      title: t('point4Title'),
      desc: t('point4Desc')
    },
    {
      icon: <HelpCircle className="text-[#5C33F6] w-6 h-6" />, 
      title: t('point5Title'),
      desc: t('point5Desc')
    },
    {
      icon: <Puzzle className="text-[#5C33F6] w-6 h-6" />, 
      title: t('point6Title'),
      desc: t('point6Desc')
    }
  ];

  return (
    <section className="w-full py-20 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {t('title')}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
          {t('subtitle')}
        </p>
        <div className="grid md:grid-cols-2 gap-8 text-left">
          {points.map((point, idx) => (
            <div 
              key={idx} 
              className="flex items-start space-x-4 bg-white dark:bg-gray-800 p-6 rounded-xl shadow border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
            >
              <div className="p-2 bg-[#F3EEFF] rounded-full">
                {point.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {point.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {point.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PainPoints;

