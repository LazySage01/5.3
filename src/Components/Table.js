import { Link } from "react-router-dom";
import UserContext from "../context/userContext";
import { useContext } from "react";
import { FaTrash, FaEdit, FaPlusCircle } from "react-icons/fa";
import {
  useMutation,
  useQuery,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";

const Table = () => {
  const {
    keys,
    table,
    fetchTables,
    page,
    setPage,

    // for users only
    name,
    setName,
    username,
    setUsername,
    email,
    setEmail,
    city,
    setCity,
    phone,
    setPhone,
    website,
    setWebsite,
    company,
    setCompany,
    deleteUser,
    postUser,
  } = useContext(UserContext);

  const queryClient = useQueryClient();

  const {
    isError: infiniteIsError,
    error: infiniteError,
    data: infiniteData,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: [table],
    queryFn: ({ pageParam = 0 }) => fetchTables(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      console.log(lastPage);
      console.log(allPages);
      console.log(lastPage.length ? allPages.length + 1 : undefined);
      return allPages.length < 5 ? allPages.length + 1 : undefined;
    },
    enabled: table === "comments",
  });

  const {
    isFetching: paginatedIsFetching,
    isError: paginatedIsError,
    error: paginatedError,
    isPreviousData,
    data: paginatedData,
  } = useQuery({
    queryKey: [table, page],
    queryFn: () => fetchTables(page),
    keepPreviousData: true,
    enabled: table === "posts",
  });

  const { isFetching, isError, error, data } = useQuery({
    queryKey: [table],
    queryFn: fetchTables,
    enabled: table === "users",
  });

  const handleAdd = useMutation({
    mutationFn: postUser,
    // queryKey problem??
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  const handleDelete = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  return (
    <main>
      {table === "users" && (
        <form>
          {isFetching && <p>Loading...</p>}
          {isError && <p>{error.message}</p>}
          {data && (
            <table className="table">
              <thead className="table__head">
                <tr>
                  {keys.map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody id="table__body">
                {data.map((data) => (
                  <tr key={data.id} className={table}>
                    {Object.entries(data).map(([key, value]) => {
                      return (
                        <td key={key} className={key}>
                          <input
                            type="text"
                            value={value}
                            disabled
                            id="table__input"
                            className="table__input"
                          />
                        </td>
                      );
                    })}
                    {table === "users" && (
                      <>
                        <td id="table__btn__container">
                          <Link to={data.id.toString()}>
                            <button
                              type="button"
                              className="table__btn edit__btn"
                              // onClick={handleEdit}
                            >
                              <FaEdit />
                            </button>
                          </Link>
                        </td>
                        <td id="table__btn__container">
                          <button
                            type="button"
                            className="table__btn delete__btn"
                            onClick={() => handleDelete.mutate(data.id)}
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
                <tr className="table__row" id="table__row">
                  <td>
                    <input
                      type="number"
                      placeholder="#"
                      // value={users ? users[users.length - 1].id + 1 : 1}
                      disabled
                      id="table__input"
                      className="table__input"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={name}
                      required
                      placeholder="name"
                      onChange={(e) => setName(e.target.value)}
                      id="table__input"
                      className="table__input"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="username"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      id="table__input"
                      className="table__input"
                    />
                  </td>
                  <td>
                    <input
                      type="email"
                      required
                      placeholder="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      id="table__input"
                      className="table__input"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                      placeholder="city"
                      id="table__input"
                      className="table__input"
                    />
                  </td>
                  <td>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="phone"
                      id="table__input"
                      required
                      className="table__input"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      required
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="website"
                      id="table__input"
                      className="table__input"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={company}
                      placeholder="company"
                      onChange={(e) => setCompany(e.target.value)}
                      required
                      id="table__input"
                      className="table__input"
                    />
                  </td>
                  <td colSpan="2">
                    {/*// TODO disable submit button to prevent empty data */}
                    <button
                      type="button"
                      className="table__btn add__btn"
                      onClick={() => handleAdd.mutate()}
                    >
                      <FaPlusCircle />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          )}
        </form>
      )}
      {table === "posts" && (
        <>
          {paginatedIsError && <p>{paginatedError.message}</p>}
          {paginatedData && (
            <>
              <section className="table__container">
                <table className="table">
                  <thead className="table__head">
                    <tr>
                      {keys.map((key) => (
                        <th key={key}>{key}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody id="table__body">
                    {paginatedData.map((data) => (
                      <tr key={data.id} className={table}>
                        {Object.entries(data).map(([key, value]) => {
                          return (
                            <td key={key} className={key}>
                              <input
                                type="text"
                                value={value}
                                disabled
                                id="table__input"
                                className="table__input"
                              />
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
              <footer className="table__footer">
                <button
                  onClick={() => setPage((prev) => prev - 1)}
                  disabled={isPreviousData || page === 1}
                >
                  Previous Page
                </button>
                <span>Current Page:{page}</span>
                <button
                  onClick={() => setPage((prev) => prev + 1)}
                  disabled={isPreviousData || page === 5}
                >
                  {paginatedIsFetching ? "Loading..." : "Next Page"}
                </button>
              </footer>
            </>
          )}
        </>
      )}
      {table === "comments" && (
        <>
          {infiniteIsError && <p>{infiniteError.message}</p>}
          {infiniteData && (
            <>
              <section className="table__container">
                <table className="table">
                  <thead className="table__head">
                    <tr>
                      {keys.map((key) => (
                        <th key={key}>{key}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody id="table__body">
                    {infiniteData.pages.flatMap((page) => {
                      return page.map((row) => (
                        <tr key={row.id} className={table}>
                          {Object.entries(row).map(([key, value]) => {
                            return (
                              <td key={key} className={key}>
                                <input
                                  type="text"
                                  value={value}
                                  disabled
                                  id="table__input"
                                  className="table__input"
                                />
                              </td>
                            );
                          })}
                        </tr>
                      ));
                    })}
                  </tbody>
                </table>
              </section>
              <footer className="table__footer__paginated">
                <button
                  onClick={() => fetchNextPage()}
                  //TODO fix it
                  disabled={isFetchingNextPage || !hasNextPage}
                >
                  {isFetchingNextPage
                    ? "Loading..."
                    : !hasNextPage
                    ? "End of List"
                    : "Load More"}
                </button>
                {!hasNextPage && <a href="#top">Back to Top</a>}
              </footer>
            </>
          )}
        </>
      )}
    </main>
  );
};

export default Table;
