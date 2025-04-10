import { useTranslation } from 'next-i18next';
import type { FC } from 'react';
import { useEffect, useState } from 'react';

const Pricing: FC = () => {
  const { t, i18n } = useTranslation('pricing');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (i18n.language) setIsReady(true);
  }, [i18n.language]);

  if (!isReady) return null;

  const plans = [
    {
      title: t('starter.title'),
      price: '19€',
      period: t('perMonth'),
      features: [
        t('starter.f1'),
        t('starter.f2'),
        t('starter.f3'),
        t('starter.f4'),
        t('starter.f5'),
        t('starter.f6'),
        t('starter.f7'),
        t('starter.f8'),
        t('starter.f9'),
      ],
      disabled: [
        t('starter.na1'),
        t('starter.na2'),
        t('starter.na3'),
        t('starter.na4'),
        t('starter.na5'),
      ]
    },
    {
      title: t('pro.title'),
      price: '39€',
      period: t('perMonth'),
      features: [
        t('pro.f1'),
        t('pro.f2'),
        t('pro.f3'),
        t('pro.f4'),
        t('pro.f5'),
        t('pro.f6'),
        t('pro.f7'),
        t('pro.f8'),
        t('pro.f9'),
        t('pro.f10')
      ],
      badge: t('pro.badge')
    },
    {
      title: t('max.title'),
      price: t('max.price'),
      period: t('perMonth'),
      features: [
        t('max.f1'),
        t('max.f2'),
        t('max.f3'),
        t('max.f4'),
        t('max.f5'),
        t('max.f6')
      ],
      badge: t('max.badge')
    }
  ];

  return (
    <section className="w-full py-20 px-4 bg-white dark:bg-black">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">
          {t('title')}
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow relative">
              {plan.badge && (
                <span className="absolute -top-4 left-4 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full">
                  {plan.badge}
                </span>
              )}
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {plan.title}
              </h3>
              <div className="text-3xl font-bold text-indigo-600 mb-4">
                {plan.price}<span className="text-base font-medium text-gray-500">/{plan.period}</span>
              </div>
              <ul className="space-y-2 text-left text-sm text-gray-700 dark:text-gray-300">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>{feature}
                  </li>
                ))}
                {plan.disabled && plan.disabled.map((item, i) => (
                  <li key={`na-${i}`} className="flex items-start opacity-50 line-through">
                    <span className="text-gray-400 mr-2">✕</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA Contact */}
        <p className="mt-12 text-sm text-gray-700 dark:text-gray-300 text-center">
          <span className="block text-base font-medium text-gray-900 dark:text-white mb-2">
            {t('ctaContact')}
          </span>
          <span dangerouslySetInnerHTML={{ __html: t('ctaSubtext') }} />
        </p>
      </div>
    </section>
  );
};

export default Pricing;
