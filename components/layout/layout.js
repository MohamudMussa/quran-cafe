import Head from "next/head";

export const DEFAULT_META = {
  title: "Quran Cafe",
  description: "Quran Cafe",
};

function Layout({ children, meta = DEFAULT_META }) {
  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </>
  );
}

export default Layout;
