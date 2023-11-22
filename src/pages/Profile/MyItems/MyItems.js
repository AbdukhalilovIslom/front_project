import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./myItems.scss";
import { base_url } from "../../../data";
import AddItem from "../../../components/AddItem/AddItem";
import Item from "../../../components/Item/Item";
import { ReactComponent as Create } from "../../../assets/images/create.svg";

export default function MyItems() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState();
  const [render, setRender] = useState(0);
  const [title, setTitle] = useState();
  const [usersNames, setUsersNames] = useState();
  const params = useParams();

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (params) {
      fetch(`${base_url}/item/myitems?id=${params.params}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          setItems(result);
        })
        .catch((err) => {
          console.log(err);
          return;
        });
    }
  }, [render, params.params]);

  useEffect(() => {
    fetch(`${base_url}/collection/view/${params.params}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setTitle(result.name);
      })
      .catch((err) => {
        console.log(err);
        return;
      });

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
  }, [params.params]);

  return (
    <div className="my__items__container">
      <div className="my__items__title">
        <h2>
          <Link to="/profile/collections">My collections</Link>
          {title && <span> / {title}</span>}
        </h2>
        <span className="my__item__create" onClick={handleClickOpen}>
          <Create /> Create
        </span>
      </div>
      {items && items.length ? (
        <div className="my__items">
          {items.map((item) => (
            <Item usersNames={usersNames} item={item} setRender={setRender} />
          ))}
        </div>
      ) : (
        <div className="not__found">Items not found</div>
      )}
      <AddItem
        open={open}
        setOpen={setOpen}
        collection_id={params.params}
        setRender={setRender}
      />
    </div>
  );
}
