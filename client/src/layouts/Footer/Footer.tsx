import "./Footer.scss";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-message">
                    <div>Feel free to say hi via</div>
                    <div id="email-link">musicbyvyn@gmail.com</div>
                </div>

                <div className="footer-bottom">
                    <div className="footer-links">
                        Made with &hearts; by
                        &nbsp;
                        <a
                            href="https://www.linkedin.com/in/nilanshugarhewal/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Nilanshu Garhewal
                        </a>
                    </div>
                    <div className="footer-copyright">
                        ©{new Date().getFullYear()} BlueState. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;