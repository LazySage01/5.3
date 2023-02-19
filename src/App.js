import { useState, useEffect } from "react";
import Header from "./Header";
import Table from "./Table";
import axios from "axios";
import {
  createBrowserRouter,
  routerProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

function App() {
  const [users, setUsers] = useState([]);
  // const [dummy, setDummy] = useState([]);

  //? GET data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3500/users");
        const users = response.data;
        if (response && response.data) setUsers(users);
        // const dummyResponse = await axios.get("http://localhost:3500/dummy");
        // const dummy = dummyResponse.data;
        // setDummy(dummy);
      } catch (err) {
        console.log(err);
        throw new Error(err.message);
      }
    };
    fetchUsers();
  }, []);

  //? POST data
  const postUser = (newUser, users) => {
    const finalData = [...users, newUser];
    setUsers(finalData);

    const addData = async () => {
      try {
        // generic request
        const response = await axios.post(
          "http://localhost:3500/users",
          newUser
        );
        if (!response.ok) throw Error("Please reload the app");
      } catch (err) {
        console.error(err.message);
      }
    };
    addData(finalData);
  };

  // DELETE data
  const deleteUser = async (id) => {
    try {
      await axios.delete("http://localhost:3500/users/" + id);
      const updatedUsers = users.filter((user) => user.id !== id);
      setUsers(updatedUsers);
    } catch (err) {
      console.log(err.message);
    }
  };

  // PATCH data
  const editUser = async (id) => {};

  return (
    <main>
      <Header />
      <Table
        users={users}
        editUser={editUser}
        deleteUser={deleteUser}
        postUser={postUser}
        // dummy={dummy}
      />
    </main>
  );
}

export default App;
