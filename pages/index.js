import { SWRConfig } from "swr";

// Components
import { Layout } from "../components/layout";
import { Menu } from "../components/menu";

import { Background, PlayerContainer } from "../components/player";
import Recitations from "../lib/db/models/recitations";
import { fetcher } from "../utils/fetcher";

function Home({ recitations, fallback }) {
  return (
    <SWRConfig value={{ fallback }}>
      <Layout>
        <PlayerContainer recitations={recitations} />
        <Background />
        <Menu />
      </Layout>
    </SWRConfig>
  );
}

export async function getServerSideProps() {
  const listeners = await fetcher("http://localhost:3000/api/listeners");
  const instance = new Recitations();
  const recitations = await instance.getAll();
  return {
    props: {
      recitations,
      fallback: {
        "/api/listeners": listeners,
      },
    },
  };
}

export default Home;
