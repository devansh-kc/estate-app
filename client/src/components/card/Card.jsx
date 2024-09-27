import React from "react";
import { Link } from "react-router-dom";
import "./card.scss";
import {
  BathIcon,
  BedDouble,
  Bookmark,
  DollarSign,
  MapPin,
  MessageCircle,
  Save,
} from "lucide-react";
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
          <MapPin className="lucide-icons" />
          <span>{item.address}</span>
        </p>

        <p className="price">
          <DollarSign className="lucide-icons" />
          <span>{item.price}</span>
        </p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <BedDouble className="lucide-icons" />
              <span>{item.bedroom} bedroom</span>
            </div>
            <div className="feature">
              <BathIcon className="lucide-icons" />
              <span>{item.bathroom} bathroom</span>
            </div>
          </div>
          <div className="icons">
            <div className="icon">
              <Bookmark className="lucide-icons" />
            </div>
            <div className="icon">
              <MessageCircle className="lucide-icons" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
