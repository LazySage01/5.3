import React, { useContext } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { FaPlus, FaHome } from "react-icons/fa";
import UserContext from "./context/userContext";

const Header = () => {
  const { setTable } = useContext(UserContext);
  return (
    <main className="body">
      <header>
        <nav className="nav">
          {/*TODO set the name of the Table instead of DB with conditions */}
          <h1 className="nav__h1">DB</h1>
          <div className="nav__btn__container">
            <Link>
              <button className="plus__btn">
                {" "}
                <FaPlus />{" "}
              </button>
            </Link>
            <Link to="/" onClick={() => setTable("tableList")}>
              <button className="plus__btn">
                <FaHome />
              </button>
            </Link>
          </div>
        </nav>
        <hr className="nav__hr" />
      </header>
      <Outlet />
    </main>
  );
};

export default Header;
