import React from "react";

import "./Navbar.scss";
import NavbarGroup from "./components/NavbarGroup/NavbarGroup";

const Nav: React.FC = () => {
  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          {/* <img className="bluestate-logo" src="/assets/logo/bluestate_long_logo.png" alt="logo" /> */}
          <p>BLUESTATE</p>
        </div>

        <div className="navbar-centre">
            <NavbarGroup />
        </div>

        <div className="navbar-right">
          <div className="navbar-listen">
            <span className="navbar-listen-text">Listen on</span>
            <div className="navbar-listen-icon">
              <img src="/assets/icons/social/youtube-icon.svg" alt="youtube" />
            </div>
            <span>YouTube</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Nav;
