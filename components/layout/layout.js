import Head from "next/head";
import Script from "next/script";

export const DEFAULT_META = {
  title: "Quran Cafe",
  description: "Quran Cafe",
};

function Layout({ children, meta = DEFAULT_META }) {
  return (
    <>
      <Script
        afterInteractive
        data-domain="quran.cafe"
        src="https://plausible.io/js/plausible.js"
      />
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        {/* Twitter */}
        <meta name="twitter:card" content="summary" key="twcard" />
        <meta name="twitter:creator" content="@qurancafe" key="twhandle" />

        {/* Open Graph */}
        <meta property="og:url" content="https://quran.cafe/" key="ogurl" />
        <meta
          property="og:image"
          content="https://quran.cafe/_next/static/image/public/darker.a00dc7b3e280775c740b4c5f98f3b25e.jpg"
          key="ogimage"
        />
        <meta property="og:site_name" content="Quran Cafe" key="ogsitename" />
        <meta property="og:title" content={meta.title} key="ogtitle" />
        <meta
          property="og:description"
          content={meta.description}
          key="ogdesc"
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      {children}
    </>
  );
}

export default Layout;
