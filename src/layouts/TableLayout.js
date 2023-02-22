import React from "react";
import { Outlet } from "react-router-dom";

const TableLayout = () => {
  return (
    <main>
      <Outlet />
    </main>
  );
};

export default TableLayout;
