import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  playTrack,
  pauseTrack,
  resumeTrack,
} from "../../../store/playerSlice";
import { RootState } from "../../../store";
import Loading from "../../../components/Loading/Loading";
import { BeatRow } from "../../../components/BeatRow/BeatRow";
import {
  PlayCircleIcon,
  PauseCircleIcon,
  ShareNetworkIcon, 
  MusicNoteIcon,
} from "@phosphor-icons/react";

import "./ShowTrack.scss";

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
  releaseDate?: string;
};

// ---------- Component ----------
const TrackInfo = () => {
  const { id } = useParams();
  const [beat, setBeat] = useState<Beat>();
  const [loading, setLoading] = useState(true);
  const [relatedTracks, setRelatedTracks] = useState<Beat[]>([]);

  const dispatch = useDispatch();
  const { currentTrack, isPlaying } =
    useSelector((s: RootState) => s.player);

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

  // ---------- Fetch Beat & Related Tracks ----------
  useEffect(() => {
    if (!id || !apiLink) return;

    // Reset state for new track
    setLoading(true);
    // setBg("#18181b");

    // Fetch the specific track
    fetch(`${apiLink}track/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBeat(data);
        setLoading(false);
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

          <div className="ti-details-container">
            <div className="ti-details">
              <div className="ti-header-row">
                <button className="ti-play-btn" onClick={handlePlay}>
                  {playing ? <PauseCircleIcon weight="fill" /> : <PlayCircleIcon weight="fill" />}
                </button>
                <span className="ti-title">{beat.title}</span>
              </div>

              <span className="ti-artist">BlueState</span>

              <div className="ti-badges">
                {beat.bpm && (
                  <span className="ti-badge">
                    <span className="bpm-box">{beat.bpm} BPM</span>
                  </span>
                )}

                <div className="middot"></div>

                {beat.scale && (
                  <span className="ti-badge">
                    <MusicNoteIcon weight="bold" /> {beat.scale}
                  </span>
                )}

                <div className="middot"></div>

                {beat.releaseDate && (
                  <span className="ti-badge">
                    {beat.releaseDate}
                  </span>
                )}
              </div>

              {beat.description && (
                <p className="ti-description">{beat.description}</p>
              )}

              {beat.genre && beat.genre.length > 0 && (
                <div className="ti-tags">
                  {beat.genre.map((g, i) => (
                    <span key={i} className="ti-tag-pill">{g.toLowerCase()}</span>
                  ))}
                </div>
              )}
            </div>

            <div className="ti-actions-row">
              <button className="ti-btn">
                {displayPrice}
              </button>

              <button className="ti-btn">
                <ShareNetworkIcon weight="bold" /> SHARE
              </button>
            </div>
          </div>
        </div>

        {/* --- Tabs & Related Tracks --- */}
        <div className="ti-tabs">
          <button className="ti-tab">RELATED TRACKS</button>
        </div>

        <div className="ti-related-tracks">
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

    </div>
  );
};

export default TrackInfo;