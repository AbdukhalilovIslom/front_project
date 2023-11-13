import React, { useEffect, useState } from "react";
import { base_url } from "../../../data";
import Collection from "../../../components/Collection/Collection";
import AddCollection from "../../../components/AddCollection/AddCollection";
import EditCollection from "../../../components/EditCollection/EditCollection";

export default function MyCollections() {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [collections, setCollections] = useState();
  const [render, setRender] = useState(0);
  const [editigEl, setEditigEl] = useState();

  useEffect(() => {
    fetch(`${base_url}/collection/mycollections`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setCollections(result);
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  }, [render]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <div>
        <h2>My Collections</h2>
        <span onClick={handleClickOpen}>+</span>
      </div>
      {collections && collections.length
        ? collections.map((el) => (
            <Collection
              el={el}
              link={"/profile/collection/items/" + el._id}
              setRender={setRender}
              setOpenEdit={setOpenEdit}
              setEditigEl={setEditigEl}
            />
          ))
        : "No Collections"}
      <AddCollection open={open} setOpen={setOpen} setRender={setRender} />
      <EditCollection
        editigEl={editigEl}
        openEdit={openEdit}
        setOpenEdit={setOpenEdit}
        setRender={setRender}
      />
    </div>
  );
}
