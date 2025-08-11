import "../styles/globals.css";
import { useState } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { RecitationsProvider } from "../context/recitations";
import localFont from 'next/font/local'

const myFont = localFont({ src: '../assets/fonts/VT323-Regular.ttf' })

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <RecitationsProvider>
        <Hydrate state={pageProps.dehydratedState}>
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
