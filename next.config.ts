import type { NextConfig } from 'next';
import nextI18NextConfig from './next-i18next.config';

const nextConfig: NextConfig = {
  i18n: {
    ...nextI18NextConfig.i18n,
    localeDetection: false, // 👈 désactive la redirection automatique basée sur la langue du navigateur
  },
  
  reactStrictMode: true,
};

export default nextConfig;
