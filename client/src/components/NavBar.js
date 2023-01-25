import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const NavBar = () => {
  const navigate = useNavigate();

  const logoutUser = () => {
    axios
      .get("http://localhost:8000/api/logout", {
        withCredentials: true,
        credentials: "include",
      })
      .then((res) => {
        console.log({ successMessage: "User logged out" });
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="bg-dark mb-1">
      <h1 className="text-warning">Movie Reviews R' Us</h1>
      <NavLink className="home-link bg-secondary" to="displayAll">
        Home
      </NavLink>
      <NavLink className="create-link bg-secondary" to="createMovie">
        Create
      </NavLink>
      <NavLink className="login-link bg-secondary" to="/login">
        Login
      </NavLink>
      <button className="logout-btn bg-dark" onClick={logoutUser}>
        Logout
      </button>
    </div>
  );
};

export default NavBar;
