import React from "react";
import { Link, NavLink } from "react-router-dom";
import { ReactComponent as Home } from "../../assets/images/home.svg";
import { ReactComponent as Collection } from "../../assets/images/collection-fill.svg";
import { ReactComponent as Items } from "../../assets/images/calendar3-fill.svg";
import "./aside.scss";

export default function Aside({ setTheme }) {
  const isAuthenticated = sessionStorage.getItem("token") ?? false;
  const user = JSON.parse(sessionStorage.getItem("user"));

  return (
    <div className="aside">
      <div className="aside__navigations">
        <Link className="aside__navigation logo" to="/">
          STORE
        </Link>
        <NavLink
          className={({ isActive }) =>
            isActive ? "aside__navigation active" : "aside__navigation"
          }
          to="/"
        >
          <Home className="svg" /> Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "aside__navigation active" : "aside__navigation"
          }
          to="/collections"
        >
          <Collection className="svg" /> Collections
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "aside__navigation active" : "aside__navigation"
          }
          to="/items/all"
        >
          <Items className="svg" /> Items
        </NavLink>
      </div>
      {isAuthenticated ? (
        <div className="aside__navigations">
          <div>
            <span onClick={() => setTheme("light")}>Light</span> |{" "}
            <span onClick={() => setTheme("dark")}>Dark</span>
          </div>
          <NavLink
            className={({ isActive }) =>
              isActive ? "aside__navigation active" : "aside__navigation"
            }
            to="/profile/collections"
          >
            Profile
          </NavLink>
          {user && user.role === "admin" ? (
            <NavLink
              className={({ isActive }) =>
                isActive ? "aside__navigation active" : "aside__navigation"
              }
              to="/admin"
            >
              Admin
            </NavLink>
          ) : (
            ""
          )}
        </div>
      ) : (
        <div className="aside__navigations">
          <div>
            <span onClick={() => setTheme("light")}>Light</span> |{" "}
            <span onClick={() => setTheme("dark")}>Dark</span>
          </div>
          <NavLink
            className={({ isActive }) =>
              isActive ? "aside__navigation active" : "aside__navigation"
            }
            to="/login"
          >
            Sign in
          </NavLink>
        </div>
      )}
    </div>
  );
}
