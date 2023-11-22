import React, { useEffect, useState } from "react";
import { base_url } from "../../data";
import Item from "../../components/Item/Item";
import { ReactComponent as Create } from "../../assets/images/create.svg";
import "./items.scss";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import { Dialog, LinearProgress, TextField } from "@mui/material";
import { toast } from "react-toastify";

export default function Items() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState();
  const [tag, setTag] = useState("#book #fashion #lifehack");
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [items, setItems] = useState();
  const [render, setRender] = useState(0);
  const params = useParams();
  const [usersNames, setUsersNames] = useState();
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState();

  useEffect(() => {
    if (params.id === "all") {
      fetch(`${base_url}/item/allitems`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((result) => {
          setItems(result);
        })
        .catch((err) => {
          console.log(err);
          return;
        });
    } else if (params.id) {
      fetch(`${base_url}/item/itemsbycoll/${params.id}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((result) => {
          setItems(result.items);
          setUserId(result.collection.userId);
        })
        .catch((err) => {
          console.log(err);
          return;
        });
    }
  }, [render, params]);

  useEffect(() => {
    fetch(`${base_url}/user/allusersname`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((result) => {
        setUsersNames(result);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  }, []);

  const adminAddItem = () => {
    if (params && user.role === "admin" && userId) {
      fetch(`${base_url}/item/admin/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name: name,
          tag: tag,
          collection_id: params.id,
          userId: userId,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          if (result.status === 200) {
            handleClose();
            setName();
            setTag();
            setRender(Math.random());
          } else {
            toast.error("You are INACTIVE!");
          }
        })
        .catch((err) => {
          console.error(err);
          return;
        });
    } else {
      toast.error("There is some error!Check and try again!");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <LinearProgress style={loading ? { opacity: "1" } : { opacity: "0" }} />
      <Header setItems={setItems} />
      <div className="items__container">
        <div className="items__header">
          <h2 className="items__header__h2">Items</h2>
          {user && userId && params && user.role === "admin" ? (
            <div
              onClick={() => setOpen(true)}
              className="items__header__create"
            >
              <Create />
              Create
            </div>
          ) : (
            ""
          )}
        </div>
        {items && items.length ? (
          <div className="items">
            {items.map((el) => (
              <div key={el._id}>
                <Item item={el} setRender={setRender} usersNames={usersNames} />
              </div>
            ))}
          </div>
        ) : (
          <div className="not__found">Item not found</div>
        )}
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="add__item">
          <h2 className="add__item__h2">Add Item</h2>
          <TextField
            required
            id="outlined-basic"
            label="Name"
            variant="outlined"
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
          <div className="add__item__btn" onClick={adminAddItem}>
            Create
          </div>
        </div>
      </Dialog>
    </div>
  );
}
