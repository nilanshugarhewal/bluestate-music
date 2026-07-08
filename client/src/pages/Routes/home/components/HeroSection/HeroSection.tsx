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