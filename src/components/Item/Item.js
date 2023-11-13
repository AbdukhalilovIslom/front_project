import React from "react";
import { ReactComponent as Like } from "../../assets/images/like.svg";
import { ReactComponent as Comment } from "../../assets/images/comment.svg";
import { ReactComponent as Edit } from "../../assets/images/edit.svg";
import { ReactComponent as Delete } from "../../assets/images/icons8-delete.svg";
import { base_url } from "../../data";

export default function Item({
  name,
  id,
  tag,
  setRender,
  setEditingItem,
  setOpenEdit,
}) {
  const handleDelete = () => {
    if (id) {
      fetch(`${base_url}/item/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then(() => {
          setRender(Math.random());
        })
        .catch((err) => {
          console.log(err);
          return;
        });
    }
  };

  return (
    <div>
      <div>
        <h5>{name}</h5>
        <p>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
        <p>All comments (7)</p>
        <div>
          <Like style={{ marginRight: "10px", cursor: "pointer" }} />
          <Comment style={{ cursor: "pointer" }} />
          <Edit
            onClick={() => {
              setEditingItem(id);
              setOpenEdit(true);
            }}
            style={{ cursor: "pointer" }}
          />
          <Delete onClick={handleDelete} style={{ cursor: "pointer" }} />
        </div>
        <div>{tag}</div>
        <p>
          <input placeholder="Add comment..." />
        </p>
      </div>
    </div>
  );
}
