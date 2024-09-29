import React, { useState } from "react";
import "./slider.scss";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
function Slider({ images }) {
  const [imageIndex, setImageIndex] = useState(null);
  function ChangeSlide(direction) {
    if (direction === "left") {
      if (imageIndex === 0) {
        setImageIndex(images.length - 1);
      } else {
        setImageIndex(imageIndex - 1);
      }
    } else {
      if (imageIndex === images.length - 1) {
        setImageIndex(0);
      } else {
        setImageIndex(imageIndex + 1);
      }
    }
  }

  return (
    <div className="slider">
      {imageIndex !== null && (
        <div className="fullSlider">
          <div className="arrow">
            <ChevronLeft size={68} onClick={() => ChangeSlide("left")} />
          </div>
          <div className="ImgContainer">
            <img src={images[imageIndex]} alt="images" />
          </div>
          <div className="arrow">
            <ChevronRight size={68} onClick={() => ChangeSlide("left")} />
          </div>
          <div className="close">
            <X size={42} color="white" onClick={() => setImageIndex(null)} />
          </div>
        </div>
      )}
      <div className="bigImage">
        <img src={images[0]} alt="images" onClick={() => setImageIndex(0)} />
      </div>
      <div className="smallImages">
        {images.slice(1).map((image, index) => {
          return (
            <img
              src={image}
              alt="House image"
              key={index}
              onClick={() => setImageIndex(index + 1)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Slider;
