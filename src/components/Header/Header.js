import React, { useEffect, useState } from "react";
import { ReactComponent as ClearIcon } from "../../assets/images/Cancel.svg";
import { ReactComponent as SearchIcon } from "../../assets/images/Search.svg";
import Item from "../../components/Item/Item.js";
import { base_url } from "../../data";
import "./header.scss";

export default function Header() {
  const [searched, setSearched] = useState(false);
  const [render, setRender] = useState(0);
  const [items, setItems] = useState();
  const [search, setSearch] = useState("");
  const [usersNames, setUsersNames] = useState();
  const user = JSON.parse(sessionStorage.getItem("user"));
  const path = window.location.pathname.includes("collection")
    ? "collection"
    : "item";

  const [isInputFocused, setIsInputFocused] = useState(false);

  useEffect(() => {
    fetch(`${base_url}/user/allusersname`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((result) => {
        setUsersNames(result);
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  }, []);
  // Event handler for input focus
  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputUnFocus = () => {
    setIsInputFocused(false);
    setItems();
    setSearch("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && path) {
      setSearched(true);
      fetch(`${base_url}/item/search?query=${search}`, {
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

  useEffect(() => {
    if (search) {
      fetch(`${base_url}/item/search?query=${search}`, {
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
  }, [render]); // eslint-disable-line

  return (
    <div className="header">
      <div className="header__search">
        <SearchIcon className="search" />
        <input
          onFocus={handleInputFocus}
          className="header__input"
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          value={search}
          onKeyDown={handleKeyDown}
          disabled={!user}
        />
        <ClearIcon
          onClick={() => {
            handleInputUnFocus();
          }}
          className="clear"
        />
      </div>
      {isInputFocused ? (
        <div className="header__result">
          <ClearIcon className="header__close" onClick={handleInputUnFocus} />
          {items && items.length ? (
            <div className="header__result__items">
              {items.map((el) => (
                <div key={el._id} className="header__result__item">
                  <Item
                    item={el}
                    usersNames={usersNames}
                    setRender={setRender}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="no__matches">
              {searched && items && items.length === 0
                ? "No matches"
                : "Type something & ENTER"}
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
