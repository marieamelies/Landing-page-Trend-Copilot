import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import i18nextConfig from "../next-i18next.config"; // 👈 ajoute cette ligne

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default appWithTranslation(App, i18nextConfig); // 👈 ajoute ici la config
