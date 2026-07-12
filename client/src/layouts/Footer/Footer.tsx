import { useState } from "react";
import "./Footer.scss";

const Footer = () => {
    const [email, setEmail] = useState("");

    const handleSubscribe = () => {
        if (!email.trim()) return;
        
        const subject = encodeURIComponent("Newsletter Signup");
        const body = encodeURIComponent(`Please add ${email} to the newsletter list.`);
        window.location.href = `mailto:contact@bluestate.com?subject=${subject}&body=${body}`;
        
        setEmail(""); // clear input after clicking
    };

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
                        <input 
                            type="email" 
                            placeholder="Enter your email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                        />
                        <button onClick={handleSubscribe}>submit</button>
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