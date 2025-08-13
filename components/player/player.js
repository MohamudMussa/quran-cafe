import React, { useEffect, useRef } from "react";
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
  onNext,
  onPrevious,
  onRequestPlay,
  onRequestPause,
}) {
  const audioUrl = station?.mp3;
  const mediaUrl = audioUrl || station?.video_url;

  const audioEl = useRef(null);
  const reactPlayerRef = useRef(null);

  // Expose a seekTo API compatible with container for both cases
  useEffect(() => {
    if (!playerRef) return;
    playerRef.current = {
      seekTo: (seconds) => {
        if (audioUrl && audioEl.current) {
          audioEl.current.currentTime = seconds;
        } else if (reactPlayerRef.current && typeof reactPlayerRef.current.seekTo === 'function') {
          reactPlayerRef.current.seekTo(seconds, 'seconds');
        }
      },
      forcePlay: async () => {
        if (audioEl.current) {
          try { await audioEl.current.play(); } catch {}
        } else if (reactPlayerRef.current) {
          try { await reactPlayerRef.current.getInternalPlayer()?.play?.(); } catch {}
        }
      },
      forcePause: () => {
        if (audioEl.current) {
          try { audioEl.current.pause(); } catch {}
        } else if (reactPlayerRef.current) {
          try { reactPlayerRef.current.getInternalPlayer()?.pause?.(); } catch {}
        }
      },
    };
  }, [audioUrl, playerRef]);

  // Control audio play/pause, mute, and volume via props when using <audio>
  useEffect(() => {
    if (!audioUrl || !audioEl.current) return;
    const el = audioEl.current;
    try {
      el.muted = !!muted;
      el.volume = typeof volume === 'number' ? Math.min(1, Math.max(0, volume)) : el.volume;
      if (playing) {
        const p = el.play();
        if (p?.catch) p.catch(() => {});
      } else {
        el.pause();
      }
    } catch {}
  }, [audioUrl, playing, muted, volume]);

  // Media Session API for background controls and lockscreen metadata
  useEffect(() => {
    if (typeof navigator === 'undefined' || !('mediaSession' in navigator)) return;
    try {
      const title = station?.surah || 'Qur\u2019an Recitation';
      const artist = station?.reciter?.name || 'Unknown Reciter';
      const album = 'Quran-Caf\u00E9';
      // Set metadata
      navigator.mediaSession.metadata = new window.MediaMetadata({ title, artist, album });

      navigator.mediaSession.setActionHandler('previoustrack', () => {
        if (onPrevious) onPrevious();
      });
      navigator.mediaSession.setActionHandler('nexttrack', () => {
        if (onNext) onNext();
      });
      navigator.mediaSession.setActionHandler('play', async () => {
        if (audioEl.current) {
          try { await audioEl.current.play(); } catch {}
        }
        if (onRequestPlay) onRequestPlay();
      });
      navigator.mediaSession.setActionHandler('pause', () => {
        if (audioEl.current) audioEl.current.pause();
        if (onRequestPause) onRequestPause();
      });
      navigator.mediaSession.setActionHandler('stop', () => {
        if (audioEl.current) audioEl.current.pause();
        if (onRequestPause) onRequestPause();
      });
      navigator.mediaSession.playbackState = playing ? 'playing' : 'paused';
    } catch {}
  }, [station, onNext, onPrevious, onRequestPlay, onRequestPause, playing]);

  return (
    <div style={show ? wrapperStyle : hiddenStyle}>
      <div style={innerWrapperStyle}>
        {audioUrl ? (
          <audio
            ref={audioEl}
            src={audioUrl}
            preload="auto"
            autoPlay
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
            ref={reactPlayerRef}
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
