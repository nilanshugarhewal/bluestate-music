import { useEffect, useState } from "react";

import "./Home.scss"

import TrackGenre from "../../../components/TrackWrapper/TrackGenre";
import Loading from "../../../components/Loading/Loading";
import Footer from "../../../layouts/Footer/Footer";
import PageHeroText from "../../../components/PageHeroText/PageHeroText";

const Home = () => {
  const apiRandom = process.env.REACT_APP_API_RANDOM;
  const apiEnv = process.env.REACT_APP_API_URL;

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

  const [beats, setBeats] = useState<{
    all: Beat[];
    random1: Beat[];
    random2: Beat[];
    random3: Beat[];
  }>({
    all: [],
    random1: [],
    random2: [],
    random3: [],
  });

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
      if (!apiRandom) return [];
      const [all, random1, random2] = await Promise.all([
        fetchBeats(apiRandom),
        fetchBeats(apiRandom),
        fetchBeats(apiRandom),
      ]);

      const random3 = apiEnv ? await fetchBeats(apiEnv) : [];

      setBeats({ all, random1, random2, random3 });
    };

    loadBeats();
  }, [apiRandom, apiEnv]);

  return (
    <div className="home">

      <div className="hero-section">
        <div className="hero-top">
          <div className="hero-text">
            <span>PETRICHOR</span>
            <span>vol. 1</span>
          </div>
          <div className="hero-sub-text">
            New Type Beat Collection (Coming Soon!)
          </div>
        </div>

        <div className="hero-bottom">
          <div className="hero-photo-grid">
            <img className="hero-photo" src="/assets/logo/bluestate_logo.png" alt="" />
            <img className="hero-photo" src="/assets/logo/bluestate_logo.png" alt="" />
            <img className="hero-photo" src="/assets/logo/bluestate_logo.png" alt="" />
            <img className="hero-photo" src="/assets/logo/bluestate_logo.png" alt="" />
            <img className="hero-photo" src="/assets/logo/bluestate_logo.png" alt="" />
            <img className="hero-photo" src="/assets/logo/bluestate_logo.png" alt="" />
            <img className="hero-photo" src="/assets/logo/bluestate_logo.png" alt="" />
          </div>
        </div>
      </div>

      <div className="home-beat-section">
        <div className="home-beat-heading">
          Newest Beats
        </div>
        {beats.all.length > 0 ? (
          <div className="home-content-container">
            <TrackGenre allBeats={beats.random1.slice(0, 8)} />
          </div>
        ) : (
          <Loading />
        )}
      </div>



      <Footer />

    </div>
  );
};

export default Home;
