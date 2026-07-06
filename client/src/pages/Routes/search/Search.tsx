import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon, SquaresFourIcon, ListIcon } from "@phosphor-icons/react";
import { useDispatch } from "react-redux";
import { playTrack } from "../../../store/playerSlice";
import TrackGenre from "../../../components/TrackWrapper/TrackGenre";

const Search = () => {
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

  const dispatch = useDispatch();
  const handlePlay = (beat: Beat) => {
    dispatch(playTrack(beat));
  };

  const apiLink = process.env.REACT_APP_API_URL;
  const [allBeats, setAllBeats] = useState<Beat[]>([]);
  const [query, setQuery] = useState(""); 
  const [filteredBeats, setFilteredBeats] = useState<Beat[]>([]);
  const [layout, setLayout] = useState<"card" | "row">("card");

  useEffect(() => {
    if (!apiLink) {
      console.error("API URL is not defined!");
      return;
    }

    fetch(apiLink)
      .then((res) => res.json())
      .then((data) => {
        setAllBeats(data);
        setFilteredBeats(data); // show all by default
      })
      .catch((err) => console.log(err));
  }, [apiLink]);

  // filter when query changes
  useEffect(() => {
    if (!query.trim()) {
      setFilteredBeats(allBeats); // reset if empty
      return;
    }

    const lowerQuery = query.toLowerCase();

    const results = allBeats.filter((beat) => {
      return (
        beat.title?.toLowerCase().includes(lowerQuery) ||
        beat.genre?.some((g) => g.toLowerCase().includes(lowerQuery)) ||
        beat.mood?.some((m) => m.toLowerCase().includes(lowerQuery)) ||
        beat.scale?.toLowerCase().includes(lowerQuery) ||
        (beat.bpm && beat.bpm.toString().includes(lowerQuery))
      );
    });

    setFilteredBeats(results);
  }, [query, allBeats]);

  return (
    <div className="search">
      <div className="search-input-box bg-blur">
        {/* <p className="search-heading">Search</p> */}

        <div className="search-input">
          <MagnifyingGlassIcon
            className="search-icon"
            weight="bold"
            size={24}
          />
          <input
            type="text"
            placeholder="Search Typebeat, BPM, Scale & More..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="search-layout-toggle">
          <button
            className={`toggle-btn ${layout === "card" ? "active" : ""}`}
            onClick={() => setLayout("card")}
            title="Grid View"
          >
            <SquaresFourIcon size={20} weight={layout === "card" ? "fill" : "bold"} />
            {/* <span>Grid</span> */}
          </button>
          <button
            className={`toggle-btn ${layout === "row" ? "active" : ""}`}
            onClick={() => setLayout("row")}
            title="List View"
          >
            <ListIcon size={20} weight={layout === "row" ? "fill" : "bold"} />
            {/* <span>List</span> */}
          </button>
        </div>

        {/* <div className="search-res-divider"></div> */}
      </div>

      <div className="search-results">
        {filteredBeats.length > 0 ? (
          <TrackGenre allBeats={filteredBeats} variant={layout} />
        ) : (
          <div className="no-results-container">
            <p className="no-results">No beats found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
