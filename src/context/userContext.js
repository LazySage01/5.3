import { useState, createContext } from "react";
import axios from "axios";

// Don't mind the name.
// There were only users at first.
const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [company, setCompany] = useState("");

  const [table, setTable] = useState("db");
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [keys, setKeys] = useState([]);

  const baseURL = "http://localhost:3500/";

  //? GET data { One Fn for Every Fetch}
  const fetchTables = async (page = 1) => {
    const response =
      table === "users"
        ? await axios.get(baseURL + table)
        : table === "db"
        ? await axios.get(baseURL + table)
        : await axios.get(baseURL + table + "?_page=" + page + "&_limit=" + 20);

    const responseOne = response.data;
    const data = table === "db" ? Object.keys(responseOne) : responseOne;
    const keys = Object.keys(data[0]);
    setData(data);
    setKeys(keys);
    return data;
  };

  //? POST data
  const postUser = async () => {
    const id = data[data.length - 1].id + 1;
    const newUser = {
      id,
      name: name,
      username: username,
      email: email,
      city: city,
      phone: phone,
      website: website,
      company: company,
    };
    const finalData = [...data, newUser];
    setData(finalData);
    const response = await axios.post(baseURL + table, newUser);
    if (!response) throw Error("Please reload the app");
    setName("");
    setUsername("");
    setEmail("");
    setCity("");
    setPhone("");
    setWebsite("");
    setCompany("");

    return response.data;
  };

  //? DELETE data
  const deleteUser = async (id) => {
    console.log(id);
    await axios.delete(baseURL + table + "/" + id);
    const updatedUsers = data.filter((user) => user.id !== id);
    return updatedUsers;
  };

  //? PATCH data
  const editUser = async (id) => {
    const updatedUser = {
      id: id,
      name,
      username,
      email,
      city,
      phone,
      website,
      company,
    };
    const response = await axios.put(baseURL + table + "/" + id, updatedUser);
    setName("");
    setUsername("");
    setEmail("");
    setCity("");
    setPhone("");
    setWebsite("");
    setCompany("");
    return response;
  };

  return (
    <UserContext.Provider
      value={{
        keys,
        deleteUser,
        editUser,
        postUser,
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
        table,
        setTable,
        data,
        setData,
        fetchTables,
        page,
        setPage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
