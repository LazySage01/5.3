import { useState, useEffect, createContext } from "react";
import axios from "axios";

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [company, setCompany] = useState("");
  const [tableList, setTableList] = useState([]);
  const [table, setTable] = useState("users");
  const [data, setData] = useState([]);
  const [keys, setKeys] = useState([]);

  const baseURL = "http://localhost:3500/";

  //? GET data
  useEffect(() => {
    const fetchTables = async () => {
      try {
        const URL = baseURL + table;
        console.log(URL);
        const response = await axios.get(baseURL + table);
        const data = response.data;
        if (response && response.data) setData(data);
        const object = data[0];
        setKeys(Object.keys(object));
      } catch (err) {
        console.log(err);
      }
    };
    fetchTables();
  }, [table]);

  //? GET tableList
  useEffect(() => {
    const fetchTableList = async () => {
      try {
        const response = await axios.get(baseURL + "tableList");
        const data = response.data;
        if (response && response.data) setTableList(data);
      } catch (err) {
        console.log(err);
        throw new Error(err.message);
      }
    };
    fetchTableList();
  }, []);

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

    try {
      const response = await axios.post(baseURL + table, newUser);
      if (!response.ok) throw Error("Please reload the app");
    } catch (err) {
      throw new Error(err.message);
    } finally {
      setName("");
      setUsername("");
      setEmail("");
      setCity("");
      setPhone("");
      setWebsite("");
      setCompany("");
    }
  };

  //? DELETE data
  const deleteUser = async (id) => {
    try {
      console.log(baseURL + table + "/" + id);
      await axios.delete(baseURL + table + "/" + id);
      const updatedUsers = data.filter((user) => user.id !== id);
      setUsers(updatedUsers);
    } catch (err) {
      throw new Error(err.message);
    }
  };

  //? PATCH data
  const editUser = async (id) => {
    console.log(id);
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
    try {
      console.log(baseURL + table + "/" + id);
      const response = await axios.put(baseURL + table + "/" + id, updatedUser);
      setUsers(
        data.map((user) => (user.id === id ? { ...response.data } : user))
      );
      setName("");
      setUsername("");
      setEmail("");
      setCity("");
      setPhone("");
      setWebsite("");
      setCompany("");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <UserContext.Provider
      value={{
        users,
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
        tableList,
        keys,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
