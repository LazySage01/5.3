import React from "react";
import { Form, NavLink, Outlet } from "react-router-dom";

const Button = ({ setReqType }) => {
  return (
    <div>
      <nav>
        <NavLink to={"table"}> Table </NavLink>
        <NavLink to={"list"}> List </NavLink>
      </nav>
      <Form>
        <button type="button" onClick={() => setReqType("users")}>
          Users
        </button>
        <button type="button" onClick={() => setReqType("posts")}>
          Posts
        </button>
        <button type="button" onClick={() => setReqType("comments")}>
          Comments
        </button>
      </Form>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Button;
