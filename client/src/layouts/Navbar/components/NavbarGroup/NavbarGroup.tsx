import { Link, useLocation } from "react-router-dom";
import "./NavbarGroup.scss";

const NavLinks = () => {
  const { pathname } = useLocation();

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <div className="navbar-group">
      <div className="nav-links">
        <Link
          to={"/home"}
          className={`icon uni-link ${isActive("/home") ? "active" : ""}`}
        >
          <span className="icon-child">
            <span>Home</span>
          </span>
        </Link>

        <Link
          to={"/tracks"}
          className={`icon uni-link ${isActive("/track") ? "active" : ""}`}
        >
          <span className="icon-child">
            <span>All Beats</span>
          </span>
        </Link>
      </div>
    </div>
  );
};

export default NavLinks;
