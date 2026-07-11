import React from "react";

import "./Navbar.scss";

import NavbarLeft from "./components/NavbarLeft/NavbarLeft";
import NavbarCenter from "./components/NavbarCenter/NavbarCenter";
import NavbarRight from "./components/NavbarRight/NavbarRight";


const Navbar: React.FC = () => {
  return (
    <div className="navbar">
      <div className="navbar-container">
        <NavbarLeft />
        <NavbarCenter />
        <NavbarRight />
      </div>
    </div>
  );
};
 
export default Navbar;
