import { Link } from "react-router-dom";
import UserContext from "./context/userContext";
import { useContext } from "react";
import { FaTrash, FaEdit, FaPlusCircle } from "react-icons/fa";

const Table = () => {
  const {
    data,
    table,
    keys,

    // for users only
    // states
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
    // functions
    deleteUser,
    postUser,
  } = useContext(UserContext);
  // console.log(table);

  return (
    <form className="table_container">
      <table>
        <thead>
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
                  <td>
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
                  <td>
                    <button
                      type="button"
                      className="table__btn delete__btn"
                      onClick={() => deleteUser(data.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
          {table === "users" && (
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
                <button
                  type="button"
                  className="table__btn add__btn"
                  onClick={postUser}
                >
                  <FaPlusCircle />
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </form>
  );
};

export default Table;
