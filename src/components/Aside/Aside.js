import React from "react";
import { Link, NavLink } from "react-router-dom";
import { ReactComponent as Home } from "../../assets/images/home.svg";
import { ReactComponent as Collection } from "../../assets/images/collection-fill.svg";
import { ReactComponent as Items } from "../../assets/images/calendar3-fill.svg";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import sun from "../../assets/images/110801_sun_icon.svg";
import moon from "../../assets/images/Moon Symbol.png";
import "./aside.scss";

export default function Aside({ setTheme, theme }) {
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
          {theme === "dark" ? (
            <div
              className="aside__theme"
              onClick={() => {
                localStorage.setItem("theme", "light");
                setTheme("light");
              }}
            >
              <img className="aside__theme__moon" src={moon} alt="moon" />
              Dark mode
            </div>
          ) : (
            <div
              className="aside__theme"
              onClick={() => {
                localStorage.setItem("theme", "dark");
                setTheme("dark");
              }}
            >
              <img src={sun} alt="sun" className="aside__theme__sun" />
              Light mode
            </div>
          )}
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
          {theme === "dark" ? (
            <div
              className="aside__theme"
              onClick={() => {
                localStorage.setItem("theme", "light");
                setTheme("light");
              }}
            >
              <img className="aside__theme__moon" src={moon} alt="moon" />
              Dark mode
            </div>
          ) : (
            <div
              className="aside__theme"
              onClick={() => {
                localStorage.setItem("theme", "dark");
                setTheme("dark");
              }}
            >
              <img src={sun} alt="sun" className="aside__theme__sun" />
              Light mode
            </div>
          )}
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
