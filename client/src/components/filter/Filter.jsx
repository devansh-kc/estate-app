import { Search } from "lucide-react";
import React from "react";
import "./filter.scss";

function Filter() {
  return (
    <div className="filter">
      <h1>
        Search results for <b>London</b>
      </h1>

      <div className="top">
        <div className="item">
          <label htmlFor="city">Locations</label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="city location"
          />
        </div>
      </div>

      <div className="bottom">
        <div className="item">
          <label htmlFor="type">Type</label>
          <select name="type" id="type">
            <option value="buy">Buy</option>
            <option value="rent">Rent</option>
          </select>
          <div className="item">
            <label htmlFor="Property">Property</label>
            <select name="Property" id="Property">
              <option value="Bunglow">Bunglow</option>
              <option value="Plot">Plot</option>
              <option value="House">House</option>
              <option value="Kothi">Kothi</option>
            </select>
          </div>

          <div className="item">
            <label htmlFor="min price">Min Price</label>
            <input
              type="number"
              placeholder="min price"
              min={0}
              max={10000000}
              name="min price"
            />
          </div>
          <div className="item">
            <label htmlFor="max price">Max Price</label>
            <input
              type="number"
              placeholder="max price"
              min={0}
              max={10000000}
              name="max price"
            />
          </div>
            <button>
              <Search />
            </button>
        </div>
      </div>
    </div>
  );
}

export default Filter;
