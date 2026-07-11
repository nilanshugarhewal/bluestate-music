import "./NavbarRight.scss";

const NavbarRight = () => {
    return (
        <div className="navbar-right">
            <a href="https://www.youtube.com/@BlueState_Music" className="navbar-listen" target="_blank" rel="noopener noreferrer">
                <span className="navbar-listen-text">Listen on</span>
                <div className="navbar-listen-icon">
                    <img src="/assets/icons/social/youtube-icon.svg" alt="youtube" />
                </div>
                <span>YouTube</span>
            </a>
        </div>
    )
}

export default NavbarRight;