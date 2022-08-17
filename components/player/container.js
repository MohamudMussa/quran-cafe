import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { Actions, AdditionalActions, Content, Player } from ".";
import { removeGif, getImage, getStation } from "./utils";
import { IMAGES } from "../../config/constants";
import useRecitations from "../../context/recitations";
import Slider from "./slider";
import styles  from "./action.module.css";

function Container({ recitations }) {
  const { instance } = useRecitations();
  const [voted, setVoted] = useState(false);
  const [activeImage, setActiveImage] = useState(IMAGES[0]);
  const [station, setStation] = useState(getStation(recitations));
  const [previousStation, setPreviousStation] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [onLoop, setOnLoop] = useState(false);
  const [show, setShow] = useState(false);
  const [duration, setDuration] = useState();
  const [progress, setProgress] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const playerRef = useRef();

  const PLAYER_VOLUME = 0.2;
  const UP_VOTED_STATION_LOCALHOST_KEY = "upVotedStations";

  useEffect(() => {
      const rawVotedStations = localStorage.getItem(UP_VOTED_STATION_LOCALHOST_KEY);
      console.log('rawVotedStations::::', rawVotedStations);
      if(rawVotedStations) {
        const votedStations = JSON.parse(rawVotedStations) || [];
        setVoted(votedStations.includes(station.id))
      }
  }, [station, recitations]);

  const handleUpvote = useCallback(async () => {
    if (voted) return;
    const res = await instance.current.incrementUpvoteById(
      station.id,
      station.up_vote + 1
    );
    if (res) {
      let votedStations = [];
      const rawVotedStations = localStorage.getItem(UP_VOTED_STATION_LOCALHOST_KEY);
      if(rawVotedStations) {
        console.log("JSON.parse(rawVotedStations)::::", JSON.parse(rawVotedStations));
        votedStations = JSON.parse(rawVotedStations) || [];
      }
      votedStations.push(station.id);
      localStorage.setItem(UP_VOTED_STATION_LOCALHOST_KEY, JSON.stringify(votedStations));
      setVoted(true);
    }
  }, [instance, station, voted]);

  const handleShuffle = useCallback(() => {
    setPreviousStation(station);
    const shuffledStation = getStation(recitations);
    setStation(shuffledStation);
    const image = getImage();
    setActiveImage(image);
    setOnLoop(false);
  }, [recitations]);

  const handleSeekChange = (seekFraction) => {
    const time = seekFraction/100*duration;
    setSeeking(true);
    playerRef.current.seekTo(time);
  };

  const handleProgress = ({ playedSeconds }) => {
    // if (!seeking) {
      const percentageProgress = (playedSeconds/duration)*100;
      setProgress(percentageProgress)
    // }
  }

  const handleSetLoop = () => {
    setOnLoop(!onLoop);
  }

  const handleOnPrevious = () => {
    if (previousStation) {
      setStation(previousStation);
      const image = getImage();
      setActiveImage(image);
    }
  }

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
        <div className="player-wrapper">
          <Player
            playerRef={playerRef}
            playing={isPlaying}
            muted={isMuted}
            volume={PLAYER_VOLUME}
            show={show}
            loop={onLoop}
            station={station}
            onPlay={() => setIsMuted(false)}
            onPause={() => setIsPlaying(false)}
            onDuration={(duration) => setDuration(duration)}
            onProgress={handleProgress}
            onEnded={handleShuffle}
            onError={handleShuffle}
          />
          <div className="text-center lg:w-2/3 w-full mx-auto player-inner">
            <div className="station-info">
              <p className="reciter-name">{station.reciter?.name}</p>
              <p className="surah-name">{station.surah}</p>
            </div>
            <div className="slider-container">
              {
                duration && 
                <Slider value={progress} duration={duration} onSeek={handleSeekChange}/>
              }
            </div>
            <Actions
              voted={voted}
              loop={onLoop}
              onUpvote={handleUpvote}
              playing={isPlaying}
              handlePlay={() => setIsPlaying(true)}
              handlePause={() => setIsPlaying(false)}
              onSetLoop={handleSetLoop}
              onShuffle={handleShuffle}
              onPrevious={handleOnPrevious}
            />
            <div className="ayah-container">
              <div className="ayah-inner">
                <p className="ayah-text">So when the Quran is recited, listen carefully to it, and keep silent so that you may, be shown mercy.</p>
                <p className="ayah-text ayah-reference">[7:204]</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <div>
        <AdditionalActions />
      </div>
    </>
  );
}

export default Container;
