import React, { useEffect, useState } from "react";
import "./collections.scss";
import Collection from "../../components/Collection/Collection";
import { base_url } from "../../data";
import Header from "../../components/Header/Header";
import { LinearProgress } from "@mui/material";

export default function Collections() {
  const [collections, setCollections] = useState();
  const [render, setRender] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${base_url}/collection/allcollections`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((result) => {
        setCollections(result);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  }, [render]);

  return (
    <div>
      <LinearProgress style={loading ? { opacity: "1" } : { opacity: "0" }} />
      <Header setItems={setCollections} />
      <div className="collections__container">
        <div className="collections__header">
          <h2 className="collections__header__h2">Collections</h2>
        </div>
        <div className="collections">
          {collections && collections.length ? (
            collections.map((el) => (
              <div key={el.collection._id}>
                <Collection
                  el={el}
                  link={"/items/" + el.collection._id}
                  setRender={setRender}
                />
              </div>
            ))
          ) : (
            <div className="not__found">Collection not found</div>
          )}
        </div>
      </div>
    </div>
  );
}
