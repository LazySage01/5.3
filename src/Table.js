import { Link } from "react-router-dom";

const Table = ({ users, deleteUser, editUser }) => {
  return (
    <div className="table_container">
      <table>
        <thead>
          <tr className="table__head">
            <th>id</th>
            <th>name</th>
            <th>username</th>
            <th>email</th>
            <th>address</th>
            <th>phone</th>
            <th>website</th>
            <th>company</th>
            <th>delete</th>
            <th>edit</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              {Object.entries(user).map(([key, value]) => {
                return (
                  <td key={key}>
                    <input
                      value={value}
                      disabled
                      id="table__input"
                      className="table__input"
                    />
                    {/* {value} */}
                  </td>
                );
              })}
              <td>
                <button
                  type="submit"
                  className="table__btn"
                  onClick={() => deleteUser(user.id)}
                >
                  del
                </button>
              </td>
              <td>
                <Link to={`/edit/${user.id}`}>
                  <button
                    type="submit"
                    className="table__btn"
                    onClick={() => editUser(user.id)}
                  >
                    edit
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
