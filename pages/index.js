// Components
import { Layout } from "../components/layout";
import { Menu } from "../components/menu";

import { Background, PlayerContainer } from "../components/player";
import Recitations from "../lib/db/models/recitations";

// TODO: create Player Compound Components

function Home({ recitations }) {
  return (
    <Layout>
      <PlayerContainer recitations={recitations} />
      <Background />
      <Menu />
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
