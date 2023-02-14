import { useState, useEffect } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Button from "./Button";
import Table from "./Table";
import List from "./List";

function App() {
  const API_URL = "http://localhost:3500/";

  const [reqType, setReqType] = useState("users");
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`${API_URL}${reqType}`);
        const data = await response.json();
        setItems(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchItems();
  }, [reqType]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={<Button setReqType={setReqType} />}
        errorElement={<p>Error</p>}
      >
        <Route path="table" element={<Table items={items} />} />
        <Route path="list" element={<List items={items} />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
