import React from "react";
import "./listpage.scss";
import { listData } from "../../../data/dummydata";
import Filter from "../../components/filter/Filter";
import Card from "../../components/card/Card.jsx";
function ListPage() {
  const data = listData;
  console.log(data)
  return (
    <div className="listPage">
      <div className="list">
        <div className="wrapper">
          <Filter />

          {data.map((item, idx) => {
            return <Card key={idx} item={item} />;
          })}
        </div>
      </div>
      <div className="map">Map</div>
    </div>
  );
}

export default ListPage;
