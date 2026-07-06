import { Link, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  playTrack,
  pauseTrack,
  resumeTrack,
  setSeek,
} from "../../../store/playerSlice";
import { RootState } from "../../../store";
import ColorThief from "color-thief-browser";
import Loading from "../../../components/Loading/Loading";
import Footer from "../../../layouts/Footer/Footer";
import { BeatRow } from "../../../components/BeatRow/BeatRow";
import {
  PlayCircleIcon,
  PauseCircleIcon,
  ShoppingBagIcon,
  ShareNetworkIcon,
  MusicNoteIcon,
  ClockIcon,
} from "@phosphor-icons/react";

// ---------- Types ----------
type Beat = {
  _id: string;
  title?: string;
  bpm?: number;
  audioUrl: string;
  genre?: string[];
  mood?: string[];
  scale?: string;
  duration?: string;
  price?: string;
  description?: string;
  coverImage?: string;
  createdAt?: string;
};

// ---------- Helpers ----------
const formatTime = (sec: number) =>
  `${Math.floor(sec / 60)}:${Math.floor(sec % 60)
    .toString()
    .padStart(2, "0")}`;

const darken = ([r, g, b]: number[], f = 0.7) =>
  `rgb(${(r * f) | 0}, ${(g * f) | 0}, ${(b * f) | 0})`;

const formatDate = (dateString?: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

// ---------- Component ----------
const TrackInfo = () => {
  const { id } = useParams();
  const [beat, setBeat] = useState<Beat>();
  const [loading, setLoading] = useState(true);
  const [bg, setBg] = useState("#18181b");
  const [relatedTracks, setRelatedTracks] = useState<Beat[]>([]);
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [hoverX, setHoverX] = useState<number>(0);

  const dispatch = useDispatch();
  const { currentTrack, isPlaying, progress, durationSec, currentTimeSec } =
    useSelector((s: RootState) => s.player);

  const barRef = useRef<HTMLDivElement>(null);
  const apiLink = process.env.REACT_APP_API_URL;
  const apiRandom = process.env.REACT_APP_API_RANDOM;

  const isCurrent = currentTrack?._id === beat?._id;
  const playing = isCurrent && isPlaying;

  // ---------- Actions ----------
  const handlePlay = () =>
    beat &&
    dispatch(
      isCurrent ? (playing ? pauseTrack() : resumeTrack()) : playTrack(beat)
    );

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!barRef.current || !durationSec) return;
    const { left, width } = barRef.current.getBoundingClientRect();
    dispatch(setSeek(((e.clientX - left) / width) * durationSec));
  };

  // ---------- Fetch Beat & Related Tracks ----------
  useEffect(() => {
    if (!id || !apiLink) return;

    // Reset state for new track
    setLoading(true);
    setBg("#18181b");

    // Fetch the specific track
    fetch(`${apiLink}track/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBeat(data);
        setLoading(false);

        if (!data.coverImage) return;
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = data.coverImage;
        img.onload = () => {
          try {
            const thief = new ColorThief();
            const col = thief.getColor(img);
            setBg(`linear-gradient(180deg, ${darken(col, 0.9)} 0%, #d6d6d6 100%)`);
          } catch (err) {
            console.warn("ColorThief failed:", err);
          }
        };
      })
      .catch(console.error);

    // Fetch related tracks
    if (apiRandom) {
      fetch(apiRandom)
        .then(res => res.json())
        .then((data: Beat[]) => {
          // Filter out the current track if it's in the random list
          const filtered = data.filter(t => t._id !== id).slice(0, 5);
          setRelatedTracks(filtered);
        })
        .catch(console.error);
    }
  }, [id, apiLink, apiRandom]);

  // ---------- Render ----------
  if (loading || !beat) return <Loading />;

  // Display price logic
  const displayPrice = beat.price ? `$${beat.price}` : "$49.99";

  return (
    <div className="track-info-page">
      <div className="ti-container">

        {/* --- Hero Section --- */}
        <div className="ti-hero">
          <div className="ti-cover">
            <img src={beat.coverImage} alt={beat.title} />
          </div>

          <div className="ti-details">
            <div className="ti-header-row">
              <button className="ti-play-btn" onClick={handlePlay}>
                {playing ? <PauseCircleIcon weight="fill" /> : <PlayCircleIcon weight="fill" />}
              </button>
              <h1 className="ti-title">{beat.title}</h1>
            </div>

            <p className="ti-artist">BlueState</p>

            <div className="ti-badges">
              {beat.bpm && (
                <span className="ti-badge">
                  <span className="ti-badge-icon bpm-box">BPM</span> {beat.bpm}
                </span>
              )}
              {beat.scale && (
                <span className="ti-badge">
                  <MusicNoteIcon weight="bold" /> {beat.scale}
                </span>
              )}
              {beat.createdAt && (
                <span className="ti-badge">
                  <ClockIcon weight="bold" /> {formatDate(beat.createdAt)}
                </span>
              )}
            </div>

            {beat.description && (
              <p className="ti-description">{beat.description}</p>
            )}

            <div className="ti-actions-row">
              <button className="ti-btn-buy">
                <ShoppingBagIcon weight="bold" /> {displayPrice}
              </button>

              <button className="ti-btn-share">
                <ShareNetworkIcon weight="bold" /> SHARE
              </button>

              {beat.genre && beat.genre.length > 0 && (
                <div className="ti-tags">
                  {beat.genre.map((g, i) => (
                    <span key={i} className="ti-tag-pill">{g.toLowerCase()}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* --- Progress Bar Section (Replaces Waveform) --- */}
        {/* <div className="ti-progress-section">
          <div
            className="ti-progress-bar-wrapper"
            ref={barRef}
            onClick={handleSeek}
            onMouseMove={(e) => {
              if (!barRef.current || !durationSec) return;
              const rect = barRef.current.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const percent = x / rect.width;
              setHoverX(x);
              setHoverTime(percent * durationSec);
            }}
            onMouseLeave={() => setHoverTime(null)}
          >
            {isCurrent && hoverTime !== null && (
              <div className="ti-tooltip" style={{ left: hoverX }}>
                {formatTime(hoverTime)}
              </div>
            )}
            <div className="ti-progress-bg">
              <div className="ti-progress-fill" style={{ width: isCurrent ? `${progress}%` : "0%" }}>
                <div className="ti-progress-handle"></div>
              </div>
            </div>
          </div>
          <div className="ti-time-labels">
            <span>{isCurrent ? formatTime(currentTimeSec) : "0:00"}</span>
            <span>{isCurrent ? formatTime(durationSec) : "0:00"}</span>
          </div>
        </div> */}

        {/* --- Tabs & Related Tracks --- */}
        <div className="ti-tabs">
          <button className="ti-tab active">RELATED TRACKS</button>
        </div>

        <div className="ti-related-tracks">
          <div className="ti-table-header">
            <span className="th-title">TITLE</span>
            <span className="th-time">TIME</span>
            <span className="th-bpm">BPM</span>
            <span className="th-tags">TAGS</span>
          </div>

          <div className="ti-related-list">
            {relatedTracks.length > 0 ? (
              relatedTracks.map(t => (
                <BeatRow key={t._id} beat={t} handlePlay={() => {
                  dispatch(playTrack(t));
                }} />
              ))
            ) : (
              <p className="ti-no-related">No related tracks found.</p>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TrackInfo;
