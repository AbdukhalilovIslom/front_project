import React, { useState } from "react";
import { ReactComponent as ClearIcon } from "../../assets/images/Cancel.svg";
import { ReactComponent as SearchIcon } from "../../assets/images/Search.svg";
import { base_url } from "../../data";
import "./header.scss";

export default function Header({ setItems }) {
  const [search, setSearch] = useState("");
  const user = JSON.parse(sessionStorage.getItem("user"));

  const path = window.location.pathname.includes("collection")
    ? "collection"
    : "item";

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && path) {
      console.log(search);
      fetch(`${base_url}/${path}/search?query=${search}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          if (result) {
            setItems(result);
          }
        })
        .catch((err) => {
          console.log(err);
          return;
        });
    }
  };

  return (
    <div className="header">
      <div className="header__search">
        <SearchIcon className="search" />
        <input
          className="header__input"
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          value={search}
          onKeyDown={handleKeyDown}
          disabled={!user}
        />
        <ClearIcon onClick={() => setSearch("")} className="clear" />
      </div>
    </div>
  );
}
