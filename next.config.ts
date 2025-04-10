import type { NextConfig } from 'next';
import nextI18NextConfig from './next-i18next.config';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    ...nextI18NextConfig.i18n,
    localeDetection: false, // désactive la détection automatique
  },
  images: {
    domains: ['trendcopilot.ai'], // si tu charges des images externes dans <Image>
  },
};

export default nextConfig;
