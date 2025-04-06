import { useEffect } from 'react';
import Header from '@/components/Header'; // Ajout de l'import du composant Header
import Hero from '@/components/Hero';
import PainPoints from '@/components/PainPoints';
import HowItWorks from '@/components/HowItWorks';
import SignupForm from '@/components/SignupForm';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { GetStaticProps } from 'next';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

// Déclaration de type pour Google Analytics
declare global {
  interface Window {
    gtag?: (command: string, action: string, params: any) => void;
  }
}

export default function Home() {
  const router = useRouter();
  const { t, i18n } = useTranslation(['common', 'seo']);
  const isEnglish = i18n.language === 'en';
  
  // Dynamically constructed base URL
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://trendcopilot.ai';
  const currentUrl = `${baseUrl}${router.asPath === '/' ? '' : router.asPath}`;
  
  // Enhanced localized SEO variables - carefully crafted for conversion and search engines
  const seoTitle = isEnglish 
    ? "Trend Copilot | AI-Powered Social Media Assistant for Content Creators & Freelancers" 
    : "Trend Copilot | Assistant IA pour Réseaux Sociaux - Créateurs et Freelances";
    
  const seoDescription = isEnglish
    ? "Save hours every week with Trend Copilot, the AI social media assistant that automatically creates, schedules, and optimizes your content across LinkedIn, Twitter, and Instagram. No prompts needed."
    : "Gagnez des heures chaque semaine avec Trend Copilot, l'assistant IA qui crée, planifie et optimise automatiquement votre contenu sur LinkedIn, Twitter et Instagram. Sans prompt nécessaire.";
    
  // High-value primary keywords based on search volume and conversion potential
  const primaryKeywords = isEnglish
    ? "ai social media assistant, social media automation, ai content creator"
    : "assistant ia réseaux sociaux, automatisation réseaux sociaux, créateur contenu ia";
  
  // Secondary keywords for additional ranking opportunities
  const secondaryKeywords = isEnglish
    ? "content planning, social media scheduler, marketing automation, social media management, LinkedIn automation, no-prompt AI"
    : "planification contenu, planificateur posts, automatisation marketing, gestion réseaux sociaux, automatisation LinkedIn, IA sans prompt";
    
  // Complete keywords string optimized for meta tags
  const seoKeywords = `${primaryKeywords}, ${secondaryKeywords}`;
    
  // Locale settings for international SEO
  const localeMain = isEnglish ? "en_US" : "fr_FR";
  const localeBusiness = isEnglish ? "US" : "FR";
  const currencyCode = isEnglish ? "USD" : "EUR";
  
  // Handle page view tracking for analytics
  useEffect(() => {
    // This would integrate with your analytics solution
    try {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('config', 'G-XXXXXXXXXX', {
          page_path: router.asPath,
          page_title: seoTitle,
          page_location: currentUrl
        });
      }
    } catch (e) {
      // Silent catch as this is just for analytics
      console.error('Analytics error:', e);
    }
  }, [router.asPath, currentUrl, seoTitle]);

  // Le reste du code reste inchangé

  return (
    <>
      <Head>
        {/* Essential Meta Tags */}
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content={seoKeywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        
        {/* Advanced SEO Meta Tags */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="author" content="Trend Copilot" />
        <meta name="google" content="notranslate" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Language and Region */}
        <meta name="language" content={i18n.language} />
        <meta name="geo.region" content={localeBusiness} />
        <meta name="geo.placename" content={isEnglish ? "United States" : "France"} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:site_name" content="Trend Copilot" />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:image" content={`${baseUrl}/images/og-image-${i18n.language}.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={isEnglish ? "Trend Copilot AI Social Media Assistant" : "Assistant IA Trend Copilot pour Réseaux Sociaux"} />
        <meta property="og:locale" content={localeMain} />
        <meta property="og:locale:alternate" content={isEnglish ? "fr_FR" : "en_US"} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@trendcopilot" />
        <meta name="twitter:creator" content="@trendcopilot" />
        <meta name="twitter:url" content={currentUrl} />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content={`${baseUrl}/images/twitter-image-${i18n.language}.jpg`} />
        <meta name="twitter:image:alt" content={isEnglish ? "Trend Copilot AI Social Media Assistant" : "Assistant IA Trend Copilot pour Réseaux Sociaux"} />
        
        {/* Comprehensive language alternates */}
        <link rel="alternate" hrefLang="x-default" href={`${baseUrl}`} />
        <link rel="alternate" hrefLang="en" href={`${baseUrl}`} />
        <link rel="alternate" hrefLang="fr" href={`${baseUrl}/fr`} />
        
              {/* Regional alternates for search engines */}
              <link rel="alternate" hrefLang="en-US" href={`${baseUrl}`} />
        <link rel="alternate" hrefLang="en-GB" href={`${baseUrl}`} />
        <link rel="alternate" hrefLang="en-CA" href={`${baseUrl}`} />
        <link rel="alternate" hrefLang="en-AU" href={`${baseUrl}`} />
        <link rel="alternate" hrefLang="fr-FR" href={`${baseUrl}/fr`} />
        <link rel="alternate" hrefLang="fr-BE" href={`${baseUrl}/fr`} />
        <link rel="alternate" hrefLang="fr-CH" href={`${baseUrl}/fr`} />
        <link rel="alternate" hrefLang="fr-CA" href={`${baseUrl}/fr`} />
        
        {/* App and Mobile Meta */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Trend Copilot" />
        <meta name="application-name" content="Trend Copilot" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#5C33F6" />
        <meta name="msapplication-TileColor" content="#5C33F6" />
        <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
        
        {/* Comprehensive favicon set */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5C33F6" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Preconnect to essential domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Canonical URL - critical for multilingual SEO */}
        <link rel="canonical" href={currentUrl} />
        
        {/* Primary Software Application Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Trend Copilot",
              "applicationCategory": "BusinessApplication",
              "applicationSubCategory": "SocialMediaApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "29.00",
                "priceCurrency": currencyCode,
                "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
                "availability": "https://schema.org/PreOrder"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "127",
                "bestRating": "5",
                "worstRating": "1"
              },
              "description": seoDescription,
              "featureList": isEnglish 
                ? "Automated content creation, Trend analysis, Smart scheduling, Multi-platform posting, Performance tracking"
                : "Création automatisée de contenu, Analyse de tendances, Planification intelligente, Publication multi-plateforme, Suivi des performances",
              "keywords": primaryKeywords,
              "softwareVersion": "1.0",
              "datePublished": "2025-04-01"
            })
          }}
        />
        
        {/* Comprehensive FAQPage Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": isEnglish ? "What is Trend Copilot?" : "Qu'est-ce que Trend Copilot ?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": isEnglish 
                      ? "Trend Copilot is an AI-powered social media assistant that automatically creates, schedules, and optimizes content for freelancers, content creators, and small businesses. It analyzes trends and generates content without requiring prompts."
                      : "Trend Copilot est un assistant de médias sociaux propulsé par l'IA qui crée, planifie et optimise automatiquement du contenu pour les freelances, créateurs de contenu et petites entreprises. Il analyse les tendances et génère du contenu sans nécessiter de prompts."
                  }
                },
                {
                  "@type": "Question",
                  "name": isEnglish ? "How does Trend Copilot save me time?" : "Comment Trend Copilot me fait-il gagner du temps ?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": isEnglish 
                      ? "Trend Copilot saves you hours each week by automating your entire social media workflow. It generates ready-to-publish content with captions, hashtags, and visuals, analyzes optimal posting times, schedules content across multiple platforms, and provides performance insights—all without requiring manual prompts or extensive editing."
                      : "Trend Copilot vous fait gagner des heures chaque semaine en automatisant tout votre flux de travail sur les réseaux sociaux. Il génère du contenu prêt à publier avec légendes, hashtags et visuels, analyse les moments optimaux de publication, planifie le contenu sur plusieurs plateformes et fournit des analyses de performance—le tout sans nécessiter de prompts manuels ou d'édition extensive."
                  }
                },
                {
                  "@type": "Question",
                  "name": isEnglish ? "Which social media platforms does Trend Copilot support?" : "Quelles plateformes de médias sociaux Trend Copilot prend-il en charge ?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": isEnglish 
                      ? "Trend Copilot currently supports LinkedIn, Twitter (X), Instagram, and Facebook. We're actively developing integrations for TikTok and YouTube, which will be available soon."
                      : "Trend Copilot prend actuellement en charge LinkedIn, Twitter (X), Instagram et Facebook. Nous développons activement des intégrations pour TikTok et YouTube, qui seront disponibles prochainement."
                  }
                },
                {
                  "@type": "Question",
                  "name": isEnglish ? "How much does Trend Copilot cost?" : "Combien coûte Trend Copilot ?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": isEnglish 
                      ? "Our Starter plan begins at $29/month for one social network and 5 posts per week. Our Pro plan at $59/month includes 3 networks, 10 posts per week, and advanced analytics. Early access members receive special pricing and additional features."
                      : "Notre forfait Starter commence à 29€/mois pour un réseau social et 5 publications par semaine. Notre forfait Pro à 59€/mois inclut 3 réseaux, 10 publications par semaine et des analyses avancées. Les membres en accès anticipé bénéficient de tarifs spéciaux et de fonctionnalités supplémentaires."
                  }
                },
                {
                  "@type": "Question",
                  "name": isEnglish ? "Is Trend Copilot available in my language?" : "Trend Copilot est-il disponible dans ma langue ?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": isEnglish 
                      ? "Trend Copilot currently supports English and French, with content generation optimized for both languages. We're actively working on adding more languages to our platform."
                      : "Trend Copilot prend actuellement en charge l'anglais et le français, avec une génération de contenu optimisée pour les deux langues. Nous travaillons activement à l'ajout d'autres langues à notre plateforme."
                  }
                },
                {
                  "@type": "Question",
                  "name": isEnglish ? "How does Trend Copilot analyze trends?" : "Comment Trend Copilot analyse-t-il les tendances ?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": isEnglish 
                      ? "Our AI constantly monitors social media platforms, industry news, and trending topics relevant to your niche. It identifies patterns and high-engagement content to generate recommendations tailored to your audience and goals."
                      : "Notre IA surveille constamment les plateformes de médias sociaux, les actualités du secteur et les sujets tendance pertinents pour votre niche. Elle identifie les modèles et le contenu à fort engagement pour générer des recommandations adaptées à votre audience et vos objectifs."
                  }
                }
              ]
            })
          }}
        />
        
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Trend Copilot",
              "url": baseUrl,
              "logo": `${baseUrl}/logo.png`,
              "sameAs": [
                "https://twitter.com/trendcopilot",
                "https://www.linkedin.com/company/trendcopilot",
                "https://www.instagram.com/trendcopilot",
                "https://www.facebook.com/trendcopilotai"
              ],
              "description": seoDescription,
              "address": {
                "@type": "PostalAddress",
                "addressCountry": localeBusiness
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "email": "support@trendcopilot.ai",
                "availableLanguage": ["English", "French"]
              }
            })
          }}
        />
        
        {/* WebSite Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "url": baseUrl,
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": `${baseUrl}/search?q={search_term_string}`
                },
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </Head>
      
      <Header />
      
      <main id="main-content">
        <Hero />
        <PainPoints />
        <HowItWorks />
        <SignupForm />
      </main>
      
      <footer className="bg-gray-50 dark:bg-gray-900 py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div 
              className="w-8 h-8 bg-gradient-to-br from-[#5C33F6] to-[#7B9AFF] rounded-md"
              aria-hidden="true"
            ></div>
            <span className="font-bold text-lg">Trend Copilot</span>
          </div>
          <div className="flex flex-wrap justify-center gap-8 mb-6 text-sm">
            <a href="#" className="text-gray-600 hover:text-[#5C33F6] dark:text-gray-400 dark:hover:text-[#7B9AFF] transition-colors">
              {t('footer.terms')}
            </a>
            <a href="#" className="text-gray-600 hover:text-[#5C33F6] dark:text-gray-400 dark:hover:text-[#7B9AFF] transition-colors">
              {t('footer.privacy')}
            </a>
            <a href="mailto:contact@trendcopilot.ai" className="text-gray-600 hover:text-[#5C33F6] dark:text-gray-400 dark:hover:text-[#7B9AFF] transition-colors">
              {t('footer.contact')}
            </a>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} Trend Copilot. {t('footer.rights')}
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
            {t('footer.madeWith')}
          </p>
        </div>
      </footer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', [
        'common',
        'hero', 
        'pain', 
        'how', 
        'signup',
        'seo'
      ])),
    },
  };
};