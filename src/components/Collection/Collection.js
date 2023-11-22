import React, { useState } from "react";
import "./collection.scss";
import { Link } from "react-router-dom";
import defImg from "../../assets/images/Снимок экрана 2023-11-04 в 12.54.20.png";
import { ReactComponent as Edit } from "../../assets/images/edit.svg";
import { ReactComponent as Delete } from "../../assets/images/Trash.svg";
import { base_url } from "../../data";
import EditCollection from "../EditCollection/EditCollection";
import { toast } from "react-toastify";

export default function Collection({ el, link, setRender }) {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [openEdit, setOpenEdit] = useState(false);

  const handleEdit = () => {
    setOpenEdit(true);
  };

  const handleDeleteColletion = (id) => {
    if (!id) return;
    fetch(`${base_url}/collection/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
      .then((result) => {
        if (result.status === 200) {
          setRender(Math.random());
          toast.success("Collection deleted");
        } else {
          toast.error("You are INACTIVE!");
        }
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  };

  return (
    <div className="collection">
      <Link className="collection__link" to={link}>
        <img
          src={
            el.collection.image && el.collection.image.includes("http")
              ? el.collection.image
              : defImg
          }
          alt="def-img"
          className="collection__image"
        />
        <span className="span1">{el.collection.name}</span>
        <span className="collection__items_count">
          {el.itemCount && el.itemCount}
        </span>
      </Link>
      {window.location.pathname === "/collections" &&
      user &&
      (user.role === "admin" || user._id === el.collection.userId) ? (
        <div className="collection__ref">
          <Delete
            className="delete__svg"
            onClick={() => handleDeleteColletion(el.collection._id)}
          />
          <Edit className="edit__svg" onClick={handleEdit} />
        </div>
      ) : window.location.pathname === "/profile/collections" && user ? (
        <div className="collection__ref">
          <Delete
            className="delete__svg"
            onClick={() => handleDeleteColletion(el.collection._id)}
          />
          <Edit className="edit__svg" onClick={handleEdit} />
        </div>
      ) : (
        ""
      )}
      <EditCollection
        setRender={setRender}
        openEdit={openEdit}
        setOpenEdit={setOpenEdit}
        collection={el.collection}
      />
    </div>
  );
}
