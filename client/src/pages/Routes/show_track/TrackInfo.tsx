import { useParams } from "react-router-dom";
import { useMemo } from "react";
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
import { useGetBeatByIdQuery, useGetBeatsQuery } from "../../../store/apiSlice";

import "./ShowTrack.scss";

// ---------- Types ----------
import { Beat } from "../../../types";

// ---------- Component ----------
const TrackInfo = () => {
  const { id } = useParams();
  
  const { data: beat, isLoading: loading } = useGetBeatByIdQuery(id ?? "", { skip: !id });
  const { data: allBeats = [] } = useGetBeatsQuery();

  const relatedTracks = useMemo(() => {
    if (!allBeats.length) return [];
    const shuffled = [...allBeats];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.filter((t) => t.id !== id).slice(0, 5);
  }, [allBeats, id]);

  const dispatch = useDispatch();
  const { currentTrack, isPlaying } =
    useSelector((s: RootState) => s.player);

  const isCurrent = currentTrack?.id === beat?.id;
  const playing = isCurrent && isPlaying;

  // ---------- Actions ----------
  const handlePlay = () =>
    beat &&
    dispatch(
      isCurrent ? (playing ? pauseTrack() : resumeTrack()) : playTrack(beat)
    );

  // ---------- Render ----------
  if (loading || !beat) return <Loading />;

  // Format release date logic
  const formattedDate = beat.releaseDate ? new Date(beat.releaseDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "";

  return (
    <div className="track-info-page">
      <div className="ti-container">

        {/* --- Hero Section --- */}
        <div className="ti-hero">
          <div className="ti-cover">
            <img src={beat.coverImage} alt={beat.title} loading="lazy" />
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
                    {formattedDate}
                  </span>
                )}
              </div>



              {beat.genre && beat.genre.length > 0 && (
                <div className="ti-tags">
                  {beat.genre.map((g, i) => (
                    <span key={i} className="ti-tag-pill">{g.toLowerCase()}</span>
                  ))}
                </div>
              )}
            </div>

            <div className="ti-actions-row">
              <a href={beat.purchaseLink} target="_blank" rel="noreferrer" className="ti-btn">
                BUY
              </a>

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
                <BeatRow key={t.id} beat={t} handlePlay={() => {
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