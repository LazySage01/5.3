import Header from "./Components/Header";
import Table from "./Components/Table";
import EditForm from "./Components/EditForm";
import TableLayout from "./Components/layouts/TableLayout";
import Home from "./Components/Home";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
  Link,
} from "react-router-dom";
import { UserProvider } from "./context/userContext";
import { FaHome } from "react-icons/fa";

const error = (
  <div className="error__element">
    <p>
      Something seems wrong...😵‍💫 &nbsp; <br />
      <Link to="/" onClick={() => window.location.reload()}>
        Click to Retry
      </Link>
      <br />
      <br />
      NOTE: Use the <FaHome /> button to navigate home 🙂
    </p>
  </div>
);

function App() {
  //? ROUTER
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Header />} errorElement={error}>
        <Route index element={<Home />} />
        <Route path="users" element={<TableLayout />}>
          <Route index element={<Table />} />
          <Route path=":id" element={<EditForm />} />
        </Route>
        <Route path="posts" element={<Table />} />
        <Route path="comments" element={<Table />} />
      </Route>
    )
  );
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}
export default App;
