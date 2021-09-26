import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Components
import { Layout } from "../components/layout";
import { Menu } from "../components/menu";
import { IMAGES, STATION } from "../config/constants";

import {
  Player,
  Content,
  Actions,
  Background,
  AdditionalActions,
} from "../components/player";

// TODO: create Player Compound Components

const removeGif = () => {
  var elem = document.getElementById("vignette");

  if (typeof elem == "undefined" || elem == null) {
    document.getElementById("normal").id = "vignette";
    document.getElementById("normal").id = "vignette";
  } else {
    document.getElementById("vignette").id = "normal";
    document.getElementById("vignette").id = "normal";
  }
};

const getImage = () => {
  const number = Math.floor(Math.random() * IMAGES.length);
  return IMAGES[number];
};

const getStation = () => {
  const numberStation = Math.floor(Math.random() * STATION.length);
  return STATION[numberStation];
};

function Home() {
  const [activeImage, setActiveImage] = useState(IMAGES[0]);
  const [isBuffering, setIsBuffering] = useState(true);
  const [station, setStation] = useState(STATION[0]);
  const [volume, setVolume] = useState(0.2);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [show, setShow] = useState(false);

  const handleClick = () => {
    const image = getImage();
    setActiveImage(image);
  };

  const handleNext = () => {
    const station = getStation();
    setStation(station);
  };

  const shuffleOnEnd = () => {
    const station = getStation();
    setStation(station);
  };

  const handleShowOriginalVideo = () => {
    setShow(!show);
  };

  useEffect(() => {
    const station = getStation();
    const wallpaper = getImage();
    setActiveImage(wallpaper);
    setStation(station);
  }, []);

  return (
    <Layout>
      <motion.div
        className="flex py-16	 justify-center h-screen  "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          backgroundImage: `url(${activeImage.src})`,
          backgroundSize: "cover",
          opacity: "0.7",
        }}
      >
        <Player
          playing={isPlaying}
          muted={isMuted}
          volume={volume}
          show={show}
          station={station}
          onPlay={() => setIsMuted(false)}
          onPause={() => setIsPlaying(false)}
          onEnded={shuffleOnEnd}
          onError={shuffleOnEnd}
          onBuffer={() => setIsBuffering(true)}
          onReady={() => setIsBuffering(false)}
          onBufferEnd={() => setIsBuffering(false)}
        />
        <div className="text-center lg:w-2/3 w-full sm: pt-9">
          <Content
            title={`وَاِذَا قُرِئَ الۡقُرۡاٰنُ فَاسۡتَمِعُوۡا لَهٗ وَاَنۡصِتُوۡا
            لَعَلَّكُمۡ تُرۡحَمُوۡنَ‏ ۝`}
            content={`So when the Quran is recited, listen carefully to it, and keep
            silent so that you may, be shown mercy.`}
            reference={`[7:204]`}
          />
          <Actions
            playing={isPlaying}
            handlePlay={() => setIsPlaying(true)}
            handlePause={() => setIsPlaying(false)}
            incrementVolume={() => setVolume((volume) => volume + 0.2)}
            decrementVolume={() => setVolume((volume) => volume - 0.2)}
          />
        </div>
      </motion.div>

      <AdditionalActions
        onVideoPreviewClick={handleShowOriginalVideo}
        onShuffleClick={handleNext}
        onBackgroundShuffleClick={handleClick}
        onVignetteClick={removeGif}
      />

      <Background buffering={isBuffering} />
      <Menu />
    </Layout>
  );
}

export default Home;
