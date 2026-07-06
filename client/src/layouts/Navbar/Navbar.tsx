import React from "react";

import NavbarGroup from "./components/NavbarGroup/NavbarGroup";
import "./Navbar.scss";

const Nav: React.FC = () => {
  return (
    <div className="navbar">
      <div className="navbar-container">

        <div className="navbar-navigations">
          <div className="navbar-previous bg-blur">
            <span className="navbar-previous-span">
              <img
                className="navbar-previous-icon"
                src="assets/icons/right-arrow-icon.svg"
                alt=""
              />
            </span>

            <span className="navbar-previous-span">
              <img
                className="navbar-previous-icon"
                src="assets/icons/left-arrow-icon.svg"
                alt=""
              />
            </span>
          </div>
        </div>


        <div className="navbar-logo">
          <img className="bluestate-logo" src="/assets/logo/bluestate_long_logo.png" alt="logo" />
        </div>

        <div className="navbar-inner">
          <div className="navbar-group bg-blur">
            <NavbarGroup />
          </div>
        </div>



      </div>
    </div>
  );
};

export default Nav;
