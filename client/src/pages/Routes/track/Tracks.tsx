import { useEffect, useState } from "react";

import TrackGenre from "../../../components/TrackWrapper/TrackGenre";
import PageHeroText from "../../../components/PageHeroText/PageHeroText";

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

  return (
    <div className="tracks">

      <PageHeroText />

      {allBeats.length > 0 ? (
        <div className="browse-content-container">

          <TrackGenre allBeats={allBeats} variant="row" />
        </div>
      ) : (
        <Loading />
      )}

      <Footer />
    </div>
  );
};

export default Tracks;
