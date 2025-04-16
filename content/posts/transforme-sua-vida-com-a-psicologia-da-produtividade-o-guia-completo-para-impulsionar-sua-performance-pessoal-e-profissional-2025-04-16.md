import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="google-site-verification" content="G2248zuyTrDIKZlW2DUMIKSU_QNlL_5Gqu6Vis_wwUk" />
        {/* Preload Font Awesome font */}
        <link
          rel="preload"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/webfonts/fa-solid-900.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* Font Awesome para ícones sociais */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
          integrity="sha512-1ycn6IcaQQ40/MKB4Imkb9QVRcHJ1UFlLJ+EnI7YqgyTy45XBjv8CflimUsIHfvZKE8fPlK9NZKu1vFJSk2n1w=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <noscript>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
          />
        </noscript>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
