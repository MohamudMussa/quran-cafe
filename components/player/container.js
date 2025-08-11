import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
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
import PomodoroTimer from "../PomodoroTimer";
import TodoList from "../TodoList/Index";
// import dynamic from "next/dynamic";
import KeyboardShortcuts from "./keyboard-shortcuts";
import useWindowDimensions from "../../hooks/use-dimensions";
import PrayerTime from "../PrayerTime";

// const KeyboardEventHandler = dynamic(() => import("react-keyboard-event-handler"), { ssr: false })

function Container({ recitations, appElement, onTuning }) {
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
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });

  const time = new Date();
  time.setSeconds(time.getSeconds() + 600); // 10 minutes timer


  // Volume
  const [volume, setVolume] = useState(0.70)
  const [muted, setMuted] = useState(false)
  const finalVolume = muted ? 0 : volume ** 2
  let volumePart = [0, 0.10, 0.20, 0.30, 0.40, 0.50, 0.60, 0.70, 0.80, 0.90, 1]

  // Geolocation
  useEffect(() => {
    handleGetLocation();
  }, []); // Empty dependency array ensures useEffect runs only once after initial render


  // Handle get location permission
  const handleGetLocation = () => {

    const successCallback = (position) => {
      console.log('Latitude is:', position.coords.latitude);
      console.log('Longitude is:', position.coords.longitude);
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    };

    const errorCallback = (error) => {
      console.error('Error getting geolocation:', error.message);
    };

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }

  const { height, width } = useWindowDimensions();

  let soundPlay = () => {
    const sound = new Howl({
      src: ["https://pdfgo.s3.ap-south-1.amazonaws.com/noise_iyJMENPX.mp3"],
      html5: true,
    });
    sound.play()
  }

  const UP_VOTED_STATION_LOCALHOST_KEY = "upVotedStations";


  // handle keypress
  const handleKeyDown = (key) => {
    console.log(key)
    try {
      key === 'ctrl+space' && setIsPlaying(!isPlaying);
      key === 'ctrl+f' && fscreen.requestFullscreen(appElement.current);
      key === 'esc' && fscreen.exitFullscreen();
    } catch (e) {
      console.log(e)
    }
  };


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
    onTuning && onTuning(true);
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
      setTimeout(() => onTuning && onTuning(false), 200);
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
      onTuning && onTuning(true);
      setIsBuffering(true);
      setActiveImage(GLITCHES[Math.floor(Math.random() * GLITCHES.length)]);

      setTimeout(() => {
        setStation(previousStation);
        const image = getImage();
        setActiveImage(image);
        setIsBuffering(false);
        setTimeout(() => onTuning && onTuning(false), 200);
      }, 500);
    }
  }


  return (
    <main className="noise">
      <KeyboardShortcuts onKeyEvent={(key, e) => handleKeyDown(key)} />

      {/* Grid layout to avoid overlap on desktop; stack on small screens */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="h-full w-full grid grid-cols-1 gap-4 p-4 md:grid-cols-[22rem_1fr_22rem] md:grid-rows-[auto_1fr_auto]">
          {/* Left: Prayer Times */}
          <div className="pointer-events-auto md:row-span-3 md:col-start-1 flex md:items-start md:justify-start">
            <div className={`panel-card w-full max-w-sm md:max-w-[22rem] ${isBuffering && "hidden"}`}>
              <PrayerTime handleGetLocation={handleGetLocation} latitude={location.latitude} longitude={location.longitude} />
            </div>
          </div>

          {/* Center: Player */}
          <div className="pointer-events-auto md:col-start-2 md:row-start-2 flex items-center justify-center">
            <div className={`player-window w-full max-w-[28rem] ${isBuffering && 'hidden'}`}>
              {/* Header */}
              <div className="flex justify-between items-center border border-t-0 border-l-0 border-r-0 px-3 panel-header">
                <p className="text-left text-sm tracking-wide font-black">Quran-Café</p>
                <button onClick={() => setShow(false)} className="py-2">
                  <RxCross2 size={12} />
                </button>
              </div>
              {/* Main */}
              <div className="p-4 md:p-4">
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
                <div className="p-2">
                  {/* Info */}
                  <div className="station-info flex items-center">
                    <span className="text-2xl ml-10 text-gray-100 font-semibold">{station.surah.slice(0, 18)} </span>
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
                          wrapperStyle={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                          wrapperClass
                        />) : (
                          <span className="text-xl">....</span>
                        )
                      }
                    </div>
                  </div>
                  {/* Slider */}
                  <div className="slider-container">
                    {duration && <Slider value={progress} duration={duration} onSeek={handleSeekChange} />}
                  </div>
                  {/* Actions */}
                  <div className="player-controls">
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

                  <div className="mt-6 flex flex-col">
                    <div className="flex">
                      {volumePart.map((item, index) => (
                        <>
                          <div key={`vol-${index}`} onClick={() => setVolume(item)} className={`${item <= volume ? 'bg-black' : 'bg-gray-400'} px-1 py-2 mr-1 cursor-pointer`} />
                          <span />
                        </>
                      ))}
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
          </div>

          {/* Right: Promidot Timer */}
          <div className="pointer-events-auto md:row-start-1 md:row-end-3 md:col-start-3 flex md:items-start md:justify-end">
            <div className={`panel-card w-full max-w-sm md:max-w-[22rem] p-2 ${isBuffering && "hidden"}`}>
              <PomodoroTimer expiryTimestamp={time} />
            </div>
          </div>

          {/* Bottom Right: Todo List */}
          <div className="pointer-events-auto md:col-start-3 md:row-start-3 flex md:items-end md:justify-end">
            <div className={`panel-card w-full max-w-md md:max-w-[22rem] p-4 ${isBuffering && "hidden"}`}>
              <TodoList />
            </div>
          </div>
        </div>
      </div>

      {/* Shortcuts/help overlays remain */}
      {
        !isBuffering && (
          <div>

            <AdditionalActions toggleFullscreen={toggleFullscreen} inFullscreenMode={inFullscreenMode} appElement={appElement} />
          </div>
        )
      }
    </main>
  );
}

export default Container;
