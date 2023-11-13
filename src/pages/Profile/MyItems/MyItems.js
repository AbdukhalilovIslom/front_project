import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./myItems.scss";
import { base_url } from "../../../data";
import AddItem from "../../../components/AddItem/AddItem";
import Item from "../../../components/Item/Item";
import EditItem from "../../../components/EditItem/EditItem";

export default function MyItems() {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [items, setItems] = useState();
  const [render, setRender] = useState(0);
  const [title, setTitle] = useState();
  const [editingItem, setEditingItem] = useState();
  const params = useParams();

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
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
  }, [render]);

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
  }, []);

  return (
    <div>
      <h2>
        <Link to="/profile/collections">{title}</Link>
        <span>/items</span>
        <div onClick={handleClickOpen}>+</div>
      </h2>
      <div>
        {items && items.length
          ? items.map(({ name, _id, tag }) => (
              <Item
                name={name}
                id={_id}
                tag={tag}
                setRender={setRender}
                setEditingItem={setEditingItem}
                setOpenEdit={setOpenEdit}
              />
            ))
          : "No items"}
      </div>
      <AddItem
        open={open}
        setOpen={setOpen}
        collection_id={params.params}
        setRender={setRender}
      />
      <EditItem
        setOpenEdit={setOpenEdit}
        openEdit={openEdit}
        setRender={setRender}
        id={editingItem}
      />
    </div>
  );
}
