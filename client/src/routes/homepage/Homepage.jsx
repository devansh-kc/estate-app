import React from "react";
import "./homepage.scss";
import SearchBar from "../../components/searchBar/SearchBar";

function Homepage() {
  return (
    <div className="homepage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title"> Find Real Estate & Get Your Dream Place</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus
            pariatur numquam deserunt itaque quam temporibus earum, commodi ut,
            animi quas, non ipsa nesciunt nemo dolor nostrum. Sapiente illo
            incidunt sed.
          </p>
          <SearchBar />
          <div className="boxes">
            <div className="box">
              <h2>16+</h2>
              <p>Years Of Experience</p>
            </div>
            <div className="box">
              <h2>200+</h2>
              <p>Awards Gained</p>
            </div>
            <div className="box">
              <h2>1200+</h2>
              <p>Properties Available</p>
            </div>
          </div>
        </div>
      </div>
      <div className="imageContainer">
        <img src="/bg.png" alt="Landing page image" />
      </div>
    </div>
  );
}

export default Homepage;
