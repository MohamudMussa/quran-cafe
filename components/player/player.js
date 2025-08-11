import React from "react";
import ReactPlayer from "react-player";

const wrapperStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 0,
  borderRadius: "8px",
};

const innerWrapperStyle = {
  zIndex: 22,
  width: "100%",
  height: "100%",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "8px",
};

const hiddenStyle = {
  pointerEvents: "none",
  userSelect: "none",
  top: "100%",
  left: "100%",
};

const reactPlayerStyle = {
  pointerEvents: "none",
  display: "none",
  userSelect: "none",
  zIndex: -1,
  borderRadius: "8px",
};

function Player({
  playing,
  show,
  station,
  onPlay,
  onPause,
  onEnded,
  onError,
  muted,
  loop,
  volume,
  onDuration,
  onProgress,
  playerRef,
}) {
  const audioUrl = station?.mp3;
  const mediaUrl = audioUrl || station?.video_url;

  return (
    <div style={show ? wrapperStyle : hiddenStyle}>
      <div style={innerWrapperStyle}>
        {audioUrl ? (
          <audio
            ref={playerRef}
            src={audioUrl}
            preload="auto"
            autoPlay={playing}
            muted={muted}
            loop={loop}
            onCanPlay={(e) => onDuration && onDuration(e.target.duration)}
            onTimeUpdate={(e) => onProgress && onProgress({ playedSeconds: e.target.currentTime })}
            onPlay={onPlay}
            onPause={onPause}
            onEnded={onEnded}
            onError={onError}
          />
        ) : (
          <ReactPlayer
            ref={playerRef}
            url={mediaUrl}
            style={reactPlayerStyle}
            playing={playing}
            controls={false}
            muted={muted}
            volume={volume}
            loop={loop}
            playsinline={true}
            onDuration={onDuration}
            onProgress={onProgress}
            onPlay={onPlay}
            onPause={onPause}
            onEnded={onEnded}
            onError={onError}
          />
        )}
      </div>
    </div>
  );
}

export default Player;
