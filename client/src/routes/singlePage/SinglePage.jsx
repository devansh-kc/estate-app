import React, { Children } from "react";
import { useParams } from "react-router-dom";
import { singlePostData, userData } from "../../../data/dummydata";
import "./singlePage.scss";
import Slider from "../../components/Slider/Slider";
import {
  Bath,
  BedDouble,
  Bookmark,
  DollarSign,
  MapPin,
  MessageSquare,
  Ruler,
} from "lucide-react";
import Map from "../../components/Map/Map";

function FeatureComponent({ image, content, spanContent }) {
  return (
    <div className="feature">
      <img src={image} alt={spanContent} />
      <div className="featureText">
        <span>{spanContent}</span>
        <p>{content}</p>
      </div>
    </div>
  );
}
function RoomSizeComponent({ icon, spanContent }) {
  return (
    <div className="size">
      <span>{icon}</span>

      <span>{spanContent}</span>
    </div>
  );
}

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
          <div className="wrapper">
            <p className="title">General</p>
            <div className="listVertical">
              <FeatureComponent
                spanContent="Utilities"
                content="Renter is responsible"
                image="/utility.png"
              />
              <FeatureComponent
                spanContent="Pet policy"
                content="Pets Allowed"
                image="/pet.png"
              />{" "}
              <FeatureComponent
                spanContent="Property Fees"
                content="Must have 3x rent in total household income"
                image="/fee.png"
              />
            </div>
            <p className="title">Sizes</p>
            <div className="listHorizontal">
              <div className="sizes">
                <RoomSizeComponent icon={<Ruler />} spanContent="800sqm" />
                <RoomSizeComponent
                  icon={<BedDouble />}
                  spanContent="2 bedrooms"
                />
                <RoomSizeComponent icon={<Bath />} spanContent="1 Bathroom" />
              </div>
            </div>
            <div className="title">Nearby Places</div>
            <p className="title">Location</p>
            <div className="mapContainer">
              <Map items={[singlePostData]} />
            </div>
            <div className="buttons">
              <button>
                <MessageSquare />
                <span>Send a Message</span>
              </button>
              <button>
                <Bookmark />
                <span>Save the Place</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
