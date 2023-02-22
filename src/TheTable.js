import React from "react";

const TheTable = () => {
  const keys = data[0].keys;
  return (
    <form className="table_container" onSubmit={() => addData()}>
      <table>
        <thead>
          <tr className="table__head">
            <th id="table__id">id</th>
            <th>name</th>
            <th>username</th>
            <th>email</th>
            <th>city</th>
            <th>phone</th>
            <th>website</th>
            <th>company</th>
            <th>edit</th>
            <th>delete</th>
          </tr>
        </thead>
        <tbody id="table__body">
          {users.map((user, index) => (
            <tr className={index} id={user.id} key={user.id}>
              {Object.entries(user).map(([key, value]) => {
                return (
                  <td key={key} id={user.id}>
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
              <td>
                <Link className={user.id} to={user.id.toString()}>
                  <button
                    type="button"
                    className="table__btn edit__btn"
                    // onClick={handleEdit}
                  >
                    edit
                  </button>
                </Link>
              </td>
              <td>
                <button
                  type="button"
                  className="table__btn delete__btn"
                  onClick={() => deleteUser(user.id)}
                >
                  del
                </button>
              </td>
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
              <button
                type="button"
                className="table__btn add__btn"
                onClick={postUser}
              >
                Add User
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};

export default TheTable;
