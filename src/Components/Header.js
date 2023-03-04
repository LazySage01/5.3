import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { FaPlus, FaHome } from "react-icons/fa";
import UserContext from "../context/userContext";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const heading = location.pathname === "/" ? "DB" : location.pathname;
  const subHeading =
    heading === "/posts"
      ? "paginated list"
      : heading === "/comments"
      ? "infinite list"
      : heading === "/users"
      ? "CRUD users"
      : "Stop spending too much time on this";

  const { setTable } = useContext(UserContext);

  return (
    <div className="body">
      <header id="top">
        <nav className="nav">
          <h1 className="nav__h1">{heading}</h1>
          <div className="nav__btn__container">
            <Link>
              <button className="plus__btn" disabled>
                {" "}
                <FaPlus />{" "}
              </button>
            </Link>
            <Link to="/" onClick={() => setTable("db")}>
              <button className="plus__btn">
                <FaHome />
              </button>
            </Link>
          </div>
        </nav>
        <h2 className="nav__h2">{subHeading}</h2>
        <hr className="nav__hr" />
      </header>
      <Outlet />
    </div>
  );
};

export default Header;
