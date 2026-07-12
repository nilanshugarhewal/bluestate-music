import "./HeroSection.scss";

const HeroSection = () => {
    return (
        <div className="hero-section">
            <div className="hero-top">
                <div className="hero-text">
                    <span>THIS IS</span>
                    <span id="hero-artist-text">BLUESTATE</span>
                </div>
                <div className="hero-sub-text">
                    Typebeats &middot; Originals &middot; Remixes
                </div>
            </div>

            <div className="hero-top-2">
                <div className="hero-text-2">
                    <span>This is</span>
                    <span id="hero-artist-text-2">bluestate</span>
                </div>
                <div className="hero-sub-text-2">
                    <div>Typebeats &middot; Originals &middot; Remixes</div>
                    <div>BlueState is a pop music producer from India.</div>
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
    )
}

export default HeroSection;