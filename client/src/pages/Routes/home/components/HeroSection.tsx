import React from "react";
import PianoSection from "./PianoSection";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="hero-section">
      <div className="hero-logo-container">
        <PianoSection />
        <p className="web-creator-name d-desktop">
          Press the letters or play it with your keyboard! <br /> website by
          Nilanshu Garhewal
        </p>
        <p className="web-creator-name d-mobile">
          Press the letters to play the piano! <br /> website by Nilanshu
          Garhewal
        </p>
      </div>

      <div className="hero-info-wrapper">
        
        <div className="hero-about-wrapper">
          <p className="hero-about-heading">
            <p>About</p>
            <div>About</div>
          </p>
          <p className="hero-about-content">
            BlueState is a space built from my love for music — a place where
            beats, melodies, and emotions come together. It’s about discovering
            sounds, creating vibes, and connecting through music that feels
            real. Whether it’s playlists or favorite tracks, BlueState is here to
            make listening simple and meaningful.
          </p>
        </div>

        <div className="hero-links-wrapper">
          <Link to="/tracks" className="hero-link-box uni-link btn1">
            <button className="home-to-browse btn ">Browse</button>
          </Link>

          <Link to="/tracks" className="hero-link-box uni-link btn2">
            <button className="home-to-browse btn ">Browse</button>
          </Link>

          <Link to="/tracks" className="hero-link-box uni-link btn3">
            <button className="home-to-browse btn">Browse</button>
          </Link>

          <Link to="/tracks" className="hero-link-box uni-link btn4">
            <button className="home-to-browse btn">Browse</button>
          </Link>

          <Link to="/tracks" className="hero-link-box uni-link btn5">
            <button className="home-to-browse btn">Browse</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
