import "./Footer.scss";

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-top">
                <div className="footer-top-text">enjoy every moment with us</div>
                <div className="footer-top-image">
                    <img src="/assets/logo/bluestate_logo.png" alt="bluestate-logo" />
                </div>
            </div>

            <div className="footer-center">
                <div className="footer-center-top">signup to get updates from</div>
                <div className="footer-center-artist">bluestate</div>
                <div className="footer-center-bottom">
                    <div className="footer-form">
                        <input type="email" placeholder="Enter your email" />
                        <button>submit</button>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="footer-bottom-divider"></div>
                <div className="footer-bottom-text-container">
                    <span className="footer-bottom-text">@2026 All Rights Reserved.</span>
                    <span className="footer-bottom-text">
                        Made by &nbsp;
                        <a href="https://www.linkedin.com/in/nilanshugarhewal/">Nilanshu Garhewal</a>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Footer;