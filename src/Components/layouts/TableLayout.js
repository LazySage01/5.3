import React from "react";
import { Outlet } from "react-router-dom";

const TableLayout = () => {
  return (
    <main>
      {/* <h1>{page}</h1> */}
      <Outlet />
    </main>
  );
};

export default TableLayout;
