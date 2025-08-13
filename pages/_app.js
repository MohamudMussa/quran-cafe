import "../styles/globals.css";
import { useEffect, useState } from "react";
import Head from 'next/head';
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { RecitationsProvider } from "../context/recitations";
import localFont from 'next/font/local'

const myFont = localFont({ src: '../assets/fonts/VT323-Regular.ttf' })

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if ('serviceWorker' in navigator) {
      const register = async () => {
        try {
          await navigator.serviceWorker.register('/sw.js', { scope: '/' });
        } catch (e) {
          // ignore
        }
      };
      if (document.readyState === 'complete') {
        register();
      } else {
        window.addEventListener('load', register, { once: true });
      }
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <RecitationsProvider>
        <Hydrate state={pageProps.dehydratedState}>
          <Head>
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
            <meta name="theme-color" content="#000000" />
            <link rel="manifest" href="/manifest.json" />
          </Head>
          <div id="app-root" className="min-h-screen bg-black text-white">
            <main className={myFont.className}>
              <Component {...pageProps} />
            </main>
          </div>
        </Hydrate>
      </RecitationsProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
