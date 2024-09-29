import React from "react";
import { useParams } from "react-router-dom";
import { singlePostData, userData } from "../../../data/dummydata";
import "./singlePage.scss";
import Slider from "../../components/Slider/Slider";
import { DollarSign, MapPin } from "lucide-react";

function SinglePage() {
  const { id } = useParams();

  return (
    <div className="singlePageContainer">
      <div className="details">
        <div className="wrapper">
          <Slider images={singlePostData.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{singlePostData.title}</h1>
                <div className="address">
                  <MapPin /> <span>{singlePostData.address}</span>
                </div>
                <div className="price">
                  <DollarSign /> {singlePostData.price}
                </div>
              </div>
              <div className="user">
                <img src={userData.img} alt={userData.name} />
                <span>{userData.name}</span>
              </div>
            </div>
            <div className="bottom">{singlePostData.description}</div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="General">
          <div className="wrapper"></div>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
