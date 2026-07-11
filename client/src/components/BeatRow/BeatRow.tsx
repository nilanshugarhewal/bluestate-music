import React from "react";
import { Play } from "@phosphor-icons/react";
import "./BeatRow.scss";
import { Beat } from "../../types";

export const BeatRow = ({ beat, handlePlay }: { beat: Beat, handlePlay: any }) => {
    return (
        <div
            className="beat-row"
            onClick={() => handlePlay(beat)}
        >
            <div className="beat-row-left">
                <div className="beat-row-image-container">
                    <img src={beat.coverImage} alt="cover" className="beat-row-image" loading="lazy" />
                    <div className="beat-row-play-overlay">
                        <Play size={20} weight="fill" className="beat-row-play-icon" />
                    </div>
                </div>

                <div className="beat-row-details">
                    <span className="beat-row-title">{beat.title}</span>
                    <span className="beat-row-artist">{beat.beatCollection || "BlueState"}</span>
                </div>
            </div>

            <div className="beat-row-middle">
                <div className="beat-row-middle-element beat-row-duration">{beat.duration}</div>
                <div className="beat-row-middle-element beat-row-bpm">{beat.bpm} BPM</div>
                <div className="beat-row-middle-element beat-row-scale">{beat.scale || "N/A"}</div>

                <div className="beat-row-genres">
                    {beat.genre?.slice(0, 3).map((genre: any, index: number) => (
                        <div key={index} className="beat-row-genre-pill">
                            {genre}
                        </div>
                    ))}
                </div>

            </div>

            <div className="beat-row-right">
                <a href={beat.purchaseLink} className="beat-row-buy">Buy</a>
            </div>
        </div>
    );
};
