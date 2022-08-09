// Components
import Footer from "../components/Footer/Footer";
import { Layout } from "../components/layout";

import { Background, PlayerContainer } from "../components/player";
import Recitations from "../lib/db/models/recitations";

// TODO: create Player Compound Components

function Home({ recitations }) {
  return (
    <Layout
      meta={{
        title: "Quran Cafe",
        description:
          "Quran Cafe ☕️ Study / Code while listening to unique recitations of the Quran from 🌎 | Share your Quran playlist with us ❤️",
      }}
    >
      <PlayerContainer recitations={recitations} />
      <Background />
      <Footer />
    </Layout>
  );
}

export async function getServerSideProps() {
  const instance = new Recitations();
  const recitations = await instance.getAll();
  return {
    props: {
      recitations,
    },
  };
}

export default Home;
