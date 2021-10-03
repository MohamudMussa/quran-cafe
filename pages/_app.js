import "../styles/globals.css";
import { RecitationsProvider } from "../context/recitations";

function MyApp({ Component, pageProps }) {
  return (
    <RecitationsProvider>
      <Component {...pageProps} />
    </RecitationsProvider>
  );
}

export default MyApp;
