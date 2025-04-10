import type { NextConfig } from 'next';
import nextI18NextConfig from './next-i18next.config';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  i18n: {
    ...nextI18NextConfig.i18n,
    localeDetection: false, // désactive la détection automatique
  },
  images: {
    domains: ['trendcopilot.ai'],
  },
  async redirects() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap.xml',
        permanent: true,
      },
      {
        source: '/robots.txt',
        destination: '/api/robots.txt',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

