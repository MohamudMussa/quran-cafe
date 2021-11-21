// Components
import { Layout } from "../components/layout";
import { Menu } from "../components/menu";

import { Background, PlayerContainer } from "../components/player";
import Recitations from "../lib/db/models/recitations";
import Playlists from "../lib/db/models/playlists";

// TODO: create Player Compound Components

function Home({ recitations, playlists }) {
  return (
    <Layout
      meta={{
        title: "Quran Cafe",
        description:
          "Quran Cafe ☕️ Study / Code while listening to unique recitations of the Quran from 🌎 | Share your Quran playlist with us ❤️",
      }}
    >
      <PlayerContainer recitations={recitations} playlists={playlists} />
      <Background />
      <Menu playlists={playlists} />
    </Layout>
  );
}

export async function getServerSideProps() {
  const recistationsInstance = new Recitations();
  const playlistInstance = new Playlists();
  const playlists = await playlistInstance.getAll();
  const recitations = await recistationsInstance.getAll();
  return {
    props: {
      recitations,
      playlists,
    },
  };
}

export default Home;
