import React from "react";
import "./pin.scss";

import { Marker, Popup } from "react-leaflet";
import { DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

function Pin({ item }) {
  return (
    // <div className="pin">
    <Marker  position={[item.latitude, item.longitude]}>
      <Popup>
        <div className="popUpContainer">
          <img src={item.img} alt={item.title} />
          <div className="textContainer">
            <Link to={`/list/${item.id}`}>{item.title}</Link>
            <span>{item.bedroom} bedroom</span>
            <b>$ {item.price}</b>
          </div>
        </div>
      </Popup>
    </Marker>
    // </div>
  );
}

export default Pin;
