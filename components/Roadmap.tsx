import { useTranslation } from 'next-i18next';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import {
  Lightbulb,
  Calendar,
  Image,
  LineChart,
  Users,
  Globe,
  Rocket,
  MessageCircle,
  Layers,
  TrendingUp,
  ArrowDown
} from 'lucide-react';

const Roadmap: FC = () => {
  const { t, i18n } = useTranslation('roadmap');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (i18n.language) setIsReady(true);
  }, [i18n.language]);

  if (!isReady) return null;

  const phases = [
    {
      title: t('phase1Title'),
      items: t('phase1List', { returnObjects: true }) as string[],
      icons: [TrendingUp, Lightbulb, Calendar, Globe],
    },
    {
      title: t('phase2Title'),
      items: t('phase2List', { returnObjects: true }) as string[],
      icons: [Image, LineChart, Rocket, Layers],
    },
    {
      title: t('phase3Title').replace(/\(.*\)/, '').trim(), // Supprime "(automne et +)" s’il y est
      items: t('phase3List', { returnObjects: true }) as string[],
      icons: [Users, MessageCircle, Globe, LineChart],
    },
  ];

  return (
    <section className="w-full py-20 px-4 bg-white dark:bg-black">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-14">
          {t('title')}
        </h2>

        <div className="flex flex-col items-center gap-10 relative">
          {phases.map((phase, idx) => (
            <div key={idx} className="w-full relative">
              <div className="bg-white dark:bg-gray-800 border-l-4 border-[#5C33F6] shadow-lg rounded-2xl p-6 transition hover:-translate-y-1 hover:shadow-xl">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {phase.title}
                </h3>
                <ul className="space-y-4 text-left">
                  {phase.items.map((item, i) => {
                    const Icon = phase.icons[i] || Lightbulb;
                    return (
                      <li key={i} className="flex items-start gap-3">
                        <div className="min-w-[24px] min-h-[24px] flex items-center justify-center">
                          <Icon className="w-5 h-5 text-[#5C33F6]" />
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {item}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* ➡️ Flèche entre les cartes */}
              {idx < phases.length - 1 && (
                <div className="hidden md:flex justify-center my-6">
                  <ArrowDown className="w-6 h-6 text-[#5C33F6] animate-bounce-slow" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
