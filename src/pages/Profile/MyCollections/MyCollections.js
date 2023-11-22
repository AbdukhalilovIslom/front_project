import React, { useEffect, useState } from "react";
import { base_url } from "../../../data";
import Collection from "../../../components/Collection/Collection";
import AddCollection from "../../../components/AddCollection/AddCollection";
import { ReactComponent as Create } from "../../../assets/images/create.svg";

import "./myCollections.scss";

export default function MyCollections({ setLoading }) {
  const [open, setOpen] = useState(false);
  const [collections, setCollections] = useState();
  const [render, setRender] = useState(0);

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
    <div className="my__coll">
      <div className="my__coll__title">
        <h2>My collections</h2>
        <span onClick={handleClickOpen}>
          <Create /> Create
        </span>
      </div>
      <div className="my__colls">
        {collections && collections.length ? (
          collections.map((el) => (
            <div key={el?.collection._id}>
              <Collection
                el={el}
                link={"/profile/collection/items/" + el.collection._id}
                setRender={setRender}
              />
            </div>
          ))
        ) : (
          <div className="not__found">Collection not found</div>
        )}
      </div>
      <AddCollection open={open} setOpen={setOpen} setRender={setRender} />
    </div>
  );
}
