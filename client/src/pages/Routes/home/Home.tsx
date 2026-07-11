import { useEffect, useState } from "react";
import { Beat } from "../../../types";

import "./Home.scss"

import HeroSection from "./components/HeroSection/HeroSection";

import TrackGenre from "../../../components/TrackWrapper/TrackGenre";
import Loading from "../../../components/Loading/Loading";
import { Link } from "react-router-dom";
const Home = () => {
  const apiEnv = process.env.REACT_APP_API_URL;

  const [beats, setBeats] = useState<Beat[]>([]);

  // reusable fetcher
  const fetchBeats = async (url: string): Promise<Beat[]> => {
    try {
      const res = await fetch(url);
      return await res.json();
    } catch (err) {
      console.error("Fetch error:", err);
      return [];
    }
  };

  useEffect(() => {
    const loadBeats = async () => {
      if (!apiEnv) return;
      const all = await fetchBeats(apiEnv);
      setBeats(all);
    };

    loadBeats();
  }, [apiEnv]);

  return (
    <div className="home">

      <div className="hero-section">
        <div className="hero-top">
          <div className="hero-text">
            <span>this is</span>
            <span id="hero-artist-text">bluestate</span>
          </div>
          <div className="hero-sub-text">
            Typebeats &middot; Originals &middot; Remixes
          </div>
        </div>

        <div className="hero-bottom">
          <div className="hero-photo-grid">
            {[
              "/assets/images/everythings_blue.jpg",
              "/assets/images/still_waiting.png",
              "/assets/images/dark_signals_v1.jpg",
              "/assets/logo/bluestate_logo.png",
              "/assets/logo/bluestate_logo.png",
              "/assets/logo/bluestate_logo.png",
              "/assets/logo/bluestate_logo.png"
            ].map((src, index) => (
              <img key={index} className="hero-photo" src={src} alt="" loading="lazy" />
            ))}
          </div>
        </div>
      </div>

      <div className="home-beat-section">
        <div className="home-beat-heading">
          Newest Beats
        </div>
        {beats.length > 0 ? (
          <div className="home-content-container">
            <TrackGenre allBeats={beats.slice(0, 8)} />
          </div>
        ) : (
          <Loading />
        )}

        <div className="home-view-all-beat">
          <Link to="/tracks" className="view-all-beats-link">View All</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
