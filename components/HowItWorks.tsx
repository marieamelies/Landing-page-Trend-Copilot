import { useTranslation } from 'next-i18next';
import type { FC } from 'react';
import { useEffect, useState } from 'react';

const HowItWorks: FC = () => {
  const { t, i18n } = useTranslation('how');
  const [isReady, setIsReady] = useState(false);

  // Hydration fix : attendre que la langue soit chargée côté client
  useEffect(() => {
    if (i18n.language) {
      setIsReady(true);
    }
  }, [i18n.language]);

  if (!isReady) return null;

  const steps = [
    {
      icon: <svg className="w-8 h-8 text-[#5C33F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>,
      title: t('step1.title', 'Connect your socials'),
      desc: t('step1.desc', 'Link your LinkedIn, Instagram, X and more.')
    },
    {
      icon: <svg className="w-8 h-8 text-[#5C33F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>,
      title: t('step2.title', 'Set your content goals'),
      desc: t('step2.desc', 'Choose between visibility, engagement or sales.')
    },
    {
      icon: <svg className="w-8 h-8 text-[#5C33F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>,
      title: t('step3.title', 'Get AI-powered suggestions'),
      desc: t('step3.desc', 'Trend-based, personalized, no prompt needed.')
    },
    {
      icon: <svg className="w-8 h-8 text-[#5C33F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>,
      title: t('step4.title', 'Auto-schedule your week'),
      desc: t('step4.desc', 'Everything pre-planned, ready to publish.')
    },
    {
      icon: <svg className="w-8 h-8 text-[#5C33F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>,
      title: t('step5.title', 'Track & improve'),
      desc: t('step5.desc', 'Your posts evolve with your audience.')
    },
  ];

  return (
    <section className="w-full px-4 py-20 bg-white dark:bg-black">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-10 text-gray-900 dark:text-white">
          {t('title', 'How Trend Copilot builds your content presence')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl shadow-md text-left transform hover:scale-105 transition-transform"
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {step.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mt-2">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;