import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Actions, AdditionalActions, Content, Player } from ".";
import { removeGif, getImage, getStation } from "./utils";
import { IMAGES } from "../../config/constants";
import useRecitations from "../../context/recitations";

function Container({ recitations }) {
  const { instance } = useRecitations();
  const [voted, setVoted] = useState(false);
  const [activeImage, setActiveImage] = useState(IMAGES[0]);
  const [station, setStation] = useState(getStation(recitations));
  const [volume, setVolume] = useState(0.2);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [show, setShow] = useState(false);

  const handleBackgroundShuffle = useCallback(() => {
    const image = getImage();
    setActiveImage(image);
  }, []);

  const handleNext = useCallback(() => {
    const station = getStation(recitations);
    handleBackgroundShuffle();
    setStation(station);
    setVoted(false);
  }, [handleBackgroundShuffle, recitations]);

  const handleUpvote = useCallback(async () => {
    if (voted) return;
    const res = await instance.current.incrementUpvoteById(
      station.id,
      station.up_vote + 1
    );
    if (res) {
      setVoted(true);
    }
  }, [instance, station, voted]);

  const shuffleOnEnd = useCallback(() => {
    const station = getStation(recitations);
    setStation(station);
  }, [recitations]);

  useEffect(() => {
    handleBackgroundShuffle();
  }, []);

  return (
    <>
      <motion.div
        class="flex items-center justify-center h-screen"


        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          backgroundImage: `url(${activeImage.src})`,
          backgroundSize: "cover",
          opacity: "0.7",
        }}
      >



        {/* start */}


        <div >
          <div class="bg-gray-200 opacity-80  shadow-2xl rounded-lg" >
            <div class="flex">
              <div>
              </div>
              <div class="w-full p-8">
                <div class="flex justify-between">
                  <div>
                    <div class="text-2xl text-grey-darkest font-medium">

                      {station.reciters.name}

                    </div>
                    <p class="text-sm text-grey text-center mt-1 font-mono font-extrabold">Quran Cafe</p>
                  </div>
                  <div class="text-black py-1">
                    <svg class="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 3.22l-.61-.6a5.5 5.5 0 0 0-7.78 7.77L10 18.78l8.39-8.4a5.5 5.5 0 0 0-7.78-7.77l-.61.61z" /></svg>
                  </div>
                </div>
                <div class="flex justify-between items-center mt-8">
                  <div class="text-grey-darker">
                    <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M6.59 12.83L4.4 15c-.58.58-1.59 1-2.4 1H0v-2h2c.29 0 .8-.2 1-.41l2.17-2.18 1.42 1.42zM16 4V1l4 4-4 4V6h-2c-.29 0-.8.2-1 .41l-2.17 2.18L9.4 7.17 11.6 5c.58-.58 1.59-1 2.41-1h2zm0 10v-3l4 4-4 4v-3h-2c-.82 0-1.83-.42-2.41-1l-8.6-8.59C2.8 6.21 2.3 6 2 6H0V4h2c.82 0 1.83.42 2.41 1l8.6 8.59c.2.2.7.41.99.41h2z" /></svg>
                  </div>
                  <div class="text-black">
                    <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M4 5h3v10H4V5zm12 0v10l-9-5 9-5z" /></svg>
                  </div>
                  <div class="text-white p-8 rounded-full bg-black shadow-lg">
                    <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5 4h3v12H5V4zm7 0h3v12h-3V4z" /></svg>
                  </div>
                  <div class="text-grey-darker">
                    <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 5h3v10h-3V5zM4 5l9 5-9 5V5z" /></svg>
                  </div>
                  <div class="text-grey-darker">
                    <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5 4a2 2 0 0 0-2 2v6H0l4 4 4-4H5V6h7l2-2H5zm10 4h-3l4-4 4 4h-3v6a2 2 0 0 1-2 2H6l2-2h7V8z" /></svg>
                  </div>
                </div>
              </div>
            </div>
            <div class="mx-8 py-4">
              <div class="flex justify-between text-sm text-grey-darker">
                {/* <p>0:40</p>
                <p>4:20</p> */}
              </div>
              <div class="mt-1">
                <div class="h-1 bg-grey-dark rounded-full">
                  {/* <div class="w-1/5 h-1 bg-gray-800 rounded-full relative"> */}
                  {/* <span class="w-4 h-4 bg-black absolute pin-r pin-b -mb-1 rounded-full shadow"></span> */}
                  {/* </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* end */}
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

        <Actions
          voted={voted}
          upvoteVideo={handleUpvote}
          toggleVideo={() => setShow(!show)}
          playing={isPlaying}
          handlePlay={() => setIsPlaying(true)}
          handlePause={() => setIsPlaying(false)}
          incrementVolume={() => setVolume((volume) => volume + 0.2)}
          decrementVolume={() => setVolume((volume) => volume - 0.2)}
        />
      </motion.div>
      <AdditionalActions
        toggleVideo={() => setShow(!show)}
        onShuffleClick={handleNext}
        onBackgroundShuffleClick={handleBackgroundShuffle}
        onVignetteClick={removeGif}
      />
    </>
  );
}

export default Container;
