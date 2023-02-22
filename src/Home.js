import React from "react";
import { Link } from "react-router-dom";
import UserContext from "./context/userContext";
import { useContext } from "react";

const Home = () => {
  const { tableList, setTable } = useContext(UserContext);

  return (
    <div className="home">
      <h2 className="home__h1">Tables:</h2>
      <ul className="home__ul">
        {tableList.map((table) => (
          <Link
            className="home__link"
            key={table}
            to={table}
            onClick={() => setTable(table)}
          >
            <li className="home__li" key={table}>
              {table}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Home;
