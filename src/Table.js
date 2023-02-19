import { useState, useRef } from "react";
const Table = ({ users, deleteUser, editUser, postUser }) => {
  // const nameRef = useRef("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [company, setCompany] = useState("");
  const editRef = useRef("");

  const handleEdit = (e) => {
    const key = e.target.className;
    const id = e.target.id;
    const index = e.target.parentElement.className;
    console.log(key);
    console.log(id);
    console.log(index);
    // input.removeAttribute("disabled");
    // input.value = editRef;
    // editRef.current = input.value;
    // console.log(input.value);
  };

  const handleChange = (e) => {
    editRef.current = e.target.value;
  };

  // const toggleDisable = (e) => {
  //   console.log(e);
  //   const input = e.target.firstChild;
  //   console.log(input);
  // };

  //TODO check note(s)

  const handleAdd = () => {
    const id = users[users.length - 1].id + 1;
    const newUser = {
      id,
      name: name,
      username: username,
      email: email,
      address: address,
      phone: phone,
      website: website,
      company: company,
    };
    console.log(newUser);
    postUser(newUser, users);
    setName("");
    setUsername("");
    setEmail("");
    setAddress("");
    setPhone("");
    setWebsite("");
    setCompany("");
  };
  return (
    <form className="table_container" onSubmit={handleAdd}>
      <table>
        <thead>
          <tr className="table__head">
            <th id="table__id">id</th>
            <th>name</th>
            <th>username</th>
            <th>email</th>
            <th>address</th>
            <th>phone</th>
            <th>website</th>
            <th>company</th>
            <th>edit</th>
            <th>delete</th>
          </tr>
        </thead>
        <tbody id="table__body">
          {users.map((user, index) => (
            <tr className={index} id="table__row" key={user.id}>
              {Object.entries(user).map(([key, value]) => {
                return (
                  <td
                    key={key}
                    onDoubleClick={(e) => handleEdit(e)}
                    className={key}
                    id={user.id}
                  >
                    <input
                      type="text"
                      value={value}
                      disabled
                      onChange={(e) => handleChange(e)}
                      id="table__input"
                      className="table__input"
                    />
                  </td>
                );
              })}
              <td>
                <button
                  type="button"
                  className="table__btn edit__btn"
                  // onClick={(e) => toggleDisabled(user.id)}
                >
                  edit
                </button>
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
            {/* {Object.entries(dummy).map(([key, value]) => { */}
            {/* return ( */}
            <td
            // onDoubleClick={toggleDisable}
            >
              <input
                type="text"
                value={name}
                required
                placeholder="name"
                // onDoubleClick={toggleDisable}
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
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                placeholder="address"
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
            {/* ); */}
            {/* })} */}
            <td colSpan="2">
              <button
                type="button"
                className="table__btn add__btn"
                onClick={handleAdd}
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

export default Table;
