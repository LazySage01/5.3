import React from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/userContext";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";

const Home = () => {
  const { setTable, fetchTables } = useContext(UserContext);

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["db"],
    queryFn: fetchTables,
  });

  return (
    <div className="home">
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error:{error.message}</p>}
      {data && (
        <>
          <h2 className="home__h1">Tables:</h2>
          <ul className="home__ul">
            {data.map((table) => (
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
        </>
      )}
    </div>
  );
};

export default Home;
