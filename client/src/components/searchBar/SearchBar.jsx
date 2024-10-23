import React, { useState } from "react";
import { Search } from "lucide-react";
import "./searchbar.scss";
import { Link } from "react-router-dom";
function SearchBar() {
  const [Query, setQuery] = useState({
    type: "Buy",
    location: "",
    minPrice: "",
    maxPrice: "",
  });

  const types = ["Buy", "Rent"];
  function switchOption(option) {
    setQuery((prevOption) => ({ ...prevOption, type: option }));
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

      <form action="">
        <input type="text" placeholder="City Location" name="location" />
        <input
          type="number"
          placeholder="min price"
          min={0}
          max={10000000}
          name="min price"
        />
        <input
          type="number"
          placeholder="max price"
          min={0}
          max={10000000}
          name="max price"
        />
        <Link
          to={`/list?type=${Query.type}&city=${Query.city}&minPrice=${Query.minPrice}&maxPrice=${Query.maxPrice}`}
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
