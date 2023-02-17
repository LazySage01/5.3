import { useState, useEffect } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Button from "./Button";
import Table from "./Table";
import AddForm from "./AddForm";
// import EditForm from "./EditForm";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);

  //? GET data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3500/users");
        const users = response.data;
        if (response && response.data) setUsers(users);
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
      console.log(id);
      await axios.delete("http://localhost:3500/users/" + id);
      const updatedUsers = users.filter((user) => user.id !== id);
      setUsers(updatedUsers);
    } catch (err) {
      console.log(err.message);
    }
  };

  // PATCH data
  const editUser = async (id) => {};

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route errorElement={<p>Error</p>}>
        <Route path="/" element={<Button />}>
          <Route
            path="users"
            element={<Table users={users} deleteUser={deleteUser} />}
          />
          <Route
            path="addForm"
            element={<AddForm postUser={postUser} users={users} />}
          />
          {/* <Route path="editForm" element={<EditForm editUser={editUser} />} /> */}
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
