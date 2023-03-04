import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import UserContext from "../context/userContext";
import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const EditForm = () => {
  const {
    data,
    editUser,
    // editUserData,
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
  } = useContext(UserContext);
  const { id } = useParams();

  const user = data.find((user) => user.id.toString() === id);
  const keys = Object.keys(user);

  useEffect(() => {
    if (user) {
      try {
        setName(user.name);
        setUsername(user.username);
        setEmail(user.email);
        setCity(user.city);
        setPhone(user.phone);
        setWebsite(user.website);
        setCompany(user.company);
      } catch (err) {
        console.error("Error setting the values");
      }
    }
  }, [
    user,
    setName,
    setUsername,
    setEmail,
    setCity,
    setPhone,
    setWebsite,
    setCompany,
  ]);

  const queryClient = useQueryClient();
  const handleEdit = useMutation({
    mutationFn: () => editUser(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  return (
    <form className="table_container" onSubmit={() => handleEdit(id)}>
      <table>
        <thead className="table__head">
          <tr>
            {keys.map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody id="table__body">
          <tr className="table__row" id="table__row">
            <td>
              <input
                type="number"
                placeholder="#"
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
              <Link to="../">
                <button
                  type="button"
                  className="table__btn add__btn"
                  onClick={() => handleEdit.mutate(id)}
                >
                  Update
                </button>
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};

export default EditForm;
