import React, { useState } from "react";
import { Search } from "lucide-react";
import "./searchbar.scss";
import { Link } from "react-router-dom";
function SearchBar() {
  const [Query, setQuery] = useState({
    type: "buy",
    location: "",
    minPrice: 0,
    maxPrice: 0,
  });

  const types = ["buy", "rent"];
  function switchOption(option) {
    setQuery((prevOption) => ({ ...prevOption, type: option }));
  }
  function handleChange(event) {
    setQuery((prevOption) => {
      console.log(prevOption);
      return {
        ...prevOption,
        [event.target.name]: event.target.value,
      };
    });
  }
  return (
    <div className="searchBar">
      <div className="buttons">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => switchOption(type)}
            className={Query.type === type ? "active" : ""}
          >
            {type}
          </button>
        ))}
      </div>

      <form>
        <input
          type="text"
          placeholder="City Location"
          name="location"
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="min price"
          min={0}
          max={10000000}
          name="minPrice"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="number"
          placeholder="max price"
          min={0}
          max={10000000}
          name="maxPrice"
          onChange={(e) => handleChange(e)}
        />
        <Link
          to={`/list?type=${Query.type}&city=${Query.location}&minPrice=${Query.minPrice}&maxPrice=${Query.maxPrice}`}
        >
          <button>
            <Search className="searchIcon" />
          </button>
        </Link>
      </form>
    </div>
  );
}

export default SearchBar;
