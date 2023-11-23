import React from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as Home } from "../../assets/images/home.svg";
import { ReactComponent as Collection } from "../../assets/images/collection-fill.svg";
import { ReactComponent as Items } from "../../assets/images/calendar3-fill.svg";
import { ReactComponent as Profile } from "../../assets/images/profile.svg";
import { ReactComponent as Admin } from "../../assets/images/setting.svg";
import sun from "../../assets/images/110801_sun_icon.svg";
import moon from "../../assets/images/Moon Symbol.png";
import "./aside.scss";

export default function Aside({ setTheme, theme }) {
  const isAuthenticated = sessionStorage.getItem("token") ?? false;
  const user = JSON.parse(sessionStorage.getItem("user"));

  return (
    <div className="aside">
      <div className="aside__navigations">
        <NavLink
          className={({ isActive }) =>
            isActive ? "aside__navigation active" : "aside__navigation"
          }
          to="/"
        >
          <Home className="svg" />{" "}
          <span className="aside__navigation__text">Home</span>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "aside__navigation active" : "aside__navigation"
          }
          to="/collections"
        >
          <Collection className="svg" />{" "}
          <span className="aside__navigation__text">Collections</span>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "aside__navigation active" : "aside__navigation"
          }
          to="/items/all"
        >
          <Items className="svg" />
          <span className="aside__navigation__text">Items</span>
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
              <span className="aside__theme__text">Dark</span>
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
              <span className="aside__theme__text">Light</span>
            </div>
          )}
          <NavLink
            className={({ isActive }) =>
              isActive ? "aside__navigation active" : "aside__navigation"
            }
            to="/profile/collections"
          >
            <Profile className="svg" />
            <span className="aside__navigation__text">Profile</span>
          </NavLink>
          {user && user.role === "admin" ? (
            <NavLink
              className={({ isActive }) =>
                isActive ? "aside__navigation active" : "aside__navigation"
              }
              to="/admin"
            >
              <Admin className="svg" />

              <span className="aside__navigation__text">Admin</span>
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
              <span className="aside__theme__text">Dark</span>
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
              <span className="aside__theme__text">Light</span>
            </div>
          )}
          <NavLink
            className={({ isActive }) =>
              isActive ? "aside__navigation active" : "aside__navigation"
            }
            to="/login"
          >
            <span className="aside__navigation__text">Sign in</span>
          </NavLink>
        </div>
      )}
    </div>
  );
}
