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

        {/* Plausible Analytics - advanced setup with outbound links & custom events */}
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
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
