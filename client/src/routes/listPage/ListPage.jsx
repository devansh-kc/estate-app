import React from "react";
import "./listpage.scss";
import { listData } from "../../../data/dummydata";
import Filter from "../../components/filter/Filter";
import Card from "../../components/card/Card.jsx";
import Map from "../../components/Map/Map.jsx";
function ListPage() {
  const data = listData;
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
      <div className="map">
        <Map item={data} />
      </div>
    </div>
  );
}

export default ListPage;
