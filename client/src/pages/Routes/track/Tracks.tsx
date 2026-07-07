import { useEffect, useState, useMemo } from "react";
import "./Track.scss";
import { MagnifyingGlassIcon, FunnelIcon } from "@phosphor-icons/react";

import TrackGenre from "../../../components/TrackWrapper/TrackGenre";

import Loading from "../../../components/Loading/Loading";
import Footer from "../../../layouts/Footer/Footer";

const Tracks = () => {
  const apiLink = process.env.REACT_APP_API_URL;

  type Beat = {
    _id: string;
    title?: string;
    bpm?: number;
    audioUrl: string;
    genre?: string[];
    mood?: string[];
    scale: string;
    duration?: string;
    price?: string;
    description?: string;
    coverImage?: string;
  };

  const [allBeats, setAllBeats] = useState<Beat[]>([]);

  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [bpmRange, setBpmRange] = useState<string>("all");
  const [scaleFilter, setScaleFilter] = useState<string>("all");

  useEffect(() => {
    if (!apiLink) {
      console.error("API URL is not defined!");
      return;
    }

    fetch(apiLink)
      .then((res) => res.json())
      .then((data) => {
        setAllBeats(data);
      })
      .catch((err) => console.log(err));
  }, [apiLink]);

  // Dynamically extract unique scales from available beats
  const uniqueScales = useMemo(() => {
    const scales = new Set(allBeats.map(b => b.scale).filter(Boolean));
    return Array.from(scales).sort();
  }, [allBeats]);

  // Apply Filters
  const filteredBeats = useMemo(() => {
    return allBeats.filter((beat) => {
      // 1. Search Filter (by title or genre)
      const matchesSearch =
        !searchTerm ||
        beat.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        beat.genre?.some(g => g.toLowerCase().includes(searchTerm.toLowerCase()));

      // 2. Scale Filter
      const matchesScale = scaleFilter === "all" || beat.scale === scaleFilter;

      // 3. BPM Range Filter
      let matchesBpm = true;
      if (bpmRange !== "all" && beat.bpm) {
        if (bpmRange === "<60") matchesBpm = beat.bpm < 60;
        else if (bpmRange === "60-90") matchesBpm = beat.bpm >= 60 && beat.bpm <= 90;
        else if (bpmRange === "90-120") matchesBpm = beat.bpm > 90 && beat.bpm <= 120;
        else if (bpmRange === ">120") matchesBpm = beat.bpm > 120;
      }

      return matchesSearch && matchesScale && matchesBpm;
    });
  }, [allBeats, searchTerm, scaleFilter, bpmRange]);

  return (
    <div className="tracks">

      <div className="track-top">

        <div className="track-filter-beats">
          {/* Search Column */}
          <div className="tfb-search-col">
            <div className="tfb-search-box">
              <MagnifyingGlassIcon size={20} color="#a1a1aa" />
              <input
                type="text"
                placeholder="Search beats, genres..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Filters Column */}
          <div className="tfb-filters-col">
            <div className="tfb-filter-group">
              <span className="tfb-label">BPM</span>
              <select
                value={bpmRange}
                onChange={(e) => setBpmRange(e.target.value)}
                className="tfb-select"
              >
                <option value="all">Any</option>
                <option value="<60">Under 60</option>
                <option value="60-90">60 - 90</option>
                <option value="90-120">90 - 120</option>
                <option value=">120">Above 120</option>
              </select>
            </div>

            <div className="tfb-filter-group">
              <span className="tfb-label">Scale</span>
              <select
                value={scaleFilter}
                onChange={(e) => setScaleFilter(e.target.value)}
                className="tfb-select"
              >
                <option value="all">All Scales</option>
                {uniqueScales.map(scale => (
                  <option key={scale} value={scale}>{scale}</option>
                ))}
              </select>
            </div>
          </div>

        </div>

        <div className="track-filter-collection">
          <div className="track-filter-sort">All Beats</div>
          <div className="track-filter-sort">Dark Signals vol. 1</div>
          <div className="track-filter-sort">Still Waiting</div>
          <div className="track-filter-sort">EVERYTHING'S BLUE</div>
        </div>
      </div>

      {allBeats.length > 0 ? (
        <div className="browse-content-container">
          {filteredBeats.length > 0 ? (
            <TrackGenre allBeats={filteredBeats} variant="row" />
          ) : (
            <div className="no-beats-found">
              <p>No beats match your filters.</p>
              <button onClick={() => {
                setSearchTerm("");
                setBpmRange("all");
                setScaleFilter("all");
              }}>Clear Filters</button>
            </div>
          )}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Tracks;
