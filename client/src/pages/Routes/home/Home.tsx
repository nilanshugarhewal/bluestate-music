import "./Home.scss";

import HeroSection from "./components/HeroSection/HeroSection";
import TrackGenre from "../../../components/TrackWrapper/TrackGenre";
import Loading from "../../../components/Loading/Loading";
import { Link } from "react-router-dom";
import { useGetBeatsQuery } from "../../../store/apiSlice";

const Home = () => {
  const { data: beats = [], isLoading } = useGetBeatsQuery();

  return (
    <div className="home">
      <HeroSection />

      <div className="home-beat-section">
        <div className="home-beat-heading">
          Newest Beats
        </div>
        
        {isLoading ? (
          <Loading />
        ) : beats.length > 0 ? (
          <div className="home-content-container">
            <TrackGenre allBeats={beats.slice(0, 8)} />
          </div>
        ) : (
          <div style={{ textAlign: "center", color: "#a1a1aa" }}>No beats found</div>
        )}

        <div className="home-view-all-beat">
          <Link to="/tracks" className="view-all-beats-link">View All</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
