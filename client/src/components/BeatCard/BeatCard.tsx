import "./BeatCard.scss";

export const BeatCard = ({ beat, handlePlay }: any) => {
    return ( 
        <div
            className="beat-card"
            key={beat._id}
            onClick={() => handlePlay(beat)}
        >
            <div className="beat-card-image">
                <img src={beat.coverImage} alt="cover" />
            </div>

            <div className="beat-card-info">
                <div className="beat-card-top">
                    <p className="beat-card-artist">BlueState</p>
                    <p className="beat-card-title">{beat.title}</p>
                </div>

                <div className="beat-info-divider"></div>

                <div className="beat-card-bottom">
                    <span className="beat-card-bpm">{beat.bpm} BPM</span>
                    <span className="beat-card-price">${beat.price}</span>
                    {/* <span>&middot;</span> */}
                    <div className="beat-card-genres">
                        {beat.genre?.slice(0, 3).map((genre: any, index: number) => (
                            <div key={index} className="beat-card-genre">
                                {genre}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};