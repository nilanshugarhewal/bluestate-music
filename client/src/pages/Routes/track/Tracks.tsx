import { useState, useMemo } from "react";
import { useGetBeatsQuery } from "../../../store/apiSlice";
import "./Track.scss";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";

import TrackGenre from "../../../components/TrackWrapper/TrackGenre";

import Loading from "../../../components/Loading/Loading";

const Tracks = () => {
  const { data: allBeats = [], isLoading } = useGetBeatsQuery();

  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [bpmRange, setBpmRange] = useState<string>("all");
  const [scaleFilter, setScaleFilter] = useState<string>("all");
  const [collectionFilter, setCollectionFilter] = useState<string>("all");

  const collections = [
    { label: "All Beats", value: "all" },
    { label: "Singles", value: "Single" },
    { label: "Dark Signals vol. 1", value: "Dark Signals vol. 1" },
    { label: "Still Waiting", value: "Still Waiting" },
    { label: "Everything's Blue", value: "Everything's Blue" },
  ];

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

      // 4. Collection Filter
      const matchesCollection =
        collectionFilter === "all" || beat.beatCollection === collectionFilter;

      return matchesSearch && matchesScale && matchesBpm && matchesCollection;
    });
  }, [allBeats, searchTerm, scaleFilter, bpmRange, collectionFilter]);

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
          {collections.map((col) => (
            <div
              key={col.value}
              className={`track-filter-sort${collectionFilter === col.value ? " active" : ""}`}
              onClick={() => setCollectionFilter(col.value)}
            >
              {col.label}
            </div>
          ))}
        </div>
      </div>

      {isLoading ? (
        <Loading />
      ) : allBeats.length > 0 ? (
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
                setCollectionFilter("all");
              }}>Clear Filters</button>
            </div>
          )}
        </div>
      ) : (
        <div style={{ textAlign: "center", color: "#a1a1aa", marginTop: "2rem" }}>No beats available</div>
      )}
    </div>
  );
};

export default Tracks;
