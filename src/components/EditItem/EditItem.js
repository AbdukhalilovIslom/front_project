import React from "react";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import { TextField } from "@mui/material";
import { base_url } from "../../data";
import { toast } from "react-toastify";

export default function EditItem({ setOpenEdit, openEdit, setRender, item }) {
  const [name, setName] = useState(item.name);
  const [tag, setTag] = useState(item.tag);

  const handleClose = () => {
    setOpenEdit(false);
  };

  const handleUpdate = () => {
    if (name && tag) {
      fetch(`${base_url}/item/update/${item._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name,
          tag,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          if (!result) return;

          if (result.status === 200) {
            handleClose();
            setRender(Math.random());
            toast.success("Updated");
          } else {
            toast.error("You are INACTIVE!");
          }
        })
        .catch((err) => {
          console.log(err);
          return;
        });
    }
  };

  return (
    <Dialog
      open={openEdit}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div className="add__item">
        <h2 className="add__item__h2">Edit Item</h2>
        <TextField
          required
          id="outlined-basic"
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          required
          id="outlined-basic"
          label=""
          variant="outlined"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
        <div className="spacer"></div>
        <div className="add__item__btn" onClick={handleUpdate}>
          Update
        </div>
      </div>
    </Dialog>
  );
}
