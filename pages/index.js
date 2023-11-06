// Components
import { useEffect, useRef, useState } from "react";
import Footer from "../components/Footer/Footer";
import { Layout } from "../components/layout";

import { Background, PlayerContainer } from "../components/player";
import Recitations from "../lib/db/models/recitations";
import Typewriter from 'typewriter-effect';



// TODO: create Player Compound Components

function Home() {

  const [recitations, setRecitations] = useState(null);
  const [loadingText, setLoadingText] = useState("Booting _");

  // Get all recitations
  const getRecitations = async () => {
    const instance = new Recitations();
    const recitations = await instance.getAll();
    setRecitations(recitations);
  };

  // Get all recitations on mount
  useEffect(() => {
    if (!recitations) {
      setTimeout(() => {
        getRecitations();
      }, 1500);
    }
    // console.log("recitations::::", recitations)
  }, [recitations]);

  useEffect(() => {
    setTimeout(() => {
      setLoadingText((prev) => {
        if (prev === "Booting _") {
          return "Loading Recitations .";
        } else if (prev === "Loading Recitations .") {
          return "Loading Recitations ..";
        }
        else if (prev === "Loading Recitations ..") {
          return "Loading Recitations ...";
        }
        else if (prev === "Loading Recitations ...") {
          return "Loading Recitations .";
        }
      }
      );

    }, 500);
  }, [loadingText]);

  const appElement = useRef(null);

  return (
    <Layout
      meta={{
        title: "Quran Cafe",
        description:
          "Quran Cafe ☕️ Study / Code while listening to unique recitations of the Quran from 🌎 | Share your Quran playlist with us ❤️",
      }}
    >
      <main ref={appElement}>
        {
          recitations ? (
            <PlayerContainer appElement={appElement} recitations={recitations} />
          ) : (
            <div className="m-8">
              <div className="text-xl">

                {/* Loading */}
                <span>{loadingText}</span>

                <div className="mt-2">
                  <Typewriter
                    onInit={(typewriter) => {
                      setTimeout(() => {
                        typewriter.typeString(`Setting up the cafe`)
                          .callFunction(() => {
                            console.log('String typed out!');
                          })
                          .start();
                      }, 1000);
                    }}
                    options={
                      {
                        autoStart: true,
                        loop: false,
                        delay: 10,
                      }
                    }
                  />
                </div>


              </div>
            </div>
          )
        }
        <Background />
        <Footer />
      </main>
    </Layout>
  );
}

export default Home;
