import { useTranslation } from 'next-i18next';
import type { FC } from 'react';
import { useEffect, useState } from 'react';

const Comparison: FC = () => {
  const { t, i18n } = useTranslation('comparison');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (i18n.language) setIsReady(true);
  }, [i18n.language]);

  if (!isReady) return null;

  const rows = [
    {
      label: t('row1'),
      classic: t('classic1'),
      trend: t('trend1'),
    },
    {
      label: t('row2'),
      classic: t('classic2'),
      trend: t('trend2'),
    },
    {
      label: t('row3'),
      classic: t('classic3'),
      trend: t('trend3'),
    },
    {
      label: t('row4'),
      classic: t('classic4'),
      trend: t('trend4'),
    },
    {
      label: t('row5'),
      classic: t('classic5'),
      trend: t('trend5'),
    },
    {
      label: t('row6'),
      classic: t('classic6'),
      trend: t('trend6'),
    },

    {
        label: t('row7'),
        classic: t('classic7'),
        trend: t('trend7'),
      },
  ];

  return (
    <section className="w-full py-20 px-4 bg-white dark:bg-black">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10">
          {t('title')}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse rounded-xl overflow-hidden shadow-md">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800 text-sm md:text-base">
                <th className="p-4 font-semibold text-gray-700 dark:text-gray-300 text-left">
                  {t('feature')}
                </th>
                <th className="p-4 font-semibold text-gray-700 dark:text-gray-300 text-left">
                  {t('classicTools')}
                </th>
                <th className="p-4 font-semibold text-gray-700 dark:text-gray-300 text-left">
                  Trend Copilot
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr
                  key={idx}
                  className={`${
                    idx % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800'
                  } text-sm md:text-base border-t border-gray-100 dark:border-gray-700`}
                >
                  <td className="px-4 py-5 text-left text-gray-900 dark:text-white font-semibold">
                    {row.label}
                  </td>
                  <td className="px-4 py-5 text-left text-gray-600 dark:text-gray-400">
                    {row.classic}
                  </td>
                  <td className="px-4 py-5 text-left text-[#5C33F6] dark:text-[#A78BFA] font-semibold">
                    {row.trend}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Comparison;

