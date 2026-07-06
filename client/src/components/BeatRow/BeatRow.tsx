import React from "react";
import { Play } from "@phosphor-icons/react";
import "./BeatRow.scss";

export const BeatRow = ({ beat, handlePlay }: any) => {
    return (
        <div
            className="beat-row"
            onClick={() => handlePlay(beat)}
        >
            <div className="beat-row-left">
                <div className="beat-row-image-container">
                    <img src={beat.coverImage} alt="cover" className="beat-row-image" />
                    <div className="beat-row-play-overlay">
                        <Play size={20} weight="fill" className="beat-row-play-icon" />
                    </div>
                </div>

                <div className="beat-row-details">
                    <span className="beat-row-title">{beat.title}</span>
                    {/* <span className="beat-row-artist">BlueState</span> */}
                </div>
            </div>

            <div className="beat-row-stats">
                <span className="beat-row-bpm">{beat.bpm} BPM</span>
                <span className="beat-row-scale">{beat.scale || "N/A"}</span>
            </div>

            <div className="beat-row-genres">
                {beat.genre?.slice(0, 3).map((genre: any, index: number) => (
                    <div key={index} className="beat-row-genre-pill">
                        {genre}
                    </div>
                ))}
            </div>

            <div className="beat-row-right">
                {beat.price && <span className="beat-row-price">{beat.price}</span>}
                {/* {beat.duration && <span className="beat-row-duration">{beat.duration}</span>} */}
            </div>
        </div>
    );
};
