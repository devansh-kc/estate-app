import React from "react";
import { Link } from "react-router-dom";
import "./card.scss"
function Cart({item}) {
  return (
    <div className="card">
      <Link to={`/${item.id}`} className="imageContainer">
        <img src={item.img} alt={item.title} />
      </Link>
      <div className="textContainer"></div>
    </div>
  );
}

export default Cart;
