import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* 🔍 Google Search Console verification */}
        <meta name="google-site-verification" content="2jhDEdPWV8oEF5cFDgEORtp6CAUfgkJaIYJatI53HD8" />

        {/* Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700&display=swap"
          rel="stylesheet"
        />

        {/* 📊 Plausible Analytics - advanced setup with outbound links & custom events */}
        <script
          defer
          data-domain="trendcopilot.ai"
          src="https://plausible.io/js/script.outbound-links.tagged-events.js"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.plausible = window.plausible || function () {
                (window.plausible.q = window.plausible.q || []).push(arguments);
              }
            `,
          }}
        />

        {/* 🌐 Favicons + PWA meta */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#5C33F6" />
        <meta name="msapplication-TileColor" content="#5C33F6" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
