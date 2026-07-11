import React from "react";
import { useDispatch } from "react-redux";
import { playTrack } from "../../store/playerSlice";
import { BeatCard } from "../BeatCard/BeatCard";
import { BeatRow } from "../BeatRow/BeatRow";

import "./TrackGenre.scss";

import { Beat } from "../../types";

type BeatProps = {
  allBeats: Beat[];
  variant?: "card" | "row";
};

const TrackGenre = ({ allBeats, variant = "card" }: BeatProps) => {
  const dispatch = useDispatch();

  const handlePlay = (beat: Beat) => dispatch(playTrack(beat));

  return (
    <section className="tc-pop">
      <div className={`tc-pop-container ${variant === "row" ? "tc-pop-list" : "tc-pop-grid"}`}>
        {allBeats.map((beat) => (
            variant === "row" ? (
              <BeatRow key={beat.id} beat={beat} handlePlay={handlePlay} />
            ) : (
              <BeatCard key={beat.id} beat={beat} handlePlay={handlePlay} />
            )
        ))}
      </div>
    </section>
  );
};

export default TrackGenre;