import React from "react";
import { Link } from "react-router-dom";
import "./card.scss";
import { MapPin } from "lucide-react";
function Cart({ item }) {
  return (
    <div className="card">
      <Link to={`/${item.id}`} className="imageContainer">
        <img src={item.img} alt={item.title} />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={item.id}>{item.title}</Link>
        </h2>
        <p className="address">
          <MapPin />
        </p>
      </div>
    </div>
  );
}

export default Cart;
