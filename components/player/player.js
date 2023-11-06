import ReactPlayer from "react-player/youtube";

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
  playerRef
}) {
  return (
    <div style={show ? wrapperStyle : hiddenStyle}>
      <div style={innerWrapperStyle}>
        <ReactPlayer
          ref={playerRef}
          url={station.video_url}
          style={reactPlayerStyle}
          playing={playing}
          controls={false}
          muted={muted}
          volume={volume}
          loop={loop}
          playsinline={true}
          onDuration={onDuration}
          onProgress={onProgress}
          config={{
            youtube: {
              playerVars: {
                modestbranding: false,
                color: "black",
              },
            },
          }}
          onPlay={onPlay}
          onPause={onPause}
          onEnded={onEnded}
          onError={onError}
        />
      </div>
    </div>
  );
}

export default Player;
