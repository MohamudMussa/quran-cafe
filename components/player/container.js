import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { Actions, AdditionalActions, Content, Player } from ".";
import { removeGif, getImage, getStation } from "./utils";
import { IMAGES, GLITCHES } from "../../config/constants";
import useRecitations from "../../context/recitations";
import Slider from "./slider";
import Draggable from "react-draggable";
import { RxCross2 } from "react-icons/rx";
import { Howl } from 'howler';
import { Audio } from 'react-loader-spinner'
import { BsDashLg } from "react-icons/bs";
import fscreen from 'fscreen';
import CountdownTimer from "../CountDownTimer";




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
  const [isBuffering, setIsBuffering] = useState(false);
  const playerRef = useRef();

  const time = new Date();
  time.setSeconds(time.getSeconds() + 600); // 10 minutes timer

  // Volume
  const [volume, setVolume] = useState(0.70)
  const [muted, setMuted] = useState(false)
  const finalVolume = muted ? 0 : volume ** 2
  let volumePart = [0, 0.10, 0.20, 0.30, 0.40, 0.50, 0.60, 0.70, 0.80, 0.90, 1]


  let soundPlay = () => {
    const sound = new Howl({
      src: ["https://pdfgo.s3.ap-south-1.amazonaws.com/noise_iyJMENPX.mp3"],
      html5: true,
    });
    sound.play()
  }

  const UP_VOTED_STATION_LOCALHOST_KEY = "upVotedStations";


  // handle keypress
  const [keyPressed, setKeyPressed] = useState('');

  const handleKeyDown = (e) => {
    setKeyPressed(e.key === ' ' ? 'Space' : e.key);
  };

  useEffect(() => {
    keyPressed === 'Space' && setIsPlaying(!isPlaying);
    setKeyPressed('');
    keyPressed === 'f' && fscreen.requestFullscreen(appElement.current);
    keyPressed === 'Escape' && fscreen.exitFullscreen();
  }, [keyPressed, isPlaying]);


  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);


  // Handle full screen
  const [inFullscreenMode, setInFullscreenMode] = React.useState(false);

  const handleFullscreenChange = React.useCallback((e) => {
    let change = '';
    if (fscreen.fullscreenElement !== null) {
      change = 'Entered fullscreen mode';
      setInFullscreenMode(true);
    } else {
      change = 'Exited fullscreen mode';
      setInFullscreenMode(false);
    }
    console.log(change, e);
  }, []);

  const handleFullscreenError = React.useCallback((e) => {
    console.log('Fullscreen Error', e);
  }, []);

  useEffect(() => {
    if (fscreen.fullscreenEnabled) {
      fscreen.addEventListener(
        'fullscreenchange',
        handleFullscreenChange,
        false,
      );
      fscreen.addEventListener('fullscreenerror', handleFullscreenError, false);
      return () => {
        fscreen.removeEventListener('fullscreenchange', handleFullscreenChange);
        fscreen.removeEventListener('fullscreenerror', handleFullscreenError);
      };
    }
  });

  const toggleFullscreen = React.useCallback(() => {
    if (inFullscreenMode) {
      fscreen.exitFullscreen();
    } else {
      fscreen.requestFullscreen(appElement.current);
    }
  }, [inFullscreenMode]);


  const appElement = useRef(null);

  useEffect(() => {
    const rawVotedStations = localStorage.getItem(UP_VOTED_STATION_LOCALHOST_KEY);
    console.log('rawVotedStations::::', rawVotedStations);
    if (rawVotedStations) {
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
      if (rawVotedStations) {
        console.log("JSON.parse(rawVotedStations)::::", JSON.parse(rawVotedStations));
        votedStations = JSON.parse(rawVotedStations) || [];
      }
      votedStations.push(station.id);
      localStorage.setItem(UP_VOTED_STATION_LOCALHOST_KEY, JSON.stringify(votedStations));
      setVoted(true);
    }
  }, [instance, station, voted]);

  const handleShuffle = useCallback(() => {
    setIsBuffering(true);
    setActiveImage(GLITCHES[Math.floor(Math.random() * GLITCHES.length)]);
    setTimeout(() => {
      setPreviousStation(station);
      const shuffledStation = getStation(recitations);
      setStation(shuffledStation);
      const image = getImage();
      setActiveImage(image);
      setOnLoop(false);
      setIsBuffering(false);
    }, 500);
  }, [recitations]);

  const handleSeekChange = (seekFraction) => {
    const time = seekFraction / 100 * duration;
    setSeeking(true);
    playerRef.current.seekTo(time);
  };

  const handleProgress = ({ playedSeconds }) => {
    // if (!seeking) {
    const percentageProgress = (playedSeconds / duration) * 100;
    setProgress(percentageProgress)
    // }
  }

  const handleSetLoop = () => {
    setOnLoop(!onLoop);
  }

  const handleOnPrevious = () => {
    if (previousStation) {
      setIsBuffering(true);
      setActiveImage(GLITCHES[Math.floor(Math.random() * GLITCHES.length)]);

      setTimeout(() => {
        setStation(previousStation);
        const image = getImage();
        setActiveImage(image);
        setIsBuffering(false);
      }, 500);
    }
  }

  return (
    <main
      className="noise"
      ref={appElement}
    >
      <div className="flex flex-col items-center justify-center w-80 h-60 max-w-md absolute">
        <CountdownTimer expiryTimestamp={time} />
        {/* <button className="" onClick={() => setTimerStarted(true)}>Start Time</button> */}
      </div>
      <motion.div
        className="flex py-16	justify-center h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          backgroundImage: `url(${activeImage.src})`,
          backgroundSize: "cover",
          opacity: "0.7",
        }}
      >
        {
          !isBuffering && (
            <Draggable>
              <div className="w-96 h-80 glassmorphism rounded-none flex flex-col border-2 shadow">
                {/* Header */}
                <div className="flex justify-end border border-t-0 border-l-0 border-r-0 px-2">
                  <button onClick={() => setShow(false)} className="absolute left-2 top-2">
                    <RxCross2 size={12} fontWeight={1000} />
                  </button>
                  <p className="text-right">Quran-Cafe</p>
                </div>
                {/* Main */}
                <div className="p-5 md:p-0">
                  <Player
                    playerRef={playerRef}
                    playing={isPlaying}
                    muted={isMuted}
                    volume={volume}
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
                  <div className="p-6">
                    {/* Info */}
                    <div className="station-info flex items-center">
                      <span className="text-2xl ml-10 text-gray-100 font-semibold">{station.surah.slice(0, 14)} </span>
                      <BsDashLg size={10} color="black" className="text-gray-100 mx-2" />
                      <span className="text-sm">{station.reciter?.name.slice(0, 23)}</span>
                      <div className={`ml-4 absolute left-1 ${isPlaying ? 'top-11' : 'top-14'}`}>
                        {
                          isPlaying ? (<Audio
                            height="30"
                            width="30"
                            radius="2"
                            color='black'
                            ariaLabel='three-dots-loading'
                            animate={false}
                            wrapperStyle={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                            wrapperClass
                          />) : (
                            <span className="text-xl">....</span>
                          )
                        }
                      </div>
                    </div>
                    {/* Slider */}
                    <div className="slider-container">
                      {
                        duration &&
                        <Slider value={progress} duration={duration} onSeek={handleSeekChange} />
                      }
                    </div>
                    {/* Actions */}
                    <div className="">
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
                    </div>

                    <div className="mt-8 flex flex-col">

                      <div className="flex">
                        {
                          volumePart.map((item, index) => {
                            return (
                              <>
                                <div onClick={
                                  () => setVolume(item)
                                } className={`${item <= volume ? "bg-black" : "bg-gray-400"
                                  } px-1 py-2 mr-1 cursor-pointer`} />
                                <span >
                                </span>
                              </>)
                          })
                        }
                      </div>
                    </div>
                    <div className="ayah-container">
                      <div className="ayah-inner">

                        <p className="ayah-text">So when the Quran is recited, listen carefully to it, and keep silent so that you may, be shown mercy.</p>
                        <p className="ayah-text ayah-reference">[7:204]</p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </Draggable>
          )
        }


      </motion.div >
      <div>
        <div className="absolute right-5 bottom-5">
          <div className="glassmorphism p-3 rounded-xl flex justify-start flex-col mb-5">
            <span className="text-black text-sm rotate-90">play/pause</span>
            <span className="text-xl"> press <span className="font-semibold text-xl">space</span></span>
          </div>

          <div className="glassmorphism p-3 rounded-xl flex justify-start flex-col">
            <span className="text-black text-sm rotate-90"> {inFullscreenMode && 'exit '}fullscreen</span>
            <span className="text-xl"> press <span className="font-semibold text-xl">{inFullscreenMode ? 'esc' : 'f'}</span></span>
          </div>
        </div>
        <AdditionalActions toggleFullscreen={toggleFullscreen} inFullscreenMode={inFullscreenMode} appElement={appElement} />
      </div>



    </main >

  );
}

export default Container;
