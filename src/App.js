import Header from "./Header";
import Table from "./Table";
import EditForm from "./EditForm";
import TableLayout from "./layouts/TableLayout";
import Home from "./Home";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
// import {
//   QueryClientProvider,
//   QueryClient,
//   useQuery,
//   useMutation,
// } from "@tanstack/react-query";

function App() {
  //? ROUTER
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Header />}>
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

  // <QueryClientProvider client={QueryClient}>
  // </QueryClientProvider>
  return <RouterProvider router={router} />;
}
export default App;
