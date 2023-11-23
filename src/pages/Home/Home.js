import React, { useEffect, useState } from "react";
import "./home.scss";
import Item from "../../components/Item/Item";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { base_url } from "../../data";
import Header from "../../components/Header/Header";
import { LinearProgress } from "@mui/material";
import Collection from "../../components/Collection/Collection";

export default function Home() {
  const [items, setItems] = useState();
  const [tags, setTags] = useState();
  const [topCollections, setTopCollections] = useState();
  const [render, setRender] = useState(0);
  const [renderColl, setRenderColl] = useState(0);
  const [usersNames, setUsersNames] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${base_url}/item/allitems`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((result) => {
        setItems(result.reverse());
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        return;
      });

    fetch(`${base_url}/item/tags`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((result) => {
        setTags(result);
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  }, [render]);

  useEffect(() => {
    fetch(`${base_url}/collection/topcollections`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((result) => {
        setTopCollections(result);
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  }, [renderColl]);

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

  const handleClickTag = (tag) => {
    if (tag) {
      fetch(`${base_url}/item/search?query=${tag}`, {
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

  return (
    <div>
      <LinearProgress style={loading ? { opacity: "1" } : { opacity: "0" }} />
      <Header />
      <div className="home">
        <div className="home__tags_container">
          <h2>Find by tags</h2>
          <div className="home__tags">
            {tags && tags.length
              ? tags.map((el, index) => (
                  <span
                    key={index}
                    className="home__tag"
                    onClick={() => {
                      handleClickTag(el.slice(1));
                    }}
                  >
                    {el}
                  </span>
                ))
              : ""}
          </div>
        </div>
        <div className="home__items">
          <h2 className="home__items__title">Leatest items</h2>
          <div className="home__items__slider">
            {items && items.length ? (
              <Swiper
                spaceBetween={20}
                slidesPerView={"auto"}
                pagination={{
                  clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
              >
                {items.map((el) => (
                  <SwiperSlide
                    style={{ height: "300px", width: "250px" }}
                    key={el._id}
                  >
                    <Item
                      item={el}
                      setRender={setRender}
                      usersNames={usersNames}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="home__item__not__found">Item not found</div>
            )}
          </div>
        </div>
        <div className="home__coll">
          <h2 className="home__coll__title">Top Collections</h2>
          <div className="home__colls">
            {topCollections && topCollections.length
              ? topCollections.map((el) => (
                  <div key={el.collection._id}>
                    <Collection
                      el={el}
                      link={"/items/" + el.collection._id}
                      setRender={setRenderColl}
                    />
                  </div>
                ))
              : ""}
          </div>
        </div>
      </div>
    </div>
  );
}
