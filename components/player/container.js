import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Actions, AdditionalActions, Content, Player } from ".";
import { removeGif, getImage, getStation } from "./utils";
import { IMAGES } from "../../config/constants";
import useRecitations from "../../context/recitations";

function Container({ recitations, playlists: playlistsData }) {
  const [selectedPlaylist, setSelectedPlaylist] = useState("jummah");
  const [playlists, setPlaylists] = useState([]);
  const { instance } = useRecitations();
  const [voted, setVoted] = useState(false);
  const [activeImage, setActiveImage] = useState(IMAGES[0]);
  const [station, setStation] = useState(getStation(recitations));
  const [volume, setVolume] = useState(0.2);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [show, setShow] = useState(false);

  const handleClick = useCallback(() => {
    const image = getImage();
    setActiveImage(image);
  }, []);

  const handleNext = useCallback(() => {
    const station = getStation(recitations);
    setStation(station);
    setVoted(false);
  }, [recitations]);

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
    if (playlistsData.length) {
      const items = playlistsData.map((p) => {
        const tracks = recitations.filter((r) => r.playlist_id === p.id);
        return {
          ...p,
          type: p.name.toLowerCase(),
          selected: false,
          tracks: tracks,
        };
      });
      items.push({
        selected: true,
        type: "default",
        tracks: recitations,
      });
      setPlaylists(items);
    }
  }, [playlistsData, recitations]);

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
            voted={voted}
            upvoteVideo={handleUpvote}
            toggleVideo={() => setShow(!show)}
            playing={isPlaying}
            handlePlay={() => setIsPlaying(true)}
            handlePause={() => setIsPlaying(false)}
            incrementVolume={() => setVolume((volume) => volume + 0.2)}
            decrementVolume={() => setVolume((volume) => volume - 0.2)}
          />
        </div>
      </motion.div>
      <AdditionalActions
        toggleVideo={() => setShow(!show)}
        onShuffleClick={handleNext}
        onBackgroundShuffleClick={handleClick}
        onVignetteClick={removeGif}
      />
    </>
  );
}

export default Container;
