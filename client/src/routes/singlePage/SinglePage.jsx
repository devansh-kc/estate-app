import React, { Children } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { singlePostData, userData } from "../../../data/dummydata";
import "./singlePage.scss";
import Slider from "../../components/Slider/Slider";
import {
  Bath,
  BedDouble,
  Bookmark,
  Bus,
  DollarSign,
  MapPin,
  MessageSquare,
  Ruler,
  School,
  UtensilsCrossed,
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

function NearbyPlacesComponent({ icon, spanContent, text }) {
  return (
    <div className="feature">
      <span className="icon">{icon}</span>
      <div className="featureText">
        <span>{spanContent}</span>
        <p>{text}</p>
      </div>
    </div>
  );
}

function SinglePage() {
  const { id } = useParams();
  const singlePageData = useLoaderData();
  console.log(singlePageData)
  

  return (
    <div className="singlePageContainer">
      <div className="details">
        <div className="wrapper">
          <Slider images={singlePageData.img} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{singlePageData.title}</h1>
                <div className="address">
                  <MapPin /> <span>{singlePageData.address}</span>
                </div>
                <div className="price">
                  <DollarSign /> {singlePageData.price}
                </div>
              </div>
              <div className="user">
                <img
                  src={singlePageData.user.avatar}
                  alt={singlePageData.user.username}
                />
                <span>{singlePageData.user.username}</span>
              </div>
            </div>
            <div className="bottom">
              {singlePageData.PostDetails.description}
            </div>
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
                content={singlePageData.PostDetails.utilities}
                image="/utility.png"
              />
              <FeatureComponent
                spanContent="Pet policy"
                content={singlePageData.PostDetails.pet}
                image="/pet.png"
              />{" "}
              <FeatureComponent
                spanContent="Property Fees"
                content={singlePageData.PostDetails.income}
                image="/fee.png"
              />
            </div>
            <p className="title">Sizes</p>
            <div className="sizes">
              <RoomSizeComponent
                icon={<Ruler />}
                spanContent={`${singlePageData.PostDetails.size} sqm`}
              />
              <RoomSizeComponent
                icon={<BedDouble />}
                spanContent={`${singlePageData.bedroom} bedrooms`}
              />
              <RoomSizeComponent
                icon={<Bath />}
                spanContent={`${singlePageData.bathroom} Bathroom`}
              />
            </div>
            <p className="title">Nearby Places</p>

            <div className="listHorizontal">
              <NearbyPlacesComponent
                icon={<School />}
                spanContent="School"
                text={`${
                  singlePageData.PostDetails.school > 999
                    ? singlePageData.PostDetails.school / 1000 + "km"
                    : singlePageData.PostDetails.school + "m"
                } away `}
              />

              <NearbyPlacesComponent
                icon={<Bus />}
                spanContent="Bus Stop"
                text={`${
                  singlePageData.PostDetails.bus > 999
                    ? singlePageData.PostDetails.bus / 1000 + "km"
                    : singlePageData.PostDetails.bus + "m"
                } away `}
              />

              <NearbyPlacesComponent
                icon={<UtensilsCrossed />}
                spanContent="Resturant"
                text={`${
                  singlePageData.PostDetails.resturant > 999
                    ? singlePageData.PostDetails.resturant / 1000 + "km"
                    : singlePageData.PostDetails.resturant + "m"
                } away `}
              />
            </div>
            <p className="title">Location</p>
            <div className="mapContainer">
              <Map items={[singlePageData]} />
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
