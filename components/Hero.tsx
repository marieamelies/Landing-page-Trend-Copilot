import { useTranslation, Trans } from 'next-i18next';
import type { FC } from 'react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Calendar, Edit, Zap, Globe, Lock } from 'lucide-react';
import React from 'react';


const Hero: FC = () => {
  const { t, i18n } = useTranslation('hero');
  const [isReady, setIsReady] = useState(false);
  const [userCount, setUserCount] = useState(0);
  const [remainingSpots, setRemainingSpots] = useState(50);
  const [isNewSignup, setIsNewSignup] = useState(false);
  const countRef = useRef<HTMLSpanElement>(null);
  
  const iconMap = {
    calendar: <Calendar className="w-5 h-5 text-[#5C33F6]" />,
    edit: <Edit className="w-5 h-5 text-[#5C33F6]" />,
    zap: <Zap className="w-5 h-5 text-[#5C33F6]" />,
    globe: <Globe className="w-5 h-5 text-[#5C33F6]" />,
  };
  
  // Memoize fetchUserCount function to avoid recreating it unnecessarily
  const fetchUserCount = useCallback(async () => {
    try {
      // Remplacer par votre API réelle
      const response = await fetch('/api/waitlist-count');
      const data = await response.json();
      
      console.log('User count:', data.count); // Log pour le débug
      
      // Animation uniquement si c'est une nouvelle valeur
      if (data.count > userCount) {
        setIsNewSignup(true);
        setTimeout(() => setIsNewSignup(false), 3000);
        
        // Animation du compteur
        if (countRef.current) {
          countRef.current.classList.add('text-green-500', 'scale-110');
          setTimeout(() => {
            if (countRef.current) {
              countRef.current.classList.remove('text-green-500', 'scale-110');
            }
          }, 2000);
        }
      }
      
      setUserCount(data.count);
      setRemainingSpots(Math.max(0, 50 - data.count));
    } catch (error) {
      console.error("Erreur lors de la récupération du compteur", error);
      // Nouveau fallback sans incrément simulé
      console.warn('Fallback: keeping current count');
    }
  }, [userCount]);

  // Gérer les nouvelles inscriptions en temps réel
  useEffect(() => {
    if (i18n.language) {
      setIsReady(true);
      fetchUserCount(); // Exécuter une seule fois au mount
    }
  }, [i18n.language, fetchUserCount]);

  // Plausible - Engaged 15s
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined' && window.plausible) {
        window.plausible('engaged_15s');
      }
    }, 15000); // 15 secondes

    return () => clearTimeout(timer);
  }, []);

  // Mettre en place une connexion WebSocket ou SSE pour les mises à jour en temps réel
  useEffect(() => {
    let eventSource: EventSource | null = null;
    try {
      eventSource = new EventSource('/api/waitlist-events');
      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.event === 'new-signup') {
          fetchUserCount();
        }
      };
    } catch (error) {
      console.error("Erreur lors de la connexion aux événements", error);
    }

    // Interval plus long (60 secondes au lieu de 10)
    const interval = setInterval(fetchUserCount, 60000); // Toutes les 60 secondes
    
    return () => {
      if (eventSource) eventSource.close();
      clearInterval(interval);
    };
  }, [fetchUserCount]);

  if (!isReady) return null;

  return (
    <section id="hero" className="relative w-full py-20 px-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black text-center overflow-hidden">
      {/* Éléments de design d'arrière-plan - Améliorés pour plus d'impact */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-36 -right-36 w-80 h-80 bg-blue-100 dark:bg-blue-900 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-1/3 -left-24 w-64 h-64 bg-purple-100 dark:bg-purple-900 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/3 w-56 h-56 bg-pink-100 dark:bg-pink-900 rounded-full opacity-10 blur-2xl"></div>
      </div>
      
      <div className="relative max-w-5xl mx-auto flex flex-col items-center gap-8 z-10">
        {/* Logo + Titre (h1 uniquement pour le nom du produit) */}
        <div className="flex items-center gap-4">
          <div
            className="w-14 h-14 bg-gradient-to-br from-[#5C33F6] to-[#7B9AFF] rounded-full shadow-xl animate-slowspin"
            style={{
              clipPath: 'polygon(50% 0%, 80% 20%, 100% 50%, 80% 80%, 50% 100%, 20% 80%, 0% 50%, 20% 20%)',
            }}
            aria-hidden="true"
          ></div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-clash text-gray-900 dark:text-white">
            Trend Copilot
          </h1>
        </div>

        {/* Tagline en h2 pour SEO et accessibilité */}
        <h2 className="text-xl md:text-2xl lg:text-3xl text-gray-700 dark:text-gray-300 max-w-3xl leading-tight text-center">
          {t('tagline')}
        </h2>

        {/* Subtext avec Trans pour une i18n robuste et mise en forme améliorée */}
        <p className="text-base md:text-lg text-gray-700/90 dark:text-gray-300/90 max-w-xl text-center leading-7 tracking-tight" aria-labelledby="tagline">
          <Trans 
            i18nKey="subtext" 
            t={t} 
            components={[
              <span key="bold1" className="font-semibold text-gray-900 dark:text-white" />,
              <span key="highlight" className="text-[#5C33F6] font-bold" />,
              <span key="text" className="text-gray-700/90 dark:text-gray-300/90" />,
              <span key="bold2" className="text-[#5C33F6] font-semibold" />
            ]}
          />
        </p>

        {/* Bullet Points avec icônes de Lucide */}
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
          {(t('points', { returnObjects: true }) as { icon: string; text: string }[]).map((point, idx) => (
            <li
              key={idx}
              className="flex items-center gap-4 px-6 py-5 bg-white/60 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700/30 backdrop-blur-md shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300 ease-out"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#ece9fc] dark:bg-[#5C33F6]/20 shadow-inner" aria-hidden="true">
                {React.cloneElement(iconMap[point.icon], { className: 'w-6 h-6 text-[#5C33F6]' })}
              </div>
              <p className="text-sm text-gray-800 dark:text-gray-100 font-medium leading-snug text-left">
                {point.text}
              </p>
            </li>
          ))}
        </ul>

        {/* Section Value Proposition avec icônes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl my-2">
          {[
            {
              icon: (
                <svg className="w-8 h-8 text-[#5C33F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              title: t('benefit1.title', 'Save Time'),
              desc: t('benefit1.desc', 'Hours saved every week'),
            },
            {
              icon: (
                <svg className="w-8 h-8 text-[#5C33F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              ),
              title: t('benefit2.title', 'AI-Powered Content'),
              desc: t('benefit2.desc', 'Personalized, no prompt needed'),
            },
            {
              icon: (
                <svg className="w-8 h-8 text-[#5C33F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              ),
              title: t('benefit3.title', 'Multi-Platform'),
              desc: t('benefit3.desc', 'Publish everywhere at once'),
            },
          ].map((benefit, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-100 dark:border-gray-700/30 transform hover:scale-105 transition-transform"
            >
              <div className="mb-3" aria-hidden="true">
                {benefit.icon}
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{benefit.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{benefit.desc}</p>
            </div>
          ))}
        </div>

        {/* Badge de lancement amélioré */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 text-indigo-600 dark:text-indigo-300 px-6 py-3 rounded-full text-sm font-medium shadow-sm border border-indigo-100/50 dark:border-indigo-800/20">
          {t('launchBadge', 'Private Beta Access • Limited Spots Available')}
        </div>

        {/* CTA Principal avec micro-interaction amélioré et accessibilité */}
        <div className="flex flex-col items-center gap-3">
          <button 
            className="group relative bg-[#5C33F6] hover:bg-[#4826C9] text-white px-12 py-4 rounded-xl text-lg md:text-xl font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 overflow-hidden"
            onClick={() => document.getElementById('signup-form')?.scrollIntoView({ behavior: 'smooth' })}
            aria-label={t('ctaEmotional', '🔥 Réserve ta place – accès limité')}
          >
            <span className="flex items-center justify-center gap-2 relative z-10">
              {t('ctaEmotional', '🔥 Réserve ta place – accès limité')}
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            {/* Effet d'animation au survol */}
            <span className="absolute inset-0 w-full h-full bg-[#4826C9] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" aria-hidden="true"></span>
          </button>
          
          {/* Micro-éléments de réassurance immédiate */}
          <div className="flex items-center justify-center gap-4 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t('reassurance.free', '100% free – no card required')}</span>
            </div>
            
          </div>
        </div>
        
        {/* Section Urgence avec compteur réel - Optimisée */}
        <div className="flex flex-col items-center space-y-3 mt-2">
          {/* Compteur utilisateurs avec animation améliorée */}
          <div className="flex items-center gap-2">
            <div className={`h-2.5 w-2.5 bg-green-500 rounded-full ${isNewSignup ? 'animate-ping' : 'animate-pulse'}`} aria-hidden="true"></div>
            <p className="text-gray-600 dark:text-gray-400" aria-live="polite">
              <span 
                ref={countRef}
                className="font-bold text-black dark:text-white transition-all duration-700"
              >
                +{userCount}
              </span> {t('usersJoined', 'users already joined')}
            </p>
          </div>
          
          {/* Early access badge avec design premium */}
          <div className="px-5 py-3 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 text-orange-600 dark:text-orange-400 rounded-lg flex items-center gap-2 shadow-sm border border-orange-100/50 dark:border-orange-800/20">
            <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-semibold">
              {t('earlyAccess', 'Early access + premium features for the first 50 signups')}
            </span>
          </div>
          
          {/* Indication des places restantes - Conditionnelle basée sur l'urgence */}
          {remainingSpots > 0 && (
            <div className={`text-sm ${remainingSpots <= 50 ? 'text-red-500 font-semibold' : 'text-gray-500 dark:text-gray-400'} font-medium`} aria-live="polite">
              {remainingSpots <= 50 ? (
                <div className="flex items-center gap-1.5 animate-pulse">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {t('urgencyMessage', 'Hurry! Only {{count}} spots remaining', { count: remainingSpots })}
                </div>
              ) : (
                t('spotsRemaining', 'Only {{count}} early access spots remaining', { count: remainingSpots })
              )}
            </div>
          )}
        </div>
        
        {/* Social Proof - Version améliorée avec animation au scroll */}
        <div className="mt-10 pt-8 border-t border-gray-100 dark:border-gray-800 w-full animate-fade-in-scroll">

          <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4 font-medium">
            {t('trustedBy', 'Perfect for creators on')}
          </p>
          <div className="flex flex-wrap justify-center gap-10">
                    {[
            { name: 'LinkedIn', icon: 'M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z' },
            { name: 'Twitter', icon: 'M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z' },
            { name: 'Instagram', icon: 'M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z' },
            { name: 'TikTok', icon: 'M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3V0Z' },
          ].map((platform, idx) => (
            <div key={platform.name || idx} className="flex flex-col items-center transform hover:scale-110 transition-transform">
              <svg className="w-7 h-7 text-gray-600 dark:text-gray-300 mb-2" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d={platform.icon} />
              </svg>
              <div className="text-gray-500 dark:text-gray-400 text-xs font-medium">
                {platform.name}
              </div>
            </div>
          ))
          
          }
          </div>
        </div>
      </div>
    </section>
  );
};

// Add TypeScript interface for window.plausible
declare global {
  interface Window {
    plausible?: (event: string) => void;
    fs?: unknown;
  }
}

export default Hero;