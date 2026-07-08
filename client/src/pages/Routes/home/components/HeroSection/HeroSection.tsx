import "./HeroSection.scss";

const HeroSection = () => {
    return (
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

            <div className="hero-top-2">
                <div className="hero-text-2">
                    <span>This is</span>
                    <span id="hero-artist-text">bluestate</span>
                </div>
                <div className="hero-sub-text-2">
                    <div>Typebeats &middot; Originals &middot; Remixes</div>
                    <div>BlueState is a pop music producer from India.</div>
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
    )
}

export default HeroSection;