import React from "react";
import "./listpage.scss";
import { listData } from "../../../data/dummydata";
import Filter from "../../components/filter/Filter";
import Card from "../../components/card/Card.jsx";
import Map from "../../components/Map/Map.jsx";
import { useLoaderData } from "react-router-dom";
function ListPage() {
  const {posts} = useLoaderData();
  return (
    <div className="listPage">
      <div className="list">
        <div className="wrapper">
          <Filter />

          {posts.map((item, idx) => {
            return <Card key={idx} item={item} />;
          })}
        </div>
      </div>
      <div className="map">
        <Map items={posts} />
      </div>
    </div>
  );
}

export default ListPage;
