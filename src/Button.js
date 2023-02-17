import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const Button = ({ setReqType }) => {
  return (
    <div className="container">
      <nav className="nav">
        <NavLink
          to={"users"}
          role="link"
          // className={({ isActive }) => (isActive ? "active" : "")}
        >
          {" "}
          Users{" "}
        </NavLink>
        <NavLink
          role="link"
          to={"addForm"}
          // className={({ isActive }) => (isActive ? "active" : "")}
        >
          Add Users
        </NavLink>
      </nav>
      <div className="outlet">
        <Outlet />
      </div>
    </div>
  );
};

export default Button;
