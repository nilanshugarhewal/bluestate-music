import React, { useEffect, useRef, useState } from "react";
import {
  PlayIcon, PauseIcon,
  SkipBackIcon, SkipForwardIcon,
  HeartIcon, ShuffleIcon,
  RepeatIcon, SpeakerHighIcon
} from "@phosphor-icons/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  pauseTrack,
  resumeTrack,
  setTime,
  clearSeek,
} from "../../store/playerSlice";
import { Link } from "react-router-dom";
import "./MusicPlayer.scss";

const MusicPlayer = () => {
  const dispatch = useDispatch();

  const { currentTrack, isPlaying, seekToSec, currentTimeSec, durationSec } =
    useSelector((state: RootState) => state.player);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);

  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [hoverX, setHoverX] = useState<number>(0);

  // Toggle play/pause
  const togglePlay = () => {
    if (!currentTrack) return;
    isPlaying ? dispatch(pauseTrack()) : dispatch(resumeTrack());
  };

  // Wire audio events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    const onLoaded = () => {
      // duration can be NaN before metadata; guard it
      const dur = Number.isFinite(audio.duration) ? audio.duration : 0;
      dispatch(setTime({ current: audio.currentTime || 0, duration: dur }));
    };
    const onTimeUpdate = () => {
      const dur = Number.isFinite(audio.duration) ? audio.duration : 0;
      dispatch(setTime({ current: audio.currentTime, duration: dur }));
    };
    const onEnded = () => {
      dispatch(pauseTrack());
      audio.currentTime = 0;
      const dur = Number.isFinite(audio.duration) ? audio.duration : 0;
      dispatch(setTime({ current: 0, duration: dur }));
    };

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
    };
  }, [dispatch, currentTrack]);

  // Apply play/pause from Redux
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    if (isPlaying) {
      const tryPlay = () => {
        audio.play().catch((err) => {
          console.warn("Autoplay error:", err);
        });
      };
      if (audio.readyState >= 2) {
        tryPlay();
      } else {
        audio.addEventListener("loadeddata", tryPlay, { once: true });
      }
    } else {
      audio.pause();
    }
  }, [isPlaying, currentTrack]);

  // Apply seek requests from Redux
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (seekToSec !== null && Number.isFinite(seekToSec)) {
      const dur = Number.isFinite(audio.duration) ? audio.duration : 0;
      const clamped = Math.min(Math.max(0, seekToSec), dur || seekToSec);
      audio.currentTime = clamped;
      dispatch(clearSeek());
    }
  }, [seekToSec, dispatch]);

  // Seek by clicking on the navbar bar
  const handleSeekClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !durationSec) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = clickX / rect.width;
    const seekTime = percent * durationSec;

    if (Number.isFinite(seekTime)) {
      audioRef.current.currentTime = seekTime;
    }
  };

  // Keyboard arrows to seek
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const audio = audioRef.current;
      if (!audio) return;
      if (e.key === "ArrowRight") {
        audio.currentTime = Math.min(
          audio.currentTime + 5,
          audio.duration || Infinity
        );
      } else if (e.key === "ArrowLeft") {
        audio.currentTime = Math.max(audio.currentTime - 5, 0);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const formatTime = (seconds: number) => {
    const s = Math.max(0, Math.floor(seconds));
    const mins = Math.floor(s / 60);
    const secs = String(s % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  if (!currentTrack) return null;

  const progressPct =
    durationSec > 0 ? (currentTimeSec / durationSec) * 100 : 0;

  return (
    <div className="music-player-container">

      <div className="mp-progress-container-2">
        <span className="mp-time">{formatTime(currentTimeSec)}</span>
        <div
          className="mp-progress-bar-wrapper"
          ref={barRef}
          onClick={handleSeekClick}
          onMouseMove={(e) => {
            if (!durationSec) return;
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const percent = x / rect.width;
            const time = percent * durationSec;
            setHoverX(x);
            setHoverTime(time);
          }}
          onMouseLeave={() => setHoverTime(null)}
        >
          {hoverTime !== null && (
            <div className="mp-tooltip" style={{ left: hoverX }}>
              {formatTime(hoverTime)}
            </div>
          )}
          <div className="mp-progress-bg">
            <div className="mp-progress-fill" style={{ width: `${progressPct}%` }}>
              <div className="mp-progress-handle"></div>
            </div>
          </div>
        </div>
        <span className="mp-time">{formatTime(durationSec)}</span>
      </div>

      <div className="music-player bg-blur">
        {/* Only audio in the whole app */}
        <audio ref={audioRef} src={currentTrack.audioUrl} preload="metadata" />



        {/* CENTER: Controls and Progress */}
        <div className="mp-left">
          <div className="mp-controls">
            <button className="mp-play-btn" onClick={togglePlay}>
              {isPlaying ? (
                <PauseIcon weight="fill" />
              ) : (
                <PlayIcon weight="fill" />
              )}
            </button>

            <button className="mp-control-btn">
              <SkipBackIcon weight="fill" />
            </button>


            <button className="mp-control-btn">
              <SkipForwardIcon weight="fill" />
            </button>
          </div>

          <div className="mp-progress-container">
            <span className="mp-time">{formatTime(currentTimeSec)}</span>
            <div
              className="mp-progress-bar-wrapper"
              ref={barRef}
              onClick={handleSeekClick}
              onMouseMove={(e) => {
                if (!durationSec) return;
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const percent = x / rect.width;
                const time = percent * durationSec;
                setHoverX(x);
                setHoverTime(time);
              }}
              onMouseLeave={() => setHoverTime(null)}
            >
              {hoverTime !== null && (
                <div className="mp-tooltip" style={{ left: hoverX }}>
                  {formatTime(hoverTime)}
                </div>
              )}
              <div className="mp-progress-bg">
                <div className="mp-progress-fill" style={{ width: `${progressPct}%` }}>
                  <div className="mp-progress-handle"></div>
                </div>
              </div>
            </div>
            <span className="mp-time">{formatTime(durationSec)}</span>
          </div>
        </div>

        {/* LEFT: Cover and Info */}
        <div className="mp-center">
          <Link to={`/track/${currentTrack._id}`} className="mp-cover-link">
            <img
              src={currentTrack.coverImage}
              alt={currentTrack.title}
              className="mp-cover-img"
            />
          </Link>
          <Link to={`/track/${currentTrack._id}`} className="mp-info-link">
            <div className="mp-title">{currentTrack.title}</div>
            <div className="mp-artist">BlueState</div>
          </Link>
        </div>

        {/* RIGHT: Extra Actions */}
        <div className="mp-right">
          <button className="mp-action-btn">
            <HeartIcon />
          </button>
          <button className="mp-action-btn">
            <ShuffleIcon />
          </button>
          <button className="mp-action-btn">
            <RepeatIcon />
          </button>
          <button className="mp-action-btn">
            <SpeakerHighIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
