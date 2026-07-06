import { useEffect, useState } from "react";

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

      <PageHeroText />

      {beats.all.length > 0 ? (
        <div className="home-content-container">
          <TrackGenre allBeats={beats.random1.slice(0, 8)} />
        </div>
      ) : (
        <Loading />
      )}

      <Footer />

    </div>
  );
};

export default Home;
