import { Link, useLocation } from "react-router-dom";
import "./NavbarGroup.scss";

const NavLinks = () => {
  const { pathname } = useLocation();

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  }; 

  return (
    <div className="nav-links">
      <Link
        to={"/home"}
        className={`icon uni-link ${isActive("/home") ? "active" : ""}`}
      >
        <span className="icon-child">
          <img src="assets/icons/home-icon.svg" alt="home-icon" />
          {/* <span>Home</span> */}
        </span>
      </Link>

      <Link
        to={"/tracks"}
        className={`icon uni-link ${isActive("/track") ? "active" : ""}`}
      >
        <span className="icon-child">
          <img src="assets/icons/browse-icon.svg" alt="browse-icon" />
          {/* <span>Beats</span> */}
        </span>
      </Link>

      <Link
        to={"/search"}
        className={`icon uni-link ${isActive("/search") ? "active" : ""}`}
      >
        <span className="icon-child">
          <img src="assets/icons/search-icon.svg" alt="search-icon" />
          {/* <span>Search</span> */}
        </span>
      </Link>
    </div>
  );
};

export default NavLinks;
