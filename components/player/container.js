import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Actions, AdditionalActions, Content, Player } from ".";
import { removeGif, getImage, getStation } from "./utils";
import { IMAGES } from "../../config/constants";

function Container({ recitations }) {
  const [activeImage, setActiveImage] = useState(IMAGES[0]);
  const [station, setStation] = useState(recitations[0]);
  const [volume, setVolume] = useState(0.2);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [show, setShow] = useState(false);

  const handleClick = () => {
    const image = getImage();
    setActiveImage(image);
  };

  const handleNext = () => {
    const station = getStation(recitations);
    setStation(station);
  };

  const shuffleOnEnd = () => {
    const station = getStation(recitations);
    setStation(station);
  };

  const handleShowOriginalVideo = () => {
    setShow(!show);
  };

  useEffect(() => {
    const station = getStation(recitations);
    const wallpaper = getImage();
    setActiveImage(wallpaper);
    setStation(station);
  }, [recitations]);

  return (
    <>
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
    </>
  );
}

export default Container;
